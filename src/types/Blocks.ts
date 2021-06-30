import { Permission, DateTime, BlockProperty } from "./Common";
import { BlockType } from "./Enums";
import { BlockAliasFormat, BlockCalloutFormat, BlockFormat } from "./Formats";

export interface Block {
  id: string;
  version: number;
  type: BlockType;
  content?: string[]; // Only in Page 
  view_ids?: string[];
  collection_id?: string;
  format?: BlockFormat | BlockAliasFormat | BlockCalloutFormat;
  permissions?: Permission[];
  copied_from?: string;
  file_ids?: string[];
  properties?: BlockProperty;
  // created_by: string;
  // last_edited_by: string;

  created_time: number;
  last_edited_time: number;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  created_by_table: string;
  created_by_id: string;
  last_edited_by_table: string;
  last_edited_by_id: string;
  space_id: string;
}

export interface BlockWithProperties extends Block {
  type:
    | BlockType.Text
    | BlockType.Page
    | BlockType.Todo
    | BlockType.Header
    | BlockType.BulletedList
    | BlockType.NumberedList
    | BlockType.Toggle
    | BlockType.Quote
    | BlockType.Callout;
}

export interface BlockPage extends BlockWithProperties {
  type: BlockType.Page;
  content?: string[];
  permissions?: Permission[];
}

export interface BlockDivider extends Block {
  type: BlockType.Divider;
}

export interface BlockImage extends Block {
  type: BlockType.Image;
}

export interface BlockAlias extends Block {
  type: BlockType.Alias;
  format: BlockAliasFormat;
}

export interface BlockCallout extends BlockWithProperties {
  type: BlockType.Callout;
  format: BlockCalloutFormat;
}

export interface BlockCollectionView extends Block {
  type: BlockType.CollectionView | BlockType.CollectionViewPage;
  view_ids: string[];
  collection_id: string;
  permissions?: Permission[];
  copied_from?: string;
  file_ids?: string[];
}
