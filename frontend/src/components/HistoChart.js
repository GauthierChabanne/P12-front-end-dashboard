import * as d3 from 'd3'

function HistoChart(props){

    function dataParser(data) {
      const kiloArray = []
      const caloArray = []

      data.forEach(d => {
        kiloArray.push(d.kilogram)
        caloArray.push(d.calories)
      });

      const kiloData = {label: "Poids (kg)", data: kiloArray, unit: "kg"}
      const caloData = {label: "Calories brûlées (kCal)", data: caloArray, unit: "kCal"}

      return {kiloData: kiloData, caloData: caloData}
    }

    function drawChart(){
      const kiloData = dataParser(props.data).kiloData
      const caloData = dataParser(props.data).caloData

      // const margin = {top: 10, right: 30, bottom: 30, left: 40}
      // const width = 460 - margin.left - margin.right
      // const height = 400 - margin.top - margin.bottom;

      // // append the svg object to the body of the page
      // const svg = d3.select(".big-card")
      //   .append("svg")
      //     .attr("width", width + margin.left + margin.right)
      //     .attr("height", height + margin.top + margin.bottom)
      //   .append("g")
      //     .attr("transform",
      //           "translate(" + margin.left + "," + margin.top + ")");

      // var x = d3.scaleLinear()
      // .domain([0, kiloData.data.length])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      // .range([0, width]);

      // svg.append("g")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(d3.axisBottom(x));

      // // set the parameters for the histogram
      // var histogram = d3.histogram()
      //     .value(function(d) { return +d.value; })   // I need to give the vector of value
      //     .domain(x.domain())  // then the domain of the graphic
      //     .thresholds(x.ticks(40)); // then the numbers of bins

      // // And apply twice this function to data to get the bins.
      // var bins1 = histogram(kiloData.data);
      // var bins2 = histogram(caloData.data);

      // // Y axis: scale and draw:
      // var y = d3.scaleLinear()
      //     .range([height, 0]);
      //     y.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
      // svg.append("g")
      //     .call(d3.axisLeft(y));

      // // append the bars for series 1
      // svg.selectAll("rect")
      //     .data(bins1)
      //     .enter()
      //     .append("rect")
      //       .attr("x", 1)
      //       .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      //       .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
      //       .attr("height", function(d) { return height - y(d.length); })
      //       .style("fill", "#69b3a2")
      //       .style("opacity", 0.6)

      // // append the bars for series 2
      // svg.selectAll("rect2")
      //     .data(bins2)
      //     .enter()
      //     .append("rect")
      //       .attr("x", 1)
      //       .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      //       .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
      //       .attr("height", function(d) { return height - y(d.length); })
      //       .style("fill", "#404080")
      //       .style("opacity", 0.6)

      // // Handmade legend
      // svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
      // svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
      // svg.append("text").attr("x", 320).attr("y", 30).text(kiloData.label).style("font-size", "15px").attr("alignment-baseline","middle")
      // svg.append("text").attr("x", 320).attr("y", 60).text(caloData.label).style("font-size", "15px").attr("alignment-baseline","middle")

      const margin = {top: 70, right: 50, bottom: 70, left: 50}

      const svg = d3.select("#" + props.id)
                  .append("svg")
                    .style("background-color", "#FBFBFB")
                    .attr("width", 700)
                    .attr("height", 1000)
                    .append("g");



      svg.selectAll("rect")
          .data(kiloData.data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => i)
          .attr("y", (d, i) => d)
          .attr("fill", "green");

      // svg.selectAll("rect2")
      //     .data(caloData.data)
      //     .enter()
      //     .append("rect")
      //     .attr("x", (d, i) => i)
      //     .attr("y", (d, i) => d)
      //     .attr("fill", "red");

    console.log("hello")
    }


    return(
      <div className="Histo-chart">
        {drawChart()}
      </div>
    )
}

export default HistoChart
