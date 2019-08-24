function display(currentDrag) {
    const dsplFalse = document.querySelector('.res-dspl-false');
    const dsplTrue = document.querySelector('.res-dspl-true');
    const rightZone = document.querySelector('.tests__list-right');

    if (currentDrag.getAttribute('attr') == 'true') {

        if (rightZone.childNodes.length == 1) {
            const curentAttrRight = rightZone.querySelector('.tests__item');
            if (curentAttrRight.getAttribute('attr') == 'true') {
                if (dsplTrue.classList.contains('dspl-disable')) {
                    dsplTrue.classList.remove('dspl-disable');
                }
            }

        }

    } else {
        if (dsplFalse.classList.contains('dspl-disable')) {
            dsplFalse.classList.remove('dspl-disable');
        }
    }
    if (rightZone.childNodes.length == 0) {

        if (!dsplFalse.classList.contains('dspl-disable')) {
            dsplFalse.classList.add('dspl-disable');
        }
        if (!dsplTrue.classList.contains('dspl-disable')) {
            dsplTrue.classList.add('dspl-disable');
        }
    }


    if (rightZone.childNodes.length == 2) {
        if (dsplFalse.classList.contains('dspl-disable')) {
            dsplFalse.classList.remove('dspl-disable');
        }
        if (!dsplTrue.classList.contains('dspl-disable')) {
            dsplTrue.classList.add('dspl-disable');
        }


    }

}
module.exports = display;