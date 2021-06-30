import { Query2 } from "./Common";
import { CollectionViewType, Table } from "./Enums";
import {
  CollectionFormat,
  CollectionViewGalleryFormat,
  CollectionViewListFormat,
  CollectionViewTableFormat,
} from "./Formats";

export interface Collection {
  id: string;
  version: number;
  name: Array<string[]>;
  description?: Array<Array<Array<string[]> | string>>;
  schema: { [key: string]: CollectionSchema };
  icon?: string;
  cover?: string;
  format: CollectionFormat;
  parent_id: string;
  parent_table: Table;
  alive: boolean;
  file_ids?: string[];
  copied_from: string;
  migrated: boolean;
  space_id: string;
}

export interface CollectionSchema {
  name: string;
  type: string;
}

export interface CollectionViewBase {
  id: string;
  version: number;
  // type: CollectionViewType;
  name: string;
  // format?: any;
  // query?: any;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  page_sort: string[];
  space_id: string;
}

export interface CollectionViewList extends CollectionViewBase {
  type: CollectionViewType.List;
  format: CollectionViewListFormat;
}

export interface CollectionViewTable extends CollectionViewBase {
  type: CollectionViewType.Table;
  format: CollectionViewTableFormat;
  query2: Query2;
}

export interface CollectionViewGallery extends CollectionViewBase {
  type: CollectionViewType.Gallery;
  format: CollectionViewGalleryFormat;
}

export type CollectionView = CollectionViewList | CollectionViewTable | CollectionViewGallery;
