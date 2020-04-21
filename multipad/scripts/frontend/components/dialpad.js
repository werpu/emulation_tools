import {onStart} from "../es_helpers/init.js";

class Dialpad  extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
                <button class="equalHW" id="key1" data-key-code="KEY_KP1">1</button>
                <button class="equalHW" id="key2" data-key-code="KEY_KP2">2</button>
                <button class="equalHW" id="key3" data-key-code="KEY_KP3">3</button>
            
                <button class="equalHW" id="key4" data-key-code="KEY_KP4">4</button>
                <button class="equalHW" id="key5" data-key-code="KEY_KP5">5</button>
                <button class="equalHW" id="key6" data-key-code="KEY_KP6">6</button>
            
                <button class="equalHW" id="key7" data-key-code="KEY_KP7">7</button>
                <button class="equalHW" id="key8" data-key-code="KEY_KP8">8</button>
                <button class="equalHW" id="key9" data-key-code="KEY_KP9">9</button>
            
                <button class="equalHW" id="key_asterisk"  data-key-code="KEY_KPASTERISK">*</button>
                <button class="equalHW" id="key0" data-key-code="KEY_KP0">0</button>
                <button class="equalHW" id="key_hash" data-key-code="KEY_EQUAL">#</button>
        `;
    }
}

onStart(() => TagBuilder.withTagName("x-dialpad")
    .withClass(Dialpad)
    .register());