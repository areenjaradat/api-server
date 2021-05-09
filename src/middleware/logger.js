'use strict';

module.exports=(req,res,next)=>{
  console.log('in loger>>> path: ',req.path,' method: ',req.method);
  next();
};