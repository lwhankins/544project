// Varies widely depending on the bank -- I'll use 0.01% as a barometer since it's the baseline anyway
let savingsAPY = 0.0001; // Ew
let highYieldSavingsAPY = 0.03;
let currentSavingsBalance = 1000;
let portionOfSalaryToContributeSavings = .1; 

function calculateSavings() {
    let total = currentSavingsBalance;
    let currentSalary = salary;

    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountAddedThisYear = currentSalary * portionOfSalaryToContributeSavings;
        let returnOnTotal = total * savingsAPY;
        total = total + amountAddedThisYear + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
    }
    
    return total / (yearsInRetirement * 12); // add taxes?
}

function calculateHYSavings() {
    savingsAPY = highYieldSavingsAPY;
    return calculateSavings();
}

function setSavingsAPY(apy) {
    savingsAPY = parseFloat(apy / 100);
}

function setHYSavingsAPY(apy) {
    highYieldSavingsAPY = parseFloat(apy / 100);
}

function setCurrentSavingsBalance(currentBalance) {
    currentSavingsBalance = parseInt(currentBalance);
}

function setSavingsPortionContribution(contribution) {
    portionOfSalaryToContributeSavings = parseFloat(contribution / 100);
}
