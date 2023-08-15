export enum SORT {
  ASC = "ASC",
  DESC = "DESC",
}

export const ARR_HEADER_REQUEST = [
  { name: "page", description: "1" },
  { name: "size", description: "20" },
  { name: "active", description: "id" },
  { name: "direction", description: "ASC" },
];

export const MESSAGE = {
  INVALID_LOGIN_NAME_OR_PASSWORD: "INVALID_LOGIN_NAME_OR_PASSWORD",
  ACCOUNT_NOT_ACTIVE: "ACCOUNT_NOT_ACTIVE",
  SERVER_ERROR: "SERVER_ERROR",
  SIGNED: "SIGNED",
  USER_NOT_EXIST: "USER_NOT_EXIST",
  TOKEN_ERROR: "TOKEN_ERROR",
  EMAIL_NOT_FOUND: "EMAIL_NOT_FOUND",
  ACCOUNT_EMAIL_NOT_FOUND: "ACCOUNT_EMAIL_NOT_FOUND",
  PERSONNEL_NOT_ACTIVE: "PERSONNEL_NOT_ACTIVE",
};

export enum KEYCACHEPATH {
  LOGIN_KEY = "auth",
}

export enum KEYCACHEAPINAME {
  LOGIN = "login",
}
