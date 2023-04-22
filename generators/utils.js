let padding = 10;
let width = 500;
let height = 50;

/*
 * Make a label with text, numerical input, and slider for a parameter. Structure:
 *
 *  - parent (group)
 *      - label (label), top level holder with name
 *          - inputDiv (div), holds the input field
 *              - input (input)
 *          - sliderDiv (div), holds the slider svg
 *              - sliderSvg (svg), calls the slider
 *                  - slider (d3.sliderBottom)
 *
 * The input and slider are connected to each other (should have same value);
 * on change, run all the calculators that this slider is connected to (i.e.,
 * all accounts if global, one account if local).
 * 
 * params:
 *      parent: holder for the entire label
 *      name: name of the parameter, e.g., Annual Contribution
 *      min, max, suggested: values of the param, w/ suggested as default
 *      step: step size for the param (in input and slider), e.g., 1,000
 *      format: how to format numerical value, e.g., ".1%"
 *      setGlob: global setter function for this parameter
 *      calculators, ids: list of calculators and ids to connect to
 */
// Can consider bootstrap range component
// use d3-simple-slider from https://github.com/johnwalley/d3-simple-slider
function makeInputSlider(parent, name, min, max, suggested, step, format, setGlob, calculators, ids){
    // label is the top level holder
    let label = parent.append("label")
                      .text(name)
                      .attr("data-bs-toggle", "tooltip")
                    .attr("data-bs-placement", "top")
                    .attr("data-bs-title", `Standard: ${suggested}`);
    // label holds a div with the input (field where user inputs the value and presses up/down)
    let input = label.append("div")
                    .attr("class", "param-input")
                    .append("input")
                    .attr("type", "number")
                    .attr("name", name)
                    .attr("value", suggested)
                    .attr("min", min)
                    .attr("max", max)
                    .attr("step", step)
                    ;
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
                        updateSidebar();
                    });
    svg.call(slider);
    input.on('change', function() {
        slider.value(this.value);
        setGlob(this.value);
        runCalculators(calculators, ids);
        updateSidebar();
    });
}

function makeRadio(parent, name, options, setGlob, calculators, ids) {
    let container = parent.append("div").attr("class", "param-radio");
    let top = container.append("h4")
                      .text(name);
    container.append("div")
                      .text(taxCopy);
    container.append("br");

    // label holds a div with the buttons
    for (let i=0; i < options.length; i++) {
        let top = container.append("div")
                        .attr("class", "form-check");
        let input = top.append("input")
                        .attr("class", "form-check-input")
                        .attr("type", "radio")
                        .attr("name", name)
                        .attr("id", options[i])
                        .attr("value", i)
                        .property("checked", () => i==0);
        let label = top.append("label")
                        .attr("class", "form-check-label")
                        .attr("for", options[i])
                        .text(options[i]);
        input.on('change', function() {
            setGlob(this.value);
            runCalculators(calculators, ids);
            updateSidebar();
        });
    }
}

/* 
 * Callback for toggling account panel on and off. Uses the checkbox
 * to determine if the panel is on (run calculators, show panel) or
 * off (hide panel, reset data-amount and text)
 */
function togglePanel(checkbox, calculators, id){
    if (checkbox.property("checked")) {
        runCalculators(calculators, [id]);
        updateSidebar();
    }
    else {
        let header = d3.select(`#${id}`)
                    .select(".panel-header");
        header.attr("data-amount", 0);
        header.select(".header-amount")
            .text("—");
        updateSidebar();
    }
}

/* 
 * Add a parameter to its parent div using config; connect calculators and
 *  account divs (via id). Called for both global and account-specific params
 */
function addParam(parentDiv, config, calculators, ids) {
    let g = parentDiv.append("g")
        .attr("class", "param"); // add id as well?

    makeInputSlider(g, config.name, config.min, config.max, config.suggested,
                    config.step, config.format, config.setGlob, calculators, ids);
}

/* 
 * Using the name of an account, get its global id, used to id the
 * top-level container in makeAccountDiv(). Remove special characters,
 * replace whitespace with dash, and transform to lowercase.
 * 
 *      Ex: Traditional 401k -> account-traditional-401k
 * 
 * params:
 *      title: account name to transform into id
 */
