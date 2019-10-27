const {Processes} = require("../scripts/processes");
const net = require('net');
const client = new net.Socket();

function connect() {
    client.connect(9002, '127.0.0.1', function () {
        console.log('Connected');
    });
}

function registerEventHandler(id, id_evt, target, event, windowPattern, longRun, additionalExecute) {
    document.getElementById(id).addEventListener("click", () => {
        focus(windowPattern);

        if (client.destroyed) {
            connect();
        }
        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: event,
                long:  "" + !!longRun
            })
        ].join(" "));
        if(additionalExecute) {
            additionalExecute();
        }
        setTimeout(() => focus(["multipad"]), 1000)
    });

}

function focus(windowNamePattern) {
    const processes = new Processes();

    windowNamePattern.forEach((name) => {
        const proc = processes.processes.filter(proc => proc.program.toLowerCase().indexOf(name.toLowerCase()) != -1);
        if (proc && proc.length) {
            proc[0].focus();
            return false;
        }
    });
}

function kill_me() {
    const {exec} = require('child_process');
    exec("killall multipad")
}

connect();






