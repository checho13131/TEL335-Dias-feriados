const express = require('express');
const router = express.Router();

const Task = require('../models/task');
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    //Task.find().then(data => console.log(data));
    res.json(tasks);
});

router.post('/', async (req, res) =>{
    const{title, description} = req.body;
    const newTask = new Task({title, description});
    await newTask.save();
    console.log(newTask);
    res.json({status: 'Task Saved'});
});

router.put('/:id', async (req, res) => {
    const {title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
})

router.get('/:id', async (req, res) =>{
    const task = await Task.findById(req.params.id);
    res.json(task);
})
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({status: 'Task Removed'});
}) 

module.exports = router