function getIdFromTitle(title) {
    let newId = title.replace(/[^\w\s]/gi, '')
    return "account-" + newId.replace(/\s+/g, '-').toLowerCase();
}

/*
 * Creates the structure of the header for each account div. The header
 * should always be shown and is interactive. It contains the title of
 * the account and its monthly contribution (if on). The user toggles an
 * account on/off using the header's toggle. Each header has the structure:
 * 
 *  - header (div)
 *      - header title (h3), displays account name
 *      - toggle label (label), holds checkbox
 *          - checkbox (input), toggles panel on/off
 *          - span (slider), for styling
 *      - header amount (h3), displays data amount 
 */
function makeHeader(header, title, calculators, id) {
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
        .attr("aria-controls", `${id}-panel`)
        .on("click", function() {
            d3.select(`#${id}-panel-copy`)
                .attr("class", "text-copy panel accordion-collapse collapse");
            document.getElementById(`${id}-copy-dropdown-image`).src = "./images/right-arrow.png";
        });
    checkbox.on("change", () => togglePanel(checkbox, calculators, id));
    header.append("h4")
        .attr("class", "header-amount")
        .text("—");
}

let accountsDiv = d3.select("#accounts"); // matches index.html


/*
 * Makes div with copy available with dropwdown. This is appended to the bottom
 * of each account div. 
 */ 
function makeCopyDropdown(title) {
    let id = getIdFromTitle(title);
    let accountInfo = d3.select(`#${id}-panel`);
    let dropDownHeader = accountInfo.append("div");
    let toggleCopy = dropDownHeader.append("label")
        .attr("class", "copy-dropdown-label")
        .on("click", function(event) {
            if (event.srcElement == this) {
                return;
            }
            let img = document.getElementById(`${id}-copy-dropdown-image`);
            if(img.src.includes("right-arrow.png")) {
                img.src = "./images/down-arrow.png";
            } else {
                img.src = "./images/right-arrow.png";
            }
            return;
        })
        .text("Show More Info");
    let dropDownImage = toggleCopy.append("img")
        .attr("id", `${id}-copy-dropdown-image`)
        .attr("src", "./images/right-arrow.png")
        .attr("class", "copy-dropdown-image")
        .on("click", function(event) {
            let img = document.getElementById(`${id}-copy-dropdown-image`);
            if(img.src.includes("right-arrow.png")) {
                img.src = "./images/down-arrow.png";
            } else {
                img.src = "./images/right-arrow.png";
            }
            return;
        })
    let checkbox = toggleCopy.append("input")
        .attr("type", "checkbox")
        .attr("id", `${id}-copy-dropwdown-checkbox`)
        .attr("class", "copy-check-input collapsed")
        .attr("role", "switch")
        .attr("data-bs-toggle", "collapse")
        .attr("data-bs-target", `#${id}-panel-copy`)
        .attr("aria-expanded", "false")
        .attr("aria-controls", `${id}-panel-copy`);
    let copy = accountCopy[title];
    if (title.includes("IRA")) {
        copy = accountCopy["IRA"] + "\n\n" + copy + "\n\n" + accountCopy["IRA Ending"];
    }

    if (title.includes("401")) {
        copy = accountCopy["401K"] + "\n\n" + copy + "\n\n" + accountCopy["401K Ending"];
    }

    let accountDiv = d3.select(`#${id}`);
    let copyPanel = accountDiv.append("div")
        .attr("class", "text-copy panel accordion-collapse collapse")
        .attr("id", `${id}-panel-copy`)
        .attr("aria-labelledby", `${id}-header`)
        .text(copy);
    let references = sources[title];
    if (title.includes("401K")) {
        references = sources["401K"];
    } else if (title.includes("IRA")) {
        references = sources["IRA"];
    }
    let referencesDiv = copyPanel.append("div")
        .text("References: ");
    references.forEach(function(reference) {
        referencesDiv.append("a")
            .attr("href", reference[0])
            .text(`[${reference[1]}]`);
    });


}

/*
 * Creates the wrapper for account types. Wrapper will include
 * non-unique account types (one wrapper for 401ks). Wrapper becomes
 * parent div for each account div.
 */
