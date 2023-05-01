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
let uncertaintySvg;
let uncertaintyGraph;

// set up svg to hold plot
let mcPlotWidth = 560;
let mcPlotHeight = 400;
let margin = {top: 50, right: 200, bottom: 50, left: 100};
let xScaleMC, yScaleMC, colorScale, assetColorScale;
let yearIdxs;
let minMonthly, maxMonthly;

let assetIdx;

// https://www.fidelity.com/bin-public/060_www_fidelity_com/documents/wealth-planning_investment-strategy.pdf
// within stocks, 70/30 split of domestic/international
let fidelityAssetData = {
    "Conservative": {"mean": 5.93, "std": 4.47, "stock": .20},
    "Moderate": {"mean": 7.37, "std": 7.80, "stock": .40},
    "Balanced": {"mean": 7.99, "std": 9.52, "stock": .50},
    "Growth": {"mean": 9.05, "std": 13.03, "stock": .70},
    "Aggressive": {"mean": 9.77, "std": 15.70, "stock": .85}
}
let assetTypes = ["Conservative", "Moderate", "Balanced", "Growth", "Aggressive"];
let percent = d3.format(".0%");
let spaced = d3.format("6.2f");

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
    simsData = [];
    let dist = d3.randomNormal(mean, std);
    for (let i=0; i<numSims; i++) {
        let rors = []; // generate list of rates of return for each year until retirement
        for (let year=0; year<(ageOfRetirement-currentAge); year++)
            rors.push(dist());
        let sim = calculateGrowth(rors);
        simsData.push(sim);
    }

    makeMCPlot(simsData);
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
    return totalsSum;
}

// function to draw paths, modified from
// https://d3-graph-gallery.com/graph/parallel_basic.html
// for each dimension, get the (x,y) location for that data point
function path(d) {
    return d3.line()(
      yearIdxs.map(function(i) { return [xScaleMC(i+currentAge), yScaleMC(d[i])]; }));
  }
  
// make Monte Carlo plot
function makeMCPlot(simsData){
    if (uncertaintySvg != null) {
        uncertaintySvg.selectAll("*").remove();
        uncertaintySvg.remove();
        d3.select("#percentile-info").remove();
    }

    uncertaintySvg = uncertaintyPanel.append("svg")
        .attr("id", "uncertainty-svg")
        .attr("width", mcPlotWidth + margin.left + margin.right)
        .attr("height", mcPlotHeight + margin.top + margin.bottom);

    uncertaintyGraph = uncertaintySvg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("id", "uncertainty-graph");

    let max = d3.max(simsData, (d) => d3.max(d));
    let min = d3.min(simsData, (d) => d3.min(d));

    let monthlyAmountsAfterTax = [];
    let lastIdx = simsData[0].length - 1;
    for (let i=0; i < simsData.length; i++) {
        let monthly = simsData[i][lastIdx] / (12 * yearsInRetirement)
        monthlyAmountsAfterTax.push(removeInflation(monthly));
    }
    minMonthly = d3.min(monthlyAmountsAfterTax);
    maxMonthly = d3.max(monthlyAmountsAfterTax);

    yearIdxs = [];
    for (let i=0; i <= ageOfRetirement-currentAge; i++) {
        yearIdxs.push(i);
    }

    // data scales
    xScaleMC = d3.scaleLinear()
        .domain([currentAge, ageOfRetirement])
        .range([0, mcPlotWidth]);
    yScaleMC = d3.scaleLinear()
        .domain([min, max])
        .range([mcPlotHeight, 0]);
    colorScale = d3.scaleSequential(d3.interpolateWarm)
        .domain([minMonthly, maxMonthly]);

    addAxes();

    // draw polylines
    uncertaintyGraph.selectAll(".datapath")
        .data(simsData)
        .join("path")
        .attr("class", "datapath")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", d => colorScale(removeInflation(d[d.length-1] / (12 * yearsInRetirement))))
        .attr("opacity", 0.75)
        .attr("stroke-width", 2);

    addPercentiles(monthlyAmountsAfterTax);
}

