try {
// Or use an anonymous class if you don't want a named constructor in current scope.
    window.customElements.define('x-navigation', class extends HTMLElement {

        selected;

        constructor() {
            super();

            this.innerHTML = "<button id='nav_c64' data-target='c64'>C64</button><button id='atari5200' data-target='atari5200'>Atari 5200</button><button id='coleco-1p' data-target='coleco-1p'>Colecovision</button>";

            DomQuery.querySelectorAll("x-navigation button").addEventListener("click", (evt) => {
                let target = evt.target.dataset["target"];
                location.href = target+'.html';
            });

        }

        connectedCallback() {
            if (!this.selected) {
                this.selected = "c64";
            }
        }


    });
} catch (e) {
    alert(e.message)
}











