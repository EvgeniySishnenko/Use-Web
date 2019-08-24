function formPopup () {
    const authPopupButton = document.querySelectorAll('.authPopup');
    const authPopup = document.querySelector('.auth__popup');
    const authClose = document.querySelector('.auth__close');
    const forgotLink = document.querySelector('.link-forgot_pass');
    const forgotPopup = document.querySelector('.forgot__popup');
    const forgotClose = document.querySelector('.forgot__close');
    const menuMobile = document.querySelector('.menu_mobile');
    const buttonMenu = document.querySelector('.menu__mobile--link');
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (authPopup.classList.contains('auth__popup--active')) {
            authPopup.classList.remove('auth__popup--active');
        }
        if (!forgotPopup.classList.contains('forgot__popup--active')) {
            forgotPopup.classList.add('forgot__popup--active');
        }
        
    });
    forgotClose.addEventListener('click', () => {
        if (forgotPopup.classList.contains('forgot__popup--active')) {
            forgotPopup.classList.remove('forgot__popup--active');
        }
        if (!authPopup.classList.contains('auth__popup--active')) {
            authPopup.classList.add('auth__popup--active');
        }
        
    });
    for (let i = 0; i < authPopupButton.length; i++) {
        authPopupButton[i].addEventListener('click', e => {
            e.preventDefault();
            if (!authPopup.classList.contains('auth__popup--active')) {
                authPopup.classList.add('auth__popup--active');
            }
            if (forgotPopup.classList.contains('forgot__popup--active')) {
                forgotPopup.classList.remove('forgot__popup--active');
            }
            if (menuMobile.classList.contains('menu_mobile--visible')) {
                menuMobile.classList.remove('menu_mobile--visible');
                buttonMenu.classList.remove('menu__mobile--link--active');
            }
        });
    }
    
    authClose.addEventListener('click', () => {
        if (authPopup.classList.contains('auth__popup--active')) {
            authPopup.classList.remove('auth__popup--active');
        }
    });
}

module.exports = formPopup;