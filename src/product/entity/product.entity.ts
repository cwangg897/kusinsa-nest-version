import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import { Category } from '../../category/entity/category.entity';

@Entity()
export class Product extends BaseModel {
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;
}
