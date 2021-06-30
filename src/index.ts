import {
  DeleteBlocksAPIResp,
  GetSpacesAPIResp,
  LoadCachedPageChunkAPIResp,
  QueryCollectionAPIResp,
  SaveTransactionAPIResp,
  SearchAPIResp,
} from "./types/APIResp";
import { APIs, callAPI } from "./scripts/api";
import {
  filterChildObjectValues,
  filterUsers,
  getAPIBodySetBlockCommand,
  getAPIBodyToRemoveBlock,
  parseID,
} from "./scripts/notionUtils";
import {
  DeleteBlocksBody,
  GetSpacesAPIBody,
  LoadCachedPageChunkBody,
  QueryCollectionBody,
  SaveTransactionBody,
  SearchBody,
} from "./types/APIBody";
import { uniqueArray } from "./scripts/commonUtils";
import { config } from "dotenv";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

config();

function removeCommonIds(inpObj) {
  const toRemove = [
    "id",
    "version",
    "created_time",
    "last_edited_time",
    "parent_id",
    "parent_table",
    "alive",
    "created_by_table",
    "created_by_id",
    "last_edited_by_table",
    "last_edited_by_id",
    "space_id",
  ];

  return Object.keys(inpObj)
    .filter((key) => !toRemove.includes(key))
    .reduce((obj, key) => {
      obj[key] = inpObj[key];
      return obj;
    }, {});
}

function renderLoadCachedPageChunkForBlocks(res: LoadCachedPageChunkAPIResp) {
  const blockObj = res.recordMap.block;
  if (!blockObj) return null;
  const blockKeys = Object.keys(blockObj);
  const blocks = blockKeys.map((key) => blockObj[key]);

  const roles = uniqueArray(blocks.map((block) => block.role));

  const types = uniqueArray(
    blocks.map((block) => {
      return {
        type: block.value.type,
        totalKeys: Object.keys(block.value).length,
      };
    }),
  );

  const formats = uniqueArray(
    blocks
      .filter((block) => block.value.format)
      .map((block) => {
        const format = block.value.format ? block.value.format : {};
        return {
          type: block.value.type,
          format,
          formatKeys: Object.keys(format),
          formatKeysLength: Object.keys(format).length,
        };
      }),
  );

  const props = uniqueArray(
    blocks
      .filter((block) => block.value.properties)
      .map((block) => {
        const prop = block.value.properties ? block.value.properties : { title: "" };
        return {
          type: block.value.type,
          prop,
          title: JSON.stringify(prop.title),
          propKeys: Object.keys(prop),
          propKeysLength: Object.keys(prop).length,
        };
      }),
  );

  const values = uniqueArray(
    blocks.map((block) => {
      return {
        value: removeCommonIds(block.value),
        valueKeys: Object.keys(block.value),
        valueKeysLength: Object.keys(block.value).length,
      };
    }),
  );

  return {
    roles,
    types,
    formats,
    values,
    props,
  };
}

function renderLoadCachedPageChunkForSpaces(res: LoadCachedPageChunkAPIResp) {
  const blockObj = res.recordMap.space;
  if (!blockObj) return null;
  const blockKeys = Object.keys(blockObj);
  const blocks = blockKeys.map((key) => blockObj[key]);
  console.log(blockObj);
}

function main() {
  (async () => {
    try {
      const getSpacesAPIResp = await callAPI<GetSpacesAPIResp, GetSpacesAPIBody>({ api: APIs.GET_SPACES });
      const users = filterUsers(getSpacesAPIResp);
      const user = users.filter((user) => user.email === process.env.EMAIL_ID1)[0];
      const blockId = parseID("d51cb254f9cf4529b8fc4d080af4cee9");

      // const collectionObj = getSpacesAPIResp[user.id].collection;
      // const collections = filterChildObjectValues(collectionObj);
      // const collectionParentId = collections[0].parent_id;
      // console.log("🚀 ~ file: index.ts ~ line 116 ~ collectionParentId", collectionParentId);

      // const cachedPageChunkResp = await callAPI<LoadCachedPageChunkAPIResp, LoadCachedPageChunkBody>({
      //   api: APIs.LOAD_CACHED_PAGE_CHUNK,
      //   userId: user.id,
      //   body: {
      //     page: {
      //       id: blockId,
      //     },
      //     cursor: { stack: [] },
      //     limit: 30,
      //     chunkNumber: 0,
      //     verticalColumns: false,
      //   },
      // });
      // const collectionViewIds = Object.keys(cachedPageChunkResp.recordMap.collection_view);
      // // console.log("🚀 ~ file: index.ts ~ line 132 ~ collectionViewIds", collectionViewIds);

      // const queryCollectionResp = await callAPI<QueryCollectionAPIResp, QueryCollectionBody>({
      //   api: APIs.QUERY_COLLECTION,
      //   userId: user.id,
      //   body: {
      //     collectionId: collections[0].id,
      //     collectionViewId: collectionViewIds[0],
      //     query: {},
      //     loader: {
      //       type: "reducer",
      //       reducers: {
      //         collection_group_results: {
      //           type: "results",
      //           limit: 50,
      //           loadContentCover: false,
      //         },
      //       },
      //       searchQuery: "",
      //       userTimeZone: "Asia/Calcutta",
      //     },
      //   },
      // });
      // console.log(queryCollectionResp);

      // const deleteBlockAPIResp = await callAPI<DeleteBlocksAPIResp, DeleteBlocksBody>({
      //   api: APIs.DELETE_BLOCKS,
      //   userId: user.id,
      //   body: {
      //     blocks: [
      //       {
      //         id: "72a0e548-352e-4911-a997-5a64d27b841a",
      //       },
      //     ],
      //     permanentlyDelete: false,
      //   },
      // });
      // console.log(deleteBlockAPIResp);

      // const searchAPIResp = await callAPI<SearchAPIResp, SearchBody>({
      //   api: APIs.SEARCH,
      //   userId: user.id,
      //   body: {
      //     type: "BlocksInSpace",
      //     query: "",
      //     filters: {
      //       isDeletedOnly: false,
      //       excludeTemplates: false,
      //       isNavigableOnly: true,
      //       requireEditPermissions: false,
      //       ancestors: [],
      //       createdBy: [],
      //       editedBy: [user.id],
      //       lastEditedTime: {},
      //       createdTime: {},
      //     },
      //     sort: "Relevance",
      //     limit: 20,
      //     spaceId: Object.keys(getSpacesAPIResp[user.id].space)[0],
      //   },
      // });
      // console.log(searchAPIResp);
      // console.log(cachedPageChunkResp.recordMap.block[blockId].value.last_edited_time);

      const spaceId = Object.keys(getSpacesAPIResp[user.id].space)[0];

      // TODO: find a way to save transactions. Currently throwing error of unsaved transactions, might be due to random uuid
      // await callAPI<SaveTransactionAPIResp, SaveTransactionBody>({
      //   api: APIs.SAVE_TRANSACTIONS,
      //   userId: user.id,
      //   body: {
      //     requestId: uuidv4(),
      //     transactions: [
      //       {
      //         id: uuidv4(),
      //         spaceId: spaceId,
      //         operations: [getAPIBodySetBlockCommand(blockId, spaceId, ["lastEditedTime"], 1625046900000)],
      //       },
      //     ],
      //   },
      // });
      // console.log(cachedPageChunkResp.recordMap.block[blockId].value.last_edited_time);
    } catch (e) {
      console.error(e);
    }
  })();
}

main();
