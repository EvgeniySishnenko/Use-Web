function catMobButton () {
    const button = document.querySelector('.button--category');
    const blockLeft = document.querySelector('.block__left');

    button.addEventListener('click', () => {
        blockLeft.classList.toggle('block__left__mobile');
        button.classList.toggle('button--category--active');
    });
}
module.exports = catMobButton;