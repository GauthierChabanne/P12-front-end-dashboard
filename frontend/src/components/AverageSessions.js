// import '../style/components/averageSessions.css';
import { ResponsiveContainer, LineChart, XAxis, Tooltip, Line, Legend } from 'recharts';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAverage } from '../data/apiService';
import { averageDays } from '../data/mockData';
import "../style/components/AverageSessions.css"

// Custom component for the recharts tooltip --- --- --- //
function TooTipAverage({value, unit}){

  return (
    <div className='tooltipAverage'> {value} {unit} </div>
  )
}

function AverageSessions(props) {
  // // Local state of data from the API //
  const [averageData, setAverageData] = useState([]);

  function isBuildingDataModel(data){
    const newDataSet = [];

    data.map((e, index) => {
      let newDataObject = {
        value: e.sessionLength,
        day: averageDays[index]
      }
      newDataSet.push(newDataObject)
      return 0;
    })
    setAverageData(newDataSet);
  }

  // Request to the API //
  async function fetchData() {
    // const data = await getAverage()
    const data = props.data
    isBuildingDataModel(data);
  }

  // useEffect(() => {
  //   fetchData();
  // })

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

export default AverageSessions
