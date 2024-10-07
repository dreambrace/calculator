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
  if (displayValue.toString() === "0") displayValue = "";
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
    return "too long to display";
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

// Functions for handling different button types

function handleNumberInput(button) {
  clearDisplayIfZero();

  if (clearDisplayNext) {
    displayValue = "";
    clearDisplayNext = false;
  }

  if (displayValue.toString().length > 8) {
    return;
  }

  displayValue += button.id;
  updateDisplay();
}

function handleOperatorInput(button) {
  if (isNull(firstNumber)) {
    firstNumber = parseDisplay();

  } else if (isNull(secondNumber)) {
    secondNumber = parseDisplay();

    if (secondNumber === 0 && operator === "divide") {
      displayValue = "Yeah, no."
      updateDisplay();
      result = NaN;
    } else {
      result = limitToEightDigitsMax(operate(operator, firstNumber, secondNumber));
      displayValue = result;
      updateDisplay();
    }

    firstNumber = result;
    secondNumber = null;
    operator = null;
  }

  if (button.id === "add") {
    operator = "add";
  } else if (button.id === "subtract") {
    operator = "subtract";
  } else if (button.id === "divide") {
    operator = "divide";
  } else if (button.id === "multiply") {
    operator = "multiply";
  }

  clearDisplayNext = true;
}

function handleEqualsInput() {
  if (isNull(firstNumber) || isNull(operator)) {
    firstNumber = parseDisplay();

  } else if (isNull(secondNumber)) {
    secondNumber = parseDisplay();

    if (secondNumber === 0 && operator === "divide") {
      displayValue = "Yeah, no."
      updateDisplay();
      result = NaN;
    } else {
      result = limitToEightDigitsMax(operate(operator, firstNumber, secondNumber));
      displayValue = result;
      updateDisplay();
    }

    firstNumber = null;
    secondNumber = null;
    operator = null;
    clearDisplayNext = true;
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
  displayValue = 0;
  updateDisplay();
}

function handleDecimalInput() {
  let num = displayValue.toString();

  if (num.includes(".")) {
    return;
  }

  displayValue = num + ".";
  updateDisplay();
}

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

  const buttonGrid = document.querySelector("#btnGrid");

  buttonGrid.addEventListener("mousedown", (event) => {
    const target = event.target;

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


initializeInputHandling();
