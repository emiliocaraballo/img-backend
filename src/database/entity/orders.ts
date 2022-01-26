import {Entity, Column, PrimaryGeneratedColumn,JoinColumn, ManyToOne} from 'typeorm'
import { User } from './users';
import { Service } from './services';
import { Technical } from './technicals';
//priority
@Entity({name:'orders'})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  subject: string;
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({name:'user'})
  user: User;
  @ManyToOne(() => Service, service => service.id)
  @JoinColumn({name:'service'})
  service: Service;
  @ManyToOne(() => Technical, technical => technical.id)
  @JoinColumn({name:'technical'})
  technical: Technical;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  created_at: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  updated_at: string;
}