var net = require('net');

var client = new net.Socket();

function connect() {
    client.connect(9002, '127.0.0.1', function () {
        console.log('Connected');
    });
}


function registerEventHandler(id, id_evt, target, event, windowPattern) {
    document.getElementById(id).addEventListener("click", function () {
        focus(windowPattern).then(() => {
            if (client.destroyed) {
                connect();
            }
            client.write(["trigger_input",
                JSON.stringify({
                    to: target,
                    event: event
                })
            ].join(" "));
        });
    });
}


function focus(windowNamePattern) {
    const {spawn, exec} = require('child_process');
    return new Promise(function (resolve, reject) {

        //const child = spawn("/usr/bin/xdotool",[ "search --onlyvisible --class '" + windowNamePattern + "' > xdo.txt"]);
        const child = spawn("/home/werpu/gamepadservice/xdo.sh");
        child.on("message", function(msg) {
            console.log(message);
        })
        child.stdout.on('data', function (data) {
            const child2 = spawn("/home/werpu/gamepadservice/xdo-focus.sh", [data.toString()]);
            child2.on('close', function (data) {
                resolve();
            });
             child2.stdout.on('data', function (data) {
                console.log(data.toString())
            });
            child2.on('error', function (data) {
                reject();
            });

        });
        child.on('error', function (data) {
            reject();
        });
        child.on('close', (code) => {
          if (code !== 0) {
            console.log(`grep process exited with code ${code}`);
          }
        });
    });
}

connect();






