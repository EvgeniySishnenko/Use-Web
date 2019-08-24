const genPath = require('../common/path');
const path = genPath();
function loadLastName() {
    const lastName = document.querySelector('#lastNameValue');
    const xhr = new XMLHttpRequest();
    let body;

    xhr.open("POST", path +'handlers/load-lastname.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(body);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            console.log('Что-то пошло не так');
        } else {
            if (xhr.responseText) {
                lastName.innerHTML = xhr.responseText;
            }
            
        }

    });

}

module.exports = loadLastName;