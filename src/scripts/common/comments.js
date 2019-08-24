const hintPopup = require('./hintPopup');
const genPath = require('./path');
const path = genPath();
function comments() {
    const reply = document.querySelectorAll('.comments__reply');
    const showComments = document.querySelectorAll('.comments__show');
    const complaintSvg = document.querySelectorAll('.complaint-svg');
    const complaintItem = document.querySelectorAll('.complaint__item');
    const linkAddCode = document.querySelectorAll('.link__add-code');
    const buttonDeleteComments = document.querySelectorAll('.delete__comments');
    const buttonDeleteSubComments = document.querySelectorAll('.delete__sub__comments');

    let buttonComments, buttonSubComments;
    if (document.querySelector('.add__comments')) {
        buttonComments = document.querySelector('.add__comments');
        addComments(buttonComments);
    }
    if (document.querySelectorAll('.add__sub__comments')) {
        buttonSubComments = document.querySelectorAll('.add__sub__comments');
        addSubComments(buttonSubComments);
    }
    deleteSubComments(buttonDeleteSubComments);
    deleteComments(buttonDeleteComments);

    addTag(linkAddCode);
    sendComplaint(complaintItem);
    showComplaintList(complaintSvg);
    showReply(showComments);
    showReplyForm(reply);
}
function deleteSubComments(buttonDeleteSubComments) {
    for (let i = 0; i < buttonDeleteSubComments.length; i++) {
        buttonDeleteSubComments[i].addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            const commentsID = target.getAttribute('data-subcomments');
            const xhr = new XMLHttpRequest();
            let body = "commentsID=" + encodeURIComponent(commentsID);

            xhr.open("POST", path +'handlers/delete-subComment.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                console.log(xhr.responseText);
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if (xhr.responseText === 'true') {
                        window.location.reload();
                    }
                }
            });
        });
    }
}
function deleteComments(buttonDeleteComments) {
    for (let i = 0; i < buttonDeleteComments.length; i++) {
        buttonDeleteComments[i].addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            const commentsID = target.getAttribute('data-comments');
            const xhr = new XMLHttpRequest();
            let body = "commentsID=" + encodeURIComponent(commentsID);

            xhr.open("POST", path +'handlers/delete-comment.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if(xhr.responseText === 'true') {
                        window.location.reload();  
                    }
                }
            });
        });
    }
}
function addSubComments(buttonSubComments) {
    for (let i = 0; i < buttonSubComments.length; i++){
        buttonSubComments[i].addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            const attr = target.getAttribute('data-textarea');
            const textarea = document.querySelector('#' + attr);
            const textareaValue = document.querySelector('#' + attr).value;
            const userID = textarea.getAttribute('data-userID');
            const subCommentsID = textarea.getAttribute('data-subcomments');
            const newsID = textarea.getAttribute('data-news');
            const author = textarea.getAttribute('data-author');
            let error;
            if (textareaValue == '') {
                error = ('Напишите ваш комментарий');
            }
            if (error) {
                let errorContainer = document.createElement('div');
                errorContainer.classList.add("error__container--textarea");

                let wrapTextarea = document.querySelector("#wrap-" + attr).appendChild(errorContainer);
                errorContainer.innerHTML = error;

            } else {
                const xhr = new XMLHttpRequest();
                let body = "userID=" + encodeURIComponent(userID) + "&subCommentsID=" + encodeURIComponent(subCommentsID) + "&newsID=" + encodeURIComponent(newsID) + "&author=" + encodeURIComponent(author) + "&textareaValue=" + encodeURIComponent(textareaValue);

                xhr.open("POST", path +'handlers/add-subComment.php', true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(body);
                xhr.addEventListener('load', () => {
                    if (xhr.status >= 400) {
                        console.log('Что-то пошло не так');
                    } else {
                        if (xhr.responseText == 'addsubcoment') {
                            // let commentsSubList = document.querySelector("#list-" + attr).insertBefore(xhr.responseText);
                            // errorContainer.innerHTML = '';
                            window.location.reload();
                        }
                        if (xhr.responseText == 'false') {
                            let errorContainer = document.createElement('div');
                            errorContainer.classList.add("error__container--textarea");

                            let wrapTextarea = document.querySelector("#wrap-" + attr).appendChild(errorContainer);
                            errorContainer.innerHTML = 'Лишние или незакрытые BB теги';
                        }
                    }
                });
            }

        });
    }
    
}