function makeWrapperDiv(accountTitle) {
    let wrapperDiv;
    if (document.getElementById(accountTitle + "-wrapper") == null) {
        wrapperDiv = accountsDiv.append("div")
            .attr("id", getIdFromTitle(accountTitle) + "-wrapper")
            .attr("class", "wrapper-div");
    } else {
        wrapperDiv = document.getElementById(accountTitle + "-wrapper");
    }
    let introCopy = accountCopy["Intro " + accountTitle];
    if (accountTitle.includes("IRA")) {
        introCopy = accountCopy["Intro IRA"];
    }
    if (accountTitle.includes("FourOhOne")) {
        introCopy = accountCopy["Intro 401K"];
    }
    wrapperDiv.text(introCopy);
}

/*
 * Make a div for an account type (e.g., Traditional 401k), with a
 * container as the top level holder. Each container has the structure:
 * 
 *  - container (div), top-level container
 *      - header (div), holds data-amount, title, toggle, monthly $
 *      - panel (div), holds parameters and input/sliders
 * 
 * params:
 *      title: name of the account, e.g., Traditional 401k
 *      paramConfigs: list of configurations for each parameter to be included
 *          in the account, defined in accountsConfig.js
 *      calculators: list of calculator functions, e.g., calculateTraditional401k,
 *          defined in accountCalculators of accountsConfig.js
 */
function makeAccountDiv(title, paramConfigs, calculators) {
    let id = getIdFromTitle(title);

    // each account div is a container, the top level holder
    let wrapperDiv;
    if (title.includes("IRA")) {
        wrapperDiv = d3.select("#" + getIdFromTitle("IRA") + "-wrapper");
    } else if (title.includes("401K")) {
        wrapperDiv = d3.select("#" + getIdFromTitle("401K") + "-wrapper");
    } else {
        wrapperDiv = d3.select("#" + getIdFromTitle(title) + "-wrapper");
    }
    let accountDiv = wrapperDiv.append("div")
        .attr("class", "container accordion-item")
        .attr("id", id);
    // container holds div for panel header, which is always shown
    // panel header contains account name, money contributed, and toggle
    let header = accountDiv.append("div")
        .attr("class", "panel-header accordion-header")
        .attr("id", `${id}-header`)
        .attr("data-amount", 0);
    makeHeader(header, title, calculators, id);
    // container holds div for panel, which is shown if toggle is on
    let panel = accountDiv.append("div")
        .attr("class", "panel accordion-collapse collapse")
        .attr("id", `${id}-panel`)
        .attr("aria-labelledby", `${id}-header`)

    // add each parameter using its config
    for (let i = 0; i < paramConfigs.length; i++) {
        addParam(panel, paramConfigs[i], calculators, [id]);
    }
    makeCopyDropdown(title);
    return accountDiv;
}

/*
 * Create sidebar displaying total $ per month in retirement
 * 
 * Note for Doinko: You can retrieve the data amounts for each of
    the account divs by iterating through all of the divs
    and retrieving data-amount in the header. Code:

        Object.keys(accountCalculators).forEach( key => {
            let amount = d3.select(`#${getIdFromTitle(key)}`)
                        .select(".panel-header")
                        .attr("data-amount");
            console.log(amount)
        });
    
    Honk, honk. - Clownie
 */
function makeSidebarDiv(div) {
    let money = getTotalMoney()
    div.attr("class", "panel-side");
    let header = div.append("div")
        .append("h3")
        .attr("class", "sidebar-text")
        .text(() => "You will have");
    
    div.append("h3")
        .attr("class", "sidebar-money")
        .text(() => `${moneyFormat.format(money)}`);
    
    div.append("h3")
        .attr("class", "sidebar-text")
        .text(() => "per month in retirement");

    let breakdown = div.append("div") // Bar chart per type (contributions)
        .attr("id", "breakdown")
        .attr("class", "bar-chart");

    let comp = div.append("div") // Bar chart by average (averageAmts)
        .attr("id", "comparison")
        .attr("class", "bar-chart");
    averageAmts = [{entity: "You", amount: money},{entity: "Average American", amount: averageAmericanTotal / (yearsInRetirement * 12)}];
    makeBarChartY(averageAmts, "comparison");
}

