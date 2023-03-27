const catchupAge = 50;
let rothIraCurBal = 0;
let rothIraAnnCont = 6000;
let rothIraAnnRet = 0.07;
let rothIraCatchupCont = 1000;

let tradIraCurBal = 0;
let tradIraAnnCont = 6000;
let tradIraAnnRet = 0.07;
let tradIraCatchupCont = 1000;

// Formula from https://www.wallstreetmojo.com/roth-ira-calculator/
// Verified with https://www.dinkytown.net/java/roth-ira-calculator.html
function calculateIraHelper(curBal, annCont, annRet, catchupCont) {
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
    // let total = currentIraBalance * compoundMult +
    //            annualContribution * ((compoundMult - 1) * (1 + annualReturn) / annualReturn);
    return total;
}
function calculateRothIra(){
    return calculateIraHelper(rothIraCurBal, rothIraAnnCont, rothIraAnnRet, rothIraCatchupCont);
}

// Verified with https://www.dinkytown.net/java/traditional-ira-calculator.html
function calculateTraditionalIra(){
    let total = calculateIraHelper(tradIraCurBal, tradIraAnnCont, tradIraAnnRet, tradIraCatchupCont);
    let retirementTaxAmount = taxesPerYear(total / yearsInRetirement);
    total -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    return total; // total after taxes
}

console.log(calculateTraditionalIra());

// roth IRA setters
function setRothIraCurBal(bal) {
    rothCurBal = parseInt(bal);
}

function setRothIraAnnCont(cont) {
    rothAnnCont = parseInt(cont);
}

function setRothIraAnnRet(ret) {
    rothAnnRet = parseFloat(ret);
}

function setRothIraCatchupCont(cont){
    rothCatchupCont = parseInt(cont);
}

// traditional IRA setters
function setTradIraCurBal(bal) {
    tradIraCurBal = parseInt(bal);
}

function setTradIraAnnCont(cont) {
    tradIraAnnCont = parseInt(cont);
}

function setTradIraAnnRet(ret) {
    tradIraAnnRet = parseFloat(ret);
}

function setTradIraCatchupCont(cont){
    tradIraCatchupCont = parseInt(cont);
}

