'use strict';

const mongoose=require('mongoose');

const foodSchema=new mongoose.Schema({
  type:{type:String,required:true},
  colories:{type:Number,required:true},
});

const foodModel=mongoose.model('food',foodSchema);

module.exports = foodModel;
