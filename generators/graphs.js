function generateNumGraph(carouselInner) {
    let item = carouselInner.append("div")
        .attr("class", "carousel-item");

    let svg = item.append("svg")
        .attr("height", "100%")
        .attr("width", "100%");

    svg.append("circle")
        .attr("cx", 2)
        .attr("cy", 2)
        .attr("r", 10)
}

function generateAgeGraph(carouselInner) {
    let item = carouselInner.append("div")
        .attr("class", "carousel-item");

    let svg = item.append("svg")
        .attr("height", "100%")
        .attr("width", "100%");
}