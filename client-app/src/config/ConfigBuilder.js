import { ApiURL } from "./config.json";

export const GetApiUrl =
  process.env.NODE_ENV === "development"
    ? ApiURL.developmentAPI
    : ApiURL.productionAPI;
//
