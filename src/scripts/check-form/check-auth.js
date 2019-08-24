const hintPopup = require('../common/hintPopup');
const genPath = require('../common/path');
const path = genPath();
function auth() {

    let authSend = document.querySelector(".send__auth");
    let massage = document.querySelector(".block__massage--auth");

    authSend.addEventListener('click', (e) => {
        e.preventDefault();  
        if (document.querySelector('.error__container--login')) {
            let errorContainerLogin = document.querySelector('.error__container--login');
            errorContainerLogin.remove();
        }
        if (document.querySelector('.error__container--pass')) {
            let errorContainerPass = document.querySelector('.error__container--pass');
            errorContainerPass.remove();
        }
       
        if (document.querySelector('.true__massage')) {
            let trueMassage = document.querySelector('.true__massage');
            trueMassage.remove();
        }
        if (document.querySelector('.error__recaptcha')) {
            let errorRecaptcha = document.querySelector('.error__recaptcha');
            errorRecaptcha.remove();
        }

       

        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let mail = document.querySelector(".auth__input--login").value;
        let pass = document.querySelector(".auth__input--pass").value;

       
        let error_mail;
        let error_pass;

      
        if (mail == '') {
            error_mail = ('Поле должно быть заполнено');

        } else if (reg.test(mail) == false) {
            error_mail = ('Введите корректный Email');
        }
        if (pass == '') {
            error_pass = ('Поле должно быть заполнено');
        } 


        if (error_mail || error_pass) {

            let errorContainerLogin = document.createElement('div');
            let errorContainerPass = document.createElement('div');

            errorContainerLogin.classList.add("error__container--login");
            errorContainerPass.classList.add("error__container--pass");

          
            if (error_mail) {
                let formContainer = document.querySelector(".wrapper__input--login--auth").appendChild(errorContainerLogin);
                errorContainerLogin.innerHTML = error_mail;
            }
            if (error_pass) {
                let formContainer = document.querySelector(".wrapper__input--pass--auth").appendChild(errorContainerPass);
                errorContainerPass.innerHTML = error_pass;
            }
          
        } else {
            
            const xhr = new XMLHttpRequest();
            let body = "mail=" + encodeURIComponent(mail) + "&pass=" + encodeURIComponent(pass);

            xhr.open("POST", path +'handlers/check-auth.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if (xhr.responseText === 'true') {
                        
                        const text = 'Вы авторизованы';
                        hintPopup(text);
                        setTimeout(() => {
                            window.location.reload();  
                        }, 3000);
                    }                   
                    if (xhr.responseText === 'false_auth') {
                        let blockMassageError = document.createElement('div');
                        blockMassageError.classList.add("error__recaptcha");
                        massage.appendChild(blockMassageError);
                        blockMassageError.innerHTML = 'Пароль или логин не совпадают';
                    }
                }

            });

        }

    });
}
module.exports = auth;