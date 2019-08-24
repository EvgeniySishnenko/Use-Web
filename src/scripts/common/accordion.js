function accordion() {

    const items = document.querySelectorAll('.accordion__link');

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', (e) => {
            e.preventDefault();
            const target = getCurrentZone(e.target); 
            
            if (target) {
                target.classList.toggle('accordion__item--active');
            }
        });
    }



}

function getCurrentZone(from) {
    do {
        if (from.classList.contains('accordion__item')) {
            return from;
        }
    } while (from = from.parentElement);
}

module.exports = accordion;