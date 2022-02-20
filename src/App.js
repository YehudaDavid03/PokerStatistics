import React, { useState, useEffect } from "react"
import axios from "axios"

import Login from "./views/Login"
import NavBar from "./views/NavBar"
import EnterGame from "./views/EnterGame"
import RenderGame from "./views/RenderGame"
import PlayerSide from "./views/PlayerSide"
import LoadingWheel from "./components/LoadingWheel"

function App() {
  const [userInfoReceived, setUserInfoReceived] = useState({})
  const [updateApiReceived, setUpdateApiReceived] = useState()
  const [playersRender, setPlayersRender] = useState()
  const [gamesRender, setGamesRender] = useState()
  const [loading, setLoading] = useState(true)

  // Receive sign in info with security
  const userInfoSend = (userInfoSend) => {
    if (userInfoSend.jwt) {
      setUserInfoReceived(userInfoSend)
    } else {
    }
  }

  // Logout button available in NavBar
  const logout = () => {
    setUserInfoReceived({})
    console.log(userInfoReceived)
  }

  // Update Api
  const updateApiSend = (updateApiSend) => {
    setUpdateApiReceived(updateApiSend)
  }

  // Getting players from api
  useEffect(() => {
    if (userInfoReceived.jwt) {
      setLoading(true)
      try {
        const playersApiCall = async () => {
          const { data } = await axios.get('https://sleepy-ocean-12912.herokuapp.com/api/players?populate=*', {
            headers: {
              Authorization:
                `Bearer ${userInfoReceived.jwt}`,
            },
          })
          setPlayersRender(data.data)
          setLoading(false)
        }
        playersApiCall()
      } catch(error) {
      }
    } else {}
  }, [updateApiReceived, userInfoReceived])

  // Getting games from api
  useEffect(() => {
    if (userInfoReceived.jwt) {
      setLoading(true)
      try {
        const gamesApiCall = async () => {
          const { data } = await axios.get('https://sleepy-ocean-12912.herokuapp.com/api/games?pagination[pageSize]=1000', {
            headers: {
              Authorization:
                `Bearer ${userInfoReceived.jwt}`,
            },
          })
          setGamesRender(data.data)
          setLoading(false)
        }
        gamesApiCall()
      } catch(error) {
      }
    } else {}
  }, [updateApiReceived, userInfoReceived])

  return (
    <div className="app-main">
      <NavBar gamesRender={gamesRender} loading={loading} userInfoReceived={userInfoReceived} logout={logout} />

      {
        userInfoReceived.jwt ?

        (
          <>
            {
              loading ?
      
              (
                <LoadingWheel />
              )
      
              :
      
              (
                <div className="app-main-split">
                  <div className="app-main-split-games">
                    <EnterGame updateApiSend={updateApiSend} playersRender={playersRender} userInfoReceived={userInfoReceived} />
                    <RenderGame gamesRender={gamesRender} />
                  </div>
          
                  <PlayerSide playersRender={playersRender} gamesRender={gamesRender} />
                </div>
              )
            }
          </>
        ) 

        : 

        (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Login userInfoSend={userInfoSend} />
          </>
        )
      }
    </div>
  )
}

export default App