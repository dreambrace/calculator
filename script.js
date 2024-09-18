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

function resetIfZero() {
  if (displayValue == 0) displayValue = "";
}

function UpdateDisplay() {
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
  resetIfZero();

  if (clearDisplayNext) {
    displayValue = "";
    clearDisplayNext = false;
  }

  displayValue += button.textContent;
  UpdateDisplay();
}

function handleOperatorInput(button) {
  if (button.classList.contains("add")) {
    operator = "add";
  } else if (button.classList.contains("subtract")) {
    operator = "subtract";
  } else if (button.classList.contains("divide")) {
    operator = "divide";
  } else if (button.classList.contains("multiply")) {
    operator = "multiply";
  }

  // Update numbers based on current state
  if (isNull(firstNumber)) {
    // Set the first operand
    firstNumber = parseDisplay();
  } else if (isNull(secondNumber)) {
    // Set the second operand, perform the operation, and update the display
    secondNumber = parseDisplay();
    displayValue = operate(operator, firstNumber, secondNumber);
    UpdateDisplay();
    // Prepare for the next input
    firstNumber = displayValue;
    secondNumber = null;
  }

  clearDisplayNext = true;
}

function handleEqualsInput() {
  if (isNull(operator)) {
    return;
  }

  if (isNull(secondNumber)) {
    secondNumber = parseDisplay();
  }

  displayValue = operate(operator, firstNumber, secondNumber);
  firstNumber = parseDisplay();

  UpdateDisplay();
}

function handleClearInput() {
  displayValue = "0";
  firstNumber = null;
  operator = null;
  secondNumber = null;
  result = null;
  clearDisplayNext = false;
  UpdateDisplay();
}

function handleDeleteInput() {
  console.log("delete")
}

function handleDecimalInput() {
  console.log("decimal")
}

// Main event listener function
function handlePressedButton() {
  const buttonGrid = document.querySelector("#btnGrid");

  const inputActionsByType = {
    num: handleNumberInput,
    operator: handleOperatorInput,
    equals: handleEqualsInput,
    clear: handleClearInput,
    delete: handleDeleteInput,
    decimal: handleDecimalInput,
  }

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


handlePressedButton();
