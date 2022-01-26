import request from 'supertest';

import app from '../app';

describe('GET api/service',()=>{

    it('responder con json con la lista de todos los servicios',done=>{
        request(app)
        .get('/api/service')
        .set("Accept","application/json")
        .expect('Content-Type','/json/')
        .expect(200,done());
    })
}
);

describe('POST api/service',()=>{
    it('Se creara un nuevo registro y responder con json.',done=>{
        request(app)
        .post('/api/service')
        .send({
            title:"Service Test #1",
            description:"Test#1"
        })
        .set("Accept","application/json")
        .expect('Content-Type','/json/')
        .expect(201,done());
    })
}
);