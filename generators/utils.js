let padding = 10;
let width = 600;
let height = 100;
// use d3-simple-slider from https://github.com/johnwalley/d3-simple-slider
function makeInputSlider(parent, name, min, max, suggested, step, format, setGlob){
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
                    });
    // TODO: onchange, determine what else to recalculate/update
    svg.call(slider);
    input.on('change', function() {
        slider.value(this.value);
        setGlob(this.value);
    });
}

function togglePanel(checkbox){
    console.log(checkbox.property("checked"))
}

function addParam(parentDiv, config) {
    let g = parentDiv.append("g")
        .attr("class", "param"); // add id as well?

    makeInputSlider(g, config.name, config.min, config.max, config.suggested,
                    config.step, config.format, config.setGlob);
}

let accountsDiv = d3.select("#accounts"); // matches index.html
function makeAccountDiv(title, paramConfigs) {
    // each account div is a container, the top level holder
    let accountDiv = accountsDiv.append("div")
        .attr("class", "container");
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
        .text("$ X,XXX");
    
    // container holds div for panel, which is shown if toggle is on
    let panel = accountDiv.append("div")
        .attr("class", "panel");

    
    for (let i = 0; i < paramConfigs.length; i++) {
        addParam(panel, paramConfigs[i]);
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

    let breakdown = div.append("div"); // Bar chart per type

    let comp = div.append("div"); // Bar chart by average
}

