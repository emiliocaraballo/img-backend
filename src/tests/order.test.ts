import request from 'supertest';
import app from '../app';

describe('POST api/order',()=>{
    it('Se creara un nuevo registro y responder con json.',done=>{
        request(app)
        .post('/api/order')
        .send({
            name:"Emilio Fernando",
            lastname:"Caraballo dueñas",
            email:"emiliocaraballo9810@gmail.com",
            phone:"3017205180",
            service:1,
            subject:"Test #1"
        })
        .set("Accept","application/json")
        .expect('Content-Type','/json/')
        .expect(201,done());
    })
}
);