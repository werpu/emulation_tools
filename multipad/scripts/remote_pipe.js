import {Processes} from "./shared/processes.js";

const client = new net.Socket();

export function connect() {
    client.connect(9002, '10.0.1.50', function () {
        console.log('Connected');
    });
}


export function registerEventHandler(id, id_evt, target, event, windowPattern, longRun, additionalExecute) {
    DomQuery.byId(id).addEventListener("click", () => {
        focus(windowPattern);

        if (client.destroyed) {
            connect();
        }
        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: event,
                long: "" + !!longRun
            })
        ].join(" "));
        if (additionalExecute) {
            additionalExecute();
        }
        setTimeout(() => focus(["multipad"]), 1000)
    });

}

export function registerMetaEventHandler(id, id_evt, target, event, metaEvent, windowPattern, longRun, additionalExecute) {
    DomQuery.byId(id).addEventListener("click", () => {
        focus(windowPattern);

        if (client.destroyed) {
            connect();
        }
        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: event,
                long: "" + !!longRun
            })
        ].join(" "));
        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: metaEvent,
                long: "" + !!longRun
            })
        ].join(" "));
        if (additionalExecute) {
            additionalExecute();
        }
        setTimeout(() => focus(["multipad"]), 1000)
    });

}


export function focus(windowNamePattern) {
    const processes = new Processes();

    windowNamePattern.forEach((name) => {
        const proc = processes.processes.filter(proc => proc.program.toLowerCase().indexOf(name.toLowerCase()) != -1);
        if (proc && proc.length) {
            proc[0].focus();
            return false;
        }
    });
}

export function kill_me() {
    const {exec} = require('child_process');
    exec("killall multipad")
}

connect();






