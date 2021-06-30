export interface GetSpacesAPIBody {}

export interface LoadCachedPageChunkBody {
  page: {
    id: string;
  };
  limit: number;
  cursor: { stack: [] };
  chunkNumber: number;
  verticalColumns: boolean;
}

export interface QueryCollectionBody {
  collectionId: string;
  collectionViewId: string;
  query: {};
  loader?: {
    type: "reducer";
    reducers: {
      collection_group_results: {
        type: "results";
        limit: 50;
        loadContentCover: false;
      };
    };
    searchQuery: "";
    userTimeZone: "Asia/Calcutta";
  };
}
