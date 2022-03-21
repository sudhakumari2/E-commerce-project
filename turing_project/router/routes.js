const express = require('express');
const router = express.Router();

const knex = require('../connection/connection');

require('../model/deparments')(knex,router)
require('../model/categories')(knex, router)
require('../model/attributes')(knex,router)
require('../model/product')(knex, router)

module.exports=router;