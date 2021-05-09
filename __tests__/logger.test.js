'use strict';

let  logger=require('../src/middleware/logger');

describe('logger',()=>{
  let consoleSpy;
  let req={};
  let res={};
  let next=jest.fn();


  beforeEach(()=>{
    consoleSpy=jest.spyOn(console,'log').mockImplementation();
  });
  afterEach(()=>{
    consoleSpy.mockRestore();
  });

  it('logs',()=>{
    logger(req,res,next);
    expect(consoleSpy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

});