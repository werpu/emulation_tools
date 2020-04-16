const client = new net.Socket();

function connect() {
    client.connect(9002, '10.0.1.50', function () {
        console.log('Connected');
    });
}

function toggleLayers(currentLayer, nextLayer) {
    let currentLayerEl = DomQuery.querySelectorAll("." + currentLayer);
    let nextLayerEl = DomQuery.querySelectorAll("." + nextLayer);

    currentLayerEl.addClass("hidden");
    nextLayerEl.removeClass("hidden");
}

/**
 * layer switcher
 *
 * allows to swith from one to another layer
 * @param the element id which has to react
 * @param fromLayer from layer style marker
 * @param toLayer to layer style marker
 * @param isStatic static means... that it is toggled permanently on click, otherwise it is only activated until released
 */
function registerLayerSwitch(id, fromLayer, toLayer, isStatic) {
    let element = DomQuery.byId(id);
    let toLayerEl = DomQuery.querySelectorAll("." + toLayer);
    let toLayerExists = !!toLayerEl.length;
    let shifted = false;

    if (isStatic) {
        element.addEventListener("click", (el) => {
            if (!shifted) {
                shifted = true;
                DomQuery.byId(el.target).addClass("toggled");
                toggleLayers(fromLayer, toLayer);
            } else if (toLayerExists) {
                shifted = false;
                DomQuery.byId(el.target).removeClass("toggled");
                toggleLayers(toLayer, fromLayer);
            }
        });
    } else {
        element.addEventListener("mousedown", (el) => {
            shifted = true;

            toggleLayers(fromLayer, toLayer);
        });

        element.addEventListener("mouseup", () => {
            shifted = false;
            toggleLayers(toLayer, fromLayer);
        });
    }
}


function registerEventHandler(id, id_evt, target, event, windowPattern, longRun, additionalExecute) {
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

function registerMetaEventHandler(id, id_evt, target, event, metaEvent, windowPattern, longRun, additionalExecute) {
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






