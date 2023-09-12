import { Expose } from "class-transformer";

@Expose()
export class ResponsePagination {
  data: [];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  detail: any;
}

export function handleResPagination(
  data: any,
  totalItems: number,
  page: number,
  size: number,
  detail?: any
) {
  let responsePagination = new ResponsePagination();
  responsePagination.data = data;
  responsePagination.totalItems = totalItems;
  responsePagination.currentPage = Number(page) || 0;
  responsePagination.totalPages = Math.ceil(totalItems / (size || 1));
  if (detail) {
    responsePagination.detail = detail;
  }
  return responsePagination;
}
