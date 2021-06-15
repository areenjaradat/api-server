'use strict';

const server=require('../src/server');
require('@code-fellows/supergoose');
const superTest=require('supertest');
const serverRequest=superTest(server.app);



const clothes=require('../src/models/clothes');
const food=require('../src/models/food');
const dataCollection=require('../src/models/data-collection-class');

let id;

describe('testing server',()=>{
  it('handle not found routes',async ()=>{
    let response= await serverRequest.get('/not-found');
    expect(response.status).toEqual(404);
  });
  it('handle server error',async ()=>{
    let response= await serverRequest.get('/badRequet');
    expect(response.status).toEqual(500);
  });
  it('handle home route',async ()=>{
    let response= await serverRequest.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('i am work');
  });
  it('handle  bad method',async ()=>{
    let response= await serverRequest.post('/person');
    expect(response.status).toEqual(404);
  });

  // let spyCons;
  // let spyListen;
  // beforeEach(()=>{
  //   spyCons=jest.spyOn(console,'log').mockImplementation();
  //   spyListen=jest.spyOn(server.app,'listen');
    
  // });
  // afterEach(()=>{
  //   spyCons.mockRestore();
  //   spyListen.mockRestore();
  // });
  // it('test app.listen',()=>{
  //   const port=3000;
  //   server.start(port);
  //   expect(spyListen).toHaveBeenCalled();
  // });
  

  describe('test food API',()=>{
    it('post',async ()=>{
      let res=await serverRequest.post('/api/v1/food').send({
        type:'salad',
        colories:10,
      });
      expect(res.status).toEqual(201);
      expect(res.body.type).toEqual('salad');
      id= res.body._id;
    });
    it('get all food on GET /api/v1/food', async () => {
      const response = await serverRequest.get('/api/v1/food');
      expect(response.status).toEqual(200);
    });
    it('get a food on Get /api/v1/food/:id', async () => {
      const res = await serverRequest.get(`/api/v1/food/${id}`);
      expect(res.status).toEqual(200);
      expect(res.body.type).toEqual('salad');
      
    });
    it('update a food on PUT /api/v1/food', async () => {
      const res = await serverRequest.put(`/api/v1/food/${id}`).send({
        type:'mansaf',
        colories:1000,
      });
      expect(res.status).toEqual(200);
      expect(res.body.type).toEqual('mansaf');
      
    });
    it('delete specific food on DELETE /api/v1/food/:id', async () => {
      const res = await serverRequest.delete(`/api/v1/food/${id}`);
      expect(res.status).toEqual(202);
    });
  });

  describe('test clothes API',()=>{
    it('post',async ()=>{
      let res=await serverRequest.post('/api/v1/clothes').send({
        type:'t-shirt',
        brand:'nike',
      });
      expect(res.status).toEqual(201);
      expect(res.body.type).toEqual('t-shirt');
      id= res.body._id;
    });
    it('get all clothes on GET /api/v1/clothes', async () => {
      const response = await serverRequest.get('/api/v1/clothes');
      expect(response.status).toEqual(200);
    });
    it('get a clothes on Get /api/v1/clothes/:id', async () => {
      const res = await serverRequest.get(`/api/v1/clothes/${id}`);
      expect(res.status).toEqual(200);
      expect(res.body.type).toEqual('t-shirt');
      
    });
    it('update a clothes on PUT /api/v1/clothes', async () => {
      const res = await serverRequest.put(`/api/v1/clothes/${id}`).send({
        type:'pants',
        brand:'nike',
      });
      expect(res.status).toEqual(200);
      expect(res.body.type).toEqual('pants');
      
    });
    it('delete specific clothes on DELETE /api/v1/clothes/:id', async () => {
      const res = await serverRequest.delete(`/api/v1/clothes/${id}`);
      expect(res.status).toEqual(202);
    });
  });

});