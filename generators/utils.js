let padding = 10;
let width = 600;
let height = 100;
// use d3-simple-slider from https://github.com/johnwalley/d3-simple-slider
function makeInputSlider(parent, name, min, max, suggested, step, format, setGlob, calculators, ids){
    // label is the top level holder
    let label = parent.append("label")
                      .text(name);
    // label holds a div with the input (field where user inputs the value and presses up/down)
    let input = label.append("div")
                    .attr("class", "param-input")
                    .append("input")
                    .attr("type", "number")
                    .attr("name", name)
                    .attr("value", suggested)
                    .attr("min", min)
                    .attr("max", max)
                    .attr("step", step);
    // label holds a div with the slider, contained in an svg
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
                        setGlob(val);
                        runCalculators(calculators, ids);
                    });
    // TODO: onchange, determine what else to recalculate/update
    svg.call(slider);
    input.on('change', function() {
        slider.value(this.value);
        setGlob(this.value);
        runCalculators(calculators, ids);
    });
}

function togglePanel(checkbox){
    console.log(checkbox.property("checked"))
}

function addParam(parentDiv, config, calculators, ids) {
    let g = parentDiv.append("g")
        .attr("class", "param"); // add id as well?

    makeInputSlider(g, config.name, config.min, config.max, config.suggested,
                    config.step, config.format, config.setGlob, calculators, ids);
}

function getIdFromTitle(title) {
    let newId = title.replace(/[^\w\s]/gi, '')
    return "account-" + newId.replace(/\s+/g, '-').toLowerCase();
}

let accountsDiv = d3.select("#accounts"); // matches index.html
function makeAccountDiv(title, paramConfigs, calculators) {
    let id = getIdFromTitle(title);

    // each account div is a container, the top level holder
    let accountDiv = accountsDiv.append("div")
        .attr("class", "container")
        .attr("id", id);
    // container holds div for panel header, which is always shown
    // panel header contains account name, money contributed, and toggle
    let header = accountDiv.append("div")
        .attr("class", "panel-header");
    header.append("h3")
        .attr("class", "header-title")
        .text(title);
    
    // toggle is a label holding the checkbox
    let toggleLabel = header.append("label")
        .attr("class", "toggle");
    let checkbox = toggleLabel.append("input")
        .attr("type", "checkbox");
    checkbox.on("change", () => togglePanel(checkbox));
    toggleLabel.append("span") // TODO: styling
        .attr("class", "slider");
    
    header.append("h3")
        .attr("class", "header-amount")
        .text("$");
    
    // container holds div for panel, which is shown if toggle is on
    let panel = accountDiv.append("div")
        .attr("class", "panel");

    
    for (let i = 0; i < paramConfigs.length; i++) {
        addParam(panel, paramConfigs[i], calculators, [id]);
    }
    return accountDiv;
}

function makeSidebarDiv(div) {
    div.attr("class", "panel-side");
    let header = div.append("div")
        .append("h3")
        .text(() => "You will have");
    
    header.append("h3")
        .attr("class", "sidebar-money")
        .text(() => `${moneyFormat.format(moneyPerMonth)}`);
    
    header.append("h3")
        .text(() => "per month in retirement");

    let breakdown = div.append("div"); // Bar chart per type (contributions)

    let comp = div.append("div"); // Bar chart by average (averageAmts)
}

function runCalculators(calculators, ids) {
    for (var i=0; i<calculators.length; i++) {
        let amount = calculators[i]();
        d3.select(`#${ids[i]}`)
            .select(".panel-header")
            .select(".header-amount")
            .text("$" + d3.format(",.0f")(amount));
    }
}
