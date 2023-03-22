var currentAge = 30;
var ageOfRetirement = 65;
var yearsInRetirement = 20;
var salary = 50000;
var annualSalaryIncrease = .03;

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

// These functions will probably change form once variables get changed around
function preTaxTotal() {
    return calculate401k() + calculateCD() + calculateSP() + calculateSavings() + calculateTraditionalIRA(0,0,0,0);
}

function overallTotal() {
    return preTaxTotal() + calculate401k() + calculateRothIRA(0,0,0,0);
}

function moneyPerYear() {
    let preTax = preTaxTotal() / yearsInRetirement;
    let taxes = taxesPerYear(preTax);
    return overallTotal() - taxes;
}