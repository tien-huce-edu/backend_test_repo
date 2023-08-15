export enum SORT {
  ASC = "ASC",
  DESC = "DESC",
}

export const ARR_HEADER_REQUEST = [
  { name: "page", description: "1" },
  { name: "size", description: "20" },
  { name: "sort", description: "id" },
  { name: "direction", description: "ASC" },
];

export const MESSAGE = {
  INVALID_LOGIN_NAME_OR_PASSWORD: "INVALID_LOGIN_NAME_OR_PASSWORD",
  ACCOUNT_NOT_ACTIVE: "ACCOUNT_NOT_ACTIVE",
  SERVER_ERROR: "SERVER_ERROR",
  SIGNED: "SIGNED",
  USER_NOT_EXIST: "USER_NOT_EXIST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  USRENAME_ALREADY_USE: "USRENAME_ALREADY_USE",
  ACCOUNT_UPDATE_ERROR: "ACCOUNT_UPDATE_ERROR",
  ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
  ROLE_NOT_FOUND: "ROLE_NOT_FOUND",
};

export enum KEYCACHEPATH {
  LOGIN_KEY = "auth",
}

export enum KEYCACHEAPINAME {
  LOGIN = "login",
}