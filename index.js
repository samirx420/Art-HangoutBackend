// IMPORTS
const express    = require('express')
const morgan     = require('morgan')
const cors       = require('cors')
const bodyParser = require('body-parser')
const app        = express()

// CONTROLLERS
const userController = require('./controllers/User.controller').router;
const noticeController = require('./controllers/Notice.controller').router;
const commentController = require('./controllers/Comment.controller').router;

// CONSTANT
const port = 3000

// MIDDLEWARES
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// REGISTER CONTROLLER HERE
app.use('/api/users', userController)
app.use('/api/notices', noticeController)
app.use('/api/comments', commentController)

// LISTENING
app.listen(port, () => console.log(`Example app listening on port ${port}!`))