require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  next()
})


// routes
app.use('/api/tasks', taskRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening for requests on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 