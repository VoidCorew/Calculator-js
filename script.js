document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('.calculator-input');
  const answer = document.querySelector('.calculator-answer');
  const buttons = document.querySelectorAll('.calculator-bottom > div');

  let currentInput = '';
  let lastResult = '';

  function isOperator(char) {
    return ['+', '-', '*', '/', '.'].includes(char);
  }

  function isValidInput(newChar) {
    const allowedChars = /[0-9+\-*/.eπµsindeg]/;
    return allowedChars.test(newChar);
  }

  function hasConsecutiveOperators(newChar) {
    if (!isOperator(newChar)) return false;

    const lastChar = currentInput.slice(-1);
    return isOperator(lastChar) && isOperator(newChar);
  }

  function updateDisplay() {
    input.value = currentInput || '0';

    if (input.value.length > 20) {
      input.style.fontSize = '18px';
    } else {
      input.style.fontSize = '24px';
    }
  }

  function calculate() {
    try {
      if (!currentInput) return;

      let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, Math.PI);

      const result = eval(expression);
      lastResult = result;

      let formattedResult = result.toString();

      if (formattedResult.length > 12) {
        formattedResult = result.toExponential(6);
      }

      if (formattedResult.length > 15) {
        formattedResult = formattedResult.substring(0, 15) + '...';
      }

      answer.textContent = '=' + formattedResult;

      if (formattedResult.length > 10) {
        answer.style.fontSize = '32px';
      } else {
        answer.style.fontSize = '48px';
      }
    } catch (error) {
      answer.textContent = '=Error';
      answer.style.fontSize = '32px';
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const buttonText = this.textContent;

      switch (buttonText) {
        case 'Ac':
          currentInput = '';
          answer.textContent = '=0';
          answer.style.fontSize = '48px';
          break;
        case 'く':
          currentInput = currentInput.slice(0, -1);
          break;
        case '=':
          calculate();
          break;
        case 'sin':
          if (currentInput === '' || isOperator(currentInput.slice(-1))) {
            currentInput += 'sin(';
          }
          break;
        // case 'e':
        //   currentInput += Math.E;
        //   break;
        case 'deg':
          currentInput += '°';
          break;
        default:
          if (!isValidInput(buttonText)) {
            return;
          }

          if (hasConsecutiveOperators(buttonText)) {
            return;
          }

          if (buttonText === '*') {
            currentInput += '×';
          } else {
            currentInput += buttonText;
          }
          break;
      }

      updateDisplay();
    });
  });

  input.addEventListener('keydown', function (e) {
    e.preventDefault();
  });

  input.addEventListener('paste', function (e) {
    e.preventDefault();
  });

  updateDisplay();
});