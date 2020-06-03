const mysql = require('mysql2/promise');

const dbconfig = require('./db_config');

let connection;

const dbinf_Connect = async () => {
    //connection = mysql.createConnection(dbconfig);
    connection = await mysql.createPool(dbconfig);
 
}

const dbinf_GetLatestRecord = async (sensorId) => {
    //let query_str = 'SELECT '+'time, '+ dataType +' from sensor'+sensorId+' ORDER BY time DESC limit 1';
    let query_str = 'SELECT * from sensor'+sensorId+' ORDER BY time DESC limit 1';
   
    try {
        const [rows, fields] = await connection.execute(query_str);
        return rows;

    } catch(err){
        console.error(err);
        throw err;
    }
    
}

const dbinf_GetTrend = async (sensorId,dataType,many) => {
    let query_str = 'SELECT time,'+ dataType +' from sensor'+sensorId+ ' ORDER BY time DESC limit '+many;
    //let query_str = 'SELECT abs_avg from sensor'+sensorId;
   
    try {
        const [rows, fields] = await connection.execute(query_str);
        return rows;

    } catch(err){
        console.error(err);
        throw err;
    }
    
}

const dbinf_GetSensorsList = async () => {
    let query_str = 'SHOW TABLES';
    //let query_str = 'SELECT abs_avg from sensor'+sensorId;
   
    try {
        const [rows, fields] = await connection.execute(query_str);
        return rows;

    } catch(err){
        console.error(err);
        throw err;
    }
}



module.exports = {
    connect: dbinf_Connect,
    get_latest_record: dbinf_GetLatestRecord,
    get_trend: dbinf_GetTrend,
    get_sensors_list: dbinf_GetSensorsList
};