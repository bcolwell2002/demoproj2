import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation } from "aws-amplify";
import { Button, Flex, Heading, Text, View, withAuthenticator } from "@aws-amplify/ui-react";
import { listDemoprojtables } from './graphql/queries';
import { updateDemoprojtable } from './graphql/mutations';

const App = ({ signOut }) => {
  const [demoprojData, setDemoprojData] = useState([]); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [time2, setTime2] = useState(12.38);
  const [finalTime2Count, setFinalTime2Count] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // Fetch data from the API
  async function fetchData() {
    const apiData = await API.graphql({ query: listDemoprojtables });
    setDemoprojData(apiData.data.listDemoprojtables.items);
  }
  // Function to handle 60 seconds condition
  const SixtyTrue = async () => {
    const input = {
      id: '1',
      sixty: true,
      status: '3'
    };
    return API.graphql(graphqlOperation(updateDemoprojtable, {input}));
  }
  const SixtyFalse = async () => {
    const input = {
      id: '1',
      sixty: false
    };
    return API.graphql(graphqlOperation(updateDemoprojtable, {input}));
  }
  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1); 
        setTime2(prev => prev + 1);
      }, 1000);
    } else if (finalTime2Count === null) {
      setFinalTime2Count(time2);
    }
    return () => clearInterval(interval); 
  }, [isTimerRunning, time2, finalTime2Count]);
  // Fetch data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(); 
    }, 5000);
    return () => clearInterval(interval);
  }, []) 
  // Effect for checking the latest item in the data
  useEffect(() => {
    const latestItem = demoprojData[demoprojData.length - 1];
    if(latestItem?.time === 'start') {
      setIsTimerRunning(true);
      setFinalTime2Count(null); // Reset finalTime2Count on restart
    } else if (latestItem?.time === 'stop') {
      setIsTimerRunning(false);
      setFinalTime2Count(time2); // Store the last time2 value
    }
  }, [demoprojData, time2]);
  // Effect for handling 60 seconds condition
  useEffect(() => {
    if(time >= 60) {
      SixtyTrue();
    } else {
      SixtyFalse(); 
    }
  }, [time]);
  // Function to determine the status color
  function getStatusColor(item) {
    switch (item.status) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      default:
        return 'green';
    }
  }
  // Format date and time
  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', { hour12: true });
  };
  // Update the current date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-item" style={{ fontWeight: 'bold', color: '#2e73b8' }}>Facility Statistics</div>
        <div className="sidebar-item active">Shipping Sorter</div>
        <div className="sidebar-item">Receiving Sorter</div>
        <div className="sidebar-item">Crossbelt Sorter 1</div>
        <div className="sidebar-item">Crossbelt Sorter 2</div>
        <button onClick={signOut} className="sign-out-button">Sign Out</button>
      </div>
      <div className="main-content">
        <h1>ACME Inc.</h1>
        <div>Distribution Center: San Bernardino, CA</div>
        <div className="grid-container">
          {/* Grid Headers */}
          <div className="grid-header">Lane Description</div>
          <div className="grid-header">Lane Status</div>
          <div className="grid-header">Initial SMS</div>
          <div className="grid-header">Escalation SMS</div>
          <div className="grid-header">Response Time</div>
          <div className="grid-header">Lane Losses</div>
          {/* Grid Rows */}
          {demoprojData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="grid-cell" style={{ backgroundColor: getStatusColor(Number(item.status)) }}>
                {`Take-away #${item.id} Pallet Build`}
              </div>
              <div className="grid-cell">{time}</div>
              <div className="grid-cell">{isTimerRunning ? 'true' : 'false'}</div>
              <div className="grid-cell">{time >= 60 ? 'true' : 'false'}</div>
              <div className="grid-cell">{time2}</div>
              <div className="grid-cell">{finalTime2Count !== null ? finalTime2Count : 'N/A'}</div>
            </React.Fragment>
          ))}
        </div>
        <div className="time-display">
          {formatDateTime(currentDateTime)}
        </div>
      </div>
    </div>
  );
};

export default withAuthenticator(App);