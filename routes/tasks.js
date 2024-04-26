const express = require('express')
const {
  getTasks, 
  getTask, 
  createTask, 
  deleteTask, 
  updateTask
} = require('../controllers/taskController')

const router = express.Router()

// GET all tasks
router.get('/', getTasks)

// GET one specified Task
router.get('/:id', getTask)

// POST a new Task
router.post('/', createTask)

// DELETE a Task
router.delete('/:id', deleteTask)

// UPDATE a Task
router.patch('/:id', updateTask)

module.exports = router
