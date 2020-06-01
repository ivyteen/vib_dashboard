var express = require('express');
var db_inf = require('../database/db_inf');
var monitor_inf = require('../monitor/monitor_inf');

var router = express.Router();

/* /sensorData/0?limit=5&skip=10 
    req.param --> { sensorId:'0'}
    req.query --> { limit:'5', skip:'10'}

*/

router.get('/list', async function (req,res,next) {
  
  try {
    let ret;
      ret = await db_inf.get_sensors_list();
      console.log("on route : ",ret);
    return res.json(ret);
  } catch(err){
    return res.status(500).json(err);

  }

});

router.get('/:sensorId', async function(req, res, next) {
  const { sensorId } = req.params;
  const { dataType, many } = req.query;
  console.log("sensor id : ",sensorId);
  console.log("data type : ",dataType);
  //console.log("many : ",many);
  
  try {
    let ret;

    switch(dataType){
      case 'latest':
        ret = await db_inf.get_latest_record(sensorId);
        break;
      case 'abs_avg':
      case 'vrms':
        ret = await db_inf.get_trend(sensorId,dataType,many);
        break;
      case 'monitor':
        ret = await monitor_inf.get_data(sensorId);
        break;

      case 'warning_alarm':
        ret = await monitor_inf.get_warning_alarm(sensorId);
  
      default:
        break;
    }      

    //console.log("on route : ",ret);
    return res.json(ret);
  } catch(err){
    //console.error(err);
    return res.status(500).json(err);

  }

});




module.exports = router;
