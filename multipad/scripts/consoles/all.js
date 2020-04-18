import {XNavigation} from "../es_helpers/xnavigation.js";

import {KeyCodes} from "../es_helpers/key_events.js";


/*automatic registration triggered for everything which has a data-key-code*/
setTimeout(() => KeyCodes.initKeys(), 500);

new XNavigation();