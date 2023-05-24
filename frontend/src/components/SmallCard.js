import "../style/components/SmallCard.css"
import PropTypes from 'prop-types';

function SmallCard(props){
 return(
  <div className="small-card">
    <img src={props.logo} alt={props.type} />
    <div className="small-card__infos">
      <p className="small-card__infos__data">{props.data}{props.unit}</p>
      <p>{props.type}</p>
    </div>
  </div>
 )
}

SmallCard.propTypes = {
  data: PropTypes.number,
  logo: PropTypes.string,
  type: PropTypes.string,
  unit: PropTypes.string
}

export default SmallCard
