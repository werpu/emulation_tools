/**
 * Init handlers module
 *
 * this is basically responsible for auto init
 */
import {defer} from "../shared/utils.js";

let initHandlers = [];

export function onStart(func) {
    initHandlers.push(func);
}

defer(() => Stream.of(...initHandlers).each(func => {
    func()
}), 10);
