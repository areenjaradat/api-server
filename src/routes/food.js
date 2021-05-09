'use strict';

const express = require('express');
const router = express.Router();

const Food=require('../models/data-collection-class');
// class
const foodModel = require('../models/food');
//new obj from the class
const foodInstance = new Food(foodModel); 


router.get('/food', getfood);
router.get('/food/:id', getOnefood);
router.post('/food', createfood);
router.put('/food/:id', updatefood);
router.delete('/food/:id', deletefood);


async function getfood(req, res) {
  // get all items
  let items =await foodInstance.get();
  res.status(200).json(items);
}

async function getOnefood(req, res) {
  let id = req.params.id; // from the url its a string
  let oneItem =await foodInstance.get(id);
  res.status(200).json(oneItem);
}

async function createfood(req, res) {
  // use create Method from the class
  let obj = req.body;
  let newItem =await foodInstance.create(obj);
  res.status(201).json(newItem);
}

async function updatefood(req, res) {
  let id = req.params.id;
  const obj = req.body;
  let updatedfood =await foodInstance.update(id, obj);
  res.status(200).json(updatedfood);
}

async function deletefood(req, res) {
  let id = req.params.id;
  let deleted =await foodInstance.delete(id);
  let msg = deleted ? 'Item is deleted': 'Item was not Found';
  let statusCode = deleted ? 202 : 204;
  res.status(statusCode).json({
    msg: msg,
    deleted: deleted,
  });
}


module.exports = router;