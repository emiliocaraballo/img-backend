import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Service } from './../entity/index';

export default class CreateService implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const service = new Service();
        service.id=1;
        service.title="Service #1";
        service.description="Pruebas";
        return await em.save(service);
    }
  }
