let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;
let displayValue = 0;
// Flag to indicate if the display should be cleared for the next input
let clearDisplayNext = false;

// Helper functions

function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num1 / num2;
    default:
      return "invalid operator";
  }
}

function clearDisplayIfZero() {
  if (displayValue == 0) displayValue = "";
}

function updateDisplay() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

function isNull(value) {
  return value === null;
}

function parseDisplay() {
  return parseInt(displayValue);
}

// Functions for handling different button types

function handleNumberInput(button) {
  clearDisplayIfZero();

  if (clearDisplayNext) {
    displayValue = "";
    clearDisplayNext = false;
  }

  displayValue += button.textContent;
  updateDisplay();
}

function handleOperatorInput(button) {
  if (isNull(firstNumber)) {
    firstNumber = parseDisplay();

  } else if (isNull(secondNumber)) {
    secondNumber = parseDisplay();
    result = operate(operator, firstNumber, secondNumber);
    displayValue = result;
    updateDisplay();

  } else {
    firstNumber = result;
    secondNumber = parseDisplay();
    result = operate(operator, firstNumber, secondNumber);
    displayValue = result;
    updateDisplay();
  }

  if (button.classList.contains("add")) {
    operator = "add";
  } else if (button.classList.contains("subtract")) {
    operator = "subtract";
  } else if (button.classList.contains("divide")) {
    operator = "divide";
  } else if (button.classList.contains("multiply")) {
    operator = "multiply";
  }

  clearDisplayNext = true;
}

function handleEqualsInput() {
  if (isNull(firstNumber) || isNull(operator)) {
    firstNumber = parseDisplay();

  } else if (isNull(secondNumber)) {
    secondNumber = parseDisplay();
    result = operate(operator, firstNumber, secondNumber);
    displayValue = result;
    updateDisplay();
    operator = null;

  } else {
    firstNumber = result;
    secondNumber = parseDisplay();
    result = operate(operator, firstNumber, secondNumber);
    displayValue = result;
    updateDisplay();
    operator = null;
  }
}

function handleClearInput() {
  displayValue = "0";
  firstNumber = null;
  operator = null;
  secondNumber = null;
  result = null;
  clearDisplayNext = false;
  updateDisplay();
}

function handleDeleteInput() {
  console.log("delete")
}

function handleDecimalInput() {
  console.log("decimal")
}

// Main event listener function
function initializeInputHandling() {
  const inputActionsByType = {
    num: handleNumberInput,
    operator: handleOperatorInput,
    equals: handleEqualsInput,
    clear: handleClearInput,
    delete: handleDeleteInput,
    decimal: handleDecimalInput,
  };

  const buttonGrid = document.querySelector("#btnGrid");

  buttonGrid.addEventListener("mousedown", (event) => {
    const target = event.target;

    for (const type in inputActionsByType) {
      if (target.classList.contains(type)) {
        inputActionsByType[type](target);
        break;
      }
    }
  });
}


initializeInputHandling();
