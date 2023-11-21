import { IsNumber, IsOptional } from 'class-validator';

export class ProductPaginationDto {
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  take?: number = 10;

  // skip은 넘어갈거
  getSkip() {
    return (this.page - 1) * this.take || 0;
  }
  getPage() {
    return this.page;
  }


  // limit 가져올 페이지
  getTake() {
    return this.take;
  }
}
