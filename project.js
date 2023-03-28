// let ageGroup = d3.select("#basic_info")
//                   .append("g")
//                   .attr("class", "param")
//                   .attr("id", "age")
// makeInputSlider(ageGroup, "Age", 10, 80, 30, step=1, format=",", setAge);

// let retirementAgeGroup = d3.select("#basic_info")
//                   .append("g")
//                   .attr("class", "param")
//                   .attr("id", "retirementAge")
// makeInputSlider(retirementAgeGroup, "Retirement Age", 30, 80, 65, step=1, format=",", setAgeOfRetirement);

// let retirementLengthGroup = d3.select("#basic_info")
//                   .append("g")
//                   .attr("class", "param")
//                   .attr("id", "retirementLength")
// makeInputSlider(retirementLengthGroup, "# Years in Retirement", 5, 70, 20, step=1, format=",", setYearsInRetirement);


// let currentSalaryGroup = d3.select("#basic_info")
//                   .append("g")
//                   .attr("class", "param")
//                   .attr("id", "currentSalary")
// makeInputSlider(currentSalaryGroup, "Current Salary", 15000, 500000, 50000, step=1000, format=",", setSalary);

// let averageAnnualRaiseGroup = d3.select("#basic_info")
//                   .append("g")
//                   .attr("class", "param")
//                   .attr("id", "averageAnnualRaise")
// makeInputSlider(averageAnnualRaiseGroup, "Average Salary Raise Per Year", 0, .10, .03, step=.005, format='.1%', setSalaryIncrease);

// replace the above with config files and functions

// set up basic info with global configs
let basicInfoDiv = d3.select("#basic_info");
for (let i=0; i<globalsConfig.length; i++) {
    addParam(basicInfoDiv, globalsConfig[i]);
}
// set up account parameter info with accounts configs
for (const account in accountsConfig) {
    makeAccountDiv(account, accountsConfig[account]);
}

let sidebarDiv = d3.select("#sidebar");
makeSidebarDiv(sidebarDiv);
