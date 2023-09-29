// selection all classes

const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const cleaBtn = document.getElementById('clear-button')

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
// console.log(firstValue);



const sendNumberValue = (number) => {

    // replace current display value if first value is entered 

    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;  
    } else {
          
        const diplayValue = calculatorDisplay.textContent

        if (diplayValue === '0') {
            calculatorDisplay.textContent = number;
        } else {
            calculatorDisplay.textContent += number;
        }
    }
}

//adding decimal

const addDecimal = () => {

    if(awaitingNextValue) return;

    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }

}

// calculation logic

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
}

//functionality for Operators

const useOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent)
    
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // console.log(currentValue);

    // assign first value if no value exist

    if (!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue  );
        console.log('calculation - ' + calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation; 
    }
    awaitingNextValue = true;
    operatorValue = operator;
    // console.log(operator);



}

// adding event listeners

inputBtns.forEach((button) => {
    if (button.classList.length === 0) {
        button.addEventListener('click', () => sendNumberValue(button.value))
    } else if (button.classList.contains('operator')) {
        button.addEventListener('click', () => useOperator(button.value))
    } else if (button.classList.contains('decimal')) {

        button.addEventListener('click', () => addDecimal())

    }
})

// clearing all values

const clearingDisplay = (input) => {
    calculatorDisplay.textContent = input;
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

cleaBtn.addEventListener('click', () => clearingDisplay(0))

// setting our decimal to work;

const decimalInput = (input) => {

}