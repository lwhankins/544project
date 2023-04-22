const catchupAge = 50;
let rothIraCurBal = 0;
let rothIraAnnCont = 0;
let rothIraAnnRet = 0.07;
let rothIraCatchupCont = 0;

let tradIraCurBal = 0;
let tradIraAnnCont = 0;
let tradIraAnnRet = 0.07;
let tradIraCatchupCont = 0;

// Formula from https://www.wallstreetmojo.com/roth-ira-calculator/
// Verified with https://www.dinkytown.net/java/roth-ira-calculator.html
function calculateIraHelper(curBal, annCont, annRet, catchupCont) {
    let total = curBal;
    let compoundMult = 1 + annRet;
    for (let i = currentAge; i < ageOfRetirement; i++) {
        total = total * compoundMult + (annCont*salary) * compoundMult;
        if (i >= catchupAge) {
            total += catchupCont * compoundMult;
        }
    }
    // formula without loop
    // let yearsInterest = ageOfRetirement - currentAge;
    // let compoundMult = (1 + annualReturn)**yearsInterest;
    // let total = currentIraBalance * compoundMult +
    //            annualContribution * ((compoundMult - 1) * (1 + annualReturn) / annualReturn);
    return total;
}
function calculateRothIra(){
    let total = calculateIraHelper(rothIraCurBal, rothIraAnnCont, rothIraAnnRet, rothIraCatchupCont)
    return total / (yearsInRetirement * 12);
}

// Verified with https://www.dinkytown.net/java/traditional-ira-calculator.html
function calculateTraditionalIra(){
    let total = calculateIraHelper(tradIraCurBal, tradIraAnnCont, tradIraAnnRet, tradIraCatchupCont);
    let retirementTaxAmount = taxesPerYear(total / yearsInRetirement);
    total -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    return total / (yearsInRetirement * 12); // total after taxes
}

console.log(calculateTraditionalIra());

// roth IRA setters
function setRothIraCurBal(bal) {
    rothIraCurBal = parseInt(bal);
}

function setRothIraAnnCont(cont) {
    rothIraAnnCont = parseFloat(cont);
}

function setRothIraAnnRet(ret) {
    rothIraAnnRet = parseFloat(ret);
}

function setRothIraCatchupCont(cont){
    rothIraCatchupCont = parseInt(cont);
}

// traditional IRA setters
function setTradIraCurBal(bal) {
    tradIraCurBal = parseInt(bal);
}

function setTradIraAnnCont(cont) {
    tradIraAnnCont = parseFloat(cont);
}

function setTradIraAnnRet(ret) {
    tradIraAnnRet = parseFloat(ret);
}

function setTradIraCatchupCont(cont){
    tradIraCatchupCont = parseInt(cont);
}

