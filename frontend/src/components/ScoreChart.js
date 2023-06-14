import '../style/components/ScoreChart.css';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts'
import PropTypes from 'prop-types';


function ScoreChart (props) {

  const scoreData = [
    {
      "name": "Score",
      "value": props.data * 100
    },
  ]

  const endAngle = 90 + (props.data * 100 * 3.6); //90=startAngle 3.6=degree in percentage


  return (
    <div className="scoreChart">
      {
        scoreData.length !== 0 ?
        <>
          <ResponsiveContainer className="scoreChart__container">
            <PieChart width={730} height={250}>
              <Pie cornerRadius={10} startAngle={90} endAngle={endAngle} data={scoreData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={90} fill="#FF0000">
              </Pie>
              <Legend iconSize={0} verticalAlign="top" align='left' payload={[{value: 'Score', color: '#000000'}]} />
            </PieChart>
          </ResponsiveContainer>
        <div className='scoreChart__percent'>
          <div className='value'>{props.data * 100} %</div>
          <div>de votre objectif</div>
        </div>
        </>
        :
        null
      }
    </div>
  )
}

ScoreChart.propTypes = {
  data: PropTypes.number
}

export default ScoreChart;
