const buttons = document.querySelectorAll('.form__test--button');
const items = document.querySelectorAll('.form__test--item');
const form = document.querySelector('.form__test');
const navList = document.querySelector('.navigation__question--list');
const blockNav = document.querySelector('.navigation__question');
const blockResult = document.querySelector('.block__result');
const blockButtons = document.querySelector('.block__buttons');
const navBlock = document.querySelector('.navigation__question--list');
const genPath = require('../common/path');
const path = genPath();
if (document.querySelector('.form__test--item')) {
    const item = document.querySelector('.form__test--item').classList.add('showing');
}

let inp, handler;
let currentSlide = 0;
let curItemNav = 0;
let currInp = 1;
let arr = [];
let map =  {};


if(sessionStorage.getItem('map')){
    currentSlide = JSON.parse(sessionStorage.getItem('map')).currentSlide;
    curItemNav = JSON.parse(sessionStorage.getItem('map')).curItemNav;
    currInp = JSON.parse(sessionStorage.getItem('map')).currInp;
    handler = JSON.parse(sessionStorage.getItem('map')).handler;
    arr = JSON.parse(sessionStorage.getItem('map')).arr; 
}

function tests() {
    updateResult();
    createItems();
    updateSlide(currentSlide);
    updateNav(currentSlide);
    resetTest();
    deleteSession();
    for (let i = 0; i < buttons.length; i++) {
        const buttonsID = buttons[i].getAttribute('id');
        const buttonsElem = document.getElementById(buttonsID);
        
        buttonsElem.addEventListener('click', (e) => {
            e.preventDefault();
            handler = e.target.getAttribute('data-handlers');
            inp = document.getElementsByName('level' + currInp);

            for (let i = 0; i < inp.length; i++) {
              
                if (inp[i].type == "radio" && inp[i].checked)  {
                    goToSlide(currentSlide + 1);
                    goToItemNav(curItemNav + 1);
                    currInp++;
                    addArray(inp[i]);
                }
            }
            map = {
                currentSlide: currentSlide,
                curItemNav: curItemNav,
                currInp: currInp,
                handler: handler,
                arr: arr
            }
            if (!sessionStorage.getItem('map')) {
                sessionStorage.setItem('map', JSON.stringify(map));
            } else {
                sessionStorage['map'] = JSON.stringify(map);
            }
        });     
    }
    
}
function deleteSession(){
    if (document.querySelector('.delete__session')) {
        let del = document.querySelector('.delete__session');
        del.addEventListener('click', ()=> {
            sessionStorage.clear();
        });
    }
}
function resetTest() {
    blockButtons.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('button__reset')) {
            e.preventDefault();
            setTimeout(function () {
                sessionStorage.clear();
                window.location.reload();
            }, 500);
        }
        if (target.classList.contains('link__hometests')) {
            sessionStorage.clear();
           
        }
        
    });
}
function updateNav(n) {
    if (sessionStorage.getItem('map')) {
        const itemsNavActive = document.querySelectorAll('.navigation__question--item');
        const item = document.querySelector('.navigation__question--item');
        item.classList.remove('active__question');
        itemsNavActive[curItemNav].className = 'navigation__question--item';
        curItemNav = (n + itemsNavActive.length) % itemsNavActive.length; // остаток от деления
        itemsNavActive[curItemNav].className = 'navigation__question--item active__question';
        const current = document.querySelector('.navigation__question--current');
        current.innerHTML = n + 1 + ' ';
    }
}
function updateSlide(n) {
    if (sessionStorage.getItem('map')) {
        const item = document.querySelector('.form__test--item');
        const itemsNavActive = document.querySelectorAll('.navigation__question--item');
        
       
        if (currInp-1 === itemsNavActive.length) {
            form.style.display = 'none';
            blockNav.style.display = 'none';
            blockResult.style.display = 'block';
        } else {
            item.classList.remove('showing');
            items[currentSlide].className = 'form__test--item';
            currentSlide = (n + items.length) % items.length; // остаток от деления
            items[currentSlide].className = 'form__test--item showing';
        }
    }
  
}
function updateResult() {
    if (sessionStorage.getItem('map')) {
        const xhr = new XMLHttpRequest();
        let body;

        xhr.open("POST", path +'handlers/' + handler, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(body);
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                console.log('Что-то пошло не так');
            } else {
                if (xhr.responseText) {
                    const obj = JSON.parse(xhr.responseText);
                    if (blockResult.style.display == 'block') {
                        addToResult(obj, JSON.parse(sessionStorage.getItem('map')).arr);
                    }
      
                } else {
                    console.log('Пусто');
                }

            }
        });
    }
   
}
function createItems() {

    for (let i = 0; i < items.length; i++) {
        const createItem = document.createElement('li');
        createItem.classList.add('navigation__question--item');
        navList.appendChild(createItem);
        createItem.innerHTML = i + 1;
    }
    const itemNavActive = document.querySelector('.navigation__question--item');
    itemNavActive.classList.add('active__question');
}

