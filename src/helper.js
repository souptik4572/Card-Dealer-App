function chooseRandomPosition(start, end) {
    return start + Math.floor(Math.random() * (end - start)) + 1;
}

export { chooseRandomPosition };