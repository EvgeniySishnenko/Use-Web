const genPath = require('../common/path');
const path = genPath();
function loadLastName() {
    const mail = document.querySelector('#emailValue');
    const xhr = new XMLHttpRequest();
    let body;

    xhr.open("POST", path +'handlers/load-mail.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(body);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            console.log('Что-то пошло не так');
        } else {
            if (xhr.responseText) {
                mail.innerHTML = xhr.responseText;
            }

        }

    });

}

module.exports = loadLastName;