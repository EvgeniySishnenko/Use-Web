function genpass () {
    const expression = document.querySelectorAll('.genpass__item-expression');
    const copy = document.querySelector('.genpass__item-copy');
    const btmGenPass = document.querySelector('.genpass__item-btn');
    const characters = document.querySelector('#characters');
    const letters = document.querySelector('#letters');
    const numbers = document.querySelector('#numbers');
    let pass = document.querySelector('.genpass__item-pass');
    let currentNum = document.querySelector('.genpass__item-num').value;
    let inpNum = document.querySelector('.genpass__item-num');
    const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const arrNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const arrCharacters = ['!', '@', '#', '$', '%', '&', '*', '<', '>', '?'];


    for (let i = 0; i < expression.length; i++) {
        expression[i].addEventListener("click", (e) =>{
            const target = getCurrentZone(e.target);
            
            if (target.classList.contains('pls')) {
                if(currentNum < 25) {
                    currentNum++;
                }
                
            }
            if (target.classList.contains('mns')) {
                if (currentNum > 3) {
                    currentNum--;
                } 

            }
            inpNum.value = currentNum;
        });
    }

    inpNum.addEventListener('keypress', (e) => {
        if (e.keyCode == 13) {
            let val = document.querySelector('.genpass__item-num').value;
            currentNum = val;

            genPass();
        }
    });

    btmGenPass.addEventListener('click', () => {
        genPass();

    });
    
    function genPass () {
        let result = [];
       
        pass.value = '';


        if(letters.checked) {
            result = result.concat(arr_en);
            result = result.concat(arr_EN);
        }
        if (numbers.checked) {
            result = result.concat(arrNum);
        }
        if (characters.checked) {
            result = result.concat(arrCharacters);
        }
        if (!characters.checked && !numbers.checked && !letters.checked) {
           
            result = [];
            
        }

        result.sort(compareRandom);

        let out = '';
        currentNum = parseInt(currentNum);
        for (let r = 0; r < currentNum; r++) {
            out += result[r];
            
        }
       
        if (result != '') {
            pass.value = out;
        }

        
       
    }

    copy.addEventListener('click', () => {

        pass.select();
        document.execCommand('copy'); 

    });

    function compareRandom () {
        return Math.random() - 0.5;
    }
    function getCurrentZone(from) {
        do {
            if (from.classList.contains('genpass__item-expression')) {
                return from;
            }
        } while (from = from.parentElement);

        return null;
    }
}
module.exports = genpass;