import { CollectionSchema } from "./Collections";
import { Role, PermissionType, PageCoverType, Table, TxnOperationCommands } from "./Enums";

export interface Child<T> {
  [key: string]: T;
}

export interface ChildObject<T> {
  [key: string]: Object<T>;
}

export interface Object<T> {
  role: Role;
  value: T;
}

export interface Pointer {
  id: string;
  table: Table;
  spaceId?: string; // TODO: spaceId not needed when table === Space. Need to handle separately
}

export interface Permission {
  role: Role;
  type: PermissionType;
  user_id?: string;
  added_timestamp?: number;
}

export interface Cursor {
  stack: any[];
}

export interface GalleryCover {
  type: PageCoverType;
}

export interface ListProperty {
  visible: boolean;
  property: string;
}

export interface TableProperty {
  width?: number;
  visible: boolean;
  property: string;
}

export interface Query2 {
  aggregations: Aggregation[];
}

export interface Aggregation {
  property: string;
  aggregator: string;
}

export interface Result {
  type: "reducer";
  reducerResults: ReducerResults;
}

export interface ReducerResults {
  collection_group_results: CollectionGroupResults;
}

export interface CollectionGroupResults {
  type: "results";
  blockIds: string[];
  total: number;
}

export interface DateTime {
  type: "datetime";
  time_zone: string;
  start_date: Date;
  start_time: string;
}

export interface CollectionPageProperty {
  visible: boolean;
  property: string;
}

export interface BlockProperty {
  title: Array<Array<Array<Array<DateTime | string>> | string>>;
}

export interface Transaction {
  id: string;
  spaceId: string;
  operations: TxnOperation[];
}

export interface TxnOperation {
  pointer: Pointer;
  path: string[];
  command: TxnOperationCommands;
  args: TxnArgsClass | number | string;
}

export interface TxnArgsClass {
  type?: string;
  id?: string;
  version?: number;
  before?: string;
  parent_id?: string;
  parent_table?: string;
  alive?: boolean;
  schema?: { [key: string]: CollectionSchema };
  format?: {
    collection_pointer?: Pointer;
    collection_cover_position?: number;
    collection_page_properties?: CollectionPageProperty[];
  };
}