function addPercentiles(monthlyAmountsAfterTax){
    let percentilesX = margin.left + mcPlotWidth + 100
    let percentiles = uncertaintySvg.append("g")
        .attr("transform", `translate(${percentilesX}, ${margin.top})`);
    
    let percentilesScale = d3.scaleLinear()
        .domain([minMonthly, maxMonthly])
        .range([mcPlotHeight, 0]);
    percentiles.call(d3.axisLeft(percentilesScale));
    uncertaintySvg.append("text")
        .attr("id", "percentiles-title")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("transform", `translate(${percentilesX}, 40)`)
        .text("Monthly After Taxes")

    percentiles.selectAll("circle")
        .data(monthlyAmountsAfterTax)
        .join("circle")
        .attr("cx", 0)
        .attr("cy", d => percentilesScale(d))
        .attr("r", 3)
        .attr("fill", d => colorScale(d))

    monthlyAmountsAfterTax.sort(function(a, b) { return a - b; });
    let ninety = d3.quantile(monthlyAmountsAfterTax, 0.10);
    let seventyfive = d3.quantile(monthlyAmountsAfterTax, 0.25);
    let fifty = d3.quantile(monthlyAmountsAfterTax, 0.50);

    uncertaintyPanel.append("div")
        .attr("id", "percentile-info")
        .style("background-color", assetColorScale(assetIdx))
        .style("color", () => assetIdx==0 || assetIdx==4 ? "white" : "black")
        .html(`90% of the time, >= $${thousands(ninety)} per month<br>
               75% of the time, >= $${thousands(seventyfive)} per month<br>
               50% of the time, >= $${thousands(fifty)} per month<br>
               Average: $${thousands(d3.mean(monthlyAmountsAfterTax))} per month`)

    let showPercents = [{p: 0.9, val: ninety},
                        {p: 0.75, val: seventyfive},
                        {p: 0.5, val: fifty}]

    const arrow = d3.arrow2()
        .id("arrow")
        .scale(0.75)
        .attr("fill", "#212529")
        .attr("stroke", "#212529");
    uncertaintySvg.call(arrow);

    let pGroup = percentiles.append("g");

    pGroup.selectAll("polyline")
        .data(showPercents)
        .join("polyline")
        .attr("points", function(d) {
            return [[35, percentilesScale(d.val)], [10, percentilesScale(d.val)]];
        })
        .attr("marker-end", "url(#arrow)")
        .attr("stroke", "#212529")
        .attr("stroke-width", 2)

    pGroup.selectAll("text")
        .data(showPercents)
        .join("text")
        .attr("text-anchor", "left")
        .attr("text-align", "left")
        .attr("x", 70)
        .attr("y", d => percentilesScale(d.val))
        .attr("dy", ".4em")
        .attr("font-size", "12px")
        .attr("fill", "#212529")
        .text(d => `${percent(d.p)}`);
    
}

function addAxes(){
    let yAxis = d3.axisLeft()
        .scale(yScaleMC);
    let xAxis = d3.axisBottom()
        .scale(xScaleMC);
    uncertaintySvg.append("g")
        .attr("class", "mc-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);
    uncertaintySvg.append("g")
        .attr("class", "mc-axis")
        .attr("transform", `translate(${margin.left}, ${mcPlotHeight + margin.top})`)
        .call(xAxis);
    uncertaintySvg.append("text")
        .attr("class", "mc-axis")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(10, ${margin.top + mcPlotHeight/2}) rotate(-90)`)
        .text("Lump Sum");
    uncertaintySvg.append("text")
        .attr("class", "mc-axis")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${margin.left + mcPlotWidth / 2}, ${mcPlotHeight + 85})`)
        .text("Age");
    // title
    uncertaintySvg.append("text")
        .attr("id", "mc-title")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("transform", `translate(${margin.left + mcPlotWidth / 2}, 40)`)
        .text("Growth Accounts: Lump Sum")
}

