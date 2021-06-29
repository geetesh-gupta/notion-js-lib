import * as dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export enum APIs {
  BASE_URL = "https://www.notion.so/api/v3",
  GET_SPACES = "/getSpaces",
}

export function getRequestOptions(token: string) {
  const myHeaders = new fetch.Headers();
  myHeaders.append("content-type", "application/json");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59",
  );
  myHeaders.append("Cookie", `token_v2=${token};`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  return requestOptions;
}

export function callAPI(api = "") {
  const token = process.env.NOTION_TOKEN || "";
  const requestOptions = getRequestOptions(token);

  return fetch(APIs.BASE_URL + api, requestOptions)
    .then((res) => res.json())
    .catch((error) => console.log("error", error));
}
