var {Processes} = require("../scripts/processes");

var net = require('net');

var client = new net.Socket();

function connect() {
    client.connect(9002, '127.0.0.1', function () {
        console.log('Connected');
    });
}

function registerEventHandler(id, id_evt, target, event, windowPattern) {
    document.getElementById(id).addEventListener("click", () => {
        focus(windowPattern);

        if (client.destroyed) {
            connect();
        }
        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: event
            })
        ].join(" "));
        setTimeout(() => focus(["multipad"]), 1000)
    });

}

function focus(windowNamePattern) {
    var processes = new Processes();
    var focused = false;
    windowNamePattern.forEach((name) => {
        if (focused) {
            return false;
        }
        const proc = processes.processes.filter(proc => proc.program.toLowerCase().indexOf(name.toLowerCase()) != -1);
        if (proc && proc.length) {
            proc[0].focus();
            focused = true;
            return false;
        }
    });
}


connect();






