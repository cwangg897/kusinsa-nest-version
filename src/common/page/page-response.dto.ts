export class Page<T> {
  pageSize: number;
  totalCount: number;
  totalPage: number; // 전체 개수/페이지 크기
  items: T[];
  constructor(totalCount: number, pageSize: number, items: T[]) {
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.items = items;
  }
}
