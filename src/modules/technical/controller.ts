import { Request, Response } from 'express';
import { general } from '../../config/general';
import { ITechnical } from './helper';
import { technicalRepository } from './repository';

class TechnicalController {

    public getTechnicalOrder= async (req: Request, res: Response): Promise<Response> =>{
        try {
            const data=await technicalRepository.getTechicalOrder();
            if(data.ok){
                return res.status(200).json({code:1,data:data.data,message:""});
            }else{
                return res.status(404).json({code:0,message:"No hay Ordenes Asignadas."});
            }
        } catch (error) {
            
        }
        return res.status(400).json({code:0,message:"Hubo un inconveniente por favor intentelo más tarde."});
    }

    public createTechnical= async (req: Request, res: Response): Promise<Response> => {
        
        /** atravez de la Interface se configura lo dato permitido por el body */
        const { names,email,phone }: ITechnical = req.body;
        
        /**validar*/
        if(!general.validateData("string",names,1)){
           return res.status(400).json({
                code:0,
                message: '* Nombre completo es obligatorio.'
            });
        }
         if(!general.validateData("mail",email,1)){
            return res.status(400).json({
                 code:0,
                 message: '* Email es obligatorio.'
             });
         }
         if(!general.validateData("string",phone,1)){
            return res.status(400).json({
                 code:0,
                 message: '* Teléfono es obligatorio.'
             });
         }
         /** end:validar */
         
         
         try {
            const technicalRepo=await technicalRepository.create(req.body);
            if(technicalRepo.ok){
                return res.status(201).json({code:1,message:"Se ha registrado exitosamente"});
            }
         } catch (e) {
            console.log(e.message);
         }
         return res.status(400).json({code:0,message:"Hubo un inconveniente por favor intentelo más tarde."});
    }
}
export const technicalController = new TechnicalController;