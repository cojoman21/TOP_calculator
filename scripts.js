let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
resetCalculator();

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Division by zero";
  else return a / b;
  //   return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return;
  }
}

function display(value) {
  if (value === "Division by zero") {
    document.getElementById("display").value = value;
    return;
  }
  value = parseFloat(value);
  if (Math.abs(value) >= 1e12 || (Math.abs(value) < 1e-7 && value !== 0)) {
    document.getElementById("display").value = parseFloat(value.toPrecision(12))
      .toExponential()
      .toString();
  }
  document.getElementById("display").value = parseFloat(
    value.toPrecision(12),
  ).toString();
}

function resetCalculator() {
  display(0);
  firstNumber = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
}

// Digit buttons click
const btnDigits = document.querySelectorAll("#digit");

btnDigits.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(`Pressed digit ${event.target.innerText}`); // DEBUG
    if (currentOperator.length === 0 && secondNumber.length === 0) {
      firstNumber += event.target.innerText;
      console.log(`firstNumber is now ${firstNumber}`); // DEBUG
      display(firstNumber);
      console.log(`Display firstNumber: ${parseInt(firstNumber)}`); // DEBUG
    } else if (firstNumber.length > 0 && currentOperator.length > 0) {
      secondNumber += event.target.innerText;
      console.log(`secondNumber is now ${secondNumber}`); // DEBUG
      display(secondNumber);
      console.log(`Display secondNumber: ${parseInt(secondNumber)}`); // DEBUG
    }
  });
});

// Operator buttons click
const btnOperators = document.querySelectorAll("#operator");

btnOperators.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(`Pressed operator ${event.target.innerText}`); // DEBUG
    if (
      firstNumber.length === 0 &&
      (event.target.innerText === "-" || event.target.innerText === "+")
    ) {
      firstNumber = event.target.innerText;
      console.log(`Set firstNumber to ${firstNumber}`); // DEBUG
    } else if (
      firstNumber.length > 0 &&
      (firstNumber === "+" || firstNumber === "-") &&
      (event.target.innerText === "-" || event.target.innerText === "+")
    ) {
      firstNumber = event.target.innerText;
      console.log(`Change firstNumber to ${firstNumber}`); // DEBUG
    } else if (firstNumber.length > 0 && secondNumber.length > 0) {
      // Create a copy of currentOperator
      let tempOperator = currentOperator;
      console.log(`Stored currentOperator in tempOperator: ${tempOperator}`); // DEBUG
      currentOperator = event.target.innerText;
      console.log(`currentOperator: ${currentOperator}`); // DEBUG
      // Convert strings to numbers
      a = parseFloat(firstNumber);
      b = parseFloat(secondNumber);
      // Calculate result
      let result = operate(tempOperator, a, b);
      console.log(`Calculated result: ${result}`); //DEBUG
      display(result);
      console.log(`Set input display to result: ${result}`); // DEBUG
      // Set firstNumber to result
      firstNumber = result.toString();
      console.log(`Set firstNumber = result = ${firstNumber}`); //DEBUG
      secondNumber = "";
      console.log(`Reset secondNumber: ${secondNumber}`); //DEBUG
    } else if (
      firstNumber.length > 0 &&
      !firstNumber.startsWith("+") &&
      !firstNumber.startsWith("-")
    ) {
      currentOperator = event.target.innerText;
      console.log(`Set currentOperator to ${currentOperator}`); // DEBUG
    } else {
      currentOperator = event.target.innerText;
      console.log(`Set currentOperator to ${currentOperator}`); // DEBUG
    }
  });
});

const btnClear = document.querySelector("#clear");
btnClear.addEventListener("click", (event) => {
  resetCalculator();
});

const btnEquals = document.querySelector("#equals");
btnEquals.addEventListener("click", () => {
  if (firstNumber.length > 0 && secondNumber.length > 0) {
    a = parseFloat(firstNumber);
    b = parseFloat(secondNumber);
    firstNumber = operate(currentOperator, a, b).toString();
    console.log(`firstNumber = ${firstNumber}`); // DEBUG
    display(firstNumber);
  }
});
