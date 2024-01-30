import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type Eagerdemoprojtable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<demoprojtable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly running?: boolean | null;
  readonly status?: number | null;
  readonly sms?: boolean | null;
  readonly sixty?: boolean | null;
  readonly time?: string | null;
  readonly timeplus?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type Lazydemoprojtable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<demoprojtable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly running?: boolean | null;
  readonly status?: number | null;
  readonly sms?: boolean | null;
  readonly sixty?: boolean | null;
  readonly time?: string | null;
  readonly timeplus?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type demoprojtable = LazyLoading extends LazyLoadingDisabled ? Eagerdemoprojtable : Lazydemoprojtable

export declare const demoprojtable: (new (init: ModelInit<demoprojtable>) => demoprojtable) & {
  copyOf(source: demoprojtable, mutator: (draft: MutableModel<demoprojtable>) => MutableModel<demoprojtable> | void): demoprojtable;
}