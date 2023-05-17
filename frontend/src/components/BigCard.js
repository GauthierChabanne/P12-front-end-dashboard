import * as d3 from 'd3'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
import { useState } from 'react';
import { useEffect } from 'react';
import '../style/components/BigCard.css';
import { getActivity } from '../data/apiService';

function TooTipActivity({kilo, calo, kiloUnit, caloUnit}){
  return (
    <div className='tooltipActivity'>
      <div className='tooltipActivity__unit'> {kilo} {kiloUnit} </div>
      <div className='tooltipActivity__unit'> {calo} {caloUnit} </div>
    </div>
  )
}

function BigCard(props) {

  const [sessionData, setSessionData] = useState([]);

  // Request from the API //
  async function fetchData () {
    // const data = await getActivity();
    const data = props.data
    // console.log(data)

    data.map((item, index) =>{
      item.day = index+1
      return 0;
    })

    // console.log(data)
    setSessionData(data);
  }

  useEffect(() => {
    fetchData();
  })

  console.log(props.data)

  // function dataParser(data) {
  //     const kiloArray = []
  //     const caloArray = []

  //     data.forEach(d => {
  //       kiloArray.push(d.kilogram)
  //       caloArray.push(d.calories)
  //     });

  //     const kiloData = {label: "Poids (kg)", data: kiloArray, unit: "kg"}
  //     const caloData = {label: "Calories brûlées (kCal)", data: caloArray, unit: "kCal"}

  //     return {kiloData: kiloData, caloData: caloData}
  // }

  return (
    <div className="dailyActivity">
      <div className='customLegend'> Activité quotidienne </div>
      <ResponsiveContainer >
        <BarChart width={730} height={250} data={props.data} barGap='8'>
          <CartesianGrid strokeDasharray="0 2 0" vertical={false}/>
          <XAxis dataKey="day" tickLine={false} />
          <YAxis orientation="right" axisLine={false} tickLine={false}/>

          <Tooltip content={(info) => {
            if(!info.active){
              return null
            }
            const activity = sessionData.find(session => session.day === info.label);
            return <TooTipActivity kilo={activity.kilogram} calo={activity.calories} kiloUnit={'kg'} caloUnit={'Kcal'}/>
          }}/>

          <Legend align='right' top='40px' verticalAlign="top" iconType='circle' width={500} payload={[{value: 'Poids (kg)', color: '#282D30'}, {value: 'Calories brulées (kcal)', color: '#E60000'}, {value: 'Score', color: '#ffffff'}]}/>
          <Bar radius={[10, 10, 0, 0]} dataKey="kilogram" fill="#282D30" barSize={7} />
          <Bar radius={[10, 10, 0, 0]} dataKey="calories" fill="#E60000" barSize={7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  // function drawChart(){
  //   const kiloData = dataParser(props.data).kiloData
  //   const caloData = dataParser(props.data).caloData
  //   const margin = {top: 50, right: 20, bottom: 10, left: 20}
  //   const height = 200
  //   const width = 500

  //   const yMaxValue = d3.max(caloData.data)

  //   const svg = d3.select("#" + props.id)
  //               .html("")
  //               .append("svg")
  //                 .style("background-color", "#FBFBFB")
  //                 .attr("width", width + margin.left + margin.right)
  //                 .attr("height", height + margin.top + margin.bottom)
  //                 .append("g")
  //                 .attr("transform", `translate(0, ${margin.bottom - 10})`)

  //   const xScale = d3
  //                   .scaleLinear()
  //                   .domain([1, 10])
  //                   .range([margin.left, width-margin.right])


  //   const yScale = d3
  //                   .scaleLinear()
  //                   .range([height - margin.bottom, margin.top])
  //                   .domain([0, yMaxValue])

  //   var Tooltip = d3.select("#" + props.id)
  //     .append("div")
  //     .style("opacity", 0)
  //     .attr("class", "tooltip")
  //     .style("border", "solid")
  //     .style("border-width", "2px")
  //     .style("border-radius", "5px")
  //     .style("padding", "5px")
  //     .style("position", "absolute")
  //     .style("background-color", "red")
  //     .style("color", "white")

  //   // Three function that change the tooltip when user hover / move / leave a cell
  //   var mouseover = function(d) {
  //     Tooltip
  //       .style("opacity", 1)
  //     d3.select(this)
  //       .style("stroke", "black")
  //       .style("opacity", 1)
  //   }
  //   var mousemove = function(d) {
  //     const rightRects = Array.from(document.querySelectorAll("rect")).filter(rect => rect.dataset.position === d.target.dataset.position)
  //     let kgAmount = ""
  //     let caloAmount = ""
  //     rightRects.forEach(rect => rect.dataset.unit === "kg" ? kgAmount = rect.dataset.value : caloAmount = rect.dataset.value)
  //     Tooltip
  //       .html(kgAmount + "kg<br><br>" + caloAmount + "Kcal")
  //       .style("left", (d.screenX + 20 + "px"))
  //       .style("top", (d.screenY - 170 + "px"))
  //   }
  //   var mouseleave = function(d) {
  //     Tooltip
  //       .style("opacity", 0)
  //     d3.select(this)
  //       .style("stroke", "none")
  //       .style("opacity", 0.8)
  //   }

  //   svg.append("g")
  //       .attr("transform", `translate(${width - margin.right + 10}, 0)`)
  //       .call(d3.axisRight(yScale))
  //       .call(g => g.select(".domain").remove())

  //   svg.append("g")
  //       .attr("transform", `translate(0, ${height - margin.bottom})`)
  //       .call(d3.axisBottom(xScale))
  //       .call(g => g.select(".domain").remove())


  //   svg.selectAll("rect")
  //       .data(kiloData.data)
  //       .enter()
  //       .append("rect")
  //       .attr("rx", 4)
  //       .attr("ry", 4)
  //       .attr("x", (d, i) => xScale(i + 1) - 7)
  //       .attr("data-position", (d, i) => i + 1)
  //       .attr("data-value", (d) => d)
  //       .attr("data-unit", kiloData.unit)
  //       .attr("y", (d, i) => yScale(d))
  //       .attr("width", 2)
  //       .attr("height", d => yScale(0) - yScale(d))
  //       .attr("fill", "black")
  //       .style("width", "0.5rem")
  //       .on("mouseover", mouseover)
  //       .on("mousemove", mousemove)
  //       .on("mouseleave", mouseleave)

  //   svg.selectAll("rect2")
  //       .data(caloData.data)
  //       .enter()
  //       .append("rect")
  //       .attr("rx", 4)
  //       .attr("ry", 4)
  //       .attr("x", (d, i) => xScale(i + 1) + 5)
  //       .attr("data-position", (d, i) => i + 1)
  //       .attr("data-value", (d) => d)
  //       .attr("data-unit", caloData.unit)
  //       .attr("y", (d, i) => yScale(d))
  //       .attr("width", 2)
  //       .attr("height", d => yScale(0) - yScale(d))
  //       .attr("fill", "red")
  //       .style("width", "0.5rem")
  //       .on("mouseover", mouseover)
  //       .on("mousemove", mousemove)
  //       .on("mouseleave", mouseleave)

  //   svg.append("text").attr("x", 30).attr("y", 30).text(props.title).style("font-size", "11px").style("font-weight", "bold").attr("alignment-baseline","middle")
  //   svg.append("circle").attr("cx",320).attr("cy",30).attr("r", 6).style("fill", "black")
  //   svg.append("circle").attr("cx",410).attr("cy",30).attr("r", 6).style("fill", "red")
  //   svg.append("text").attr("x", 330).attr("y", 30).text(kiloData.label).style("font-size", "10px").attr("alignment-baseline","middle")
  //   svg.append("text").attr("x", 420).attr("y", 30).text(caloData.label).style("font-size", "10px").attr("alignment-baseline","middle")
  // }



  // return(
  //   <div id={props.id} className="big-card">
  //     {drawChart()}
  //   </div>
  // )
}
export default BigCard
