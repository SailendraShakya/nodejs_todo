const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todo = require('../model/todo');
const ObjectId = require('mongodb').ObjectId; 


const Todo = require("../model/todo");

router.post("/", async (req, res) => {
    try {
        const { title, description, time } = req.body;
        const todo = await Todo.create({
            title,
            description,
            time: new Date(), // sanitize: convert email to lowercase
            user_id: mongoose.Types.ObjectId(req.user.user_id),
          });
          return res.status(201).json(todo);
    } catch(err){
        return res.status(400).json({"message": err});
    }
  });

router.get("/", async (req, res) => {
    try {
        const todo = await Todo.find({'user_id': req.user.user_id});
        return res.status(201).json(todo);
    } catch(err){
        return res.status(400).json({"message": "something went wrong"});
    }
  });

  router.patch("/", async (req, res) => {
    try {
        const { title, description, todo_id } = req.body;
        const where = {_id: todo_id};
        const todo = await Todo.updateOne(where, {title: title, description: description});
          return res.status(201).json(todo);
    } catch(err){
        return res.status(400).json({"message": err});
    }
  });

  router.delete("/", async (req, res) => {
    try {
        const todo_id = req.body.todo_id;
        const todo = await Todo.deleteOne({_id: todo_id});
        return res.status(201).json(todo);
    } catch(err){
        return res.status(400).json({"message": "something went wrong"});
    }
  });

module.exports = router;