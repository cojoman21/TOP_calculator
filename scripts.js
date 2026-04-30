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

const waitingFirstNumber = () => {
  if (result === "") return true;
  return false;
};

const waitingSecondNumber = () => {
  if (currentOperator !== "") return true;
  return false;
};

btnDigits.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (waitingFirstNumber()) {
      firstNumber += event.target.innerText;
      document.getElementById("display").value = Math.abs(
        parseInt(firstNumber),
      );
    } else if (waitingSecondNumber()) {
      secondNumber += event.target.innerText;
      document.getElementById("display").value = secondNumber;
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
    if (firstNumber === "") {
      firstNumber = event.target.innerText;
    } else if (firstNumber !== "" && currentOperator === "") {
      currentOperator = event.target.innerText;
    } else {
      a = parseInt(firstNumber);
      b = parseInt(secondNumber);
      result = operate(currentOperator, a, b);
      document.getElementById("display").value = result;

      firstNumber = result;
      secondNumber = "";
      currentOperator = "";
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
