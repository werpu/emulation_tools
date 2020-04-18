export class LayerHandler {


    static toggleLayers(currentLayer, nextLayer) {
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
     static registerLayerSwitch(id, fromLayer, toLayer, isStatic) {
        let element = DomQuery.byId(id);
        let toLayerEl = DomQuery.querySelectorAll("." + toLayer);
        let toLayerExists = !!toLayerEl.length;
        let shifted = false;

        if (isStatic) {
            element.addEventListener("click", (el) => {
                if (!shifted) {
                    shifted = true;
                    DomQuery.byId(el.target).addClass("toggled");
                    LayerHandler.toggleLayers(fromLayer, toLayer);
                } else if (toLayerExists) {
                    shifted = false;
                    DomQuery.byId(el.target).removeClass("toggled");
                    LayerHandler.toggleLayers(toLayer, fromLayer);
                }
            });
        } else {
            element.addEventListener("mousedown", (el) => {
                shifted = true;

                LayerHandler.toggleLayers(fromLayer, toLayer);
            });

            element.addEventListener("mouseup", () => {
                shifted = false;
                LayerHandler.toggleLayers(toLayer, fromLayer);
            });
        }
    }
}