import React from "react"

const GameCard = ({ gamesRender }) => {
  return (
    <>
      {
        gamesRender?.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date))?.map((item) => {               
          return (
            <div className="game-card-main" key={item.id}>
              <h1>{(item.attributes.players.split(",").length * item.attributes.betAmount).toLocaleString()}<span>nis</span></h1>

              <div>
                <h2>{`Bet Amount: ${item.attributes.betAmount.toLocaleString()}nis`}</h2>
                <h2>{`Date: ${item.attributes.date}`}</h2>
                <h2>{`Winners: ${item.attributes.winners}`}</h2>
                <h2>{`Players: ${item.attributes.players}`}</h2>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default GameCard