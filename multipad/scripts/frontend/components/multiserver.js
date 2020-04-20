import {onStart} from "../es_helpers/init.js";
import {defer} from "../shared/utils.js";

/**
 * multi server handling component
 * which pops up whenever we detect more than one possible new server
 * and let the user select which one we need
 */
class MultiServerSelection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
                <h2>More than one server was detected</h2>
                <div class='content-holder overflow-container'></div>
        `
    }

    connectedCallback() {
        DomQuery.byId(this).addClass("hidden")
        this.checkForReceivers();
    }

    checkForReceivers() {
        let sharedObject = remote.getGlobal("sharedObj");
        let receivers = sharedObject.receivers;
        if (receivers && 1 < Object.keys(receivers).length) {

            let contentHolder = DomQuery.byId(this).querySelectorAll(".content-holder");
            DomQuery.byId(this).removeClass("hidden");
            Stream.ofAssoc(receivers).each(keyVal => {
                let key = keyVal[0];
                let value = keyVal[1];
                let ip = value.ip;
                let port = value.port;

                let item = `
                   <div class="line clickable" data-selected="${key}">
                        <span class="col ip">${ip}</span>
                        <span class="col">:</span>
                        <span class="col port">${port}</span>
                   </div>
               `;
                contentHolder.innerHtml = contentHolder.innerHtml + item;

            });

            defer(() => {
                contentHolder.querySelectorAll(".clickable").addEventListener("click", (evt) => {

                    let target = DomQuery.byId(evt.target);
                    target.addClass("selected");

                    sharedObject.receiver = receivers[target.attr("data-selected").value];
                    setTimeout(() => location.href = "./" + sharedObject["initialSystem"] + ".html", 500);

                });
            }, 200);


        } else if (!receivers || !Object.keys(receivers).length) {
            defer(() => this.checkForReceivers());
        }
    }
}


onStart(() => TagBuilder.withTagName("x-multiserver")
    .withClass(MultiServerSelection)
    .register());