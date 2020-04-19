/**
 * central udp receiving code
 */
const {AssocArrayCollector, Stream} = require("mona-dish");
const server = require('dgram').createSocket('udp4');
const PORT = 12345;
const ALLOWED_MS = 20000;
global.sharedObj["receivers"] = {};

class ReceiverData {
    ip;
    port;
    lastHeardFrom;

    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.lastHeardFrom = new Date();
    }
}


server.on('listening', function () {
    let address = server.address();
    server.setBroadcast(true);
    console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function (message, remote) {

    let data = JSON.parse(message);
    let recKey = data.ip + ":" + data.port;
    let currTime = new Date();
    let receivers = global.sharedObj["receivers"];

    if (receivers[recKey]) {
        receivers[recKey].lastHeardFrom = currTime;
    } else {
        receivers[recKey] = new ReceiverData(data.ip, data.port);
    }

    //everything older than 20 seconds will be cleared
    global.sharedObj["receivers"] = Stream.ofAssoc(global.sharedObj["receivers"])
        //4 strikes and the server address is out
        .filter(data => currTime.getTime() - data[1].lastHeardFrom.getTime() < ALLOWED_MS)
        .collect(new AssocArrayCollector());

    console.log(remote.address + ':' + remote.port + ' - ' + data.ip + ":" + data.port);
});

server.bind(PORT);