import React from "react"
import GameCard from "../components/GameCard"

const RenderGame = ({ gamesRender }) => {
  return (
    <div className="render-game-main">
      <GameCard gamesRender={gamesRender} />
    </div>
  )
}

export default RenderGame