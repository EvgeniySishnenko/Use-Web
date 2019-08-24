const display = require('./display');
const createItem = require('./createItem');
const getCurrentZone = require('../common/getCurrentZone');

function drop () {
    let currentDrag;

    document.addEventListener('dragstart', (e) => {
        const zone = getCurrentZone(e.target, 'drop-zone');

        if (zone) {
            currentDrag = { startZone: zone, node: e.target };
        }
    });

    document.addEventListener('dragover', (e) => {
        const zone = getCurrentZone(e.target, 'drop-zone');

        if (zone) {
            e.preventDefault();
        }
    });
   
    document.addEventListener('drop', (e) => {
        if (currentDrag) {
            const zone = getCurrentZone(e.target, 'drop-zone');
           
            e.preventDefault();

            if (zone && currentDrag.startZone !== zone) {

                if (e.target.classList.contains('tests__item')) {
                    zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
                } else {
                    zone.insertBefore(currentDrag.node, zone.lastElementChild);
                }
                const pls = currentDrag.node.querySelector('.item-pls');
                const del = currentDrag.node.querySelector('.item-del');

                if (pls) {
                    const newDiv = createItem('item-del');
                    currentDrag.node.replaceChild(newDiv, pls);
                }else {
                    const newDiv = createItem('item-pls');
                    currentDrag.node.replaceChild(newDiv, del);
                }

                display(currentDrag.node);
               
            }

            currentDrag = null;
        }
    });

    const wrapper = document.querySelector('.wrap_test');
   
    wrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('item-pls')) {
            let elem = e.target;
            let li = elem.closest('.tests__item');

            const newDiv = createItem('item-del');
            const del = li.querySelector('.item-pls');
            li.replaceChild(newDiv, del);

            const result = document.querySelector('.tests__list-right');
            result.appendChild(li);

            display(li);
           
        }
        if (e.target.classList.contains('item-del')) {
            let elem = e.target;
            let li = elem.closest('.tests__item');

            const newDiv = createItem('item-pls');
            const del = li.querySelector('.item-del');

            li.replaceChild(newDiv, del);
    
            const result = document.querySelector('.tests__list');
            result.appendChild(li);
            display(li);
      
        }    
    });

    
}
module.exports = drop;