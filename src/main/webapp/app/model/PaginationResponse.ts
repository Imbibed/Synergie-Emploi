export class PaginationResponse<T> {
  content: T[] | undefined;
  totalElements: number | undefined;
  totalPages: number | undefined;
  size: number | undefined;
  pageIndex: number | undefined;
}
