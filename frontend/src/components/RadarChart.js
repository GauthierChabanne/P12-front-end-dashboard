import '../style/components/RadarChart.css';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import PropTypes from 'prop-types';


function MyRadarChart(props) {

  const data = props.data
  const kind = props.kind
  const finalData = [];
  data.map((e, index) => {
    let newDataObject = {
      value: e.value,
      kind: kind[index+1]
    }
    finalData.push(newDataObject)
    return 0;
  })

  return (
    <div className="radarChart">
      {
        finalData.length !== 0 ?
          <ResponsiveContainer className="radarChart__container">
            <RadarChart className="radarChart__container--radar" fill="#FFFFFF" innerRadius={14} outerRadius={86}
              width={730} height={250} data={finalData} margin={{right: 10, left: 10, top: 10, bottom: 10}}>
              <PolarGrid />
              <PolarAngleAxis fontSize={10} tickLine={false} className="name" dataKey="kind" />
              <Radar name="Mike" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
          :
        null
      }
    </div>
  )
}

MyRadarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  kind: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.object
        ]),
}

export default MyRadarChart;
