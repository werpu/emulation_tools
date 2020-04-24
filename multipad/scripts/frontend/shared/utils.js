

export function saveResolve(resolver) {
    try {
        return Optional.fromNullable(resolver());
    } catch (e) {
        return Optional.absent;
    }
}

export async function defer(func, timeout) {
    return new Promise(resolve => {
        let finalTimeout = Optional.fromNullable(timeout || null);
        setTimeout(() => {
            try {
                func();
            } finally {
                resolve("done");
            }
        }, finalTimeout.orElse(1000).value);
    })
}