import { Transaction } from "./Common";

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

export interface DeleteBlocksBody {
  blocks: [
    {
      id: string;
      spaceId?: string;
    },
  ];
  permanentlyDelete: boolean;
}

export interface SearchBody {
  type: "BlocksInSpace";
  query: "";
  filters: {
    isDeletedOnly: boolean;
    excludeTemplates: boolean;
    isNavigableOnly: boolean;
    requireEditPermissions: boolean;
    ancestors: string[];
    createdBy: string[];
    editedBy: string[];
    lastEditedTime: any;
    createdTime: any;
  };
  sort: string;
  limit: number;
  spaceId: string;
  source?: string;
}

export interface SaveTransactionBody {
  requestId: string;
  transactions: Transaction[];
}
