import { User } from '../../database/entity/index';
import { IQueryResponse } from '../../interfaces/postgres_responses';
import { getRepository, Repository } from 'typeorm';
import { IUser } from './helper';

class UserRepository {

    public create= async(data: IUser): Promise<IQueryResponse>=>{

        const technicalRepo:Repository<User>=getRepository(User);
        const createUser=await technicalRepo.save(
            {
                name:data.name,
                lastname:data.lastname,
                email:data.email,
                phone:data.phone
            }
        );
        return {
            ok:createUser.id>0?true:false,
            data:createUser
        }
    }
}
export const userRepository = new UserRepository;