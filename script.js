const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};

document.addEventListener("DOMContentLoaded", () => {
  const calculator = document.querySelector(".calculator");
  const keys = document.querySelector(".calculator__keys");
  const display = document.querySelector(".calculator__display");

  if (calculator && keys && display) {
    keys.addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        Array.from(key.parentNode.children).forEach((k) =>
          k.classList.remove("is-depressed")
        );

        if (!action) {
          if (displayedNum === "0" || previousKeyType === "operator") {
            display.textContent = keyContent;
          } else {
            display.textContent = displayedNum + keyContent;
          }
          calculator.dataset.previousKeyType = "number";
        }

        if (action === "decimal") {
          if (!displayedNum.includes(".")) {
            display.textContent = displayedNum + ".";
          } else if (previousKeyType === "operator") {
            display.textContent = "0.";
          }
          calculator.dataset.previousKeyType = "decimal";
        }

        if (
          action === "add" ||
          action === "subtract" ||
          action === "multiply" ||
          action === "divide"
        ) {
          if (calculator.dataset.firstValue && previousKeyType !== "operator") {
            display.textContent = calculate(
              calculator.dataset.firstValue,
              calculator.dataset.operator,
              displayedNum
            );
          }

          key.classList.add("is-depressed");
          calculator.dataset.previousKeyType = "operator";
          calculator.dataset.firstValue = display.textContent;
          calculator.dataset.operator = action;
        }

        if (action === "clear") {
          calculator.dataset.previousKeyType = "clear";
          calculator.dataset.firstValue = "";
          calculator.dataset.operator = "";
          calculator.dataset.secondValue = "";
          display.textContent = 0;
        }

        if (action === "calculate") {
          let firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          let secondValue = displayedNum;

          if (firstValue) {
            if (previousKeyType === "calculate") {
              firstValue = displayedNum;
              secondValue = calculator.dataset.secondValue;
            }

            display.textContent = calculate(firstValue, operator, secondValue);
          }

          calculator.dataset.secondValue = secondValue;
          calculator.dataset.previousKeyType = "calculate";
        }
      }
    });
  } else {
    console.error("Calculator or keys or display element not found.");
  }
});
