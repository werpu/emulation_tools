import {Processes} from "./processes.js";

let global = remote.getGlobal("sharedObj");
let rec = global ? global["receiver"] : false;

const client = new net.Socket();

export function connect() {
    if (!rec) {
        return;
    }
    client.setNoDelay(true);
    client.connect(rec.port, rec.ip, function () {
        console.log('Connected');
    });

}


export function registerEventHandler(id, id_evt, target, event, windowPattern, longRun, additionalExecute) {

    if (!rec) {
        return;
    }

    function reconnect() {
        if (client.destroyed) {
            connect();
        }
    }

    let currDown;

    function clickDown() {
       //focus(windowPattern);
        if(currDown) {
            return;
        }
        console.log(currDown);

        reconnect();

        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: event + ((currDown) ? ", value 2" : ", value 1"),
                long: "" + !!longRun
            })
        ].join("                                                                                                                "));

        //client.end();
        currDown = true;
        setTimeout(() => focus(["multipad"]), 1000);
    }

    function clickUp() {
        //focus(windowPattern);
        if (!currDown) {
            return;
        }

        reconnect();

        client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: event + ", value 0",
                long: "" + !!longRun
            })
        ].join("                                                                                                             "));
        //client.end();
        if (additionalExecute) {
            additionalExecute();
        }

        currDown = false;
        setTimeout(() => focus(["multipad"]), 1000);
    }

    DomQuery.byId(id).addEventListener("mousedown",  clickDown);
    DomQuery.byId(id).addEventListener("mouseup",    clickUp);
    DomQuery.byId(id).addEventListener("mouseleave", clickUp);

}

export function registerMetaEventHandler(id, id_evt, target, event, metaEvent, windowPattern, longRun, additionalExecute) {
    if (!rec) {
        return;
    }
    DomQuery.byId(id).addEventListener("click", () => {
        //focus(windowPattern);

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






