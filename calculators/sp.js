/*
 * S&P500-specific variables, will be taken from sliders/input. Set here for testing.
*/
let portionOfSalaryToContributeSP = .1; 
let expectedAnnualReturnSP = .04;


/**
 * Calculate S&P500 total value given user input.
 * Assumes return is compounded annually, deposits made monthly
 */
function calculateSP() {
    let total = 0;
    let currentSalary = salary;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContributeSP; 
        let returnOnTotal = total * expectedAnnualReturnSP;
        total = total + amountInvestedThisYearByMe + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
    }
    console.log(total);
}

calculateSP();

