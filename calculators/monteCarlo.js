/*
 * For growth accounts (401ks and IRAs)
 * User selects an asset mix type; we provide suggestion based on years until retirement
 *      Conservative, Balanced, Aggressive
 * This provides the annual rate of return + standard deviation (high risk, high reward)
 *      Data from Fidelity investment strategies
 * 
 * For 1000+ simulations:
 *      For each year from current age to retirement,
 *          Select rate of return for growth accounts uniformly at random
 *          using normal deviation with mean and std dev from data
 *      Calculate total at retirement
 * Display results of 1000 simulations
 */

let uncertaintyPanel;
// https://www.fidelity.com/bin-public/060_www_fidelity_com/documents/wealth-planning_investment-strategy.pdf
// within stocks, 70/30 split of domestic/international
let fidelityAssetData = {
    "Conservative": {"mean": 5.93, "std": 4.47, "stock": .20},
    "Moderate": {"mean": 7.37, "std": 7.80, "stock": .40},
    "Balanced": {"mean": 7.99, "std": 9.52, "stock": .50},
    "Growth": {"mean": 9.05, "std": 13.03, "stock": .70},
    "Aggressive": {"mean": 9.77, "std": 15.70, "stock": .85}
}

let simsData = [];
function runMonteCarlo(mean, std, numSims=1000) {
    let dist = d3.randomNormal(mean, std);
    for (let i=0; i<numSims; i++) {
        let rors = [];
        for (let year=0; year<(ageOfRetirement-currentAge); year++)
            rors.push(dist());
        let sim = calculateGrowth(rors);
        simsData.push(sim);
    }
}

function calculateGrowth(ratesOfReturn) {

}

function makeUncertaintyDiv() {
    let id = "uncertainty";
    accountsDiv.append("br");
    let uncertaintyDiv = accountsDiv.append("div")
        .attr("class", "accordion-item")
        .style("width", "130%")
        .attr("id", `${id}`);
    // container holds div for panel header, which is always shown
    // panel header contains account name and toggle
    let header = uncertaintyDiv.append("div")
        .attr("class", "panel-header accordion-header")
        .attr("id", `${id}-header`)
        .style("width", "100%");
    makeUncertaintyHeader(header, "Uncertainty Analysis", id);
    // container holds div for panel, which is shown if toggle is on
    uncertaintyPanel = uncertaintyDiv.append("div")
        .attr("class", "accordion-collapse collapse")
        .attr("id", `${id}-panel`)
        .attr("aria-labelledby", `${id}-header`);
}

function makeUncertaintyHeader(header, title, id) {
    header.append("h4")
        .attr("class", "header-title")
        .text(title);
    // toggle is a label holding the checkbox
    let toggleLabel = header.append("label")
        .attr("class", "toggle form-check form-switch");
    let checkbox = toggleLabel.append("input")
        .attr("type", "checkbox")
        .attr("class", "form-check-input collapsed")
        .attr("role", "switch")
        .attr("data-bs-toggle", "collapse")
        .attr("data-bs-target", `#${id}-panel`)
        .attr("aria-expanded", "false")
        .attr("aria-controls", `${id}-panel`);
}


function calculate401kSim() {
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
    return total;
}

function calculateTraditional401kSim(){
    let total = calculate401k();
    let retirementTaxAmount = taxesPerYear(total / yearsInRetirement);
    total -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    return total / (yearsInRetirement * 12); // total after taxes
}

function calculateRoth401kSim() {
    let total = currentRoth401kBalance;
    let currentSalary = salary;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContributeRoth401k;
        if (amountInvestedThisYearByMe > maxAllowedIndividualContributionRoth401k) { // cap at max contribution
            amountInvestedThisYearByMe = maxAllowedIndividualContributionRoth401k;
        }
        let portionOfSalaryAllowedToContribute = amountInvestedThisYearByMe / currentSalary; // see what percentage of salary you contributed after capping
        let amountEmployerWillMatch = portionOfSalaryAllowedToContribute;
        if (employerMaxMatchRoth401k < portionOfSalaryAllowedToContribute) { // employer will match this up to a certain amount
            amountEmployerWillMatch = employerMaxMatchRoth401k; // cap their contribution as well
        }
        let amountInvestedThisYearByEmployer = currentSalary*(amountEmployerWillMatch*employerMatchAmountRoth401k);
        let returnOnTotal = total * annualRateOfReturnRoth401k;
        total = total + amountInvestedThisYearByMe + amountInvestedThisYearByEmployer + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
        maxAllowedIndividualContributionRoth401k += roughAverageContributionIncreasePerYearRoth401k;
    }
    return total / (yearsInRetirement * 12);
}

function calculateIraHelperSim(curBal, annCont, annRet, catchupCont) {
    let total = curBal;
    let compoundMult = 1 + annRet;
    for (let i = currentAge; i < ageOfRetirement; i++) {
        total = total * compoundMult + annCont * compoundMult;
        if (i >= catchupAge) {
            total += catchupCont * compoundMult;
        }
    }
    return total;
}

function calculateRothIraSim(){
    let total = calculateIraHelper(rothIraCurBal, rothIraAnnCont, rothIraAnnRet, rothIraCatchupCont)
    return total / (yearsInRetirement * 12);
}

function calculateTraditionalIraSim(){
    let total = calculateIraHelper(tradIraCurBal, tradIraAnnCont, tradIraAnnRet, tradIraCatchupCont);
    let retirementTaxAmount = taxesPerYear(total / yearsInRetirement);
    total -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    return total / (yearsInRetirement * 12); // total after taxes
}
