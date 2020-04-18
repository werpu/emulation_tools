import {LayerHandler} from "../es_helpers/layers.js";
import "./all.js";


setTimeout(() => {
    LayerHandler.registerLayerSwitch("keyshift", "layer1", "layer2", false);
    LayerHandler.registerLayerSwitch("keyshift2", "layer1", "layer2", false);
    LayerHandler.registerLayerSwitch("keyshiftlock", "layer1", "layer2", true);
}, 500);

