const catchupAge = 50;
// Formula from https://www.wallstreetmojo.com/roth-ira-calculator/
// Verified with https://www.dinkytown.net/java/roth-ira-calculator.html
function calculateRothIRA(curBal, annCont, annRet, catchupCont){
    let total = curBal;
    let compoundMult = 1 + annRet;
    for (let i = currentAge; i < ageOfRetirement; i++) {
        total = total * compoundMult + annCont * compoundMult;
        if (i >= catchupAge) {
            total += catchupCont * compoundMult;
        }
    }
    // formula without loop
    // let yearsInterest = ageOfRetirement - currentAge;
    // let compoundMult = (1 + annualReturn)**yearsInterest;
    // let total = currentIRABalance * compoundMult +
    //            annualContribution * ((compoundMult - 1) * (1 + annualReturn) / annualReturn);
    return total;
}

// TODO: replace with tax info from taxes.js
let retirementTaxRate = .15;
// Verified with https://www.dinkytown.net/java/traditional-ira-calculator.html
function calculateTraditionalIRA(curBal, annCont, annRet, catchupCont){
    let total = calculateRothIRA(curBal, annCont, annRet, catchupCont);
    total *= 1 - retirementTaxRate;
    return total; // total after taxes
}

console.log("Roth IRA $" + Math.round(calculateRothIRA(13000, 6500, .06, 1000)));
console.log("Traditional IRA $" + Math.round(calculateTraditionalIRA(13000, 6500, .06, 1000)));