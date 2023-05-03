/*
    File: graphs.js
    Purpose: Contains code to generate the comparison graphs under Compare Accounts.
*/

function generateNumGraph(carouselInner) {
    let graphData = data["account_nums"];
    carouselInner.append("div")
        .attr("class", "carousel-item")
        .attr("id", "account-num-graph");

    let plot = Plot.plot({
        x: {
            axis: "bottom",
            label: "Account Type",
            labelAnchor: "center"
        },
        y: {
            label: "Number of accounts of each type in 2021 [15]"
        },
        marks: [
            Plot.barY(graphData, {x: "account", y: "num", fill: "#f2a750"}),
            Plot.text(graphData, {x: "account", y: "num", text: "num", dy: -6, lineAnchor: "bottom"}),

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


    carouselInner.append("div")
        .attr("class", "carousel-item")
        .attr("id", "account-age-graph");
    
    dotplot = Plot.dot(graphData, {x: "age", y: "num", stroke: "account"}).plot(
        {
            color: {
                legend: true
            },
            y: {
               label: "Number of accounts by age and account type in 2021 [15]" 
            },
            style: {
                overflow: "visible",
                fontSize: 12,
                margin: "auto"
            }
        }
    )
    
    let elem = document.getElementById("account-age-graph");
    elem.append(dotplot);
}