const genPath = require('./path');
const path = genPath();
function like () {
    const likeSVG =  document.querySelector('.like-svg');
    const dislikeSVG = document.querySelector('.dislike-svg');

    likeSVG.addEventListener('click', () => {
        const id = likeSVG.dataset.id;
        sendXHR(id, 'like', likeSVG);

    });
    dislikeSVG.addEventListener('click', () => {
        const id = dislikeSVG.dataset.id;
        sendXHR(id, 'dislike', dislikeSVG);    
    });
}
function sendXHR (id, like, elem) {
    const xhr = new XMLHttpRequest();
    let body = "id=" + encodeURIComponent(id) + "&like=" + encodeURIComponent(like);
    xhr.open("POST", path +'handlers/addlike.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(body);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            console.log('Что-то пошло не так');
        } else {
            if (xhr.responseText === 'add') {
                elem.classList.add('like-svg--click');
            }
            if (xhr.responseText === 'remove') {
                elem.classList.remove('like-svg--click');
            }
        }
    });

}

module.exports = like;