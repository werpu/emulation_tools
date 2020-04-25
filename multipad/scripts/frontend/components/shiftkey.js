import {saveResolve} from "../shared/utils.js";

class ShiftKey extends HTMLElement {

    static EVT_LAYERCHANGE = "layerchange";

    observedAttrs = ["l1-code",
        "l1-value",
        "l2-code",
        "l2-value",
        "l2-meta",
        "l3-code",
        "l3-value",
        "l3-meta",
        "l4-code",
        "l4-value",
        "l4-meta",
        "id"];


    constructor() {
        super();

        this.innerHTML =
            `<button class="equalHW level1" id="${this.id}_l1" data-key-code="${this.l1_code}">${this.l1_value}</button>
             <button class="equalHW level2 hidden" id="${this.id + '_l2'}" data-key-code="${this.l2_code || this.l1_code}" data-meta-key-code="${this.l2_meta}">${this.l2_value || this.l1_value}</button>
             <button class="equalHW level3 hidden" id="${this.id + '_l3'}" data-key-code="${this.l3_code || this.l1_code}" data-meta-key-code="${this.l3_meta}">${this.l3_value || this.l1_value}</button>
             <button class="equalHW level4 hidden" id="${this.id + '_l4'}" data-key-code="${this.l4_code || this.l1_code}" data-meta-key-code="${this.l4_meta}">${this.l4_value || this.l1_value}</button>`;
    }

    get l1_code() {
        return this.getAttribute("l1-code");
    }

    get l1_value() {
        return this.getAttribute("l1-value");
    }

    get l2_code() {
        return this.getAttribute("l2-code");
    }

    get l2_meta() {
        return this.getAttribute("l2-meta") || "KEY_LEFTSHIFT";
    }

    get l2_value() {
        return this.getAttribute("l2-value");
    }

    get l3_code() {
        return this.getAttribute("l3-code");
    }

    get l3_value() {
        return this.getAttribute("l3-value");
    }

    get l3_meta() {
        return this.getAttribute("l3-meta") || "KEY_LEFTSHIFT";
    }

    get l4_code() {
        return this.getAttribute("l4-code");
    }

    get l4_value() {
        return this.getAttribute("l4-value");
    }

     get l4_meta() {
        return this.getAttribute("l4-meta") || "KEY_LEFTSHIFT";
    }

    get id() {
        return this.getAttribute("id");
    }


    connectedCallback() {
        let tNode = DomQuery.byId(this);
        tNode.addEventListener(ShiftKey.EVT_LAYERCHANGE, (evt) => {
            let nextLayer = saveResolve(() => evt.detail.layer).orElse("level1").value;
            nextLayer = nextLayer.replace("layer", "level");
            tNode
                .querySelectorAll("button")
                .addClass("hidden");
            tNode.querySelectorAll("button." + nextLayer)
                .removeClass("hidden");
        });
    }
}

//customElements.define("x_key", ShiftKey);
TagBuilder.withTagName("x-key")
    .withClass(ShiftKey)
    .register();
