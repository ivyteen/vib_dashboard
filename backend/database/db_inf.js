const mysql = require('mysql2/promise');

const dbconfig = require('./db_config');

let connection;

const dbinf_Connect = async () => {
    //connection = mysql.createConnection(dbconfig);
    connection = await mysql.createPool(dbconfig);
 
}

const dbinf_GetLatestData = async (sensorId, dataType) => {
    //let query_str = 'SELECT '+ dataType +' from sensor'+sensorId+' ORDER BY time DESC limit 1';
    let query_str = 'SELECT * from sensor'+sensorId+' ORDER BY time DESC limit 1';
   
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
    get_latest_data: dbinf_GetLatestData
};