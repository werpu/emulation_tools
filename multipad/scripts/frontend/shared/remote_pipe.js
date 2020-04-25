import {RemoteControlClient} from "./remote_control_client.js";
import {Processes} from "./processes.js";
import {defer} from "./utils.js";

let remoteKey = new RemoteControlClient();
let focusHandler = null;

export function registerEventHandler(id, id_evt, target, event, windowPattern, longRun, additionalExecute) {

    if (!remoteKey.hasConnectionData) {
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

    DomQuery.byId(id)
        .addEventListener("touchstart", clickDown)
        .addEventListener("touchend", clickUp)
        .addEventListener("touchcancel", clickUp);

}

export function registerMetaEventHandler(id, id_evt, target, event, metaEvent, windowPattern, longRun, additionalExecute) {
    if (!remoteKey.hasConnectionData) {
        return;
    }

    let currDown;


    async function clickDown()
    {



        remoteKey.sendKeyboardEvent(target, metaEvent + ((currDown) ? ", value 2" : ", value 1"), longRun);
        remoteKey.sendKeyboardEvent(target, event + ((currDown) ? ", value 2" : ", value 1"), longRun);
        currDown = true;

        if (focusHandler) {
            clearTimeout(focusHandler);
        }
        return defer(() => {
            focus(["multipad"]);
            focusHandler = null;
        }, 1000);
    }

    async function clickUp() {


        let evt = event + ", value 0";
        await defer(() => {
            remoteKey.sendKeyboardEvent(target, evt, longRun);
            console.log(evt);
        }, 30);
        let meta = metaEvent + ", value 0";
        await defer(() => {
            remoteKey.sendKeyboardEvent(target, meta, longRun);
            console.log(meta);
        }, 10);
        currDown = false;

        if (additionalExecute) {
            additionalExecute();
        }

        if (focusHandler) {
            clearTimeout(focusHandler);
        }
        return defer(() => {
            focus(["multipad"]);
            focusHandler = null;
        }, 1000);


    }

    DomQuery.byId(id)
        .addEventListener("touchstart", clickDown)
        .addEventListener("touchend", clickUp)
        .addEventListener("touchcancel", clickUp);
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







