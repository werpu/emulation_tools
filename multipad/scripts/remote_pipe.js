const client = new net.Socket();

function connect() {
    client.connect(9002, '10.0.1.50', function () {
        console.log('Connected');
    });
}

function toggleLayers(currentLayer, nextLayer) {
    currentLayer.addClass("hidden");
    nextLayer.removeClass("hidden");
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
    const element = DomQuery.byId(id);
    const fromLayerEl = DomQuery.querySelectorAll("." + fromLayer);
    const fromLayerExists = !!fromLayerEl.length;
    const toLayerEl = DomQuery.querySelectorAll("." + toLayer);
    const toLayerExists = !!toLayerEl.length;
    let shifted = false;

    if (isStatic) {
        element.addEventListener("click", (el) => {
            if (!shifted) {
                shifted = true;
                DomQuery.byId(el.target).addClass("toggled");
                toggleLayers(fromLayerEl, toLayerEl);
            } else if (toLayerExists) {
                shifted = false;
                DomQuery.byId(el.target).removeClass("toggled");
                toggleLayers(toLayerEl, fromLayerEl);
            }
        });
    } else {
        element.addEventListener("mousedown", (el) => {
            shifted = true;

            toggleLayers(fromLayerEl, toLayerEl);
        });

         element.addEventListener("mouseup", () => {
            shifted = false;
            toggleLayers(toLayerEl, fromLayerEl);
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






