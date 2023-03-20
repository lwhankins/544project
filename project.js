let ageGroup = d3.select("#basic_info")
                  .append("g")
                  .attr("class", "param")
                  .attr("id", "age")
makeInputSlider(ageGroup, "Age", 10, 80, 30, step=1);

let retirementAgeGroup = d3.select("#basic_info")
                  .append("g")
                  .attr("class", "param")
                  .attr("id", "retirementAge")
makeInputSlider(retirementAgeGroup, "Retirement Age", 30, 80, 65, step=1);

let retirementLengthGroup = d3.select("#basic_info")
                  .append("g")
                  .attr("class", "param")
                  .attr("id", "retirementLength")
makeInputSlider(retirementLengthGroup, "# Years in Retirement", 5, 70, 20, step=1);


let currentSalary = d3.select("#basic_info")
                  .append("g")
                  .attr("class", "param")
                  .attr("id", "currentSalary")
makeInputSlider(currentSalary, "Current Salary", 15000, 500000, 50000, step=1000);

let averageAnnualRaise = d3.select("#basic_info")
                  .append("g")
                  .attr("class", "param")
                  .attr("id", "averageAnnualRaise")
makeInputSlider(averageAnnualRaise, "Average Salary Raise Per Year", 0, .10, .03, step=.005, format='.1%');