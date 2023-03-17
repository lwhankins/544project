// 4.5% for a 12-month CD
// keeps rolling over year-over-year
// Round to nearest year of retirement (probably unnecessary)
let cdAPY = 0.045;
let currentCDBalance = 1000;
let portionOfSalaryToContributeCDs = .1; 

function calculateCD() {
    let total = currentCDBalance;
    let currentSalary = salary;

    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountAddedThisYear = currentSalary * portionOfSalaryToContributeCDs;
        let returnOnTotal = total * cdAPY;
        total = total + amountAddedThisYear + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
    }
    console.log(total);
}

calculateCD();