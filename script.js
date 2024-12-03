let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = 0;
let isErrorDisplayed = false;
// Flag to prevent the display value from being assigned multiple times on subsequent operator and equals inputs.
// Starts as false so you can calculate with the starting zero.
let isExpectingNewNumber = false;

// Main event listener function
function initializeInputHandling() {

  const buttonTypeHandlers = {
    num: handleNumberInput,
    operator: handleOperatorInput,
    equals: handleEqualsInput,
    clear: handleClearInput,
    delete: handleDeleteInput,
    decimal: handleDecimalInput,
  };

  // Mouse input

  const buttonGrid = document.querySelector("#btnGrid");

  buttonGrid.addEventListener("mousedown", (event) => {
    const target = event.target;

    // Loop through the types of buttons in buttonTypeHandlers and check if the clicked button has a matching class. If it does, call the associated handler and exit loop
    for (const type in buttonTypeHandlers) {
      if (target.classList.contains(type)) {
        buttonTypeHandlers[type](target);
        break;
      }
    }
  });

  // Keyboard input

  document.addEventListener("keyup", (event) => {

    const keymap = {
      "0": () => handleNumberInput({ id: "0" }),
      "1": () => handleNumberInput({ id: "1" }),
      "2": () => handleNumberInput({ id: "2" }),
      "3": () => handleNumberInput({ id: "3" }),
      "4": () => handleNumberInput({ id: "4" }),
      "5": () => handleNumberInput({ id: "5" }),
      "6": () => handleNumberInput({ id: "6" }),
      "7": () => handleNumberInput({ id: "7" }),
      "8": () => handleNumberInput({ id: "8" }),
      "9": () => handleNumberInput({ id: "9" }),

      "+": () => handleOperatorInput({ id: "add" }),
      "-": () => handleOperatorInput({ id: "subtract" }),
      "*": () => handleOperatorInput({ id: "multiply" }),
      "/": () => handleOperatorInput({ id: "divide" }),

      "=": handleEqualsInput,
      "Enter": handleEqualsInput,
      " ": handleEqualsInput,

      "Escape": handleClearInput,

      "Backspace": handleDeleteInput,

      ".": handleDecimalInput,
    }

    // If the pressed key is in the keymap, call the associated handler
    if (keymap[event.key]) {
      keymap[event.key]();
    }
  });
}

// Input handler functions

function handleNumberInput(button) {
  if (isErrorDisplayed) {
    return;
  }

  clearInitialZero();

  if (isExpectingNewNumber) {
    displayValue = "";
  }

  if (displayValue.toString().replace(".", "").length > 7) {
    return;
  }

  displayValue += button.id;
  isExpectingNewNumber = false;
  updateDisplay();
}

function handleOperatorInput(button) {
  if (isErrorDisplayed) {
    return;
  }

  if (isNull(firstNumber)) {
    firstNumber = parseDisplay();
    operator = button.id;
    isExpectingNewNumber = true;
    return;
  }

  if (isExpectingNewNumber) {
    operator = button.id;
    return;
  }

  secondNumber = parseDisplay();

  if (isDividingByZero()) {
    handleDividingByZero();
    return;
  }

  displayValue = limitToEightDigitsMax(operate(operator, firstNumber, secondNumber));
  updateDisplay();
  firstNumber = displayValue;
  operator = button.id;
  isExpectingNewNumber = true;
}

function handleEqualsInput() {
  if (isErrorDisplayed || isNull(firstNumber) || isNull(operator)) {
    return;
  }

  if (isNull(secondNumber) || !isExpectingNewNumber) {
    secondNumber = parseDisplay();
  }

  if (isDividingByZero()) {
    handleDividingByZero();
    return;
  }

  displayValue = limitToEightDigitsMax(operate(operator, firstNumber, secondNumber));
  updateDisplay();
  firstNumber = displayValue;
  isExpectingNewNumber = true;
}

function handleClearInput() {
  displayValue = "0";
  firstNumber = null;
  operator = null;
  secondNumber = null;
  isErrorDisplayed = false;
  isExpectingNewNumber = false;
  updateDisplay();
}

function handleDeleteInput() {
  displayValue = 0;
  updateDisplay();
}

function handleDecimalInput() {
  if (displayValue.toString().length > 7) {
    return;
  }

  let num = displayValue.toString();

  if (num.includes(".")) {
    return;
  }

  displayValue = num + ".";
  updateDisplay();
}

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

function clearInitialZero() {
  if (displayValue.toString() === "0") {
    displayValue = "";
  }
}

function updateDisplay() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

function isNull(value) {
  return value === null;
}

function parseDisplay() {
  return parseFloat(displayValue);
}

function limitToEightDigitsMax(num) {
  const digitGroups = num.toString().split(".");
  const digitsBeforeDecimal = digitGroups[0];
  const digitsAfterDecimal = digitGroups[1];

  if (digitsBeforeDecimal.length > 8) {
    isErrorDisplayed = true;
    return "Too long";
  }

  if (digitsBeforeDecimal.length <= 8 &&
    digitsAfterDecimal === undefined) {
    const finalNumber = parseFloat(digitsBeforeDecimal);
    return finalNumber;
  }

  else {
    const availableDigits = 8 - digitsBeforeDecimal.length;
    // "* 1" removes trailing zeros
    const finalNumber = parseFloat(digitsBeforeDecimal + "." + digitsAfterDecimal)
      .toFixed(availableDigits) * 1;

    return finalNumber;
  }
}

function isDividingByZero() {
  return secondNumber === 0 && operator === "divide";
}

function handleDividingByZero() {
  displayValue = "Nice try"
  updateDisplay();
  isErrorDisplayed = true;
  return;
}

initializeInputHandling();
