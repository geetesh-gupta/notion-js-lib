import { CollectionRecordMap } from "../types/APIResp";
import { GetSpacesAPIResp, RecordMap } from "../types/APIResp";
import { Child, ChildObject, TxnOperation } from "../types/Common";
import { Table, TxnOperationCommands } from "../types/Enums";

export function parseID(id: string) {
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

export function filterUsers(resObj: GetSpacesAPIResp) {
  const userIds = Object.keys(resObj);
  const users = userIds.map((id) => resObj[id].notion_user[id].value);
  return users;
}

export function filterBlocksFromRecordMap(resObj: RecordMap | CollectionRecordMap) {
  const userIds = Object.keys(resObj);
  const users = userIds.map((id) => resObj[id].notion_user[id].value);
  return users;
}

export function filterChildValues<T>(child: Child<T>) {
  return Object.keys(child).map((key) => child[key]);
}

export function filterChildObjectValues<T>(childObj: ChildObject<T>) {
  return Object.keys(childObj).map((key) => childObj[key].value);
}

export function getAPIBodyListRemoveCommand(blockId, spaceId, path) {
  return {
    pointer: {
      table: Table.Space,
      id: spaceId,
    },
    path,
    command: TxnOperationCommands.ListRemove,
    args: {
      id: blockId,
    },
  };
}

export function getAPIBodyUpdateBlockCommand(blockId, spaceId, args) {
  return {
    pointer: {
      table: Table.Block,
      id: blockId,
      spaceId: spaceId,
    },
    path: [],
    command: TxnOperationCommands.Update,
    args,
  };
}

export function getAPIBodySetBlockCommand(blockId, spaceId, path, args) {
  return {
    pointer: {
      table: Table.Block,
      id: blockId,
      spaceId: spaceId,
    },
    path,
    command: TxnOperationCommands.Set,
    args,
  };
}

export function getAPIBodyToRemoveBlock(blockId, spaceId, lastEditedTime): TxnOperation[] {
  return [
    getAPIBodyUpdateBlockCommand(blockId, spaceId, { alive: false }),
    getAPIBodyListRemoveCommand(blockId, spaceId, ["pages"]),
    getAPIBodySetBlockCommand(blockId, spaceId, ["last_edited_time"], lastEditedTime),
  ];
}
