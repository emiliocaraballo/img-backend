import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Technical } from '../entity/index';

export default class CreateTechnical implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const technical = new Technical();
        technical.id=1;
        technical.names="Emilio Fernando Caraballo Dueñas";
        technical.phone="3042334893";
        technical.email="emiliocaraballo9810@gmail.com";
        await em.save(technical);

        const technical2 = new Technical();
        technical2.id=2;
        technical2.names="Brayan";
        technical2.phone="3042334893";
        technical2.email="brayan@gmail.com";
        await em.save(technical2);


        const technical3 = new Technical();
        technical3.id=3;
        technical3.names="Gabriel";
        technical3.phone="3042334893";
        technical3.email="brayan@gmail.com";

        return await em.save(technical3);
    }
  }