/**
 * central program module
 * which imports all
 */
import "../components/xnavigation.js";
import "../components/dialpad.js";
import {KeyCodes} from "../es_helpers/key_events.js";
import {onStart} from "../es_helpers/init.js";
import {LayerHandler} from "../es_helpers/layers.js";



//fetching shared data alert(remote.getGlobal("sharedObj").prop1);