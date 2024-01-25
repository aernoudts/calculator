let decimal = document.querySelector("#decimal")
let clear = document.querySelector("#clear");
let invert = document.querySelector("#invert");
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

//arara saudita

numberButtons.forEach(number => {
    number.addEventListener('click', function() {
        if (visorNumbers.textContent === "0") {
            visorNumbers.textContent = '';
        }
        if (visorNumbers.textContent.length <= 10) {
            visorNumbers.textContent+= number.textContent;
            if (operator === "") { 
                firstNumber += number.textContent;
                console.log(firstNumber)
            } else { 
                secondNumber += number.textContent;
                console.log(secondNumber)
            }
        }
    });
});    

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (firstNumber) {
            operator = button.textContent;
            visorNumbers.textContent = '';
            console.log(operator);
        }
        if (firstNumber && operator && secondNumber) {
            let result = calculate(firstNumber, operator, secondNumber);
            visorNumbers.textContent = result;
            console.log(result);
            firstNumber = result;
            secondNumber = '';
            operator = '';
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
    let result = calculate(firstNumber, operator, secondNumber);
    visorNumbers.textContent = result;
    console.log(result);
    firstNumber = result;
    secondNumber = '';
    operator = '';
});

let calculate = function(firstNumber, operator, secondNumber) {
    switch (operator) {
        case '-': return parseFloat(firstNumber) - parseFloat(secondNumber);
        case '+': return parseFloat(firstNumber) + parseFloat(secondNumber);
        case 'x': return parseFloat(firstNumber) * parseFloat(secondNumber);
        case '%': return parseFloat(firstNumber) % parseFloat(secondNumber);
        case '÷':
            if (secondNumber != 0) {
                parseInt(firstNumber) / parseInt(secondNumber);
            }else {
                return "Error"
        }
    }
}