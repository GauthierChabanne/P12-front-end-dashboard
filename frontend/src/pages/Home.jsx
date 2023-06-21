import '../style/pages/Home.css';
import { useParams } from 'react-router-dom'
import {useState, useEffect } from "react";
import {USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE} from '../data/mockData.js'
import { NavLink } from 'react-router-dom'
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

  function mockCall(){
    sessionStorage.setItem("api", false);
    window.location.reload()
  }

  function apiCall(){
    sessionStorage.setItem("api", true);
    window.location.reload()
  }

  let [userMainInfos, setUserMainInfos] = useState([]);
  let [userFirstName, setUserFirstName] = useState([]);
  let [userKeyData, setUserKeyData] = useState([]);
  let [userActivity, setUserActivity] = useState([]);
  let [userAverageSessions, setUserAverageSessions] = useState([]);
  let [userPerformanceKind, setUserPerformanceKind] = useState([]);
  let [userPerformanceData, setUserPerformanceData] = useState([]);
  let [errorApi, setErrorApi] = useState([])

  async function fetchData(){
    const mainInfos = await getUser(userId)
    const activity = await getActivity(userId)
    const averageSessions = await getAverage(userId)
    const performance = await getPerformance(userId)
    let error = false

    if(mainInfos !== "error" || activity !== "error" || averageSessions !== "error"|| performance !== "error"){
      const keyData = await mainInfos.keyData
      const performanceKind = await performance.kind
      const performanceData = await performance.data
      const firstName = await mainInfos.userInfos.firstName
      setUserMainInfos(mainInfos)
      setUserFirstName(firstName)
      setUserKeyData(keyData)
      setUserActivity(activity)
      setUserAverageSessions(averageSessions)
      setUserPerformanceKind(performanceKind)
      setUserPerformanceData(performanceData)
      error = false
      setErrorApi(error)
    } else {
      error = true
      setErrorApi(error)
    }
  }

  useEffect(() => {
    if(api === "false" || api === null){
      const mainInfos = USER_MAIN_DATA.find((user) => user.id === parseInt(userId))
      setUserMainInfos(mainInfos)
      const firstName = mainInfos.userInfos.firstName
      setUserFirstName(firstName)
      const keyData = mainInfos.keyData
      setUserKeyData(keyData)
      const activity = USER_ACTIVITY.find((user) => user.userId === parseInt(userId)).sessions
      setUserActivity(activity)
      const average = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId)).sessions
      setUserAverageSessions(average)
      const performance = USER_PERFORMANCE.find((user) => user.userId === parseInt(userId))
      const performanceKind = performance.kind
      setUserPerformanceKind(performanceKind)
      const performanceData = performance.data
      setUserPerformanceData(performanceData)
    } else if(api === "true"){
      fetchData();
    }
  }, [userId, api])

  if(errorApi === true){
    return(
      <div className="container container-error">
        <h1 className='api-error'>Informations monentanément indisponibles</h1>
      </div>
    )
  } else {
    return(
      <div className="container">
        <header className="user-welcome">
          <h1>Bonjour <NavLink to={otherUserUrl} ><span className='userName'>{userFirstName}</span></NavLink></h1>
          <p>Félicitations... {userFirstName} vous avez explosé vos objectifs hier 👏</p>
        </header>

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

              <MediumCard
                type = "stats"
                kind = {userPerformanceKind}
                data = {userPerformanceData}
                id = "user-stats-graph"
              />

              <MediumCard
                type = "score"
                score = {userMainInfos.score === undefined ? userMainInfos.todayScore : userMainInfos.score}
                id = "user-score-graph"
              />

            </div>
          </main>

          <aside className="small_cards">
            {Object.entries(userKeyData).map((data) => (
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
      </div>
    )
  }
}


export default Home;
