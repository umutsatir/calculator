// all variables
const ac = document.querySelector('#ac');
const buttons = document.querySelectorAll('.num');
const dec = document.querySelector('#dec');
const badd = document.querySelector('#sum');
const bsub = document.querySelector('#sub');
const bmul = document.querySelector('#mul');
const bdiv = document.querySelector('#div');
const sign = document.querySelector('#sign');
const percent = document.querySelector('#percent');
const equal = document.querySelector('#equal');
const history = document.querySelector('#history');
const curr = document.querySelector('#curr');
let currOp = '';
let firstNum = '';
let firstCheck = false;
let isFinished = false;

// all listeners
// (disable the decimal button if it's already been used)
ac.onclick = () => {
    curr.innerHTML = "";
    history.innerHTML = history.innerHTML.substring(0, history.innerHTML.lastIndexOf(" ")) + " ";
};
ac.ondblclick = () => clear();
buttons.forEach(button => button.onclick = (e) => numButtons(e.target));
dec.onclick = (e) => numButtons(e.target);
badd.onclick = (e) => changeOp(e.target);
bsub.onclick = (e) => changeOp(e.target);
bmul.onclick = (e) => changeOp(e.target);
bdiv.onclick = (e) => changeOp(e.target);
sign.onclick = (e) => signPercent(e.target);
percent.onclick = (e) => signPercent(e.target);
equal.onclick = function(e) {
    curr.innerHTML = operate(e.target);
    history.innerHTML = curr.innerHTML;
};

window.addEventListener('keypress', function(e) {
    console.log(e.key);
    if (+e.key) document.getElementById("b" + e.key).click();
    if (e.key === 'Enter') equal.click();
    if (e.key === '.') dec.click();
    if (e.key === '+') badd.click();
    if (e.key === '-') bsub.click();
    if (e.key === '*') bmul.click();
    if (e.key === '/') bdiv.click();
});

// number buttons function
function numButtons(target) {
    if (firstCheck){
        curr.innerHTML = '';
        firstCheck = false;
    }
    else if (isFinished){
        clear();
        isFinished = false;
    }
    curr.innerHTML += target.textContent;
    history.innerHTML += target.textContent;
}

// sign and percent buttons function
function signPercent(target) {
    if (target.id === 'sign') {
        curr.innerHTML *= -1;
        history.innerHTML = history.innerHTML.substring(0, history.innerHTML.lastIndexOf(" ")) + " " + curr.innerHTML;
    }
    else if (target.id === 'percent') {
        curr.innerHTML /= 100;
    }
}

// create functions for each operation
// changing the operation
function changeOp(target) {
    if (currOp != ""){
        curr.innerHTML = operate(target);
    }
    if (curr.innerHTML === '') {
        clear();
        return;
    }
    currOp = target.id;
    firstNum = curr.innerHTML;
    firstNum = parseFloat(firstNum);
    history.innerHTML += " " + target.textContent + " ";
    firstCheck = true;
}

// result function
function operate(target) {
    if (target.textContent === '=') isFinished = true;
    if (history.textContent === '') return "";
    if (currOp === 'sum'){
        return decimal(firstNum + parseFloat(curr.innerHTML));
    }
    else if (currOp === 'sub'){
        return decimal(firstNum - parseFloat(curr.innerHTML));
    }
    else if (currOp === 'mul'){
        return decimal(firstNum * parseFloat(curr.innerHTML));
    }
    else if (currOp === 'div'){
        if (curr.innerHTML === '0') {
            return 'Error';
        }
        return decimal(firstNum / parseFloat(curr.innerHTML));
    }
    else if (currOp === '') {
        return parseFloat(curr.innerHTML);
    }
    else {
        return 'Error';
    }
}

// decimal function
function decimal(math) {
    return Math.floor(((math) * 100)) / 100;
}

// clear function
function clear() {
    currOp = '';
    firstNum = '';
    curr.innerHTML = '';
    history.innerHTML = '';
}