import React from "react"
import PlayerCard from "../components/PlayerCard"

const PlayerSide = ({ playersRender, gamesRender }) => {
  return (
    <div className="player-side-main">
      <PlayerCard playersRender={playersRender} gamesRender={gamesRender} />
    </div>
  )
}

export default PlayerSide