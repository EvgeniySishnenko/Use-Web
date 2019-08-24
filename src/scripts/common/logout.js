const genPath = require('./path');
const path = genPath();
function logout() {
    const logoutLink = document.querySelectorAll('.logout');

    for (let i = 0; i < logoutLink.length; i++) {
        logoutLink[i].addEventListener('click', (e) => {
            e.preventDefault();
            const xhr = new XMLHttpRequest();
            let body;
            xhr.open("POST", path +'handlers/logout.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if (xhr.responseText === 'true') {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }

                }
            });
        });
    }
    
}
module.exports = logout;