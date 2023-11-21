import {Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { UserRole } from '../enum/roles.enum';
import { BaseModel } from '../../common/entity/base.entity';
import {IsEmail, IsString, MaxLength, Min, MinLength} from 'class-validator';
import {Exclude} from 'class-transformer';

@Entity()
export class User extends BaseModel {
  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
