import {Column, Entity, OneToMany} from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import {Product} from '../../product/entity/product.entity';

@Entity()
export class Category extends BaseModel {
  @Column()
  name: string;

  // 2번째는 상대편에서 어떻게 참조할것인지
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
