let firstNumber;
let operator;
let secondNumber;
let displayValue = 0;

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

function initializeDisplay() {
  const display = document.querySelector("#display");
  display.textContent = 0;
}

function UpdateDisplay() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

function handlePressedButton() {
  const buttonGrid = document.querySelector("#btnGrid");

  const inputTypeHandler = {
    num: (button) => {
      displayValue += button.textContent;
      console.log(displayValue);
    },
    operator: () => console.log("operator"),
    clear: () => console.log("clear"),
    delete: () => console.log("delete")
  }

  buttonGrid.addEventListener("mousedown", (event) => {
    const target = event.target;

    for (const type in inputTypeHandler) {
      if (target.classList.contains(type)) {
        inputTypeHandler[type](target);
      }
    }
  });
}

handlePressedButton();
initializeDisplay();
