const hintPopup = require('../common/hintPopup');
const loadName = require('./loadName');
const loadLastName = require('./loadLastName'); 
const loadLogin = require('./loadLogin'); 
const loadEmail = require('./loadEmail'); 
const genPath = require('../common/path');
const path = genPath();
function xhrProfile () {
    const xhr = new XMLHttpRequest();
    let oldPass, newPass, flag, firstName, lastName, login, email, body;
   
    if (arguments.length == 3) {
        [oldPass, newPass, flag] = arguments;
        body = "oldPass=" + encodeURIComponent(oldPass) + "&newPass=" + encodeURIComponent(newPass);
        xhr.open("POST", path +'handlers/edit-profile-pass.php', true);
       
    }
    
    if (arguments[1] == 'firstName') {
        [firstName, flag] = arguments;
        body = "firstName=" + firstName;
        xhr.open("POST", path +'handlers/edit-profile-firstname.php', true);
    }
    if (arguments[1] == 'lastName') {
        [lastName, flag] = arguments;
        body = "lastName=" + lastName;
        xhr.open("POST", path +'handlers/edit-profile-lastname.php', true);
    }
    if (arguments[1] == 'login') {
        [login, flag] = arguments;
        body = "login=" + login;
        xhr.open("POST", path +'handlers/edit-profile-login.php', true);
    }
    if (arguments[1] == 'email') {
        [email, flag] = arguments;
        body = "email=" + email;
        xhr.open("POST", path +'handlers/edit-profile-email.php', true);
    } 
    
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(body);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            console.log('Что-то пошло не так');
        } else {
            
            if (xhr.responseText === 'truePass') {
                const errorCont = document.querySelector('#passError');
                const text = 'Пароль успешно изменен';
                const inputPassOld = document.querySelector('#passOldInput');
                const inputPassNew = document.querySelector('#passNewInput');
                inputPassOld.style.border = '1px solid #88aca8';
                inputPassNew.style.border = '1px solid #88aca8';
                errorCont.innerHTML = '';
                hintPopup(text);

            }
            if (xhr.responseText === 'errorPass') {
                const errorCont = document.querySelector('#passError');
                const form = document.querySelector('#passForm');
                form.appendChild(errorCont);
                errorCont.innerHTML = 'Старый пароль не совпадает';
                
            }
            
            if (xhr.responseText === 'trueFirstName') {
               
                const errorCont = document.querySelector('#firstNameError');
                const text = 'Имя успешно изменено';
                const input = document.querySelector('#firstNameInput');
                input.style.border = '1px solid #88aca8';
                errorCont.innerHTML = '';
                hintPopup(text);
                loadName();
            }
            if (xhr.responseText === 'trueLastName') {
                const errorCont = document.querySelector('#lastNameError');
                const text = 'Фамилия успешно изменена';
                const input = document.querySelector('#lastNameInput');
                input.style.border = '1px solid #88aca8';
                errorCont.innerHTML = '';
                hintPopup(text);
                loadLastName();
            }
            if (xhr.responseText === 'trueLogin') {
                const errorCont = document.querySelector('#loginError');
                const text = 'Логин успешно изменен';
                const input = document.querySelector('#loginInput');
                input.style.border = '1px solid #88aca8';
                errorCont.innerHTML = '';
                hintPopup(text);
                loadLogin();
            }
            if (xhr.responseText === 'falseLogin') {
                const errorCont = document.querySelector('#loginError');
                const form = document.querySelector('#loginForm');
                form.appendChild(errorCont);
                errorCont.innerHTML = 'Логин занят';
                
            }
            if (xhr.responseText === 'trueEmail') {
                const errorCont = document.querySelector('#emailError');
                const text = 'Email успешно изменен';
                const input = document.querySelector('#emailInput');
                input.style.border = '1px solid #88aca8';
                errorCont.innerHTML = '';
                hintPopup(text);
                loadEmail();
            }
            if (xhr.responseText === 'falseEmail') {
                const errorCont = document.querySelector('#emailError');
                const form = document.querySelector('#emailForm');
                form.appendChild(errorCont);
                errorCont.innerHTML = 'Email занят';
            }

            
        }
    });
}
module.exports = xhrProfile;