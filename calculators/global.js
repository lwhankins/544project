/*
    File: global.js
    Purpose: Contains code to set global variables and format money strings properly.
        Utility file used by other files.
*/

const moneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

var currentAge = 30;
var ageOfRetirement = 65;
var yearsInRetirement = 20;
var salary = 50000;
var annualSalaryIncrease = .028;
var inflationRate = .022;
var moneyPerMonth = 0;
var averageAmericanTotal = 255000;
//https://www.annuity.org/retirement/planning/average-retirement-income/
var medianAmericanRetirementSalary = 47620;
var medianAmericanRetirementMonthly = 3486; // after taxesPerYear;
var contributions = [];
var averageAmts = [];
var salaryAtRetirement = salary;
var salaryAtRetirementAfterTaxes = salaryAtRetirement;

function setAge(age) {
    currentAge = parseInt(age);
}

function setAgeOfRetirement(ageOfRet) {
    ageOfRetirement = parseInt(ageOfRet);
}

function setYearsInRetirement(yearsInRet) {
    yearsInRetirement = parseInt(yearsInRet);
}

function setSalary(sal) {
    salary = parseInt(sal);
}

function setSalaryIncrease(salaryIncrease) {
    annualSalaryIncrease = parseFloat(salaryIncrease);
}

function setInflation(inflation) {
    inflationRate = parseFloat(inflation);
}

function setTaxStatus(taxStatus) {
    filer = parseInt(taxStatus);
}