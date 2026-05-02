const btnDigits = document.querySelectorAll("#digit");
const btnOperators = document.querySelectorAll("#operator");
const btnClear = document.querySelector("#clear");
const btnEquals = document.querySelector("#equals");
const btnPoint = document.querySelector("#point");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
resetCalculator();

function resetOpBtnStyle() {
  btnOperators.forEach((btn) => {
    btn.style.backgroundColor = "";
  });
}

function calculate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "÷":
      if (b === 0) return "Division by zero";
      return a / b;
    default:
      return;
  }
}

function setOpBtnStyle(button) {
  resetOpBtnStyle();
  button.style.backgroundColor = "#ffaf79";
  console.log(`Setting ${button.innerText} to currentOp style.`);
}

function display(value) {
  if (value === "") {
    document.getElementById("display").value = "0";
    return;
  }
  if (value === "Division by zero") {
    document.getElementById("display").value = value;
    return;
  }
  // Keep trailing point if present
  const raw = value.toString();
  if (raw.endsWith(".") || raw.match(/\.\d*0$/)) {
    document.getElementById("display").value = raw;
    return;
  }
  value = parseFloat(value);
  let displayed;
  if (Math.abs(value) >= 1e12 || (Math.abs(value) < 1e-7 && value !== 0)) {
    displayed = parseFloat(value.toPrecision(12)).toExponential().toString();
  } else {
    displayed = new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 12,
    }).format(value);
  }
  document.getElementById("display").value = displayed;
}

function resetCalculator() {
  display(0);
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  resetOpBtnStyle();
}

// Digit buttons click

function handleDigits(event) {
  if (currentOperator.length === 0 && secondNumber.length === 0) {
    resetOpBtnStyle();
    firstNumber += event.target.innerText;
    display(firstNumber);
  } else if (firstNumber.length > 0 && currentOperator.length > 0) {
    resetOpBtnStyle();
    secondNumber += event.target.innerText;
    display(secondNumber);
  }
}

btnDigits.forEach((btn) => {
  btn.addEventListener("click", handleDigits);
});

// Operator buttons click

function handleOperator(event) {
  button = event.target;
  setOpBtnStyle(button);
  console.log(`Pressed operator ${button.innerText}`); // DEBUG
  // NO firstNumber
  if (firstNumber.length === 0) {
    // If press +/- => firstNumber = +/-
    if (button.innerText === "-" || button.innerText === "+") {
      firstNumber = button.innerText;
      console.log(`Set firstNumber to "${button.innerText}"`); // DEBUG
      return;
    }
    // If press */÷ do nothing
    else return;
  }
  // EXISTS firstNumber
  if (firstNumber.length > 0) {
    // If firstNumber contains only a sign
    if (firstNumber === "+" || firstNumber === "-") {
      // Just change the sign if +/- were pressed, else return
      if (button.innerText === "-" || button.innerText === "+") {
        firstNumber = button.innerText;
        return;
      }
      // If "*" or "/" were pressed, do nothing
      else return;
    }
    // If firstNumber is a number and NO secondNumber, set currentOperator
    if (secondNumber.length === 0) {
      currentOperator = event.target.innerText;
      return;
    }
    // If firstNumber is a number and EXISTS secondNumber
    if (secondNumber.length > 0) {
      let tempOperator = currentOperator;
      currentOperator = event.target.innerText;
      // Convert strings to numbers
      a = parseFloat(firstNumber);
      b = parseFloat(secondNumber);
      // Calculate result
      let result = calculate(tempOperator, a, b);
      display(result);
      // Set firstNumber to result
      firstNumber = result.toString();
      secondNumber = "";
      return;
    }
  }
}

btnOperators.forEach((btn) => {
  btn.addEventListener("click", handleOperator);
});

const btn1 = document.querySelector(".numpad1");

btn1.addEventListener("keydown", (event) => {
  if (event.key === "1") console.log("1");
});

btnClear.addEventListener("click", (event) => {
  resetCalculator();
});

btnEquals.addEventListener("click", () => {
  if (firstNumber.length > 0 && secondNumber.length > 0) {
    a = parseFloat(firstNumber);
    b = parseFloat(secondNumber);
    firstNumber = calculate(currentOperator, a, b).toString();
    console.log(`firstNumber = ${firstNumber}`); // DEBUG
    display(firstNumber);
  }
});

function handleDecimalPoint() {
  if (currentOperator.length === 0) {
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      display(firstNumber);
    } else if (firstNumber.endsWith(".")) {
      firstNumber = firstNumber.substring(0, firstNumber.length - 1);
      display(firstNumber);
    }
  } else {
    if (!secondNumber.includes(".")) {
      secondNumber += ".";
      display(secondNumber);
    } else if (secondNumber.endsWith(".")) {
      secondNumber = secondNumber.substring(0, secondNumber.length - 1);
      display(secondNumber);
    }
  }
}

btnPoint.addEventListener("click", handleDecimalPoint);

const btnDelete = document.querySelector("#delete");

function handleDelete() {
  if (currentOperator.length === 0 && firstNumber.length > 0) {
    if (firstNumber !== "0") {
      firstNumber = firstNumber.substring(0, firstNumber.length - 1);
      display(firstNumber);
    }
  } else if (secondNumber.length > 0) {
    if (secondNumber !== "0") {
      secondNumber = secondNumber.substring(0, secondNumber.length - 1);
      display(secondNumber);
    }
  }
}

btnDelete.addEventListener("click", handleDelete);
