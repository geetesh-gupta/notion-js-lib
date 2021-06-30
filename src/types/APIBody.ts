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
