export interface PaginateCouponDTO {
  perPage: number;
  page: number;
}

export interface FilterDTO extends PaginateCouponDTO {
  query: string;
}
