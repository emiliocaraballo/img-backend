import { Order,Technical,User } from '../../database/entity/index';
import { IQueryResponse } from '../../interfaces/postgres_responses';
import { getRepository, Repository } from 'typeorm';
import { IOrder } from './helper';

class OrderRepository {

    public create= async(data: IOrder,user_id:number): Promise<IQueryResponse>=>{

        var technicalRepo:Repository<Technical>=getRepository(Technical);
        var usetechnical=await technicalRepo.query("SELECT * FROM technicals ORDER by RANDOM() LIMIT 1");

        const userId=await getRepository(User).findOne(user_id);
        const technicalId=await getRepository(User).findOne(data.service);
        
        const orderRepo:Repository<Order>=getRepository(Order);
        

        const createOrder=await orderRepo.save(
            {
                user:userId,
                service:technicalId,
                technical:usetechnical[0],
                subject:data.subject
            }
        );
        return {
            ok:createOrder.id>0?true:false,
            data:createOrder
        }
    }
}
export const orderRepository = new OrderRepository;