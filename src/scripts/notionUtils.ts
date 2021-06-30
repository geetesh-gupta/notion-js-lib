import { CachedPageChunkRecordMap } from "../types/APIResp";
import { GetSpacesAPIResp, RecordMap } from "../types/APIResp";

export function parseID(id: string) {
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

export function filterUsers(resObj: GetSpacesAPIResp) {
  const userIds = Object.keys(resObj);
  const users = userIds.map((id) => resObj[id].notion_user[id].value);
  return users;
}

export function filterBlocksFromRecordMap(resObj: RecordMap | CachedPageChunkRecordMap) {
  const userIds = Object.keys(resObj);
  const users = userIds.map((id) => resObj[id].notion_user[id].value);
  return users;
}
