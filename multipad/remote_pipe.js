var net = require('net');

var client = new net.Socket();

function connect() {
    client.connect(9002, '127.0.0.1', function () {
        console.log('Connected');
    });
}

function registerEventHandler(id, id_evt, target, event, windowPattern) {
    document.getElementById(id).addEventListener("click",  () => {
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
        setTimeout(() => focus1("multipad"), 1000)
    });

}

function focus1(windowNamePattern) {
    var processWindows = require("node-process-windows");
    processWindows.getProcesses(function (err, processes) {
        var affectedWindows = processes.filter(p => p.processName.indexOf(windowNamePattern) >= 0);
        processWindows.focusWindow(affectedWindows[0]);
    })
}

connect();






