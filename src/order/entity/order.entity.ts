import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';
import { Product } from '../../product/entity/product.entity';

// User와 Product의 중간테이블
@Entity({
  name: 'orders',
})
export class Order extends BaseModel {
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @Column({
    name: 'total_price',
  })
  totalPrice: number;

  @Column()
  quantity: number;
}
