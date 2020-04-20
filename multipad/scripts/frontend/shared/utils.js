

export function saveResolve(resolver) {
    try {
        return Optional.fromNullable(resolver());
    } catch (e) {
        Optional.absent;
    }
}

export function defer(func, timeout) {
    let finalTimeout = Optional.fromNullable(timeout || null);
    setTimeout(func, finalTimeout.orElse(1000).value);
}