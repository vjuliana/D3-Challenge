// @TODO: YOUR CODE HERE!

// You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age
// Include state abbreviations in the circles
// Create and situate your axes and labels to the left and bottom of the chart.
// ---------------------

// Set the dimensions and margins of the graph
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Append an SVG object to body of the page
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data
d3.csv("assets/data/data.csv").then(function(assetData) {
    console.log(assetData);

    // Grab data from CSV
    // Parse two columns to use for the graph (Health Care and Poverty)
    assetData.forEach(function(data) {
      data.healthcare =+ data.healthcare;
      data.poverty =+ data.poverty;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(assetData, d => d.healthcare) * 0.5, d3.max(assetData, d => d.healthcare) * 1.2])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(assetData, d => d.poverty) * 0.5, d3.max(assetData, d => d.poverty) * 1.2])
    .range([height, 0]);

    // Creat axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(assetData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.healthcare))
      .attr("cy", d => yLinearScale(d.poverty))
      .attr("r", "15")
      .attr("fill", "pink")
      .attr("opacity", ".5")
      .classed("stateCircle", true);

    chartGroup.append("g")
      .selectAll("text")
      .data(assetData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.healthcare))
      .attr("y", d => yLinearScale(d.poverty))
      .attr("dy", 3)
      .attr("fill", "black")
      .attr("opacity", ".5")
      .attr("text-anchor", "middle")
      .text(d => d.abbr)
      .classed("stateText", true);

    // Append text to axis
    // Y-axis - Poverty
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - ((margin.left/2) + 2))
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .text("Poverty")
      .attr("text-anchor", "middle")
      .attr("fill", "green")
      .attr("font-size", "14px")
      .style("font-weight", "bold")
      .attr("class", "axisText");
    
    // X-axis - Healthcare
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("text-anchor", "middle")
      .attr("fill", "red")
      .attr("font-size", "14px")
      .style("font-weight", "bold")
      .attr("class", "axisText")
      .text("Healthcare");
});