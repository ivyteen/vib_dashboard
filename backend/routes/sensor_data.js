var express = require('express');
var db_inf = require('../database/db_inf');
var router = express.Router();

/* /sensorData/0?limit=5&skip=10 
    req.param --> { sensorId:'0'}
    req.query --> { limit:'5', skip:'10'}

*/

/* GET users listing. */
router.get('/:sensorId', async function(req, res, next) {
  const { sensorId } = req.params;
  const { dataType } = req.query;
  console.log("sensor id : ",sensorId);
  console.log("data type : ",dataType);
  try {
    let ret = await db_inf.get_latest_data(sensorId,dataType);
    console.log("on route : ",ret);
    //let obj = JSON.parse(ret);
    return res.json(ret);
  } catch(err){
    //console.error(err);
    return res.status(500).json(err);

  }

});

module.exports = router;
