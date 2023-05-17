import AverageSessions from "./AverageSessions"
import RadarChart from "./RadarChart"
import "../style/components/MediumCard.css"


function MediumCard(props){
    const data = props.data
    const type = props.type
    let returnee = ""
    switch(type){
      case "sessions":
        returnee = (<AverageSessions data={data} />)
        break;

      case "stats":
        returnee = (<RadarChart data={data} kind={props.kind} />)
        break;

      case "score":

        break;

      default:
        break;
    }

  return(
    <div id={props.id} className="medium-card">
      {returnee}
    </div>
  )
}

export default MediumCard
