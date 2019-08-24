function clickTopMenu() {
    const menuClick = document.querySelector('.menu-click');
    const subMenu = document.querySelector('.sub-menu__list');

    menuClick.addEventListener('click', ()=>{
        subMenu.classList.toggle('sub-menu-toggle')
    });
}
module.exports = clickTopMenu;