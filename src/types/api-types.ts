/** Common API response types matching backend DTOs. */

/** Paged response matching backend PagedResponse<T> record. */
export interface PagedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNext: boolean;
}

/** Common pagination params for list endpoints. */
export interface ListParams {
  page?: number;
  pageSize?: number;
}

/** Error response from backend Results.BadRequest / Results.NotFound. */
export interface ApiErrorResponse {
  errors: string[];
}
