import AverageSessions from "./AverageSessions"
import RadarChart from "./RadarChart"
import "../style/components/MediumCard.css"
import ScoreChart from "./ScoreChart"
import PropTypes from 'prop-types';


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
        returnee = (<ScoreChart data={props.score} />)
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

MediumCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  id: PropTypes.string,
  kind: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.object
        ]),
  score: PropTypes.number
}

export default MediumCard
