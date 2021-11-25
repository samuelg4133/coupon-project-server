export interface PaginateCouponDTO {
  perPage: number;
  page: number;
}

export interface PaginateAndFilterDTO extends PaginateCouponDTO {
  query: string;
}
