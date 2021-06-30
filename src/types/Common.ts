import { Role, PermissionType, PageCoverType, Table } from "./Enums";

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
  spaceId: string;
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
