export interface PaginatedResponse<T> {
  content: T;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}
