const hintPopup = require('../common/hintPopup');
const genPath = require('../common/path');
const path = genPath();
function checkForgot () {
    const sendForgot = document.querySelector('.send__mail-forgot');
    const massage = document.querySelector(".block__massage--forgot");
    const forgotPopup = document.querySelector('.forgot__popup');
    const authPopup = document.querySelector('.auth__popup');
    const blockMassageError = document.createElement('div');
    sendForgot.addEventListener('click', (e) => {
        e.preventDefault();

        if (document.querySelector('.error__container--email')) {
            let errorContainerMail = document.querySelector('.error__container--email');
            
            errorContainerMail.remove();
        }
        if (document.querySelector('.error__recaptcha')) {
            blockMassageError.innerHTML = '';
            blockMassageError.classList.remove("error__recaptcha");
        }

        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let mail = document.querySelector(".forgot__input--mail").value;
        let error_mail;

        if (mail == '') {
            error_mail = ('Поле должно быть заполнено');

        } else if (reg.test(mail) == false) {
            error_mail = ('Введите корректный Email');
        }

        if (error_mail) {
            let errorContainerMail = document.createElement('div');
            errorContainerMail.classList.add("error__container--email");
            
            let formContainer = document.querySelector(".wrapper__input--email-forgot").appendChild(errorContainerMail);
            errorContainerMail.innerHTML = error_mail;
   
        } else {
            const xhr = new XMLHttpRequest();
            let body = "mail=" + encodeURIComponent(mail);

            xhr.open("POST", path +'handlers/check-forgot.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if (xhr.responseText === 'true') {

                        const text = 'Пароль отправлен на Ваш Email';
                        hintPopup(text);
                        if (forgotPopup.classList.contains('forgot__popup--active')) {
                            forgotPopup.classList.remove('forgot__popup--active');
                        }
                        if (!authPopup.classList.contains('auth__popup--active')) {
                            authPopup.classList.add('auth__popup--active');
                        }
                    }
                    if (xhr.responseText === 'false') {  
                        blockMassageError.classList.add("error__recaptcha");
                        massage.appendChild(blockMassageError);
                        blockMassageError.innerHTML = 'Email не найден';
                    }
                }

            });
        }
    });
    
}

module.exports = checkForgot;