// make div with header and panel for uncertainty analysis
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

    uncertaintyPanel.append("div")
        .attr("id", "uncertainty-info")
        .html(`The future of any investment is uncertain, but stocks are especially volatile. For growth accounts (401ks and IRAs), the <strong>asset mix</strong> that you choose is essential. Asset mix is the percentage of your investment allocated to stocks versus the percentage allocated to bonds/cash. Stocks are <em>high risk, high reward</em>, whereas bonds/cash are <em>low risk, low reward</em>. We recommend that individuals who are farther from retirement choose a more aggressive asset mix, as they tend to tolerate risk better.<br><br>
        In this analysis, we run 1,000 <strong>Monte Carlo</strong> simulations. The rate of return each year is drawn from a normal distribution specified by the asset strategy you select below ("Return Rate" is the mean, "Volatility" is the standard deviation).<sup><a href="https://www.fidelity.com/bin-public/060_www_fidelity_com/documents/wealth-planning_investment-strategy.pdf">14</a></sup> Try adjusting the rate of return in the growth account dropdowns to match your chosen strategy's return rate. Then, compare the static amount (on the righthand side) with the Monte Carlo simulation results. Note: You will need to click "Run Monte Carlo" to re-run the simulations after changing any of the inputs from the above account dropdowns.
        <br><br>`);
    uncertaintyPanel.append("div")
        .attr("id", "asset-strategy-header")
        .html(`Select an Asset Strategy: `)
    uncertaintyPanel.append("button")
        .attr("id", "run-mc")
        .html("Run Monte Carlo")
        .on("click", function () {
            if (portionOfSalaryToContribute401k == 0 && portionOfSalaryToContributeRoth401k == 0
                && rothIraAnnCont == 0 && tradIraAnnCont == 0) {
                alert("Contributions to at least one growth account (401k or IRA) must be > 0. Please ensure all accounts that you want to consider are checked.");
            }else if (assetIdx == null) {
                alert("Please select an asset mix");
            }
            else {
                let mix = assetTypes[assetIdx];
                runMonteCarlo(fidelityAssetData[mix].mean/100, fidelityAssetData[mix].std/100);
            }
        })
    addButtons();
}

// asset mix buttons
function addButtons(){
    let buttonsDiv = uncertaintyPanel.append("div")
            .attr("class", "asset-mix");
    assetColorScale = d3.scaleSequential(d3.interpolatePiYG)
                    .domain([0, assetTypes.length-1]);

    for (let i=0; i < assetTypes.length; i++) {
        let mix = assetTypes[i];
        buttonsDiv.append("button")
            .attr("class", "asset-mix-button")
            .html(`<strong>${mix}</strong><br>${percent(fidelityAssetData[assetTypes[i]]["stock"])} stock`)
            .style("background-color", assetColorScale(i))
            .style("color", () => i==0 || i==4 ? "white" : "black")
            .style("opacity", "80%")
            .attr("value", 0)
            .on("click", function() {
                assetIdx = i;
                d3.select("#asset-strategy-header")
                    .html(`Select an Asset Strategy: <strong>${mix}</strong>`)
                d3.select("#asset-mix-info")
                    .html(`Return Rate: <strong>${spaced(fidelityAssetData[mix].mean)}%</strong><br>
                    Volatility: <strong>${spaced(fidelityAssetData[mix].std)}%</strong>`)
            });
    }

    buttonsDiv.append("div")
        .attr("id", "asset-mix-info")
        .html(`Return Rate: <strong>&nbsp;&nbsp;—%</strong><br> Volatility: <strong>&nbsp;&nbsp;—%</strong>`)
}

// make orange header with toggle for uncertainty analysis
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

// same as other calculator, except use randomly drawn rates of return
// per year and return list of totals at each year
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
    finalTotal -= (retirementTaxAmount * yearsInRetirement);
    totals.push(finalTotal);

    return totals;
}

// same as other calculator, except use randomly drawn rates of return
// per year and return list of totals at each year
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

// same as other calculator, except use randomly drawn rates of return
// per year and return list of totals at each year
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
    finalTotal -= (retirementTaxAmount * yearsInRetirement);
    totals.push(finalTotal);
    return totals;
}
