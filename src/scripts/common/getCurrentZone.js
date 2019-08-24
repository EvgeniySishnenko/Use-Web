function getCurrentZone(from, to) {
    do {
        if (from.classList.contains(to)) {
            return from;
        }
    } while (from = from.parentElement);

    return null;
}

module.exports = getCurrentZone;