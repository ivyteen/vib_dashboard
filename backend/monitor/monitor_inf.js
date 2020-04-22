const ipc = require('node-ipc');



function callback_GetRealTimeData (data, socket) {
    ipc.log("Data Received");
    ipc.log('get data : '.debug, data);
    //ipc.server.emit(socket,"world");
}


const monitorInf_Init = () => {
    ipc.config.id = 'vib_monitor';
    ipc.config.retry = 1500;
    ipc.config.sync = true;
    //ipc.config.rawBuffer = true;
    //ipc.config.encoding = 'ascii';

    ipc.serve('/tmp/vib_monitor');
    ipc.server.on('start', function () { ipc.log("Monitor socket start")})
    ipc.server.on('connect', function () { ipc.log("Sensor Inf Connected")} )
    ipc.server.on('data', callback_GetRealTimeData);
    ipc.server.start();

}


module.exports = {
    init: monitorInf_Init
}