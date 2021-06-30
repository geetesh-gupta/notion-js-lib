import { Block } from "./Blocks";
import { Child, ChildObject, Cursor, Result } from "./Common";
import { NotionUser, UserRoot, UserSettings, Collection, CollectionView } from "./Collections";
import { Space, SpaceView } from "./Spaces";

export type GetSpacesAPIResp = Child<{
  notion_user: ChildObject<NotionUser>;
  user_root: ChildObject<UserRoot>;
  user_settings: ChildObject<UserSettings>;
  space_view: ChildObject<SpaceView>;
  space: ChildObject<Space>;
  block: ChildObject<Block>;
  collection: ChildObject<Collection>;
}>;

export interface RecordMap {
  block: ChildObject<Block>;
  space: ChildObject<Space>;
}

export type CachedPageChunkRecordMap = RecordMap & {
  collection_view: ChildObject<CollectionView>;
  collection: ChildObject<Collection>;
};

export interface GetUserSharedPageInSpaceAPIResp {
  pages: string[];
  recordMap: RecordMap;
}

export interface LoadCachedPageChunkAPIResp {
  recordMap: CachedPageChunkRecordMap;
  cursor: Cursor;
}

export interface QueryCollection {
  result: Result;
  recordMap: RecordMap;
}
