import { Request, Response } from 'express';
import { general } from '../../config/general';
import { IService } from './helper';
import { serviceRepository } from './repository';

class ServiceController {

    public getService= async (req: Request, res: Response): Promise<Response> =>{
        try {
            const serviceRepo=await serviceRepository.find();
            if(!serviceRepo.ok){
                return res.status(404).json({
                    code:0,
                    message: 'No hay servicio disponible en este momento.'
                });
            }
            return res.status(200).json({code:1,service:serviceRepo.data});
            
        } catch (e) {
            console.log(e.message);
        }
        return res.status(400).json({code:0,message:"Hubo un inconveniente por favor intentelo más tarde."});
    }

    public createService= async (req: Request, res: Response): Promise<Response> => {
        /** atravez de la Interface se configura lo dato permitido por el body */
        const { title,description }: IService = req.body;
        
        /**validar*/
        if(!general.validateData("string",title,1)){
           return res.status(400).json({
                code:0,
                message: 'Título es obligatorio.'
            });
        }
        if(!general.validateData("string",description,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Descripción es obligatorio.'
             });
         }
         /** end:validar */
         
         try {
            const createService=await serviceRepository.create(req.body);
            if(createService.ok){
                return res.status(201).json({code:1,message:"Se ha registrado exitosamente"});
            }
         } catch (e) {
            console.log(e.message);
         }
         return res.status(400).json({code:0,message:"Hubo un inconveniente por favor intentelo más tarde."});
    }
}
export const serviceController = new ServiceController;