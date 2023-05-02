/*
    File: savings.js
    Purpose: Contains the calculator code for High-Yield Savings accounts.
        Also contains code to run low-yield savings accounts - not used in viz.
*/

let savingsAPY = 0.0001; // Ew
let highYieldSavingsAPY = 0.03;
let currentSavingsBalance = 0;
let portionOfSalaryToContributeSavings = 0; 

function calculateSavings() {
    let total = currentSavingsBalance;
    let currentSalary = salary;

    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountAddedThisYear = currentSalary * portionOfSalaryToContributeSavings;
        let returnOnTotal = total * savingsAPY;
        total = total + amountAddedThisYear + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
    }
    
    return total / (yearsInRetirement * 12);
}

function calculateHYSavings() {
    savingsAPY = highYieldSavingsAPY;
    return calculateSavings();
}

function setSavingsAPY(apy) {
    savingsAPY = parseFloat(apy);
}

function setHYSavingsAPY(apy) {
    highYieldSavingsAPY = parseFloat(apy);
}

function setCurrentSavingsBalance(currentBalance) {
    currentSavingsBalance = parseInt(currentBalance);
}

function setSavingsPortionContribution(contribution) {
    portionOfSalaryToContributeSavings = parseFloat(contribution);
}
