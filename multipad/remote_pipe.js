var net = require('net');

var client = new net.Socket();

function connect() {
    client.connect(9002, '127.0.0.1', function () {
        console.log('Connected');
    });
}


function registerEventHandler(id, id_evt, target, event) {
    document.getElementById(id).addEventListener("click", function() {
        if(client.destroyed) {
            connect();
        }
        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: event
            })
        ].join(" "));
    });
}

connect();






