function createItem(className) {
    const newDiv = document.createElement('div');
    newDiv.classList.add(className);
    return newDiv;
}
module.exports = createItem;