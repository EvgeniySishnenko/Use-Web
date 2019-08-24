const genPath = require('../common/path');
const path = genPath();
function checkFeedBack() {

    let feedbackSend = document.querySelector(".send__feedback");
    let massage = document.querySelector(".block__massage");

    feedbackSend.addEventListener('click', (e) => {
        e.preventDefault();

        if (document.querySelector('.error__container--name')) {
            let errorContainerName = document.querySelector('.error__container--name');
            errorContainerName.remove();
        }
        if (document.querySelector('.error__container--email')) {
            let errorContainerMail = document.querySelector('.error__container--email');
            errorContainerMail.remove();
        }
        if (document.querySelector('.error__container--text')) {
            let errorContainerText = document.querySelector('.error__container--text');
            errorContainerText.remove();
        }
        if (document.querySelector('.true__massage')) {
            let trueMassage = document.querySelector('.true__massage');
            trueMassage.remove();
        }
        if (document.querySelector('.error__recaptcha')) {
            let errorRecaptcha = document.querySelector('.error__recaptcha');
            errorRecaptcha.remove();
        }
        
        let name = document.querySelector(".feedback__input--name").value;
        let mail = document.querySelector(".feedback__input--email").value;
        let text = document.querySelector(".feedback__input--text").value;
        let error_name;
        let error_mail;
        let error_text;
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (name == '') {
            error_name = ('Поле должно быть заполнено');
        } else if (name.length > 15) {
            error_name = ('Не более 15 символов');
        }

        if (mail == '') {
            error_mail = ('Поле должно быть заполнено');

        } else if (reg.test(mail) == false) {
            error_mail = ('Введите корректный Email');
        }

        if (text == '') {
            error_text = 'Поле должно быть заполнено';
        }

        if (error_text || error_mail || error_name) {


            let errorContainerName = document.createElement('div');
            let errorContainerMail = document.createElement('div');
            let errorContainerText = document.createElement('div');

            errorContainerName.classList.add("error__container--name");
            errorContainerMail.classList.add("error__container--email");
            errorContainerText.classList.add("error__container--text");

            if (error_name) {
                let feedbackFormLabel = document.querySelector(".wrapper__input--name").appendChild(errorContainerName);
                errorContainerName.innerHTML = error_name;
            }
            if (error_mail) {
                let feedbackFormLabel = document.querySelector(".wrapper__input--email").appendChild(errorContainerMail);
                errorContainerMail.innerHTML = error_mail;

            }
            if (error_text) {
                let feedbackFormTextarea = document.querySelector(".wrapper__input--text").appendChild(errorContainerText);
                errorContainerText.innerHTML = error_text;
            }
        } else {
           
            const xhr = new XMLHttpRequest();
            let body = "name=" + encodeURIComponent(name) + "&mail=" + encodeURIComponent(mail) + "&text=" + encodeURIComponent(text) + "&g-recaptcha-response=" + grecaptcha.getResponse();
           
            xhr.open("POST", path +'handlers/check-feedback.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                if(xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if(xhr.responseText === 'true') {
                        let trueMassage = document.createElement('div');
                        trueMassage.classList.add("true__massage");
                        massage.appendChild(trueMassage);
                        trueMassage.innerHTML = 'Ваш запрос отправлен. Спасибо за обращение!';
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
                }
                
            });

        }

    });
}
module.exports = checkFeedBack;