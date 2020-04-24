import {RemoteControlClient} from "./remote_control_client.js";
import {Processes} from "./processes.js";
import {defer} from "./utils.js";

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

    DomQuery.byId(id)
        .addEventListener("touchstart", clickDown)
        .addEventListener("touchend", clickUp)
        .addEventListener("mouseleave", clickUp);

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

        (async () => {
            remoteKey.sendKeyboardEvent(target, metaEvent + ((currDown) ? ", value 2" : ", value 1"), longRun);
            await defer(() => remoteKey.sendKeyboardEvent(target, event + ((currDown) ? ", value 2" : ", value 1"), longRun), 10);
            currDown = true;
        })();


        if (focusHandler) {
            clearTimeout(focusHandler);
        }
        return defer(() => {
            focus(["multipad"]);
            focusHandler = null;
        }, 1000);
    }

    function clickUp() {
        //focus(windowPattern);
        if (!currDown) {
            return;
        }
        (async () => {
            await defer(() => remoteKey.sendKeyboardEvent(target, event + ", value 0", longRun), 20);
            await defer(() => remoteKey.sendKeyboardEvent(target, metaEvent + ", value 0", longRun), 10);
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
        })();

    }

    DomQuery.byId(id)
        .addEventListener("touchstart", clickDown)
        .addEventListener("touchend", clickUp)
        .addEventListener("mouseleave", clickUp);
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







