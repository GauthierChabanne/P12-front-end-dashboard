import { ResponsiveContainer, LineChart, XAxis, Tooltip, Line, Legend } from 'recharts';
import { averageDays } from '../data/mockData';
import "../style/components/AverageSessions.css"
import PropTypes from 'prop-types';

// Custom component for the recharts tooltip --- --- --- //
function TooTipAverage({value, unit}){

  return (
    <div className='tooltipAverage'> {value} {unit} </div>
  )
}

function AverageSessions(props) {

  const averageData = [];
  const data = props.data

  data.map((e, index) => {
    let newDataObject = {
      value: e.sessionLength,
      day: averageDays[index]
    }
    averageData.push(newDataObject)
    return 0;
  })

  return (
    <div className="averageSessions">
      <ResponsiveContainer width="100%">
        <LineChart width="100%" height={250} data={averageData}>
          <XAxis height={35} axisLine={false} tickLine={false} dataKey='day' stroke="#FFFFFF"/>
          <Tooltip cursor={{ stroke: 'black', strokeWidth: 40, strokeOpacity: 0.02 }} content={(info) => {
            if(!info.active){
              return null
            }
            const session = averageData.find(session => session.day === info.label);
            return <TooTipAverage value={session.value} unit={'min'}/>
          }}/>
          <Legend verticalAlign="top" align='left' payload={[{value: 'Durée moyenne des sessions', color: '#FFFFFF'}]} iconSize={0}/>
          <Line type="basis" dot={false} dataKey="value" stroke="#FFFFFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

AverageSessions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default AverageSessions
