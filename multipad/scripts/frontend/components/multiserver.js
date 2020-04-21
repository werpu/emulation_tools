import {onStart} from "../es_helpers/init.js";
import {defer, saveResolve} from "../shared/utils.js";

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
        if (1 < saveResolve(() => Object.keys(receivers).length).orElse(-1).value) {

            let currNode = DomQuery.byId(this);
            let contentHolder = currNode.querySelectorAll(".content-holder");
            currNode.removeClass("hidden");

            contentHolder.innerHtml = Stream.ofAssoc(receivers).map(keyVal => {
                let value = keyVal[1];

                return `
                   <div class="line clickable" data-selected="${keyVal[0]}">
                        <span class="col ip">${value.ip}</span>
                        <span class="col">:</span>
                        <span class="col port">${value.port}</span>
                   </div>
               `;
            }).reduce((item1, item2) => item1 + item2, contentHolder.innerHtml).value;

            defer(() => {
                contentHolder.querySelectorAll(".clickable").addEventListener("click", (evt) => {

                    let target = DomQuery.byId(evt.target);
                    target.addClass("selected");

                    sharedObject.receiver = receivers[target.attr("data-selected").value];
                    defer(() => location.href = "./" + sharedObject["initialSystem"] + ".html");

                });
            }, 200);


        } else if (!receivers || !Object.keys(receivers).length) {
            defer(() => this.checkForReceivers());
        }
    }
}


TagBuilder.withTagName("x-multiserver")
    .withClass(MultiServerSelection)
    .register();