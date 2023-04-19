import "../style/components/SmallCard.css"

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

export default SmallCard
