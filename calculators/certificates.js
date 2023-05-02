/*
    File: certificates.js
    Purpose: Contains the calculator code for the CD account.
*/


// 4.5% for a 12-month CD
// keeps rolling over year-over-year
// Round to nearest year of retirement (probably unnecessary)
let cdAPY = 0.045;
let currentCDBalance = 0;
let portionOfSalaryToContributeCDs = 0; 

function calculateCD() {
    let total = currentCDBalance;
    let currentSalary = salary;

    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountAddedThisYear = currentSalary * portionOfSalaryToContributeCDs;
        let returnOnTotal = total * cdAPY;
        total = total + amountAddedThisYear + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
    }
    
    return total / (yearsInRetirement * 12);
}

function setCdAPY(apy) {
    cdAPY = parseFloat(apy);
}

function setCurrentCDBalance(currentBalance) {
    currentCDBalance = parseInt(currentBalance);
}

function setCDSalaryPortionContibution(contribution) {
    portionOfSalaryToContributeCDs = parseFloat(contribution);
}
