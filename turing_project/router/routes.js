const express = require('express');
const router = express.Router();

const knex = require('../connection/connection');

require('../model/deparments')(knex,router)
require('../model/categories')(knex, router)
require('../model/attributes')(knex,router)
require('../model/product')(knex,router)
require('../model/orders')(knex,router)
require('../model/tax')(knex,router)
require('../model/shipping')(knex,router)
require('../model/shopingCart')(knex, router)
module.exports=router;