function updateSidebar() {
    let money = getTotalMoney();
    let div = d3.select("#sidebar");
    div.select(".sidebar-money")
        .text(() => `${moneyFormat.format(money)}`);

    makeBarChartX(contributions, "breakdown", money);
    averageAmts = [{entity: "You", amount: money},{entity: "Average American", amount: averageAmericanTotal / (yearsInRetirement * 12)}];
    makeBarChartY(averageAmts, "comparison");
}

function makeBarChartX(data, id, money) {
    let plot;
    if (money != 0) {
        plot = Plot.plot({
            x: { 
                axis: "top",
                label: null,
                labelAnchor: "center",
            },
            y: {
                label: null
            },
            marks: [
                Plot.barX(data, {x: Object.keys(data[0])[1], y: Object.keys(data[0])[0], fill: "black", fillOpacity: 0.6})
            ],
            style: {
                overflow: "visible",
                fontSize: 20
            }
        })
    }

    let elem = document.getElementById(id);
    try {
        elem.removeChild(elem.lastElementChild);
    } catch(e) {}
    
    if (plot) {
        elem.append(plot);
    }
}

function makeBarChartY(data, id) {
    let plot = Plot.plot({
        y: {
          label: ""
        },
        x: { label: ""},
        marks: [
          Plot.barY(data, {x: Object.keys(data[0])[0], y: Object.keys(data[0])[1], fill: "blue", fillOpacity: 0.3})
        ],
        style: {
            fontSize: 30,
            marginLeft: 15,
            overflow: "visible"
        }
      })
    let elem = document.getElementById(id);
    try {
        elem.removeChild(elem.lastElementChild);
    } catch(e) {}
    
    elem.append(plot);
}

/*
    Get the total amount of money per month.
*/
function getTotalMoney() {
    let total = 0;
    contributions = [];
    Object.keys(accountCalculators).forEach( key => {
        let amount = d3.select(`#${getIdFromTitle(key)}`)
                    .select(".panel-header")
                    .attr("data-amount");
        contributions.push({account: barNames[key], money: parseFloat(amount)});
        total += parseFloat(amount);
    });
    return total;
}

/*
 * Run all of the account calculators in the list of calculators, with container
 * ids in a one-to-one matching list to select the correct container
 * Check that the account is currently "checked", then update the amount
 * 
 * params:
 *      calculators: list of calculator functions, e.g., calculateTraditional401k,
 *          defined in accountCalculators of accountsConfig.js
 *      ids: list of container ids, e.g., account-401k, which are constructed from
 *          getIdFromTitle() and set for each container in makeAccountDiv()
 */
function runCalculators(calculators, ids) {
    for (var i=0; i<calculators.length; i++) {
        let header = d3.select(`#${ids[i]}`)
                        .select(".panel-header");
        let checkbox = header.select(".toggle")
                            .select(".form-check-input");
        if (checkbox.property("checked")) {
            let amount = calculators[i]();
            header.attr("data-amount", amount);
            header.select(".header-amount")
                .text("$" + d3.format(",.0f")(amount));
        }
    }
}

/*
 * Make a div for an account type (e.g., Traditional 401k), with a
 * container as the top level holder. Each container has the structure:
 * 
 *  - container (div), top-level container
 *      - header (div), holds data-amount, title, toggle, monthly $
 *      - panel (div), holds parameters and input/sliders
 * 
 * params:
 *      title: name of the account, e.g., Traditional 401k
 *      paramConfigs: list of configurations for each parameter to be included
 *          in the account, defined in accountsConfig.js
 *      calculators: list of calculator functions, e.g., calculateTraditional401k,
 *          defined in accountCalculators of accountsConfig.js
 */
