import '../style/components/RadarChart.css';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPerformance } from '../data/apiService';


function RadarChartFrame(props) {
  // Local storage for the new data set //
  const [finalData, setFinalData] = useState([]);

  // Loop for create a new data set //
  function isBuildingDataModel(valueDataObject, kind){
    const finalDataSet = [];
    valueDataObject.map((e, index) => {
      let newDataObject = {
        value: e.value,
        kind: kind[index+1]
      }
      finalDataSet.push(newDataObject)
      return 0;
    })

    setFinalData(finalDataSet);
  }

  // Request form the API //
  async function fetchData() {
    // const data = await getPerformance();
    const data = props.data
    const kind = props.kind
    isBuildingDataModel(data, kind);
  }

  // useEffect(() => {
  //   fetchData();
  // })


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

export default RadarChartFrame;
