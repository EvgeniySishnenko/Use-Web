function tabs () {
    const list = document.querySelector('.tabs__list');
    const items = document.querySelectorAll('.tabs__item');
    const contantItem = document.querySelectorAll('.contant__tabs__item');

    for (let i = 0; i < contantItem.length; i++) {
        contantItem[i].style.display = 'none'; // скрываем все блоки где отображается содержимое табов
        contantItem[i].id = 'tabs-' + i;  // присваиваем id
    }
    contantItem[0].style.display = 'block';
    contantItem[0].style.opacity = '1'; // показваем первый эелемн табов
   
  
    for (let i = 0; i < items.length; i++) {
        items[i].setAttribute('data-item', '#tabs-' + i); // устан аттрибут
        
        items[i].addEventListener('click', () => {

            for (let i = 0; i < contantItem.length; i++) {
                contantItem[i].style.display = 'none'; // скрываем все блоки где отображается содержимое табов
                contantItem[i].style.opacity = '0';
            }

            const attr = items[i].getAttribute('data-item');
            const itemsAttr = document.querySelector(attr);
            
            itemsAttr.style.display = 'block';
            let op = 0;
            while (op <= 1) {
                (function (_op) {
                    setTimeout(function () { itemsAttr.style.opacity = _op; }, 60 + op * 600);
                })(op);
                op += 0.1;
            }

            for (let x = 0; x < items.length; x++) {
                items[x].classList.remove('tabs__item--active');
            }

            items[i].classList.add('tabs__item--active');

        });
    }
}
module.exports = tabs;