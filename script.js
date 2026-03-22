// Select DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Add event listeners
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if (value === 'AC') {
            clearDisplay();
        } 
        else if (value === '=') {
            calculateResult();
        } 
        else if (value === '±') {
            toggleSign();
        } 
        else if (value === '%') {
            percentage();
        } 
        else {
            appendValue(value);
        }
    });
});


// Append numbers and operators
function appendValue(value) {
    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }
}


// Clear display
function clearDisplay() {
    display.value = "0";
}


// FIXED Calculate function
function calculateResult() {
    try {

        // Convert symbols BEFORE evaluation
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        display.value = eval(expression);

    } catch {
        display.value = "Error";
    }
}


// Toggle positive / negative
function toggleSign() {
    if (display.value !== "0") {
        display.value = String(parseFloat(display.value) * -1);
    }
}


// Percentage
function percentage() {
    if (display.value !== "0") {
        display.value = String(parseFloat(display.value) / 100);
    }
}