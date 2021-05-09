'use strict';

class ModelCollection{
  constructor(model){
    this.model=model;
  }

  get(_id){
    if(_id){
      return this.model.findById(_id);
    }else{
      return this.model.find({});
    }
  }
  getBy(obj) {
    return this.model.find(obj);
  }

  create(obj) {
    let newRecord = new this.model(obj);
    newRecord.save();
    return newRecord;
  }

  update(_id, obj) {
    return this.model.findByIdAndUpdate(_id, obj, {new:true});
  }

  delete(_id) {
    try{return this.model.findByIdAndDelete(_id);}
    catch(err){console.log('areee');}
    
  }
}

module.exports = ModelCollection;