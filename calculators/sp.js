/*
 * S&P500-specific variables, will be taken from sliders/input. Set here for testing.
*/

let currentAmountInvestedSP = 0;
let portionOfSalaryToContributeSP = 0; 
let expectedAnnualReturnSP = .07;


/**
 * Calculate S&P500 total value given user input.
 * Assumes return is compounded annually, deposits made monthly
 */
function calculateSP() {
    let total = currentAmountInvestedSP;
    let currentSalary = salary;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContributeSP; 
        let returnOnTotal = total * expectedAnnualReturnSP;
        total = total + amountInvestedThisYearByMe + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
    }
    return total / (yearsInRetirement * 12); // add taxes?
}

function setCurrentAmountInvestedSP(stonks) {
    currentAmountInvestedSP = parseInt(stonks);
}
function setPortionOfSalaryToContributeSP(portion) {
    portionOfSalaryToContributeSP = parseFloat(portion);
}
function setExpectedReturnSP(rate) {
    expectedAnnualReturnSP =  parseFloat(rate);
}
