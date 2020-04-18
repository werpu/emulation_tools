export class XNavigation {

    constructor() {
        try {
            // Or use an anonymous class if you don't want a named constructor in current scope.
            window.customElements.define('x-navigation', class extends HTMLElement {

                constructor() {
                    super();

                    this.innerHTML = "<button id='nav_c64' data-target='c64'>C64</button><button id='atari5200' data-target='atari5200'>Atari 5200</button><button id='coleco-1p' data-target='coleco-1p'>Colecovision</button>";
                }

                connectedCallback() {

                    DomQuery.querySelectorAll("x-navigation button").addEventListener("click", (evt) => {
                        let target = evt.target.dataset["target"];
                        location.href = target + '.html';

                    }).each((item => {
                        item.removeClass("hidden");
                        if (item.attr("data-target").value == DomQuery.byId(this).attr("selected").value) {
                            item.addClass("hidden");
                        }
                    }));
                }
            });
        } catch (e) {
            alert(e.message)
        }
    }
}












