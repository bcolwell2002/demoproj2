/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDemoprojtable = /* GraphQL */ `
  query GetDemoprojtable($id: ID!) {
    getDemoprojtable(id: $id) {
      id
      running
      status
      sms
      sixty
      time
      timeplus
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const listDemoprojtables = /* GraphQL */ `
  query ListDemoprojtables(
    $filter: ModelDemoprojtableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDemoprojtables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        running
        status
        sms
        sixty
        time
        timeplus
        updatedAt
        createdAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
