import React, { useState, useEffect } from "react"
import axios from "axios"

import NavBar from "./views/NavBar"
import EnterGame from "./views/EnterGame"
import RenderGame from "./views/RenderGame"
import PlayerSide from "./views/PlayerSide"

function App() {
  const [updateApiReceived, setUpdateApiReceived] = useState()
  const [playersRender, setPlayersRender] = useState()
  const [gamesRender, setGamesRender] = useState()

  // Update Api
  const updateApiSend = (updateApiSend) => {
    setUpdateApiReceived(updateApiSend)
  }

  // Getting players from api
  useEffect(() => {
    try {
      const playersApiCall = async () => {
        const { data } = await axios.get(`https://sleepy-ocean-12912.herokuapp.com/api/players?populate=*`)
        setPlayersRender(data.data)
      }
      playersApiCall()
    } catch(error) {
    }
  }, [updateApiReceived])

  // Getting games from api
  useEffect(() => {
    try {
      const gamesApiCall = async () => {
        const { data } = await axios.get(`https://sleepy-ocean-12912.herokuapp.com/api/games/?populate=*`)
        setGamesRender(data.data)
      }
      gamesApiCall()
    } catch(error) {
    }
  }, [updateApiReceived])

  return (
    <div className="app-main">
      <NavBar gamesRender={gamesRender} />

      <div className="app-main-split">
        <div className="app-main-split-games">
          <EnterGame updateApiSend={updateApiSend} playersRender={playersRender} />
          <RenderGame gamesRender={gamesRender} />
        </div>

        <PlayerSide playersRender={playersRender} gamesRender={gamesRender} />
      </div>
    </div>
  )
}

export default App