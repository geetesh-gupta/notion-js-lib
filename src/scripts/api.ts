import * as dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export enum APIs {
  BASE_URL = "https://www.notion.so/api/v3",
  GET_SPACES = "/getSpaces",
  LOAD_CACHED_PAGE_CHUNK = "/loadCachedPageChunk",
}

export function getRequestOptions(token: string, userId: string = "") {
  const myHeaders = new fetch.Headers();
  myHeaders.append("content-type", "application/json");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59",
  );
  myHeaders.append("Cookie", `token_v2=${token};`);
  myHeaders.append("x-notion-active-user-header", `${userId}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  return requestOptions;
}

export function callAPI<T, U>({ api, userId, body }: { api; userId?: string; body?: U } = { api: "" }) {
  const token = process.env.NOTION_TOKEN || "";
  const requestOptions = getRequestOptions(token, userId);
  // if (body) requestOptions.body = JSON.stringify(body);
  const options = body ? { ...requestOptions, body: JSON.stringify(body) } : requestOptions;

  return new Promise<T>((resolve, reject) => {
    fetch(APIs.BASE_URL + api, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.errorId || (res.object && res.object === "error")) {
          // console.error(res);
          reject(res);
        } else resolve(res);
      })
      .catch((error) => {
        // console.log("error", error);
        // console.error(error);
        reject(error);
      });
  });
}