function goToItemNav(n) {
  
        const itemsNavActive = document.querySelectorAll('.navigation__question--item');
        itemsNavActive[curItemNav].className = 'navigation__question--item';
        curItemNav = (n + itemsNavActive.length) % itemsNavActive.length; // остаток от деления
        itemsNavActive[curItemNav].className = 'navigation__question--item active__question';
 
        const current = document.querySelector('.navigation__question--current');
        current.innerHTML = n +1 + ' ';
}

function goToSlide(n) {
    const itemsNavActive = document.querySelectorAll('.navigation__question--item');
    if (currInp != itemsNavActive.length) {

        items[currentSlide].className = 'form__test--item';
        currentSlide = (n + items.length) % items.length; // остаток от деления
        items[currentSlide].className = 'form__test--item showing';

    }
    if (currInp === itemsNavActive.length) {
        form.style.display = 'none';
        blockNav.style.display = 'none';
        blockResult.style.display = 'block';
        getContent();
    }
    
}
function addArray(input) {
    if (input.type == "radio" && input.checked) {
        const inpVal = input.value;
        const inpBoolean = input.getAttribute('data-boolean');
        const levelVal = input.getAttribute('name');       
        arr.push({
            val: inpVal,
            bool: inpBoolean,
            level: levelVal,
        });
        map.array = arr;
        if (!sessionStorage.getItem('map')) {
            sessionStorage.setItem('map', JSON.stringify(map));
        } else {
            sessionStorage['map'] = JSON.stringify(map);
        }
    }
}
function getContent() {
    const xhr = new XMLHttpRequest();
    let body;

    xhr.open("POST", path +'handlers/' + handler, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(body);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            console.log('Что-то пошло не так');
        } else {
            if (xhr.responseText) {
                const obj = JSON.parse(xhr.responseText);
                addToResult(obj, arr);
            }else {
                console.log('Пусто');
            }
            
        }
    });
   
}

function addToResult(obj, arr) {
    const resList = document.querySelector('.result__list');    
    let container1, container2, divTitle, divAnswers, cont;
    
    for (let level in obj) {
        const createItem = document.createElement('li');
        const divTitle = document.createElement('div');
        const divWrapper = document.createElement('div');
        createItem.classList.add('result__item');
        divTitle.classList.add('result__title');
        divWrapper.classList.add('wrapper__result');
        

        resList.appendChild(createItem);
        createItem.appendChild(divTitle);
        createItem.appendChild(divWrapper);

        container1 = obj[level]["question"]; // Вопрос       
        divTitle.innerHTML = container1;
 
        for (answer of obj[level]["answers"]) {
            divAnswers = document.createElement('div');
            divAnswers.classList.add('answer');
            divWrapper.appendChild(divAnswers);
            container2 = answer[0];// Список ответов
            divAnswers.innerHTML = container2;
            cont = answer[2];

            for (val of arr) {
                if (val.bool == 'true' && answer[1] == 'true' && answer[3] == val.val) {
                    divAnswers.classList.add('answer--true');
                }
                if (val.bool == 'false' && answer[1] == 'false' && answer[3] == val.val) {
                    divAnswers.classList.add('answer--false');
                   
                }else {
                    if (answer[1] == 'true') {
                        divAnswers.classList.add('answer--true');
                    } 
                }   
            } 
            
        } 
        for (val of arr) {
            if (val.bool == 'true' && cont == val.level) {
                createItem.classList.add('result__item--true');
            }
            if (val.bool == 'false' && cont == val.level) {
                createItem.classList.add('result__item--false');
               
            } 
        } 


    } 
    
}

module.exports = tests;