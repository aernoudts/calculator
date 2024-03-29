const decimal = document.querySelector("#decimal")
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const visorNumbers = document.querySelector(".visorNumbers");
const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")

let firstNumber = '';
let operator = '';
let secondNumber = '';
const decimalsNumber = 4;

/*By pressing calculator numbers, the first number of the operation is generated if the operator has not been set yet.
Generates second number otherwise.*/
numberButtons.forEach(number => {
    number.addEventListener('click', function() {
        if (visorNumbers.textContent === '0') {
            visorNumbers.textContent = '';
        }
        if (visorNumbers.textContent.length < 14) {
            if (operator === '') { 
                firstNumber += number.textContent;
                visorNumbers.textContent = firstNumber;
                //console.log(firstNumber)
            } else {
                secondNumber += number.textContent;
                visorNumbers.textContent = secondNumber;
                //console.log(secondNumber)
            }
        }
    });
});    

//Will keep calculating if operators keep getting selected after initial selection.
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (firstNumber) {
            operator = button.textContent;
            //console.log(operator);
        }
        if (firstNumber && operator && secondNumber) {
            let result = calculate(firstNumber, operator, secondNumber, decimalsNumber);
            visorNumbers.textContent = result;
            //console.log(result);
            firstNumber = result;
            secondNumber = '';
        }
    });
});

decimal.addEventListener('click', function() {
    if (!visorNumbers.textContent.includes(".")) {
        visorNumbers.textContent+=".";
        if (operator === "") {
            firstNumber+='.';
        } else {
            secondNumber+='.';
        }
    }
});

equals.addEventListener('click', function() {
    if (firstNumber && operator && secondNumber) {
        let result = calculate(firstNumber, operator, secondNumber, decimalsNumber);
        visorNumbers.textContent = result;
        //console.log(result);
        firstNumber = result;
        secondNumber = '';
    }
});

clear.addEventListener('click', function() {
    visorNumbers.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    operator = '';
});

function calculate(firstNumber, operator, secondNumber, decimalsNumber) {
    switch (operator) {
        case '-': return round(parseFloat(firstNumber) - parseFloat(secondNumber), decimalsNumber);
        case '+': return round(parseFloat(firstNumber) + parseFloat(secondNumber), decimalsNumber);
        case '×': return round(parseFloat(firstNumber) * parseFloat(secondNumber), decimalsNumber);
        case '%': return round(parseFloat(firstNumber) % parseFloat(secondNumber), decimalsNumber);
        case '÷': return (secondNumber != '0' ? round(parseFloat(firstNumber) / parseFloat(secondNumber), decimalsNumber) : "Error");
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}