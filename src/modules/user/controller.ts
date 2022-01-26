import { Request, Response } from 'express';
import { auth } from "./../../middlewares/auth";
import { general } from '../../config/general';
import { IUser } from './helper';
import { userRepository } from './repository';

class UserController {

    public create= async (req: Request, res: Response): Promise<Response> => {
        
        /** atravez de la Interface se configura lo dato permitido por el body */
        const { name,lastname,email,phone }: IUser = req.body;
        
        /**validar*/
        if(!general.validateData("string",name,1)){
           return res.status(400).json({
                code:0,
                message: '* Nombre es obligatorio.'
            });
        }

        if(!general.validateData("string",lastname,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Apellido es obligatorio.'
             });
         }

         if(!general.validateData("mail",email,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Correo es obligatorio.'
             });
         }
         if(!general.validateData("string",phone,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Teléfono es obligatorio.'
             });
         }
         /** end:validar */
         
         
         try {
            const userRepo=await userRepository.create(req.body);
            if(userRepo.ok){
                const token=await auth.generateToken({user:{
                    id:userRepo.data.id,
                    email:userRepo.data.email,
                    phone:userRepo.data.phone
                }
                    
                });
                return res.status(201).json({code:1,token:token,message:"Se ha registrado exitosamente"});
            }
         } catch (e) {
            console.log(e.message);
         }
         return res.status(400).json({code:0,message:"Hubo un inconveniente por favor intentelo más tarde."});
    }
}
export const userController = new UserController;