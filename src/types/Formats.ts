import { CollectionPageProperty, GalleryCover, ListProperty, Pointer, TableProperty } from "./Common";

export interface BlockFormat {
  page_cover?: string;
  page_cover_position?: number;
  page_icon?: string;
  page_full_width?: boolean;
  page_small_text?: boolean;
  block_locked?: boolean;
  block_locked_by?: string;
  copied_from_pointer: Pointer;
}

export interface BlockAliasFormat {
  alias_pointer: Pointer;
}
export interface BlockCalloutFormat {
  block_color: string;
  page_icon: string;
}

export interface CollectionFormat {
  collection_pointer?: Pointer;
  collection_cover_position?: number;
  collection_page_properties?: CollectionPageProperty[];
  copied_from_pointer: Pointer;
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
