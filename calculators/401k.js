/*
    File: 401k.js
    Purpose: Contains the calculator code for the Traditional and Roth 401k accounts.
*/

/*
 * 401k-specific variables, will be taken from sliders/input. Set here for testing.
*/

let portionOfSalaryToContribute401k = 0; 
let current401kBalance = 0;
let annualRateOfReturn401k = .07;
let employerMatchAmount401k = .5;
let employerMaxMatch401k = .06;
let maxAllowedIndividualContribution401k = 22500;
let roughAverageContributionIncreasePerYear401k = 450;

/**
 * Calculate 401k total value given user input.
 * Assumes return is compounded annually, deposits made monthly
 */
function calculate401k() {
    let total = current401kBalance;
    let currentSalary = salary;
    let curMaxIndividualContribution = maxAllowedIndividualContribution401k;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContribute401k;
        if (amountInvestedThisYearByMe > curMaxIndividualContribution) { // cap at max contribution
            amountInvestedThisYearByMe = curMaxIndividualContribution;
        }
        let portionOfSalaryAllowedToContribute = amountInvestedThisYearByMe / currentSalary; // see what percentage of salary you contributed after capping
        let amountEmployerWillMatch = portionOfSalaryAllowedToContribute;
        if (employerMaxMatch401k < portionOfSalaryAllowedToContribute) { // employer will match this up to a certain amount
            amountEmployerWillMatch = employerMaxMatch401k; // cap their contribution as well
        }
        let amountInvestedThisYearByEmployer = currentSalary*(amountEmployerWillMatch*employerMatchAmount401k);
        let returnOnTotal = total * annualRateOfReturn401k;
        total = total + amountInvestedThisYearByMe + amountInvestedThisYearByEmployer + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
        curMaxIndividualContribution += roughAverageContributionIncreasePerYear401k;
    }
    return total;
}

function set401kSalaryPortionContribution(portion) {
    portionOfSalaryToContribute401k = parseFloat(portion);
}
function setCurrent401kBalance(balance) {
    current401kBalance = parseInt(balance);
}
function setAnnualRateOfReturn401k(rate) {
    annualRateOfReturn401k = parseFloat(rate);
}
function setEmployerMatchAmount401k(matchAmount) {  
    employerMatchAmount401k = parseFloat(matchAmount);
}
function setEmployerMaxMatch401k(maxMatch) {
    employerMaxMatch401k = parseFloat(maxMatch);
}

function calculateTraditional401k(){
    let total = calculate401k();
    let retirementTaxAmount = taxesPerYear(total / yearsInRetirement);
    total -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    return total / (yearsInRetirement * 12); // total after taxes
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * Roth 401k-specific variables, will be taken from sliders/input. Set here for testing.
*/

let portionOfSalaryToContributeRoth401k = 0; 
let currentRoth401kBalance = 0;
let annualRateOfReturnRoth401k = .07;
let employerMatchAmountRoth401k = .5;
let employerMaxMatchRoth401k = .06;
let maxAllowedIndividualContributionRoth401k = 20500;
let roughAverageContributionIncreasePerYearRoth401k = 450;

/**
 * Calculate Roth Roth 401k total value given user input.
 * Assumes return is compounded annually, deposits made monthly
 */
function calculateRoth401k() {
    let total = currentRoth401kBalance;
    let currentSalary = salary;
    let curMaxIndividualContribution = maxAllowedIndividualContributionRoth401k;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContributeRoth401k;
        if (amountInvestedThisYearByMe > curMaxIndividualContribution) { // cap at max contribution
            amountInvestedThisYearByMe = curMaxIndividualContribution;
        }
        let portionOfSalaryAllowedToContribute = amountInvestedThisYearByMe / currentSalary; // see what percentage of salary you contributed after capping
        let amountEmployerWillMatch = portionOfSalaryAllowedToContribute;
        if (employerMaxMatchRoth401k < portionOfSalaryAllowedToContribute) { // employer will match this up to a certain amount
            amountEmployerWillMatch = employerMaxMatchRoth401k; // cap their contribution as well
        }
        let amountInvestedThisYearByEmployer = currentSalary*(amountEmployerWillMatch*employerMatchAmountRoth401k);
        let returnOnTotal = total * annualRateOfReturnRoth401k;
        total = total + amountInvestedThisYearByMe + amountInvestedThisYearByEmployer + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
        curMaxIndividualContribution += roughAverageContributionIncreasePerYearRoth401k;
    }
    return total / (yearsInRetirement * 12);
}

function setRoth401kSalaryPortionContribution(portion) {
    portionOfSalaryToContributeRoth401k = parseFloat(portion);
}
function setCurrentRoth401kBalance(balance) {
    currentRoth401kBalance = parseInt(balance);
}
function setAnnualRateOfReturnRoth401k(rate) {
    annualRateOfReturnRoth401k = parseFloat(rate);
}
function setEmployerMatchAmountRoth401k(matchAmount) {  
    employerMatchAmountRoth401k = parseFloat(matchAmount);
}
function setEmployerMaxMatchRoth401k(maxMatch) {
    employerMaxMatchRoth401k = parseFloat(maxMatch);
}



