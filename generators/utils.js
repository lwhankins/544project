let padding = 30;
let width = 800;
let height = 400;
// use d3-simple-slider from https://github.com/johnwalley/d3-simple-slider
function makeInputSlider(parent, name, min, max, suggested, step=1, format=","){
    let label = parent.append("label")
                      .text(name);
    let input = label.append("div")
                    .attr("class", "param-input")
                    .append("input")
                    .attr("type", "number")
                    .attr("name", name)
                    .attr("value", suggested)
                    .attr("min", min)
                    .attr("max", max)
                    .attr("step", step);
    var svg = label.append("div")
                    .attr("class", "param-slider")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform", `translate(${padding},${padding})`);
    let slider = d3.sliderBottom()
                    .width(400)
                    .min(min)
                    .max(max)
                    .step(step)
                    .ticks(4)
                    .tickFormat(d3.format(format))
                    .value(suggested)
                    .on("onchange", (val) => {
                        input.attr("value", val);
                    });
    // TODO: onchange, determine what else to recalculate/update
    svg.call(slider);
    input.on('change', function() {
        slider.value(this.value);
    });
}


let group1 = d3.select("#calcs")
                  .append("g")
                  .attr("class", "param")
                  .attr("id", "401kContributions")
makeInputSlider(group1, "401(k) Contribution", .01, .20, .10, step=0.005, format='.1%');

let group2 = d3.select("#calcs")
                .append("g")
                .attr("class", "param")
                .attr("id", "rothContributions")
makeInputSlider(group2, "Roth Contribution", 0, 7000, 6500, step=100)
