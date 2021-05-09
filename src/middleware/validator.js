'use strict';

module.exports=(req,res,next)=>{
  if(req.query && req.query.name){
    console.log('req.query.name name:',req.query.name);
    next();
  }else{
    next('not a name');
  }
};