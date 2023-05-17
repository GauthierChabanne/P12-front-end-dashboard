// import * as d3 from 'd3';
// import Radar from "react-d3-radar";

// function MediumCard(props){
//   function drawChart(){
//     const data = props.data
//     const type = props.type
//     const margin = {top: 10, right: 0, bottom: 10, left: 0}
//     const height = 150
//     const width = 150

//     switch(type){
//       case "sessions":
//         const yMaxValue = d3.max(data, d => d.sessionLength)

//         const sessionsSvg = d3.select("#" + props.id)
//                 .html("")
//                 .append("svg")
//                   .style("background-color", "red")
//                   .attr("width", width + margin.left + margin.right)
//                   .attr("height", height + margin.top + margin.bottom)
//                   .append("g")
//                   .attr("transform", `translate(0, ${margin.bottom - 10})`)

//         const xScaleName = d3
//                     .scaleBand()
//                     .domain(["L", "M", "Me", "J", "V", "S", "D"])
//                     .rangeRound([margin.left, width-margin.right])
//                     .padding(0.1)

//         const xScale = d3
//                     .scaleLinear()
//                     .domain([1, 7])
//                     .range([margin.left, width-margin.right])

//         const yScale = d3
//                     .scaleLinear()
//                     .range([height - margin.bottom, margin.top])
//                     .domain([0, yMaxValue + 10])


//         // This allows to find the closest X index of the mouse:
//         var bisect = d3.bisector(function(d) { return d.sessionLength; }).left;

//         // Create the circle that travels along the curve of chart
//         var focus = sessionsSvg
//           .append('g')
//           .append('circle')
//             .style("fill", "none")
//             .attr("stroke", "black")
//             .attr('r', 8.5)
//             .style("opacity", 0)

//         // Create the text that travels along the curve of chart
//         var focusText = sessionsSvg
//           .append('g')
//           .append('text')
//             .style("opacity", 0)
//             .attr("text-anchor", "left")
//             .attr("alignment-baseline", "middle")

//         sessionsSvg.append("g")
//                     .attr("transform", `translate(0, ${height - margin.bottom})`)
//                     .call(d3.axisBottom(xScaleName))
//                     .call(g => g.select(".domain").remove())
//                     .style("color", 'white')

//         const line = d3
//                       .line()
//                       .x((d) => xScale(d.day))
//                       .y(d => yScale(d.sessionLength))
//                       .curve(d3.curveBasis)

//         sessionsSvg.append("path")
//                 .datum(data)
//                 .attr("fill", "none")
//                 .attr("stroke", "white")
//                 .attr("stroke-width", 2)
//                 .attr("class", "line")
//                 .attr('d', line)

//         sessionsSvg
//           .append('rect')
//           .data(data)
//           .style("fill", "none")
//           .style("pointer-events", "all")
//           .attr('width', width)
//           .attr('height', height)
//           .attr('data-value', (data, d => d.sessionLength))
//           .on("mouseover", function() { focus.style("display", null); })
//           .on("mouseout", function() { focus.style("display", "none"); })
//           .on("mousemove", mousemove);


//         // What happens when the mouse move -> show the annotations at the right positions.

//         function mousemove(event) {
//           var x0 = xScale.invert(d3.pointer(event, this)[0])
//           var i = bisect(data, x0, 1);
//           console.log(i)
//           var selectedData = data[i]

//           focus
//             .attr("cx", xScale(selectedData.x))
//             .attr("cy", yScale(selectedData.y))
//           focusText
//             .html("x:" + selectedData.x + "  -  y:" + selectedData.y)
//             .attr("x", xScale(selectedData.x)+15)
//             .attr("y", yScale(selectedData.y))
//           }

//         break;

//       case "stats":
//         const variables = []
//         Object.values(props.kind).forEach(kind => variables.push({key: kind}))

//         const sets = [{values: {}}]
//         Object.values(props.data).forEach(d => sets[0].values[props.kind[d.kind]] = d.value)

//         // const statsSvg = d3.select("#" + props.id)
//         //         .html("")
//         //         .append("svg")
//         //           .style("background-color", "black")
//         //           .attr("width", width + margin.left + margin.right)
//         //           .attr("height", height + margin.top + margin.bottom)
//         //           .append("g")
//         //           .attr("transform", `translate(0, ${margin.bottom - 10})`)

//         return(
//           <Radar
//             width={width}
//             height={height}
//             padding={10}
//             domainMax={220}
//             highlighted={null}
//             // onHover={(point) => {
//             //   if (point) {
//             //     console.log("hovered over a data point", point);
//             //   } else {
//             //     console.log("not over anything");
//             //   }
//             // }}
//             data={{
//               variables: variables,
//               sets: sets
//             }}
//         />
//       )


//         break;

//       case "score":
//         const scoreSvg = d3.select("#" + props.id)
//                 .html("")
//                 .append("svg")
//                   .style("background-color", "#FBFBFB")
//                   .attr("width", width + margin.left + margin.right)
//                   .attr("height", height + margin.top + margin.bottom)
//                   .append("g")
//                   .attr("transform", `translate(0, ${margin.bottom - 10})`)
//         break;

//       default:
//         break;
//     }
//   }

//   return(
//     <div id={props.id} className="medium-card">
//       {drawChart()}
//     </div>
//   )
// }

// export default MediumCard
