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

// let accountsList = ["Traditional 401K", "Roth 401K", "Traditional IRA", "Roth IRA",
//                     "High-Yield Savings Account", "Certificates of Deposit", "S&P Index"];
let growthAccounts = ["Traditional 401K", "Roth 401K", "Traditional IRA", "Roth IRA"];
let growthCalculators = [calculateTraditional401kSim, calculateRoth401kSim, 
                         calculateTraditionalIraSim, calculateRothIraSim];
let checkboxes = [];
for (let i=0; i < growthAccounts.length; i++) {
    let checkbox = d3.select(`#${getIdFromTitle(growthAccounts[i])}`)
                .select(".panel-header")
                .select(".toggle")
                .select(".form-check-input");
    checkboxes.push(checkbox);
}

// set up monte carlo div
makeUncertaintyDiv();

// https://www.investopedia.com/articles/investing/062714/100-minus-your-age-outdated.asp
function getSuggestedAssetMix(){
    let yearsUntilRetirement = ageOfRetirement - currentAge;
    let suggested;
    if (yearsUntilRetirement <= 5)
        suggested = "Conservative";
    else if (yearsUntilRetirement <= 10)
        suggested = "Moderate";
    else if (yearsUntilRetirement <= 15)
        suggested = "Balanced";
    else if (yearsUntilRetirement <= 35)
        suggested = "Growth";
    else
        suggested = "Aggressive";
    return suggested;
}

let simsData = [];
function runMonteCarlo(mean, std, numSims=1000) {
    let dist = d3.randomNormal(mean, std);
    for (let i=0; i<numSims; i++) {
        let rors = []; // generate list of rates of return for each year until retirement
        for (let year=0; year<(ageOfRetirement-currentAge); year++)
            rors.push(dist());
        let sim = calculateGrowth(rors);
        simsData.push(sim);
    }
}

function calculateGrowth(rors) {
    let totalsSum = [];
    // cur age, years of investment, after tax amount
    for (let i=0; i<(ageOfRetirement-currentAge+2); i++)
        totalsSum.push(0);

    for (let i=0; i < growthAccounts.length; i++) {
        if (checkboxes[i].property("checked")) {
            let totals = growthCalculators[i](rors);
            for (let j=0; j < totals.length; j++) {
                totalsSum[j] += totals[j]; 
            }
        }
    }
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
        .attr("class", "panel-header accordion-header orange-header")
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


function calculateTraditional401kSim(rors) {
    let total = current401kBalance;
    let totals = [total];
    let currentSalary = salary;
    let curMaxIndividualContribution = maxAllowedIndividualContribution401k;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContribute401k;
        if (amountInvestedThisYearByMe > curMaxIndividualContribution) { // cap at max contribution
            amountInvestedThisYearByMe = curMaxIndividualContribution;
        }
        let portionOfSalaryAllowedToContribute = amountInvestedThisYearByMe / currentSalary; // see what percentage of salary you contributed after capping
        let amountEmployerWillMatch = portionOfSalaryAllowedToContribute;
        if (employerMaxMatch401k < portionOfSalaryAllowedToContribute) { // employer will match this up to a certain amount
            amountEmployerWillMatch = employerMaxMatch401k; // cap their contribution as well
        }
        let amountInvestedThisYearByEmployer = currentSalary*(amountEmployerWillMatch*employerMatchAmount401k);
        let returnOnTotal = total * rors[i];
        total = total + amountInvestedThisYearByMe + amountInvestedThisYearByEmployer + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
        curMaxIndividualContribution += roughAverageContributionIncreasePerYear401k;
        totals.push(total);
    }

    let finalTotal = totals[totals.length-1];
    let retirementTaxAmount = taxesPerYear(finalTotal / yearsInRetirement);
    finalTotal -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    totals.push(finalTotal);

    return totals;
}

function calculateRoth401kSim(rors) {
    let total = currentRoth401kBalance;
    let totals = [total];
    let currentSalary = salary;
    let curMaxIndividualContribution = maxAllowedIndividualContributionRoth401k;
    for  (let i = 0; i < (ageOfRetirement - currentAge); i++) {
        let amountInvestedThisYearByMe = currentSalary*portionOfSalaryToContributeRoth401k;
        if (amountInvestedThisYearByMe > curMaxIndividualContribution) { // cap at max contribution
            amountInvestedThisYearByMe = curMaxIndividualContribution;
        }
        let portionOfSalaryAllowedToContribute = amountInvestedThisYearByMe / currentSalary; // see what percentage of salary you contributed after capping
        let amountEmployerWillMatch = portionOfSalaryAllowedToContribute;
        if (employerMaxMatchRoth401k < portionOfSalaryAllowedToContribute) { // employer will match this up to a certain amount
            amountEmployerWillMatch = employerMaxMatchRoth401k; // cap their contribution as well
        }
        let amountInvestedThisYearByEmployer = currentSalary*(amountEmployerWillMatch*employerMatchAmountRoth401k);
        let returnOnTotal = total * rors[i];
        total = total + amountInvestedThisYearByMe + amountInvestedThisYearByEmployer + returnOnTotal;
        currentSalary = currentSalary*(1 + annualSalaryIncrease);
        curMaxIndividualContribution += roughAverageContributionIncreasePerYearRoth401k;
        totals.push(total);
    }
    totals.push(totals[totals.length-1]);
    return totals;
}

function calculateIraHelperSim(curBal, annCont, rors, catchupCont) {
    let total = curBal;
    let totals = [total];
    for (let i = currentAge; i < ageOfRetirement; i++) {
        let compoundMult = 1 + rors[i-currentAge];
        total = total * compoundMult + annCont * compoundMult;
        if (i >= catchupAge) {
            total += catchupCont * compoundMult;
        }
        totals.push(total);
    }
    return totals;
}

function calculateRothIraSim(rors){
    let totals = calculateIraHelperSim(rothIraCurBal, rothIraAnnCont, rors, rothIraCatchupCont);
    totals.push(totals[totals.length-1]);
    return totals;
}

function calculateTraditionalIraSim(rors){
    let totals = calculateIraHelperSim(tradIraCurBal, tradIraAnnCont, rors, tradIraCatchupCont);
    let finalTotal = totals[totals.length-1];
    let retirementTaxAmount = taxesPerYear(finalTotal / yearsInRetirement);
    finalTotal -= (retirementTaxAmount * yearsInRetirement); // could update to change by year
    totals.push(finalTotal);
    return totals;
}
