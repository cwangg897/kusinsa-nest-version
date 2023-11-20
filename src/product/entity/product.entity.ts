import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import { Category } from '../../category/entity/category.entity';
import { Min } from 'class-validator';

@Entity()
export class Product extends BaseModel {
  @Column()
  name: string;

  @Column({
    default: 10,
  })
  @Min(1)
  price: number;

  @Column({
    default: 10,
  })
  @Min(1)
  stock: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
