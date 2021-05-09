'use strict';

const mongoose=require('mongoose');

const clothesSchema=new mongoose.Schema({
  type:{type:String,required:true},
  brand:{type:String,required:true},
});
const clothesModel=mongoose.model('clothes',clothesSchema);
module.exports = clothesModel;