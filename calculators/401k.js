

/*
 * Global variables, will be taken from sliders/input. Set here for testing.
*/
let salary = 40000;
let portionOfSalaryToContribute = .1; 
let annualSalaryIncrease = 0;
let currentAge = 30;
let ageOfRetirement = 65;
let current401kBalance = 1000;
let annualRateOfReturn = .07;

let employerMatchAmount = .5;
let employerMaxMatch = .06;

/**
 * Calculate 401k total value given user input.
 * Assumes return is compounded annually, deposits made monthly
 */
function calculate401k() {
    let total = current401kBalance;
    let currentSalary = salary;
    let amountEmployerWillMatch = portionOfSalaryToContribute;
    if (employerMaxMatch < portionOfSalaryToContribute) {
        amountEmployerWillMatch = employerMaxMatch;
    }
    let amountContributedByMe = 0;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYear = currentSalary*(portionOfSalaryToContribute + (amountEmployerWillMatch*employerMatchAmount));
        let returnOnTotal = total * annualRateOfReturn;
        total = total + amountInvestedThisYear + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
    }
    console.log(total);
}

calculate401k();
