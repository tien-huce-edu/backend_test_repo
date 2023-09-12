export enum SORT {
  ASC = "ASC",
  DESC = "DESC",
}

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum ACCOUNT {
  ACTIVE = 1,
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

  DATA_MATRIX_ALREADY_EXIST: "DATA_MATRIX_ALREADY_EXIST",
  DATA_MATRIX_NOT_EXIST: "DATA_MATRIX_NOT_EXIST",
  INSERT_MATRIX_FAILED: "INSERT_MATRIX_FAILED",
  INSERT_MATRIX_SUCCESS: "INSERT_MATRIX_SUCCESS",
  UPDATE_MATRIX_FAILED: "UPDATE_MATRIX_FAILED",
  UPDATE_MATRIX_SUCCESS: "UPDATE_MATRIX_SUCCESS",
  DELETE_MATRIX_SUCCESS: "DELETE_MATRIX_SUCCESS",

  MASTER_DATA_ALREADY_EXIST: "MASTER_DATA_ALREADY_EXIST",
  MASTER_DATA_NOT_EXIST: "MASTER_DATA_NOT_EXIST",
  INSERT_MASTER_DATA_FAILED: "INSERT_MASTER_DATA_FAILED",
  INSERT_MASTER_DATA_SUCCESS: "INSERT_MASTER_DATA_SUCCESS",
  UPDATE_MASTER_DATA_FAILED: "UPDATE_MASTER_DATA_FAILED",
  UPDATE_MASTER_DATA_SUCCESS: "UPDATE_MASTER_DATA_SUCCESS",
  DELETE_MASTER_DATA_SUCCESS: "DELETE_MASTER_DATA_SUCCESS",
};

export enum KEYCACHEPATH {
  LOGIN_KEY = "auth",
}

export enum KEYCACHEAPINAME {
  LOGIN = "login",
}
