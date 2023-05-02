/*
    File: monthlyAndInflation.js
    Purpose: Contains the calculator code for inflation.
*/

function afterInflationYearly(yearlyAmount){
    let yearsOfInflation = ageOfRetirement - currentAge;
    return (1 + inflationRate)**yearsOfInflation * yearlyAmount;
}