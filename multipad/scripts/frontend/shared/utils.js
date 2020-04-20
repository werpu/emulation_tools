

export function saveResolve(resolver) {
    try {
        return Optional.fromNullable(resolver());
    } catch (e) {
        Optional.absent;
    }
}