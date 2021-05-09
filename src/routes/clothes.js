'use strict';

const express = require('express');
const router = express.Router();


const Clothes=require('../models/data-collection-class');
// class
const clothesModel = require('../models/clothes');
//new obj from the class
const clothesInstance = new Clothes(clothesModel); 

// add my RESTFUL APIs declarations
router.get('/clothes', getClothes);
router.get('/clothes/:id', getOneClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', updateClothes);
router.delete('/clothes/:id', deleteClothes);


async function getClothes(req, res) {
  // get all items
  let items =await clothesInstance.get();
  res.status(200).json(items);
}

async function getOneClothes(req, res) {
  let id = req.params.id; // from the url its a string
  let oneItem =await clothesInstance.get(id);
  res.status(200).json(oneItem);
}

async function createClothes(req, res) {
  // use create Method from the class
  let obj = req.body;
  let newItem =await clothesInstance.create(obj);
  res.status(201).json(newItem);
}

async function updateClothes(req, res) {
  let id = req.params.id;
  const obj = req.body;
  let updatedclothes =await clothesInstance.update(id, obj);
  res.status(200).json(updatedclothes);
}

async function deleteClothes(req, res) {
  let id = req.params.id;
  console.log('id......',id);
  let deleted =await clothesInstance.delete(id);
  let msg = deleted ? 'Item is deleted': 'Item was not Found';
  let statusCode = deleted ? 202 : 204;
  res.status(statusCode).json({
    msg: msg,
    deleted: deleted,
  });
}


module.exports = router;