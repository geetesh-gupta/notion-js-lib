import { Block } from "./Blocks";
import { Child, ChildObject, Cursor, Result } from "./Common";
import { NotionUser, UserRoot, UserSettings } from "./Objects";
import { Collection, CollectionView } from "./Collections";
import { Space, SpaceView } from "./Spaces";

export type GetSpacesAPIResp = Child<GetSpaceAPIRespChild>;

export interface SearchAPIResp {
  results: {
    id: string;
    isNavigable: boolean;
    score: number;
  };
  total: number;
  recordMap?: {
    block: ChildObject<Block>;
    space?: ChildObject<Space>;
    collection_view?: ChildObject<CollectionView>;
    collection?: ChildObject<Collection>;
  };
}

export interface DeleteBlocksAPIResp {
  recordMap: DeleteBlocksRecordMap;
  cursor: Cursor;
}

export interface LoadCachedPageChunkAPIResp {
  recordMap: CollectionRecordMap;
  cursor: Cursor;
}

export interface GetUserSharedPageInSpaceAPIResp {
  pages: string[];
  recordMap: RecordMap;
}

export interface QueryCollectionAPIResp {
  result: Result;
  recordMap: CollectionRecordMap;
}

export type GetSpaceAPIRespChild = {
  notion_user: ChildObject<NotionUser>;
  user_root: ChildObject<UserRoot>;
  user_settings: ChildObject<UserSettings>;
  space_view: ChildObject<SpaceView>;
  space: ChildObject<Space>;
  block: ChildObject<Block>;
  collection: ChildObject<Collection>;
};

export interface DeleteBlocksRecordMap {
  block: ChildObject<Block>;
}

export interface RecordMap {
  block: ChildObject<Block>;
  space: ChildObject<Space>;
}

export type CollectionRecordMap = RecordMap & {
  collection_view: ChildObject<CollectionView>;
  collection: ChildObject<Collection>;
};
