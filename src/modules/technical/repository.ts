import { Technical,Order } from '../../database/entity/index';
import { IQueryResponse } from '../../interfaces/postgres_responses';
import { getRepository, Repository } from 'typeorm';
import { ITechnical } from './helper';

class TechnicalRepository {

    public getTechicalOrder= async(): Promise<IQueryResponse>=>{
        var arreglo:any[]=[];
        const data=await getRepository(Technical).find({});

        await Promise.all(data.map(async (item) => {
        
            // ordenes relacionada a Asesor.
          const order= await getRepository(Order).find({
                where: {
                    technical: item.id
                },
                relations: ['service', 'user']
            });

            arreglo.push({
                id:item.id,
                names:item.names,
                phone:item.phone,
                email:item.email,
                created_at:item.created_at,
                updated_at:item.updated_at,
                order:order
            });
            
          }));
        
        return {
            ok:data.length>0,
            data:arreglo
        }
    }

    public create= async(data: ITechnical): Promise<IQueryResponse>=>{

        const technicalRepo:Repository<Technical>=getRepository(Technical);
        const createTechnical=await technicalRepo.save(
            {
                names:data.names,
                email:data.email,
                phone:data.phone
            }
        );
        return {
            ok:createTechnical.id>0?true:false,
            data:createTechnical
        }
    }
}
export const technicalRepository = new TechnicalRepository;