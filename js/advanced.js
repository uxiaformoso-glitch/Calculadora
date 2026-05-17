export function parseAdvancedExpression(expr) {
    return expr.replaceAll('^', '**')
               .replaceAll('PI', Math.PI);
}

// Square root calculation logic
export function calculateSquareRoot(currentText) {
    try {
        let parsed = parseAdvancedExpression(currentText);
        let currentNum = new Function(`return ${parsed}`)();
        
        if (currentNum < 0) return 'Error';
        return Number(Math.sqrt(currentNum).toFixed(8)).toString();
    } catch {
        return 'Error';
    }
}