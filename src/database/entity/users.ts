import {Entity, Column, PrimaryGeneratedColumn,OneToMany} from 'typeorm'
import { Order } from './orders';
@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  created_at: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  updated_at: string;
  @OneToMany(() => Order, order => order.user)
  order: Order[];
}