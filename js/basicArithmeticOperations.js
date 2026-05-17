import { parseAdvancedExpression, calculateSquareRoot } from "./advanced.js";

const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

buttonsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) return;

    const value = e.target.textContent;
    let currentText = display.textContent;

    //Clear screen
    if (value === 'C') {
        display.textContent = '0';
        return;
    }
    //Delete button
    if (value === 'Delete') {
        display.textContent = (currentText.length > 1 && currentText !== 'Error') ? currentText.slice(0, -1) : '0';
        return;
    }

    if (value === '√') {
        display.textContent = calculateSquareRoot(currentText);
        return;
    }
    //Equal
    if (value === '=') {
        try {
            let parsedExpression = parseAdvancedExpression(currentText);
            let result = new Function(`return ${parsedExpression}`)();
            display.textContent = !isFinite(result) ? 'Error' : Number(result.toFixed(8)).toString();
        } catch {
            display.textContent = 'Error';
        }
        return;
    }
    //Decimals
    if (value === '.') {
        const pieces = currentText.split(/[\+\-\*\/^]/);
        const lastNumber = pieces[pieces.length - 1];
        if (!lastNumber.includes('.') && !lastNumber.includes('PI')) {
            display.textContent += value;
        }
        return;
    }
    //Input
    if (currentText === '0' || currentText === 'Error') {
        display.textContent = (['+', '-', '*', '/', '^'].includes(value)) ? '0' + value : value;
    } else {
        display.textContent += value;
    }
});