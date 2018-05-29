const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

//connect to schema

require('../models/todo');
const Todo = mongoose.model('todo');

router.post('/', (req))
