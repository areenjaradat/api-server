'use strict';

const express=require('express');
const cors=require('cors');
const errorHandler=require('./handlers/500');
const notFoundHandler=require('./handlers/404');

const logger=require('./middleware/logger');
// const validator = require('./middleware/validator');
const clothes=require('./routes/clothes');
const food=require('./routes/food');

const app=express();

//Global middleware
app.use(logger);
app.use(express.json());
app.use(cors);

app.use('/api/v1',clothes);
app.use('/api/v1',food);

//add routes 
app.get('/',(request,response)=>{
  console.log('i am work');
  response.status(200).send('i am work');
});


app.get('/badRequet',(req,res)=>{
  throw new Error('manual error');
});

//handler Middlewares
app.use('*',notFoundHandler);
app.use(errorHandler);

function start(PORT){
  app.listen(PORT,()=>{
    console.log(`App is Runnning on ${PORT}`);
  });
}

module.exports={
  app:app,
  start:start,
};