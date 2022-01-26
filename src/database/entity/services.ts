import {Entity, Column, PrimaryGeneratedColumn,OneToMany,PrimaryColumn} from 'typeorm'
import { Order } from './orders';

@Entity({name:'services'})
export class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  created_at: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  updated_at: string;
  @OneToMany(() => Order, order => order.service)
  order: Order[];
}