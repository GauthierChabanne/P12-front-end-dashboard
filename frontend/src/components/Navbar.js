import bikeIcon from "../assets/icon-bike.svg"
import dumbbellIcon from "../assets/icon-dumbbell.svg"
import swimIcon from "../assets/icon-swim.svg"
import meditationIcon from "../assets/icon-meditation.svg"
import "../style/components/Navbar.css"

function Navbar (){
  return(
    <div className="navbar">
      <img src={meditationIcon} className='meditation-icon' alt='meditation' />
      <img src={swimIcon} className='swimming-icon' alt='swimming' />
      <img src={bikeIcon} className='biking-icon' alt='biking' />
      <img src={dumbbellIcon} className='dumbbell-icon' alt='strengh' />
      <span>Copyright, SportSee 2020</span>
    </div>
  )
}
export default Navbar
