let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = 0;
// Flag to indicate if the display should be cleared for the next number input
let clearDisplayNext = false;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
      return divide(num1, num2);
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

function handlePressedButton() {
  const buttonGrid = document.querySelector("#btnGrid");

  const inputActionsByType = {
    num: (button) => {
      resetIfZero();

      if (clearDisplayNext) {
        displayValue = "";
        clearDisplayNext = false;
      }

      displayValue += button.textContent;
      UpdateDisplay();
    },
    operator: (button) => {
      if (button.classList.contains("add")) {
        operator = "add";
      } else if (button.classList.contains("subtract")) {
        operator = "subtract";
      } else if (button.classList.contains("divide")) {
        operator = "divide";
      } else if (button.classList.contains("multiply")) {
        operator = "multiply";
      }

      // Update numbers
      if (isNull(firstNumber)) {
        firstNumber = parseInt(displayValue);
        clearDisplayNext = true;
      } else if (isNull(secondNumber)) {
        secondNumber = parseInt(displayValue);
        displayValue = operate(operator, firstNumber, secondNumber);
        firstNumber = displayValue;
        secondNumber = null;
        clearDisplayNext = true;
        UpdateDisplay();
      }
    },
    equals: () => {
      console.log("equals")
    },
    clear: () => {
      console.log("clear")
    },
    delete: () => {
      console.log("delete")
    },
    decimal: () => {
      console.log("decimal")
    }
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
