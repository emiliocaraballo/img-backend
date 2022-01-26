import { Service } from '../../database/entity/index';
import { IQueryResponse } from '../../interfaces/postgres_responses';
import { getRepository, Repository } from 'typeorm';
import { IService } from './helper';

class ServiceRepository {
    

    public findId=async(id:number): Promise<IQueryResponse>=>{
        const serviceRepo=await getRepository(Service).find({
            select:["id","description","title","created_at","updated_at"],
            where: [
                { id:id}
            ]
        });
        return {
            ok:serviceRepo.length>0,
            data:serviceRepo
        }
    }
    
    public find=async(): Promise<IQueryResponse>=>{
        const serviceRepo=await getRepository(Service).find({select:["id","description","title","created_at","updated_at"]});
        return {
            ok:serviceRepo.length>0,
            data:serviceRepo
        }
    }

    public create= async(data: IService): Promise<IQueryResponse>=>{
        const serviceRepo:Repository<Service>=getRepository(Service);
        const createService=await serviceRepo.save(
            {
                title:data.title,
                description:data.description
            }
        );
        return {
            ok:createService.id>0?true:false,
            data:createService
        }
    }
}
export const serviceRepository = new ServiceRepository;