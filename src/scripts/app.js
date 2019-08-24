const jquery = require("jquery");
const $ = require("jquery");
const jQuery = require("jquery");
window.jQuery = $;
const fancybox = require("@fancyapps/fancybox");
const fancyboxShow = require("./fancybox/fancybox");

const menuMobile = require('./common/menu-mobile');
const accordion = require('./common/accordion');
const checkFeedback = require('./check-form/check-feedback');
const registration = require('./check-form/check-registration');
const auth = require('./check-form/check-auth');
const clickName = require('./common/click-name');
const like = require('./common/like');
const tabs = require('./common/tab'); 
const catMobButton = require('./common/category-mobile');
const editProfile = require('./editProfileForm/edit-profile');
const formPopup = require('./common/form-popup');
const checkForgot = require('./check-form/check-forgot');
const comments = require('./common/comments');
const logout = require('./common/logout');
const tests = require('./test/tests'); 
const titleHome = require('./common/titleHome');
const scrollX = require('./common/scrollX');
const drop = require('./drop/drop');
const srcollAnimate = require('./common/srcollAnimate');
const genpass = require('./genpass/genpass'); 
const clickTopMenu = require('./common/clickTopMenu'); 

if (document.querySelector('.genpass')) {
    genpass();
}
if (document.querySelector('.article')) {
    fancyboxShow();
}

if (document.querySelector('.section_tests')) {
    drop();
}

if (document.querySelector('.block__title-wr')) {
    scrollX();
    
}
if (document.querySelector('.first-screen-wr')) {
    titleHome();
}
if (document.querySelector('.menu_mobile')) {
    menuMobile();
}
if (document.querySelector('.accordion')) {
    accordion();
}
if (document.querySelector('.form__feedback')) {
    checkFeedback();
}
if (document.querySelector('.form__registration')) {
    registration();
}
if (document.querySelector('.form__auth')) {
    auth();
}
if (document.querySelector('.block__auth')) {
    clickName();
}
if (document.querySelector('.block__like')) {
    like();
}
if (document.querySelector('.tabs')) {
    tabs();
}
if (document.querySelector('.block__button--category')) {
    catMobButton();
}
if (document.querySelector('.block__profile')) {
    editProfile();
} 
if (document.querySelector('.menu__link')) {
    clickTopMenu();
} 

if (document.querySelector('.wrapper')) {
    formPopup();
    checkForgot();
    logout();
    srcollAnimate();
}
if (document.querySelector('.container__comments')) {
    comments();
}
if (document.querySelector('.form__test')) {
    tests();
}