function addComments(buttonComments) {
    
    buttonComments.addEventListener('click', (e) => {
        e.preventDefault();
        const textarea = document.querySelector('#add-first');
        const textareaValue = document.querySelector('#add-first').value;
        const userID = textarea.getAttribute('data-userID');
        const newsID = textarea.getAttribute('data-news');
        const author = textarea.getAttribute('data-author');
        let error;
        if (textareaValue == '') {
            error = ('Напишите ваш комментарий');
        } 
        if (error) {
            let errorContainer = document.createElement('div');
            errorContainer.classList.add("error__container--textarea");
           
            let wrapTextarea = document.querySelector(".wrap__textarea").appendChild(errorContainer);
            errorContainer.innerHTML = error;
        } else {
            
            const xhr = new XMLHttpRequest();
            let body = "userID=" + encodeURIComponent(userID) + "&newsID=" + encodeURIComponent(newsID) + "&author=" + encodeURIComponent(author) + "&textareaValue=" + encodeURIComponent(textareaValue);

            xhr.open("POST", path +'handlers/add-comment.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if (xhr.responseText == 'addcoment') {
                        window.location.reload();  
                    }
                    if (xhr.responseText == 'false') {
                        let errorContainer = document.createElement('div');
                        errorContainer.classList.add("error__container--textarea");
                        let wrapTextarea = document.querySelector(".wrap__textarea").appendChild(errorContainer);
                        errorContainer.innerHTML = 'Лишние или незакрытые BB теги'; 
                    }
                }
            });
        }
        
    });
}
function addTag(linkAddCode) {
    for (let i = 0; i < linkAddCode.length; i++) {
        linkAddCode[i].addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            const attr = target.getAttribute('href');
            const elem = document.querySelector('#' + attr);
            elem.value += '[pre][/pre]';
        });
    }
}
function sendComplaint(complaintItem) {
    for (let i = 0; i < complaintItem.length; i++) {
        complaintItem[i].addEventListener('click', (e) => {
            const target = e.target;
            const attrId = target.getAttribute('data-id');
            const attrValue = target.getAttribute('data-value');
            const xhr = new XMLHttpRequest();
            let body = "attrId=" + encodeURIComponent(attrId) + "&attrValue=" + encodeURIComponent(attrValue);
            
            xhr.open("POST", path +'handlers/send-complaint.php', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.addEventListener('load', () => {
                console.log(xhr.responseText);
                if (xhr.status >= 400) {
                    console.log('Что-то пошло не так');
                } else {
                    if (xhr.responseText === 'true') {
                        const text = 'Спасибо! Пометка отправлена';
                        hintPopup(text);
                    }
                }
            });
        }); 
    }
}
function showComplaintList(complaintSvg) {
    for (let i = 0; i < complaintSvg.length; i++) {
        complaintSvg[i].addEventListener('click', (e) => {
            const target = getCurrentZone(e.target);
            const attr = target.getAttribute('data-complaint');
            const elem = document.querySelector('#' + attr);
            elem.classList.toggle('complaint__list--active');
            target.classList.toggle('complaint-svg--active');

        });
    }
}
function showReplyForm(reply) {
    for (let i = 0; i < reply.length; i++) {
        reply[i].addEventListener('click', (e) => {
            const target = e.target;
            const attr = target.getAttribute('data-reply');
            const elem = document.querySelector('#' + attr);
            const form = elem.firstElementChild;
            const commentsShow = target.nextElementSibling.nextElementSibling;
        
            if(elem.classList.contains('wrap__sub__comments--active')){
                form.classList.toggle('wrap__form--active');
            }else {
                elem.classList.add('wrap__sub__comments--active');
                form.classList.add('wrap__form--active');
                if (document.querySelector('.comments__show')) {
                    commentsShow.classList.add('comments__show--up');
                }
                
            }
            
            
        });

    }
}

function showReply(showComments) {
    for (let i = 0; i < showComments.length; i++) {
        showComments[i].addEventListener('click', (e) => {
            const target = e.target;
            const elem = target.nextElementSibling;
            const form = elem.firstElementChild;
            
            if (form.classList.contains('wrap__form--active')) {
                form.classList.remove('wrap__form--active');
            }
            if (target.classList.contains('comments__show--up')) {
                target.classList.remove('comments__show--up');
            }else {
                target.classList.add('comments__show--up');
            }
            elem.classList.toggle('wrap__sub__comments--active');
        });
    }
}
function getCurrentZone(from) {
    do {
        if (from.classList.contains('complaint-svg')) {
            return from;
        }
    } while (from = from.parentElement);
}
module.exports = comments;