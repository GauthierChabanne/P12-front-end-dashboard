import '../style/pages/Home.css';
import { useParams } from 'react-router-dom'
import React, {useState} from "react";
import {USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE} from '../data/mockData.js'
import { NavLink } from 'react-router-dom'

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

    </div>
  )
}

export default Home;
