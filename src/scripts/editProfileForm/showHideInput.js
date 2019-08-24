function showHideInput(elements, array) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', e => {
            const target = e.target;
            const attr = elements[i].dataset.bind;
            const profileValue = document.querySelector(attr + 'Value');
            const blockProfileSvg = document.querySelector(attr + 'Svg');
            const blockForm = document.querySelector(attr + 'Form');
            const cancel = target.getAttribute('href');
            const errorContainer = document.querySelector(attr + 'Error');
            const defaultVal = profileValue.innerHTML;

            profileValue.classList.add('profile--hide');
            blockProfileSvg.classList.add('profile--hide');
            blockForm.classList.add('block__form__edit--show');

            if (cancel == 'passCancel') {
                e.preventDefault();
                const inputPassOld = document.querySelector(attr + 'OldInput');
                const inputPassNew = document.querySelector(attr + 'NewInput');

                profileValue.classList.remove('profile--hide');
                blockProfileSvg.classList.remove('profile--hide');
                blockForm.classList.remove('block__form__edit--show');
                errorContainer.innerHTML = '';
                inputPassOld.style.border = '1px solid #88aca8';
                inputPassNew.style.border = '1px solid #88aca8';

            }
            if (cancel) {
                e.preventDefault();
                const input = document.querySelector(attr + 'Input');
            
                profileValue.classList.remove('profile--hide');
                blockProfileSvg.classList.remove('profile--hide');
                blockForm.classList.remove('block__form__edit--show');
                errorContainer.innerHTML = '';
                if (cancel != 'passCancel') {
                    input.style.border = '1px solid #88aca8';
                    input.value = defaultVal;
                }
            }

        });

    }
}
module.exports = showHideInput;