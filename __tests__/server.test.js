'use strict';

const server=require('../src/server');

const superTest=require('supertest');
const serverRequest=superTest(server.app);

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

  let spyCons;
  let spyListen;
  beforeEach(()=>{
    spyCons=jest.spyOn(console,'log').mockImplementation();
    spyListen=jest.spyOn(server.app,'listen');
    
  });
  afterEach(()=>{
    spyCons.mockRestore();
    spyListen.mockRestore();
  });
  it('test app.listen',()=>{
    const port=3000;
    server.start(port);
    expect(spyListen).toHaveBeenCalled();
  });
  

  describe('test food API',()=>{
    it('post',async ()=>{
      let res=await serverRequest.post('/food').send({
        food:'salad',
      });
      expect(res.status).toEqual(201);
      expect(res.body.record.food).toEqual('salad');
      id= res.body.id;
    });
    it('get all food on GET /food', async () => {
      const response = await serverRequest.get('/food');
      expect(response.status).toEqual(200);
    });
    it('get a food on Get /food/:id', async () => {
      const res = await serverRequest.get(`/food/${id}`);
      expect(res.status).toEqual(200);
      expect(res.body.record.food).toEqual('salad');
      
    });
    it('update a food on PUT /food', async () => {
      const res = await serverRequest.put(`/food/${id}`).send({
        food:'mansaf',
      });
      expect(res.status).toEqual(200);
      expect(res.body.record.food).toEqual('mansaf');
      
    });
    it('delete specific food on DELETE /food/:id', async () => {
      const res = await serverRequest.delete(`/food/${id}`);
      expect(res.status).toEqual(202);
      expect(res.body).toEqual({
        msg: 'Item is deleted',
        deleted: true,
      });
    });
    it('delete not found clothes on food /food/:id', async () => {
      const res = await serverRequest.delete(`/food/10`);
      expect(res.status).toEqual(204);
      expect(res.body).toEqual({
       
      });
    });
  });

  describe('test clothes API',()=>{
    it('post',async ()=>{
      let res=await serverRequest.post('/clothes').send({
        clothes:'t-shirt',
      });
      expect(res.status).toEqual(201);
      expect(res.body.record.clothes).toEqual('t-shirt');
      id= res.body.id;
    });
    it('get all clothes on GET /clothes', async () => {
      const response = await serverRequest.get('/clothes');
      expect(response.status).toEqual(200);
    });
    it('get a clothes on Get /clothes/:id', async () => {
      const res = await serverRequest.get(`/clothes/${id}`);
      expect(res.status).toEqual(200);
      expect(res.body.record.clothes).toEqual('t-shirt');
      
    });
    it('update a clothes on PUT /clothes', async () => {
      const res = await serverRequest.put(`/clothes/${id}`).send({
        clothes:'pants',
      });
      expect(res.status).toEqual(200);
      expect(res.body.record.clothes).toEqual('pants');
      
    });
    it('delete specific clothes on DELETE /clothes/:id', async () => {
      const res = await serverRequest.delete(`/clothes/${id}`);
      expect(res.status).toEqual(202);
      expect(res.body).toEqual({
        msg: 'Item is deleted',
        deleted: true,
      });
    });
    it('delete not found clothes on DELETE /clothes/:id', async () => {
      const res = await serverRequest.delete(`/clothes/10`);
      expect(res.status).toEqual(204);
      expect(res.body).toEqual({
       
      });
    });
  });

});