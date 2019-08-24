const hintPopup = require('../common/hintPopup');
const genPath = require('../common/path');
const path = genPath();
function registration() {

    let registrationSend = document.querySelector(".send__registration");
    let massage = document.querySelector(".block__massage");

    registrationSend.addEventListener('click', (e) => {
        e.preventDefault();

        if (document.querySelector('.error__container--name')) {
            let errorContainerName = document.querySelector('.error__container--name');
            errorContainerName.remove();
        }
        if (document.querySelector('.error__container--lastname')) {
            let errorContainerLastName = document.querySelector('.error__container--lastname');
            errorContainerLastName.remove();
        }
        if (document.querySelector('.error__container--email')) {
            let errorContainerMail = document.querySelector('.error__container--email');
            errorContainerMail.remove();
        }
        if (document.querySelector('.error__container--login')) {
            let errorContainerLogin = document.querySelector('.error__container--login');
            errorContainerLogin.remove();
        }
        if (document.querySelector('.error__container--pass')) {
            let errorContainerPass = document.querySelector('.error__container--pass');
            errorContainerPass.remove();
        }
        if (document.querySelector('.error__container--repeat--pass')) {
            let errorContainerRepeatPass = document.querySelector('.error__container--repeat--pass');
            errorContainerRepeatPass.remove();
        }
        if (document.querySelector('.true__massage')) {
            let trueMassage = document.querySelector('.true__massage');
            trueMassage.remove();
        }
        if (document.querySelector('.error__recaptcha')) {
            let errorRecaptcha = document.querySelector('.error__recaptcha');
            errorRecaptcha.remove();
        }

        let name = document.querySelector(".registration__input--name").value;
        let lastName = document.querySelector(".registration__input--lastname").value;
        let mail = document.querySelector(".registration__input--email").value;
        let login = document.querySelector(".registration__input--login").value;
        let pass = document.querySelector(".registration__input--pass").value;
        let repeatPass = document.querySelector(".registration__input--repeat--pass").value;

        let error_name;
        let error_lastName;
        let error_mail;
        let error_login;
        let error_checkLogin;
        let error_pass;
        let error_repeat_pass;
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (name == '') {
            error_name = ('Поле должно быть заполнено');
        } else if (name.length > 15) {
            error_name = ('Не более 15 символов');
        }
        if (lastName == '') {
            error_lastName = ('Поле должно быть заполнено');
        } else if (lastName.length > 20) {
            error_lastName = ('Не более 20 символов');
        } 
        
        if (mail == '') {
            error_mail = ('Поле должно быть заполнено');

        } else if (reg.test(mail) == false) {
            error_mail = ('Введите корректный Email');
        } 
        
        if (login == '') {
            error_login = ('Поле должно быть заполнено');
        } else if (login.length > 15) {
            error_login = ('Не более 15 символов');
        } 
        
       
        if (pass == '') {
            error_pass = ('Поле должно быть заполнено');
        } else if (pass.length > 15) {
            error_pass = ('Не более 15 символов');
        }else if (pass.length < 7) {
            error_pass = ('Не менее 7 символов');
        }

        if (repeatPass == '') {
            error_repeat_pass = ('Поле должно быть заполнено');
        } else if (repeatPass != pass) {
            error_repeat_pass = ('Пароли не совпадают');
        }
   
        
        if (error_lastName || error_mail || error_name || error_login || error_pass || error_repeat_pass) {


            let errorContainerName = document.createElement('div');
            let errorContainerLastName = document.createElement('div');
            let errorContainerMail = document.createElement('div');
            let errorContainerLogin = document.createElement('div');
            let errorContainerPass = document.createElement('div');
            let errorContainerRepeatPass = document.createElement('div');

            errorContainerName.classList.add("error__container--name");
            errorContainerLastName.classList.add("error__container--lastname");
            errorContainerMail.classList.add("error__container--email");
            errorContainerLogin.classList.add("error__container--login");
            errorContainerPass.classList.add("error__container--pass");
            errorContainerRepeatPass.classList.add("error__container--repeat--pass");

            if (error_name) {
                let formContainer = document.querySelector(".wrapper__input--name").appendChild(errorContainerName);
                errorContainerName.innerHTML = error_name;
            }
            if (error_lastName) {
                let formContainer = document.querySelector(".wrapper__input--lastname").appendChild(errorContainerLastName);
                errorContainerLastName.innerHTML = error_lastName;
            }
            if (error_mail) {
                let formContainer = document.querySelector(".wrapper__input--email").appendChild(errorContainerMail);
                errorContainerMail.innerHTML = error_mail;

            }
            if (error_login) {
                let formContainer = document.querySelector(".wrapper__input--login").appendChild(errorContainerLogin);
                errorContainerLogin.innerHTML = error_login;
            }
            if (error_pass) {
                let formContainer = document.querySelector(".wrapper__input--pass").appendChild(errorContainerPass);
                errorContainerPass.innerHTML = error_pass;
            }
            if (error_repeat_pass) {
                let formContainer = document.querySelector(".wrapper__input--repeat--pass").appendChild(errorContainerRepeatPass);
                errorContainerRepeatPass.innerHTML = error_repeat_pass;
            }



        } else {       

            const xhr = new XMLHttpRequest();
            let body = "name=" + encodeURIComponent(name) + "&lastName=" + encodeURIComponent(lastName) + "&mail=" + encodeURIComponent(mail) + "&login=" + encodeURIComponent(login) + "&pass=" + encodeURIComponent(pass)  + "&g-recaptcha-response=" + grecaptcha.getResponse();

            xhr.open("POST", path +'handlers/check-registration.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                   
                    if (xhr.responseText === 'true') {
                        const text = 'Вы успешно зарегистрированы';
                        const authPopup = document.querySelector('.auth__popup');
                        hintPopup(text);

                        let name1 = document.querySelector(".registration__input--name").value = '';
                        let lastName1 = document.querySelector(".registration__input--lastname").value = '';
                        let mail1 = document.querySelector(".registration__input--email").value = '';
                        let login1 = document.querySelector(".registration__input--login").value = '';
                        let pass1 = document.querySelector(".registration__input--pass").value = '';
                        let repeatPass1 = document.querySelector(".registration__input--repeat--pass").value = '';
                    }
                    if (xhr.responseText === 'error') {
                    
                        let errorRecaptcha = document.createElement('div');
                        errorRecaptcha.classList.add("error__recaptcha");
                        massage.appendChild(errorRecaptcha);
                        errorRecaptcha.innerHTML = 'Не удалось отправить запрос. Попробуйте снова';
                    }
                    if (xhr.responseText === 'no-recaptcha') {
                       
                        let errorRecaptcha = document.createElement('div');
                        errorRecaptcha.classList.add("error__recaptcha");
                        massage.appendChild(errorRecaptcha);
                        errorRecaptcha.innerHTML = 'Пройдите каптчу!';
                    }
                    if (xhr.responseText === 'error_mail') {

                        let errorRecaptcha = document.createElement('div');
                        errorRecaptcha.classList.add("error__recaptcha");
                        massage.appendChild(errorRecaptcha);
                        errorRecaptcha.innerHTML = 'Такой Email уже есть';
                    }
                    if (xhr.responseText === 'error_login') {

                        let errorRecaptcha = document.createElement('div');
                        errorRecaptcha.classList.add("error__recaptcha");
                        massage.appendChild(errorRecaptcha);
                        errorRecaptcha.innerHTML = 'Такой Логин есть';
                    }
                    if (xhr.responseText === 'error_login_mail') {

                        let errorRecaptcha = document.createElement('div');
                        errorRecaptcha.classList.add("error__recaptcha");
                        massage.appendChild(errorRecaptcha);
                        errorRecaptcha.innerHTML = 'Такой Логин и Email уже есть';
                    }
                }
                

            });

        }

    });
}
module.exports = registration;