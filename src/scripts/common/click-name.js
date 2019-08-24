function clickName () {
    const listAccount = document.querySelector('.block__list__account');
    const authName = document.querySelector('.auth__name');

    authName.addEventListener('click', (e) => {
        listAccount.classList.toggle('block__list__account--active');
    });

}
module.exports = clickName;