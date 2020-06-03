const redis = require('redis')
const JSON = require('JSON')
const { promisify } = require('util')
//const client;
let getAsync;

function monitorInf_Init (app) {

  try {
    
    const client = redis.createClient(6379, '127.0.0.1')
    getAsync = promisify(client.get).bind(client);

  } catch(err){
    console.error(err);
    throw err;
  }

    
}

async function monitorInf_GetData (sensorId) {

    
    try {
    //  const [rows, fields] = await connection.execute(query_str);
      
      const key_str = 'key:'+sensorId;    
      const obj = JSON.parse(await getAsync(key_str));


      return obj;

    } catch(err){
      console.error("[Redis Error] "+err);
      throw err;
    }
}

async function monitorInf_GetWarningAlarm (sensorId) {

  const normal_flag = 0;
  const warning_flag = 1;
  const danger_flag = 2;

  let alarm_flag = { x:normal_flag, y:normal_flag, z:normal_flag };
  
  try {
    
    console.log("Getting Warning Alarm");
    const data_obj = JSON.parse(await getAsync('key:'+sensorId));
    const ac_obj = JSON.parse(await getAsync('key:alarm_criteria'+sensorId))
    
    if(data_obj.vrms.x > (ac_obj.x * 2)){
      if(data_obj.vrms.x > (ac_obj.x * 3)){
        alarm_flag.x = danger_flag;
      }else {
        alarm_flag.x = warning_flag;
      }
    }

    if(data_obj.vrms.y > (ac_obj.y * 2)){
      if(data_obj.vrms.y > (ac_obj.y * 3)){
        alarm_flag.y = danger_flag;
      }else {
        alarm_flag.y = warning_flag;
      }
    }

    if(data_obj.vrms.z > (ac_obj.z * 2)){
      if(data_obj.vrms.z > (ac_obj.z * 3)){
        alarm_flag.z = danger_flag;
      }else {
        alarm_flag.z = warning_flag;
      }
    }

    //console.log(alarm_flag);

    return alarm_flag;

  } catch(err){
      console.error(err);
      throw err;
  }


}


module.exports = {
    init: monitorInf_Init,
    get_data: monitorInf_GetData,
    get_warning_alarm: monitorInf_GetWarningAlarm

}