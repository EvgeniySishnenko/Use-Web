const xhrProfile = require('./xhrProfile');

function errorHandler(buttons) {

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', e => {
            e.preventDefault();
            const target = e.target;
            const buttonAttr = target.dataset.button;

            const form = document.querySelector('#' + buttonAttr + 'Form');
            const errorContainer = document.querySelector('#' + buttonAttr + 'Error');
            if (buttonAttr == 'pass') {
                const inputPassOldVal = document.querySelector('#' + buttonAttr + 'OldInput').value;
                const inputPassNewVal = document.querySelector('#' + buttonAttr + 'NewInput').value;
                const inputPassOld = document.querySelector('#' + buttonAttr + 'OldInput');
                const inputPassNew = document.querySelector('#' + buttonAttr + 'NewInput');
                if (buttonAttr == 'pass') {
                    let error;

                    if (inputPassNewVal == '' || inputPassOldVal == '') {
                        error = ('Введите пароль');
                    } else if (inputPassNewVal.length > 15) {
                        error = ('Новый пароль должен содержать не более 15 символов');
                    } else if (inputPassNewVal.length < 7) {
                        error = ('Новый пароль должен содержать не менее 7 символов');
                    }

                    if (error) {
                        form.appendChild(errorContainer);
                        errorContainer.innerHTML = error;
                        inputPassOld.style.border = '1px solid #d55a5a';
                        inputPassNew.style.border = '1px solid #d55a5a';
                    } else {
                        xhrProfile(inputPassOldVal, inputPassNewVal, buttonAttr);
                        
                    }
                }
            } else {
                const input = document.querySelector('#' + buttonAttr + 'Input');
                const inputValue = input.value;
                if (buttonAttr == 'firstName') {
                    let error;
                    if (inputValue == '') {
                        error = ('Поле должно быть заполнено');
                    } else if (inputValue.length > 15) {
                        error = ('Не более 15 символов');
                    }

                    if (error) {
                        form.appendChild(errorContainer);
                        errorContainer.innerHTML = error;
                        input.style.border = '1px solid #d55a5a';

                    } else {         
                        xhrProfile(inputValue, buttonAttr);
                    }
                }

                if (buttonAttr == 'lastName') {
                    let error;
                    if (inputValue == '') {
                        error = ('Поле должно быть заполнено');
                    } else if (inputValue.length > 20) {
                        error = ('Не более 20 символов');
                    }

                    if (error) {
                        form.appendChild(errorContainer);
                        errorContainer.innerHTML = error;
                        input.style.border = '1px solid #d55a5a';

                    } else {
                        xhrProfile(inputValue, buttonAttr);
                    }
                }

                if (buttonAttr == 'login') {
                    let error;
                    if (inputValue == '') {
                        error = ('Поле должно быть заполнено');
                    } else if (inputValue.length > 15) {
                        error = ('Не более 15 символов');
                    }

                    if (error) {
                        form.appendChild(errorContainer);
                        errorContainer.innerHTML = error;
                        input.style.border = '1px solid #d55a5a';

                    } else {
                        xhrProfile(inputValue, buttonAttr);
                    }
                }

                if (buttonAttr == 'email') {
                    let error;
                    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    if (inputValue == '') {
                        error = ('Поле должно быть заполнено');
                    } else if (reg.test(inputValue) == false) {
                        error = ('Введите корректный Email');
                    }

                    if (error) {
                        form.appendChild(errorContainer);
                        errorContainer.innerHTML = error;
                        input.style.border = '1px solid #d55a5a';

                    } else {
                        xhrProfile(inputValue, buttonAttr);
                    }
                }
            }

        });
    }
}
module.exports = errorHandler;