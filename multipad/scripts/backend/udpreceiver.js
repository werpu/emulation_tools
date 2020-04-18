const {AssocArrayCollector, Stream} = require("mona-dish");

let PORT = 12345;

let dgram = require('dgram');
let server = dgram.createSocket('udp4');

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

var receivers = {};

global.sharedObj["receivers"] = receivers;

server.on('listening', function () {
    let address = server.address();
    server.setBroadcast(true);
    console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function (message, remote) {
    let data = JSON.parse(message);

    let recKey = data.ip + ":" + data.port;
    let currTime = new Date();
    if (receivers[recKey]) {
        receivers[recKey].lastHeardFrom = currTime;
    } else {
        receivers[recKey] = new ReceiverData(data.ip, data.port);
    }
    //everything older than 15 seconds will be cleared
    receivers = Stream.ofAssoc(receivers)
        .filter(data => {
            return currTime.getTime() - data[1].lastHeardFrom.getTime() < 20000;
        })
        .collect(new AssocArrayCollector());

    global.sharedObj["receivers"] = receivers;

    console.log(remote.address + ':' + remote.port + ' - ' + data.ip + ":" + data.port);

});

server.bind(PORT);