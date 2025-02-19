import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
import '../style/components/BigCard.css';
import PropTypes from 'prop-types';

function TooTipActivity({kilo, calo, kiloUnit, caloUnit}){
  return (
    <div className='tooltipActivity'>
      <div className='tooltipActivity__unit'> {kilo} {kiloUnit} </div>
      <div className='tooltipActivity__unit'> {calo} {caloUnit} </div>
    </div>
  )
}

function BigCard(props) {

  const data = props.data
  data.map((item, index) =>{
      item.day = index+1
      return 0;
    })

  return (
    <div className="dailyActivity">
      <div className='customLegend'> Activité quotidienne </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={data} barGap='8'>
          <CartesianGrid strokeDasharray="0 2 0" vertical={false}/>
          <XAxis dataKey="day" tickLine={false} />
          <YAxis orientation="right" axisLine={false} tickLine={false}/>

          <Tooltip content={(info) => {
            if(!info.active){
              return null
            }
            const activity = data.find(session => session.day === info.label);
            return <TooTipActivity kilo={activity.kilogram} calo={activity.calories} kiloUnit={'kg'} caloUnit={'Kcal'}/>
          }}/>

          <Legend align='right' top='40px' verticalAlign="top" iconType='circle' width={500} payload={[{value: 'Poids (kg)', color: '#282D30'}, {value: 'Calories brulées (kcal)', color: '#E60000'}, {value: 'Score', color: '#ffffff'}]}/>
          <Bar radius={[10, 10, 0, 0]} dataKey="kilogram" fill="#282D30" barSize={7} />
          <Bar radius={[10, 10, 0, 0]} dataKey="calories" fill="#E60000" barSize={7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

BigCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BigCard
