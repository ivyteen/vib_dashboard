var express = require('express');
var db_inf = require('../database/db_inf');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  console.log("Get DB from route");
  db_inf.get_data();
});

module.exports = router;
