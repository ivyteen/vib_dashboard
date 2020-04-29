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


module.exports = {
    init: monitorInf_Init,
    get_data: monitorInf_GetData
}