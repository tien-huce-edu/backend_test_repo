import { Expose } from "class-transformer";

@Expose()
export class ResponsePagination {
  data: [];
  total_items: number;
  current_page: number;
  total_pages: number;
  detail: any;
}

export function handleResPagination(
  data: any,
  total_items: number,
  page: number,
  size: number,
  detail?: any
) {
  let responsePagination = new ResponsePagination();
  responsePagination.data = data;
  responsePagination.total_items = total_items;
  responsePagination.current_page = Number(page) || 0;
  responsePagination.total_pages = Math.ceil(total_items / (size || 1));
  if (detail) {
    responsePagination.detail = detail;
  }
  return responsePagination;
}
