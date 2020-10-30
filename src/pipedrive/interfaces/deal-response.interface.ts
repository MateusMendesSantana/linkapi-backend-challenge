import { IDeal } from './deal.interface';

export interface IDealResponse {
  success: boolean;
  data?: IDeal[];
  additional_data: {
    pagination: Pagination;
  };
}

interface Pagination {
  start: number;
  limit: number;
  more_items_in_collection: boolean;
}
