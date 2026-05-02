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
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  resetOpBtnStyle();
}

// Digit buttons click

btnDigits.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (currentOperator.length === 0 && secondNumber.length === 0) {
      resetOpBtnStyle();
      firstNumber += event.target.innerText;
      display(firstNumber);
    } else if (firstNumber.length > 0 && currentOperator.length > 0) {
      resetOpBtnStyle();
      secondNumber += event.target.innerText;
      display(secondNumber);
    }
  });
});

// Operator buttons click

btnOperators.forEach((btn) => {
  btn.addEventListener("click", (event) => {
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
  });
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

btnPoint.addEventListener("click", () => {
  if (currentOperator.length === 0) {
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      display(firstNumber);
    }
  } else {
    if (!secondNumber.includes(".")) {
      secondNumber += ".";
      display(secondNumber);
    }
  }
});
