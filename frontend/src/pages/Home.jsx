import '../style/pages/Home.css';
import { useParams } from 'react-router-dom'
import {useState, useEffect } from "react";
import {USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE} from '../data/mockData.js'
import { NavLink, Link } from 'react-router-dom'
import caloriesIcon from "../assets/calories-icon.svg"
import proteinIcon from "../assets/protein-icon.svg"
import glucidIcon from "../assets/carbs-icon.svg"
import lipidIcon from "../assets/fat-icon.svg"
import SmallCard from '../components/SmallCard';
import BigCard from '../components/bigCard';
import MediumCard from "../components/mediumCard"
import { getAverage, getUser, getActivity, getPerformance } from '../data/apiService';

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
  const otherUserUrl = userId === "12" ? "/18" : "/12"
  const api = sessionStorage.getItem("api")
  console.log(api)

  function mockCall(){
    sessionStorage.setItem("api", false);
    window.location.reload()
  }

  function apiCall(){
    sessionStorage.setItem("api", true);
    window.location.reload()
  }

  let [userMainInfos, setUserMainInfos] = useState([]);
  let [userActivity, setUserActivity] = useState([]);
  let [userAverageSessions, setUserAverageSessions] = useState([]);
  let [userPerformance, setUserPerformance] = useState([]);

  async function fetchData(userId){
    const mainInfos = await getUser(userId)
    // console.log(mainInfos)
    const activity = await getActivity(userId)
    // console.log(activity)
    const averageSessions = await getAverage(userId)
    // console.log(averageSessions)
    const performance = await getPerformance(userId)
    // console.log(performance)
    setUserMainInfos(mainInfos)
    setUserActivity(activity)
    setUserAverageSessions(averageSessions)
    setUserPerformance(performance)
  }

  useEffect(() => {
    console.log("issue")
    if(api === "false" || api === null){
      const mainInfos = USER_MAIN_DATA.find((user) => user.id === parseInt(userId))
      setUserMainInfos(mainInfos)
      const activity = USER_ACTIVITY.find((user) => user.userId === parseInt(userId)).sessions
      setUserActivity(activity)
      const average = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId)).sessions
      // console.log(average)
      setUserAverageSessions(average)
      const performance = USER_PERFORMANCE.find((user) => user.userId === parseInt(userId))
      setUserPerformance(performance)
    } else if(api === "true"){
      console.log("ouch")
      fetchData(userId);
    }
    }, [userId, api])

  // if(index === 0){
  //   userMainInfos = USER_MAIN_DATA.find((user) => user.id === parseInt(userId))
  //   userActivity = USER_ACTIVITY.find((user) => user.userId === parseInt(userId))
  //   userAverageSessions = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId))
  //   userPerformance = USER_PERFORMANCE.find((user) => user.userId === parseInt(userId))
  // } else if (index === 1){
    // useEffect(() => {
    //   fetchData();
    // },[userId])
  // }

  // async function waitUser(){
  //   const userMainInfos = await getUser(userId)
  //   console.log(userMainInfos)
  //   const userActivity = await getActivity(userId)
  //   const userAverageSessions = await getAverage(userId)
  //   const userPerformance = await getPerformance(userId)
  //   return {userMainInfos, userActivity, userAverageSessions, userPerformance}
  // }

  // let userMainInfos = ""
  // let userActivity = ""
  // let userAverageSessions = ""
  // let userPerformance = ""

  // if(index === 0){
  //   userMainInfos = USER_MAIN_DATA.find((user) => user.id === parseInt(userId))
  //   userActivity = USER_ACTIVITY.find((user) => user.userId === parseInt(userId))
  //   userAverageSessions = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId))
  //   userPerformance = USER_PERFORMANCE.find((user) => user.userId === parseInt(userId))
  // } else if (index === 1){
  //   waitUser().then((user) => {
  //     userMainInfos = user.userMainInfos
  //     userActivity = user.userActivity
  //     userAverageSessions = user.userAverageSessions
  //     userPerformance = user.userPerformance
  //   })
  // }

  return(
    <div className="container">
      {/* <header className="user-welcome">
        <h1>Bonjour <NavLink to={otherUserUrl} ><span className='userName'>{userMainInfos.userInfos.firstName}</span></NavLink></h1>
        <p>Félicitations... {userMainInfos.userInfos.firstName} vous avez explosé vos objectifs hier 👏</p>
      </header> */}

      {api === "false" || api === null
        ? <button className="callButton" onClick={apiCall}>API call</button>
        : <button className='callButton' onClick={mockCall}>Mock call</button>
      }

      <div className='userInfos'>

        <main className="graphs">
          <article id="main-graph">
            <BigCard
              data = {userActivity}
            />
          </article>

          <div className= "medium-graphs">

            <MediumCard
              type = "sessions"
              data = {userAverageSessions}
              id = "user-sessions-graph"
            />

            {/* <MediumCard
              type = "stats"
              kind = {userPerformance.kind}
              data = {userPerformance.data}
              id = "user-stats-graph"
            /> */}

            <MediumCard
              type = "score"
              score = {userMainInfos.score === undefined ? userMainInfos.todayScore : userMainInfos.score}
              id = "user-score-graph"
            />

          </div>
        </main>

        {/* <aside className="small_cards">
          {Object.entries(userMainInfos.keyData).map((data) => (
            <SmallCard
              key={rightData(data).type}
              logo={rightData(data).logo}
              type={rightData(data).type}
              data={data[1]}
              unit={rightData(data).unit}
            />
          ))}
        </aside> */}
      </div>
    </div>
  )
}

export default Home;