function makeComparisonDiv(configs) {
    // each account div is a container, the top level holder
    let id = "compare-accounts";
    let compDiv = accountsDiv.append("div")
        .attr("class", "container accordion-item")
        .attr("id", "compare-accounts");
    // container holds div for panel header, which is always shown
    // panel header contains account name and toggle
    let header = compDiv.append("div")
        .attr("class", "panel-header accordion-header")
        .attr("id", `compare-accounts-header`)
    makeCompHeader(header, "Compare Accounts", id);
    // container holds div for panel, which is shown if toggle is on
    let panel = compDiv.append("div")
        .attr("class", "panel accordion-collapse collapse")
        .attr("id", `${id}-panel`)
        .attr("aria-labelledby", `${id}-header`)
    // add carousel
    let carousel = panel.append("div")
        .attr("class", "carousel slide")
        .attr("id", "compCarousel")
        .attr("data-ride", "carousel")
    let carouselInner = carousel.append("div").attr("class", "carousel-inner");
    generateTable(carouselInner, configs);
    generateNumGraph(carouselInner);
    generateAgeGraph(carouselInner);
    // Left control
    let left = carousel.append("a")
        .attr("class", "carousel-control-prev")
        .attr("href", "#compCarousel")
        .attr("role", "button")
        .attr("data-slide", "prev");
    left.append("span")
        .attr("class", "carousel-control-prev-icon")
        .attr("aria-hidden", "true");
    left.append("span")
        .attr("class", "sr-only")
        .text("Previous");
    // Right control
    let right = carousel.append("a")
        .attr("class", "carousel-control-next")
        .attr("href", "#compCarousel")
        .attr("role", "button")
        .attr("data-slide", "next");
    right.append("span")
        .attr("class", "carousel-control-next-icon")
        .attr("aria-hidden", "true");
    right.append("span")
        .attr("class", "sr-only")
        .text("Next");
    return compDiv;
}

function makeCompHeader(header, title, id) {
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
    //checkbox.on("change", () => togglePanel(checkbox, [], "compare-accounts"));
}

function generateIcon(attrib) {
    if (attrib) {
        return "\u2705";
    }

    return "\u274c"
}

// new function to generate table
function generateTable(div, configs) {
    //console.log(configs)
    let item = div.append("div")
        .attr("class", "carousel-item active");
    let table = item.append("table");
    let headerRow = table.append("tr");
    headerRow.append("th").text("Account Type").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Which account is being compared");
    headerRow.append("th").text("Taxed Upon Contribution?").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Is the money you put into the account pre-retirement taxed?");
    headerRow.append("th").text("Taxed Upon Withdrawal?").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Are your withdrawals taxed in retirement?");
    headerRow.append("th").text("Risk?").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Can your investments possibly lose money?");
    headerRow.append("th").text("Contribution Limit?").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Is there a limit to the amount you can add to an account each year?");
    headerRow.append("th").text("Average Percent Yield").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "The average amount an account grows passively each year.");
    headerRow.append("th").text("Anytime No-Penalty Availability?").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Can you withdraw your money at any time for any reason without penalty?");
    headerRow.append("th").text("Employer Match?").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Does an employer contribute a percentage of money to the account?");
    headerRow.append("th").text("Tied to Employer?").attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", "Is the account tied to being opened by a particular employer?");
    
    for (let i = 0; i < configs.length; i++) {
        let accountDetails = configs[i].attribs;
        //console.log(accountDetails)
        let row = table.append("tr");
        row.append("td").text(accountDetails.name);
        row.append("td").text(generateIcon(accountDetails["Taxed Upon Contribution"].value)).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Taxed Upon Contribution"].tooltip);
        row.append("td").text(generateIcon(accountDetails["Taxed Upon Withdrawal"].value)).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Taxed Upon Withdrawal"].tooltip);
        row.append("td").text(generateIcon(accountDetails["Risk"].value)).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Risk"].tooltip);
        row.append("td").text(generateIcon(accountDetails["Contribution Limit"].value)).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Contribution Limit"].tooltip);
        row.append("td").text(`${accountDetails["Average Percent Yield"].value}%`).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Average Percent Yield"].tooltip);
        row.append("td").text(generateIcon(accountDetails["Anytime No-Penalty Availability"].value)).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Anytime No-Penalty Availability"].tooltip);
        row.append("td").text(generateIcon(accountDetails["Employer Match"].value)).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Employer Match"].tooltip);
        row.append("td").text(generateIcon(accountDetails["Tied to Employer"].value)).attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "top").attr("data-bs-title", accountDetails["Tied to Employer"].tooltip);
    }
}