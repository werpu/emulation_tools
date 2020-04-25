import {saveResolve} from "./utils.js";

/**
 * remote control client
 * this docks onto a running
 * server and sends remotely keystroke events
 */
export class RemoteControlClient {
    constructor() {
        this.global = remote.getGlobal("sharedObj");
        this.connectionData = saveResolve(() => this.global["receiver"]).orElse(false).value;
        this.client = new net.Socket();
        this.connect();
    }

    connect() {
        if (!this.connectionData) {
            return;
        }
        this.client.setNoDelay(true);
        this.client.connect(this.connectionData.port, this.connectionData.ip, function () {
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

    get hasConnectionData() {
        return !!this.connectionData;
    }

}