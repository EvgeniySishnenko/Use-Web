const genPath = require('../common/path');
const path = genPath();
function loadName() {
    const authName = document.querySelector('.auth__name');
    const firstName = document.querySelector('#firstNameValue');

    const xhr = new XMLHttpRequest();
    let body;

    xhr.open("POST", path +'handlers/load-name.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(body);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            console.log('Что-то пошло не так');
        } else {
            if (xhr.responseText != 'firstNameValue') {
                authName.innerHTML = xhr.responseText;
                firstName.innerHTML = xhr.responseText;
            }
           
        }

    });

}

module.exports = loadName;