import request from 'supertest';
import app from '../app';

describe('POST api/technical',()=>{
    it('Se creara un nuevo registro y responder con json.',done=>{
        request(app)
        .post('/api/technical')
        .send({
            names:"Emilio Caraballo",
            phone:"3042334893",
            email:"emiliocaraballo9810@gmail.com"
        })
        .set("Accept","application/json")
        .expect('Content-Type','/json/')
        .expect(201,done());
    })
}
);

describe('GET api/technical/orders',()=>{
    it('responder con json con la lista de todos los ordenes de tecnico.',done=>{
        request(app)
        .get('/api/technical/orders')
        .set("Accept","application/json")
        .expect('Content-Type','/json/')
        .expect(200,done());
    })
}
);