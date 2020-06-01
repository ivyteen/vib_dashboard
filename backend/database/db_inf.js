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

const dbinf_GetWarningAlarm = async (sensorId) => {
    
    let query_alarm_criteria = 'SELECT alarm_criteria FROM sensor'+sensorId;
    let query_latest_vrms = 'SELECT vrms FROM sensor'+sensorId+ ' ORDER BY time'
    
    try {
        let alarm = { x:0, y:0, z:0};
        console.log("Getting Warning Alarm");
        const [ac_row, ac_fields] = await connection.execute(query_alarm_criteria);
        const [vrms_row, ac_fleilds] = await connection.execute(query_latest_vrms);
        let ac_obj = JSON.parse(ac_row);
        let vrms_obj = JSON.parse(vrms_row);

        console.log(ac_obj);
        console.log(vrms_obj);


    } catch(err){
        console.error(err);
        throw err;
    }


}

module.exports = {
    connect: dbinf_Connect,
    get_latest_record: dbinf_GetLatestRecord,
    get_trend: dbinf_GetTrend,
    get_sensors_list: dbinf_GetSensorsList,
    get_warning_alarm: dbinf_GetWarningAlarm
};