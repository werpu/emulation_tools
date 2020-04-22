import {Processes} from "./processes.js";
import {saveResolve} from "./utils.js";

/**
 * remote control client
 * this docks onto a running
 * server and sends remotely keystroke events
 */
class RemoteControlClient {
    constructor() {
        this.global = remote.getGlobal("sharedObj");
        this.rec = saveResolve(() => this.global["receiver"]).orElse(false).value;
        this.client = new net.Socket();
        this.connect();
    }

    connect() {
        if (!this.rec) {
            return;
        }
        this.client.setNoDelay(true);
        this.client.connect(this.rec.port, this.rec.ip, function () {
            console.log('Connected');
        });
    }

    sendKeyboardEvent(target, evt, longRun) {
        this.reconnect();
        this.client.write(["trigger_input",
            JSON.stringify({
                to: target,
                event: evt,
                long: "" + !!longRun
            })
        ].join(" "));
    }

    reconnect() {
        if (this.client.destroyed) {
            this.connect();
        }
    }

    get hasRec() {
        return !!this.rec;
    }

}

let remoteKey = new RemoteControlClient();
let focusHandler = null;

export function registerEventHandler(id, id_evt, target, event, windowPattern, longRun, additionalExecute) {

    if (!remoteKey.hasRec) {
        return;
    }


    let currDown;

    function clickDown() {
        //focus(windowPattern);
        if (currDown) {
            return;
        }

        remoteKey.sendKeyboardEvent(target, (event + ((currDown) ? ", value 2" : ", value 1")), longRun);
        currDown = true;
        if (focusHandler) {
            clearTimeout(focusHandler);
        }
        focusHandler = setTimeout(() => {
            focus(["multipad"]);
            focusHandler = null;
        }, 1000);
    }

    function clickUp() {
        //focus(windowPattern);
        if (!currDown) {
            return;
        }

        remoteKey.sendKeyboardEvent(target, event + ", value 0", longRun);

        if (additionalExecute) {
            additionalExecute();
        }

        currDown = false;
        if (focusHandler) {
            clearTimeout(focusHandler);
        }
        setTimeout(() => {
            focus(["multipad"]);
            focusHandler = null;
        }, 1000);
    }

    DomQuery.byId(id).addEventListener("mousedown", clickDown);
    DomQuery.byId(id).addEventListener("mouseup", clickUp);
    DomQuery.byId(id).addEventListener("mouseleave", clickUp);

}

export function registerMetaEventHandler(id, id_evt, target, event, metaEvent, windowPattern, longRun, additionalExecute) {
    if (!remoteKey.hasRec) {
        return;
    }

    let currDown;


    function clickDown() {

        if (currDown) {
            return;
        }

        remoteKey.sendKeyboardEvent(target, metaEvent + ((currDown) ? ", value 2" : ", value 1"), longRun);
        remoteKey.sendKeyboardEvent(target, event + ((currDown) ? ", value 2" : ", value 1"), longRun);
        currDown = true;
        if (focusHandler) {
            clearTimeout(focusHandler);
        }
        setTimeout(() => {
            focus(["multipad"]);
            focusHandler = null;
        }, 1000);
    }

    function clickUp() {
        //focus(windowPattern);
        if (!currDown) {
            return;
        }


        remoteKey.sendKeyboardEvent(target, event + ", value 0", longRun);
        remoteKey.sendKeyboardEvent(target, metaEvent + ", value 0", longRun);

        if (additionalExecute) {
            additionalExecute();
        }

        currDown = false;
        if (focusHandler) {
            clearTimeout(focusHandler);
        }
        setTimeout(() => {
            focus(["multipad"]);
            focusHandler = null;
        }, 1000);
    }

    DomQuery.byId(id).addEventListener("mousedown", clickDown);
    DomQuery.byId(id).addEventListener("mouseup", clickUp);
    DomQuery.byId(id).addEventListener("mouseleave", clickUp);
}


export function focus(windowNamePattern) {
    const processes = new Processes();

    windowNamePattern.forEach((name) => {
        const proc = processes.processes.filter(proc => proc.program.toLowerCase().indexOf(name.toLowerCase()) !== -1);
        if (proc && proc.length) {
            proc[0].focus();
            return false;
        }
    });
}
/*
export function kill_me() {
    const {exec} = require('child_process');
    exec("killall multipad")
}
*/







