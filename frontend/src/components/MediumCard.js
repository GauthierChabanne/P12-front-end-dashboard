import * as d3 from 'd3'

function MediumCard(props){
  function drawChart(){
    const data = props.data
    const type = props.type
    const margin = {top: 10, right: 10, bottom: 10, left: 10}
    const height = 150
    const width = 150

    switch(type){
      case "sessions":
        const yMaxValue = d3.max(data, d => d.sessionLength)

        const sessionsSvg = d3.select("#" + props.id)
                .append("svg")
                  .style("background-color", "red")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(0, ${margin.bottom - 10})`)

        const xScale = d3
                    .scaleBand()
                    .domain(["L", "M", "Me", "J", "V", "S", "D"])
                    .rangeRound([margin.left, width-margin.right])
                    .padding(0.1)

        const yScale = d3
                    .scaleLinear()
                    .range([height - margin.bottom, margin.top])
                    .domain([0, yMaxValue])


        var Tooltip = d3.select("#" + props.id)
                        .append("div")
                        .style("opacity", 0)
                        .attr("class", "tooltip")
                        .style("border", "solid")
                        .style("border-width", "2px")
                        .style("border-radius", "5px")
                        .style("padding", "5px")
                        .style("position", "absolute")
                        .style("background-color", "white")
                        .style("color", "black")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
          Tooltip
            .style("opacity", 1)
          d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }
        var mousemove = function(d) {
          Tooltip
            .html(" mn")
            .style("left", (d.screenX + 20 + "px"))
            .style("top", (d.screenY - 170 + "px"))
        }
        var mouseleave = function(d) {
          Tooltip
            .style("opacity", 0)
          d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
        }

        sessionsSvg.append("g")
                    .attr("transform", `translate(0, ${height - margin.bottom})`)
                    .call(d3.axisBottom(xScale))
                    .call(g => g.select(".domain").remove())
                    .style("color", 'white')


        break;

      case "stats":
        const statsSvg = d3.select("#" + props.id)
                .append("svg")
                  .style("background-color", "black")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(0, ${margin.bottom - 10})`)
        break;

      case "score":
        const scoreSvg = d3.select("#" + props.id)
                .append("svg")
                  .style("background-color", "#FBFBFB")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(0, ${margin.bottom - 10})`)
        break;

      default:
        break;
    }
  }

  return(
    <div id={props.id} className="medium-card">
      {drawChart()}
    </div>
  )
}

export default MediumCard
