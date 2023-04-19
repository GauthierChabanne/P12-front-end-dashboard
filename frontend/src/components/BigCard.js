import HistoChart from "./HistoChart"

function BigCard(props) {
  return(
    <div id={props.id} className="big-card">
      <HistoChart
        title = {props.title}
        data = {props.data}
        id = {props.id}
      />
    </div>
  )
}
export default BigCard
