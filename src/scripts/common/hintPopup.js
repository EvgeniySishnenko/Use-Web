function hintPopup(text) {
    const closed = document.querySelector('.close__success-svg');
    const resSuccess = document.querySelector('.result__success');
    const successText = document.querySelector('.success-text');
    resSuccess.classList.add('result__success--active');
    successText.innerHTML = text;
    const active = document.querySelector('.result__success--active');
    if (active) {
        setTimeout(() => {
            resSuccess.classList.remove('result__success--active');
        }, 2500);
    }
    closed.addEventListener('click', () => {
        resSuccess.classList.remove('result__success--active');
    });
}
module.exports = hintPopup;