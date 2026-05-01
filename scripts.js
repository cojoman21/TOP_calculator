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
  return (a / b).toFixed(2);
  //   return a / b;
}

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let result = "";

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return;
  }
}

// document.getElementById("display").value = "0";

const btnDigits = document.querySelectorAll("#digit");

btnDigits.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(`Pressed digit ${event.target.innerText}`); // DEBUG
    if (currentOperator.length === 0 && secondNumber.length === 0) {
      firstNumber += event.target.innerText;
      console.log(`firstNumber is now ${firstNumber}`); // DEBUG
      document.getElementById("display").value = Math.abs(
        parseInt(firstNumber),
      );
      console.log(`Set input display to firstNumber: ${parseInt(firstNumber)}`);
    } else if (firstNumber.length > 0 && currentOperator.length > 0) {
      secondNumber += event.target.innerText;
      console.log(`secondNumber is now ${secondNumber}`); // DEBUG
      document.getElementById("display").value = secondNumber;
      console.log(
        `Set input display to secondNumber: ${parseInt(secondNumber)}`,
      ); // DEBUG
    }
  });
});

function enterValue(value) {
  firstNumber += value;
  document.getElementById("display").value = firstNumber;
}

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
      tempOperator = currentOperator;
      console.log(`Stored currentOperator in tempOperator: ${tempOperator}`); // DEBUG
      currentOperator = event.target.innerText;
      console.log(`currentOperator: ${currentOperator}`);
      a = parseInt(firstNumber);
      b = parseInt(secondNumber);
      result = operate(tempOperator, a, b);
      console.log(`Calculated result: ${result}`); //DEBUG
      document.getElementById("display").value = result;
      console.log(`Set input display to result: ${result}`); // DEBUG

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
btnClear.addEventListener("click", () => {
  document.getElementById("display").value = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  result = "";
});

function calculate() {}
