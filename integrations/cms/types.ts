export interface WixDataItem {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  [key: string]: any;
}

export interface WixDataQueryResult<T = WixDataItem> {
  items: T[];
  totalCount: number;
  length: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: () => boolean;
  hasPrev: () => boolean;
  next: () => Promise<WixDataQueryResult<T>>;
  prev: () => Promise<WixDataQueryResult<T>>;
}
