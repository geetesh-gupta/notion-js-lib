import { Pointer, Query2 } from "./Common";
import { Table } from "./Enums";
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
  description: Array<Array<Array<string[]> | string>>;
  schema: { [key: string]: CollectionSchema };
  icon: string;
  cover: string;
  format: CollectionFormat;
  parent_id: string;
  parent_table: Table;
  alive: boolean;
  file_ids: string[];
  copied_from: string;
  migrated: boolean;
  space_id: string;
}

export interface CollectionSchema {
  name: string;
  type: string;
}

export interface CollectionViewList {
  id: string;
  version: number;
  type: "list";
  name: string;
  format: CollectionViewListFormat;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  page_sort: string[];
  space_id: string;
}

export interface CollectionViewTable {
  id: string;
  version: number;
  type: "table";
  name: string;
  format: CollectionViewTableFormat;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  page_sort: string[];
  query2: Query2;
  space_id: string;
}

export interface CollectionViewGallery {
  id: string;
  version: number;
  type: "gallery";
  name: string;
  format: CollectionViewGalleryFormat;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  page_sort: string[];
  space_id: string;
}

export type CollectionView = CollectionViewTable | CollectionViewGallery | CollectionViewList;

export interface NotionUser {
  id: string;
  version: number;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string;
  onboarding_completed: boolean;
}

export interface UserSettings {
  id: string;
  version: number;
  settings: Settings;
}

export interface UserRoot {
  id: string;
  version: number;
  space_views: string[];
  space_view_pointers: Pointer[];
}
export interface PublicPageData {
  spaceName: string;
  spaceId: string;
  spaceDomain: string;
  canJoinSpace: boolean;
  icon: string;
  userHasExplicitAccess: boolean;
  ownerUserId: string;
  betaEnabled: boolean;
  canRequestAccess: boolean;
  requireLogin: boolean;
  publicAccessRole: string;
}

export interface Settings {
  type: string;
  locale: string;
  persona: string;
  team_role: string;
  time_zone: string;
  signup_time: number;
  preferred_locale: string;
  used_windows_app: boolean;
  used_desktop_web_app: boolean;
  preferred_locale_origin: string;
}

// To parse types from js
// copy(JSON.parse(JSON.stringify(a)))
// https://app.quicktype.io/
