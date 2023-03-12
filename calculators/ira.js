let annualContribution = 6500;
let annualReturn = .06;
let currentIRABalance = 13000;

// Formula from https://www.wallstreetmojo.com/roth-ira-calculator/
// Verified with https://www.dinkytown.net/java/roth-ira-calculator.html
function calculateRothIRA(){
    let yearsInterest = ageOfRetirement - currentAge;
    let compoundMult = (1 + annualReturn)**yearsInterest;
    let total = currentIRABalance * compoundMult +
               annualContribution * ((compoundMult - 1) * (1 + annualReturn) / annualReturn);
    console.log("Roth IRA: $" + Math.round(total));
    return total;
}


calculateRothIRA();