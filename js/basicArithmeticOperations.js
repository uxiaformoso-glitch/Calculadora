import { parseAdvancedExpression, calculateSquareRoot } from "./advanced.js";

const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

let resetDisplay = false;

buttonsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) return;

    const value = e.target.textContent;
    let currentText = display.textContent;
    const operators = ['+', '-', '*', '/', '^'];

    //Clear screen
    if (value === 'C') {
        display.textContent = '0';
        resetDisplay = false;
        return;
    }
    //Delete button
    if (value === 'Delete') {
        if (currentText === 'Error' || currentText.length <= 1) {
            display.textContent = '0';
        } else {
            display.textContent = currentText.slice(0, -1);
        }
        resetDisplay = false;
        return;
    }

    if (value === '√') {
        display.textContent = calculateSquareRoot(currentText);
        resetDisplay = true; //Lock the display, so the next number overwrite works
        return;
    }
    //Equal
    if (value === '=') {
        try {
            if (operators.includes(currentText.slice(-1))) {
                currentText = currentText.slice(0, -1);
            }

            let parsedExpression = parseAdvancedExpression(currentText);
            let result = new Function(`return ${parsedExpression}`)();
            
            if (!isFinite(result) || isNaN(result)) {
                display.textContent = 'Error';
            } else {
                display.textContent = Number(result.toFixed(8)).toString();
            }
        } catch {
            display.textContent = 'Error';
        }
        resetDisplay = true; //Clear screen after equal trigger
        return;
    }
    //Fix: operator chaining
    if (operators.includes(value)) {
        resetDisplay = false

        //Replace operator instead of stacking them
        if (operators.includes(currentText.slice(-1))) {
            display.textContent = currentText.slice(0, -1) + value;
        } else if (currentText === 'Error') {
            display.textContent = '0' + value;
        } else {
            display.textContent += value;
        }
        return;
    }

    //Decimals
    if (value === '.') {
        //if a calculation just finished and hits a decimal, restart with "0.".
        if (resetDisplay) {
            display.textContent = '0.';
            resetDisplay = false;
            return;
        }
        
        const lastChar = currentText.slice(-1);

        //Block double decimals
        if (lastChar === '.' || lastChar === 'I') return;

        //if last character is an operator, turn "." into "0."
        if (operators.includes(lastChar)) {
            display.textContent += '0.';
            return;
        }

        const pieces = currentText.split(/[\+\-\*\/^]/);
        const lastNumber = pieces[pieces.length - 1];
        if (!lastNumber.includes('.')) {
            display.textContent += value;
        }
        return;
    }
    //Input
    if (resetDisplay) {
        //if the answer is on the screen and a new number or PI is typed, clear the screen
        display.textContent = value;
        resetDisplay = false;
    } else {
        if (currentText === '0' || currentText === 'Error') {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    }

    
});