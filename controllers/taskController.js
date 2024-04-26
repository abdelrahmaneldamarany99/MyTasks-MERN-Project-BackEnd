const Task = require('../models/taskModel')
const mongoose = require('mongoose')
const TaskModel = require('../models/taskModel')

// get all tasks
const getTasks = async (req, res) => {
  const tasks = await TaskModel.find({}).sort({importance: -1}) // sort({createdAt: -1})

  res.status(200).json(tasks)
}

// get one specified task
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'task does not exist'})
  }

  const task = await TaskModel.findById(id)

  if (!task) {
    return res.status(404).json({error: 'task does not exist'})
  }

  res.status(200).json(task)
}

// create a new task
const createTask = async (req, res) => {
  const {task, importance, deadLine} = req.body

  let emptyFields = []

  if (!task) {
    emptyFields.push('task')
  }
  if (!importance) {
    emptyFields.push('importance')
  }
  if (!deadLine) {
    emptyFields.push('deadLine')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'All fields required,please fill them', emptyFields })
  }

  // add to the database
  try {
    const task = await TaskModel.create({ title, importance, deadLine })
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'task does not exist'})
  }

  const task = await TaskModel.findOneAndDelete({_id: id})

  if(!task) {
    return res.status(400).json({error: 'task does not exist'})
  }

  res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'task does not exist'})
  }

  const task = await TaskModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!task) {
    return res.status(400).json({error: 'task does not exist'})
  }

  res.status(200).json(task)
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
}