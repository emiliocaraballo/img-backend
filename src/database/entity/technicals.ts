import {Entity, Column, PrimaryGeneratedColumn,OneToMany} from 'typeorm'
import { Order } from './orders';

@Entity({name:'technicals'})
export class Technical {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  names: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  created_at: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  updated_at: string;
  @OneToMany(() => Order, order => order.technical)
  order: Order[];
}