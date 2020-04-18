/**
 * Init handlers module
 *
 * this is basically responsible for auto init
 */
let initHandlers = [];

export function onStart(func) {
    initHandlers.push(func);
}

setTimeout(() => Stream.of(...initHandlers).each(func => func()), 10);
