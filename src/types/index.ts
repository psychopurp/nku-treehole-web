export interface PageQueryParams {
  page: number;
  limit: number;
}

export interface PageResponseData {
  page: number;
  limit: number;
  total: number; //每页数量limit的情况下总共有total 页
}

// list 数据返回格式
export interface QueryListResponseData<T> extends PageResponseData {
  list: T[];
}
