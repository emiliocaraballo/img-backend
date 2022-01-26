import { Request, Response } from 'express';
import { auth } from "./../../middlewares/auth";
import { general } from '../../config/general';
import { serviceRepository } from './../service/repository';
import { IOrder } from './helper';
import { orderRepository } from "./repository";

class OrderController {
   
    public createOrder= async (req: Request, res: Response): Promise<Response> => {
        
        /** atravez de la Interface se configura lo dato permitido por el body */
        const { service,subject,request,priority }: IOrder = req.body;
        
        // id de usuario que envia desde Autorizacion(Token)
        var user_id=req.body.token.data.user.id;

        /**validar*/
         if(!general.validateData("number",service,1) && !general.validateData("string",request,1)){
            return res.status(400).json({
                 code:0,
                 message: 'El tipo de solicitud es obligatorio.'
             });
         }

        //  if(!general.validateData("string",priority,1)){
        //     return res.status(400).json({
        //         code:0,
        //         message: 'Prioridad es obligatorio.'
        //     });
        //  }
         
         
         

         if(!general.validateData("string",subject,1)){
            return res.status(400).json({
                code:0,
                message: 'El Asunto es obligatorio.'
            });
         }

         /** end:validar */
         
         
         try {
            
            // si no existe ese Servicio devuelve code 0 y estado 400
            const validateService=await serviceRepository.findId(service);
            if(!validateService.ok){
                return res.status(400).json({
                    code:0,
                    message: 'El tipo de servicio es invalido.'
                });
            }

            
            const createOrder=await orderRepository.create(req.body,user_id);
            if(createOrder.ok){
                const token=await auth.generateToken({
                    ticket:createOrder.data.id,
                    user:user_id
                });
                return res.status(201).json({
                    code:1,
                    order:createOrder.data.id,
                    token:token,
                    message:"Se ha registrado correctamente su número de ticket es "+createOrder.data.id
                });
            }
         } catch (e) {
            console.log(e.message);
         }
        return res.status(400).json({code:0,message:"Hubo un inconveniente por favor intentelo más tarde."});
    }
}
export const orderController = new OrderController;