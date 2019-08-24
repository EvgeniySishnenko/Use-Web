function menuMobile () {
    const buttonMenu = document.querySelector('.menu__mobile--link');
    const menuMobile = document.querySelector('.menu_mobile');
    buttonMenu.addEventListener('click', (e) => {
        e.preventDefault();
        
        menuMobile.classList.toggle('menu_mobile--visible');
        buttonMenu.classList.toggle('menu__mobile--link--active');
    });
}

module.exports = menuMobile;