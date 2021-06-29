import { CollectionPageProperty, Format, GalleryCover, ListProperty, Pointer, TableProperty } from "./Common";

export interface CollectionFormat extends Format {
  collection_pointer?: Pointer;
  collection_cover_position?: number;
  collection_page_properties?: CollectionPageProperty[];
}

export interface BlockFormat extends Format {
  block_locked?: boolean;
  block_locked_by?: string;
}

export interface BlockPageFormat extends Format {
  page_cover?: string;
  page_cover_position?: number;
  page_icon?: string;
  page_full_width?: boolean;
  page_small_text?: boolean;
  block_locked?: boolean;
  block_locked_by?: string;
}

export interface BlockCollectionViewPageFormat extends Format {
  block_locked?: boolean;
  block_locked_by?: string;
  collection_pointer: Pointer;
  page_cover_position?: number;
}

export interface CollectionViewListFormat {
  list_properties: ListProperty[];
  table_properties: TableProperty[];
}

export interface CollectionViewTableFormat {
  table_wrap: boolean;
  table_properties: TableProperty[];
}

export interface CollectionViewGalleryFormat {
  gallery_cover: GalleryCover;
  table_properties: TableProperty[];
  gallery_cover_size: string;
  gallery_properties: ListProperty[];
  gallery_cover_aspect: string;
}
