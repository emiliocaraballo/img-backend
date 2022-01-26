import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Order,User,Technical,Service } from './../entity/index';

export default class CreateOrder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const order = new Order();
        order.id=1;
        order.subject="Pruebas";

        // guardar el usuario
        const userId=await em.getRepository(User).findOne(1);
        const user = new User();
        user.id=Number(userId?.id);
        order.user=user;

        // guardar el asesor
        const technicalId=await em.getRepository(Technical).findOne(1);
        const technica = new Technical();
        technica.id=Number(technicalId?.id);
        order.technical=technica;


        const servicelId=await em.getRepository(Service).findOne(1);
        const service = new Service();
        service.id=Number(servicelId?.id);
        order.service=service;
        
        
        return await em.save(order);
    }
  }
