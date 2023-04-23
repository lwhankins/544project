function generateNumGraph(carouselInner) {
    let graphData = data["account_nums"];
    let item = carouselInner.append("div")
        .attr("class", "carousel-item")
        .attr("id", "account-num-graph");

    // let svg = item.append("svg")
    //     .attr("height", "460px")
    //     .attr("id", "account-num-graph")
    //     .attr("width", "900px");

    let plot = Plot.plot({
        x: {
            axis: "bottom",
            label: "Account Type",
            labelAnchor: "center"
        },
        y: {
            label: "Number of accounts of each type in 2021, according to the U.S. Survey of Income and Program Participation (SIPP)"
        },
        marks: [
            Plot.barY(graphData, {x: "account", y: "num", fill: "blue"})
        ],
        style: {
            overflow: "visible",
            fontSize: 12,
            margin: "auto"
        }
    })

    let elem = document.getElementById("account-num-graph");
    elem.append(plot);
}





function generateAgeGraph(carouselInner) {
    let graphData = data["accounts_by_age"];
    let item = carouselInner.append("div")
        .attr("class", "carousel-item");

    let svg = item.append("svg")
        .attr("height", "100%")
        .attr("width", "100%");

    let circles = svg.selectAll("circle")
        .data(graphData)
        .join("circle")
        .call(updatePoint)

    
    //dotplot = Plot.dot(athletes, {x: "weight", y: "height", stroke: "sex"}).plot()

    // Scatterplot -- age on x, number of accounts on y
    // color differentiates account types - needs legend
}

function updatePoint(selection) {

} 