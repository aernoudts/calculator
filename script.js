let decimal = document.querySelector("#decimal")
let clear = document.querySelector("#clear");
let remainder = document.querySelector("#remainder");
let add = document.querySelector("#add");
let subtract = document.querySelector("#subtract");
let multiply = document.querySelector("#multiply");
let divide = document.querySelector("#divide");
let equals = document.querySelector("#equals");
let visorNumbers = document.querySelector(".visorNumbers");
let numberButtons = document.querySelectorAll(".number")
let operatorButtons = document.querySelectorAll(".operator")

let firstNumber = '';
let operator = '';
let secondNumber = '';

/*By pressing calculator numbers, the first number of the operation is generated if the operator has not been set yet.
Generates second number otherwise.*/
numberButtons.forEach(number => {
    number.addEventListener('click', function() {
        if (visorNumbers.textContent === '0') {
            visorNumbers.textContent = '';
        }
        if (visorNumbers.textContent.length < 13) {
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
            let result = calculate(firstNumber, operator, secondNumber);
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
        let result = calculate(firstNumber, operator, secondNumber);
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

function calculate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case '-': return round(parseFloat(firstNumber) - parseFloat(secondNumber), 4);
        case '+': return round(parseFloat(firstNumber) + parseFloat(secondNumber), 4);
        case 'x': return round(parseFloat(firstNumber) * parseFloat(secondNumber), 4);
        case '%': return round(parseFloat(firstNumber) % parseFloat(secondNumber), 4);
        case '÷': return (secondNumber != '0' ? round(parseFloat(firstNumber) / parseFloat(secondNumber), 4) : "Error");
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}