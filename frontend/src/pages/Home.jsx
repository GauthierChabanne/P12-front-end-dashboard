import '../style/pages/Home.css';
import { useParams } from 'react-router-dom'
import React, {useState} from "react";
import {USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE} from '../data/mockData.js'
import { NavLink } from 'react-router-dom'
import caloriesIcon from "../assets/calories-icon.svg"
import proteinIcon from "../assets/protein-icon.svg"
import glucidIcon from "../assets/carbs-icon.svg"
import lipidIcon from "../assets/fat-icon.svg"
import SmallCard from '../components/SmallCard';
import BigCard from '../components/BigCard';

function rightData(data){
  let logo = ""
  let type = ""
  let unit = ""
  switch(data[0]){
    case "calorieCount" :
      logo = caloriesIcon
      type = "Calories"
      unit = "kCal"
      break;
    case "proteinCount":
      logo = proteinIcon
      type = "Proteines"
      unit = "g"
      break;
    case "carbohydrateCount":
      logo = glucidIcon
      type = "Glucides"
      unit = "g"
      break;
    case "lipidCount":
      logo = lipidIcon
      type = "Lipides"
      unit = "g"
      break;
    default:
      break;
  }
  return {
    logo: logo,
    type: type,
    unit: unit
  }
}

function Home() {
  const {userId} = useParams()
  const [index, setIndex] = useState(0);
  const otherUserUrl = userId === "12" ? "/18" : "/12"

  const userMainInfos = USER_MAIN_DATA.find((user) => user.id === parseInt(userId))
  const userActivity = USER_ACTIVITY.find((user) => user.userId === parseInt(userId))
  const userAverageSessions = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId))
  const userPerformance = USER_PERFORMANCE.find((user) => user.userId === parseInt(userId))

  return(
    <div className="container">
      <header className="user-welcome">
        <h1>Bonjour <NavLink to={otherUserUrl} ><span className='userName'>{userMainInfos.userInfos.firstName}</span></NavLink></h1>
        <p>Félicitations... vous avez explosé vos objectifs hier 👏</p>
      </header>

      <main id="main-graph">
        <BigCard
          titre = "Activité quotidienne"
          data = {userActivity.sessions}
          id = "user-activity-graph"
        />
      </main>

      <aside className="small_cards">
        {Object.entries(userMainInfos.keyData).map((data) => (
          <SmallCard
            key={rightData(data).type}
            logo={rightData(data).logo}
            type={rightData(data).type}
            data={data[1]}
            unit={rightData(data).unit}
          />
        ))}
      </aside>

    </div>
  )
}

export default Home;
