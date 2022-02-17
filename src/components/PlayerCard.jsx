import React, { useEffect, useState } from "react"
import validPerson from "../assets/validPerson.png"

const PlayerCard = ({ playersRender, gamesRender }) => {
  return (
    <>
      {
        playersRender?.sort((a,b) => (a.attributes.playerName > b.attributes.playerName) ? 1 : ((b.attributes.playerName > a.attributes.playerName) ? -1 : 0))?.map((item) => {               
          return (
            <div key={item.id}>
              {
                (() => {
                  var x = {
                    totalGamesPlayed: 0,
                    totalWins: 0,
                    totalTies: 0,
                    totalLosses: 0,
                    totalProfitLoss: 0
                  }

                  for (let i = 0; i < gamesRender?.length; i++) {
                    if (gamesRender?.[i].attributes.players.includes(item.attributes.playerName)) {
                      x.totalGamesPlayed++
                      x.totalProfitLoss -= gamesRender[i]?.attributes.betAmount
                    } if (gamesRender?.[i].attributes.winners == item.attributes.playerName) {
                      x.totalWins++
                      x.totalProfitLoss +=  gamesRender[i]?.attributes.players.split(",").length * gamesRender[i]?.attributes.betAmount
                    } if (gamesRender?.[i].attributes.winners.includes(item.attributes.playerName) && gamesRender[i]?.attributes.winners.split(",").length > 1) {
                      x.totalTies++
                      x.totalProfitLoss +=  gamesRender[i]?.attributes.players.split(",").length * gamesRender[i]?.attributes.betAmount / gamesRender[i]?.attributes.winners.split(",").length
                    } if (gamesRender?.[i].attributes.players.includes(item.attributes.playerName) && !gamesRender?.[i].attributes.winners.includes(item.attributes.playerName)) {
                      x.totalLosses++
                    }
                  }

                  return (
                    <>
                      <div className="player-card-main">
                        <div className="player-card-main-one">
                          <img src={item?.attributes?.playerProfile?.data?.attributes?.url ? `http://localhost:1337${item?.attributes?.playerProfile?.data?.attributes?.url}` : validPerson } />
                          
                          <div>
                            <h1>{item.attributes.playerName}</h1>
                            <h1>{`Total Profit / Loss: ${x.totalProfitLoss.toLocaleString()}nis`}</h1>
                          </div>
                        </div>
                
                        <div className="player-card-main-two">
                          <div className="player-card-main-two-statistic-bar" >
                            <span style={{width: x.totalGamesPlayed == null || x.totalGamesPlayed == 0 ? "0%" : `${x.totalWins / x.totalGamesPlayed * 100}%`}} className="win">
                              {x.totalWins == 0 ? "" : `${x.totalWins}`}
                            </span>

                            <span style={{width: x.totalGamesPlayed == null || x.totalGamesPlayed == 0 ? "0%" : `${x.totalTies / x.totalGamesPlayed * 100}%`}} className="tie">
                              {x.totalTies == 0 ? "" : `${x.totalTies}`}
                            </span>

                            <span style={{width: x.totalGamesPlayed == null || x.totalGamesPlayed == 0 ? "100%" : `${x.totalLosses / x.totalGamesPlayed * 100}%`}} className="loss">
                              {x.totalLosses == 0 ? "" : `${x.totalLosses} / ${x.totalGamesPlayed}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })()
              }
            </div>
          )
        })
      }
    </>
  )
}

export default PlayerCard