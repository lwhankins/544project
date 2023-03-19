

/*
 * 401k-specific variables, will be taken from sliders/input. Set here for testing.
*/

let portionOfSalaryToContribute401k = .1; 
let current401kBalance = 30000;
let annualRateOfReturn401k = .06;
let employerMatchAmount401k = .5;
let employerMaxMatch401k = .03;
let maxAllowedIndividualContribution401k = 22500;
let roughAverageContributionIncreasePerYear401k = 450;

/**
 * Calculate 401k total value given user input.
 * Assumes return is compounded annually, deposits made monthly
 */
function calculate401k() {
    let total = current401kBalance;
    let currentSalary = salary;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContribute401k;
        if (amountInvestedThisYearByMe > maxAllowedIndividualContribution401k) { // cap at max contribution
            amountInvestedThisYearByMe = maxAllowedIndividualContribution401k;
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
        maxAllowedIndividualContribution401k += roughAverageContributionIncreasePerYear401k;
    }
    //console.log(total);
}

calculate401k();

function calculateTraditional401k(){
    let total = calculate401k();
    let retirementTaxAmount = taxesPerYear(total / yearsInRetirement);
    total -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    return total; // total after taxes
}
