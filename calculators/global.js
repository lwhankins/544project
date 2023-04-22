const moneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

var currentAge = 30;
var ageOfRetirement = 65;
var yearsInRetirement = 20;
var salary = 50000;
var annualSalaryIncrease = .03;
var moneyPerMonth = 0;
var averageAmericanTotal = 255000;
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

function setTaxStatus(taxStatus) {
    filer = parseInt(taxStatus);
}