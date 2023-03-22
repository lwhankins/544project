const catchupAge = 50;
let rothCurBal = 0;
let rothAnnCont = 6000;
let rothAnnRet = 0.07;
let rothCatchupCont = 1000;
// Formula from https://www.wallstreetmojo.com/roth-ira-calculator/
// Verified with https://www.dinkytown.net/java/roth-ira-calculator.html
function calculateRothIRA(){
    let total = rothCurBal;
    let compoundMult = 1 + rothAnnRet;
    for (let i = currentAge; i < ageOfRetirement; i++) {
        total = total * compoundMult + rothAnnCont * compoundMult;
        if (i >= catchupAge) {
            total += rothCatchupCont * compoundMult;
        }
    }
    // formula without loop
    // let yearsInterest = ageOfRetirement - currentAge;
    // let compoundMult = (1 + annualReturn)**yearsInterest;
    // let total = currentIRABalance * compoundMult +
    //            annualContribution * ((compoundMult - 1) * (1 + annualReturn) / annualReturn);
    return total;
}

// Verified with https://www.dinkytown.net/java/traditional-ira-calculator.html
function calculateTraditionalIRA(){
    let total = calculateRothIRA();
    let retirementTaxAmount = taxesPerYear(total / yearsInRetirement);
    total -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    return total; // total after taxes
}

console.log(calculateTraditionalIRA());

function setRothCurBal(bal) {
    rothCurBal = parseInt(bal);
}

function setRothAnnCont(cont) {
    rothAnnCont = parseInt(cont);
}

function setRothAnnRet(ret) {
    rothAnnRet = parseFloat(ret);
}

function setRothCatchupCont(cont){
    rothCatchupCont = parseInt(cont);
}

