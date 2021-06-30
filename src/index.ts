import { GetSpacesAPIResp, LoadCachedPageChunkAPIResp, QueryCollectionAPIResp } from "./types/APIResp";
import { APIs, callAPI } from "./scripts/api";
import { filterChildObjectValues, filterUsers, parseID } from "./scripts/notionUtils";
import { GetSpacesAPIBody, LoadCachedPageChunkBody, QueryCollectionBody } from "./types/APIBody";
import { uniqueArray } from "./scripts/commonUtils";
import { config } from "dotenv";
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

      const collectionObj = getSpacesAPIResp[user.id].collection;
      const collections = filterChildObjectValues(collectionObj);
      const collectionParentId = collections[0].parent_id;
      console.log("🚀 ~ file: index.ts ~ line 116 ~ collectionParentId", collectionParentId);

      const cachedPageChunkResp = await callAPI<LoadCachedPageChunkAPIResp, LoadCachedPageChunkBody>({
        api: APIs.LOAD_CACHED_PAGE_CHUNK,
        userId: user.id,
        body: {
          page: {
            id: collectionParentId,
          },
          cursor: { stack: [] },
          limit: 30,
          chunkNumber: 0,
          verticalColumns: false,
        },
      });
      const collectionViewIds = Object.keys(cachedPageChunkResp.recordMap.collection_view);
      console.log("🚀 ~ file: index.ts ~ line 132 ~ collectionViewIds", collectionViewIds);

      const queryCollectionResp = await callAPI<QueryCollectionAPIResp, QueryCollectionBody>({
        api: APIs.QUERY_COLLECTION,
        userId: user.id,
        body: {
          collectionId: collections[0].id,
          collectionViewId: collectionViewIds[0],
          query: {},
          loader: {
            type: "reducer",
            reducers: {
              collection_group_results: {
                type: "results",
                limit: 50,
                loadContentCover: false,
              },
            },
            searchQuery: "",
            userTimeZone: "Asia/Calcutta",
          },
        },
      });
      console.log(queryCollectionResp);
    } catch (e) {
      console.error(e);
    }
  })();
}

main();
