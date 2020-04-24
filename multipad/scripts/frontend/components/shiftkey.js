class ShiftKey extends HTMLElement {

    observedAttrs = ["l1_code",
        "l1_d_value",
        "l2_code",
        "l2_d_value",
        "l3_code",
        "l3_d_value",
        "l4_code",
        "l4_d_value",
        "the_id"];

    constructor() {
        super();

        this.innerHTML = [
            `<button class="level1" id="${this.the_id}" data-key-code="${data.l1_code}">${this.l1_d_value}</button>`,
            `<button class="level2 hidden" id="${this.the_id + '_l2'}" data-key-code="${data.l2_code || data.l1_code}">${this.l2_d_value || this.l1_d_value}</button>`,
            `<button class="level3 hidden" id="${this.the_id + '_l3'}" data-key-code="${data.l3_code || data.l1_code}">${this.l3_d_value || this.l1_d_value}</button>`,
            `<button class="level4 hidden" id="${this.the_id + '_l4'}" data-key-code="${data.l4_code || data.l1_code}">${this.l4_d_value || this.l1_d_value}</button>`,
        ]
    }
}

TagBuilder.withTagName("x-key")
    .withClass(ShiftKey)
    .register();
