import useStateWithCallback from "use-state-with-callback"
import React, { useState, useEffect } from "react"
import axios from "axios"

const EnterGame = ({ updateApiSend, playersRender, userInfoReceived }) => {
  const [updateApi, setUpdateApi] = useStateWithCallback(true, () => {
    updateApiSend(updateApi)
  })

  const [enterNewGame, setEnterNewGame] = useState({
    betAmount: "",
    date: "",
    winners: [],
    players: []
  })

  const handleChange = (e) => {
    setEnterNewGame({...enterNewGame, [e.target.name]: e.target.value})
  }

  const handlePushChangeWinners = (e) => {
    if (enterNewGame.winners.includes(e.target.value)) {
      if (window.confirm("Player already chosen would you like to remove this player?")) {
        const name = e.target.value
        setEnterNewGame({...enterNewGame, winners: [...enterNewGame.winners.filter((e) => (e !== name))]})
      } else {}
    } else {
      if (enterNewGame.players.includes(e.target.value)) {
        setEnterNewGame({...enterNewGame, winners: [...enterNewGame.winners, e.target.value]})
      } else {
        setEnterNewGame({...enterNewGame, winners: [...enterNewGame.winners, e.target.value], players: [...enterNewGame.players, e.target.value]})
      }
    }
  }

  const handlePushChangePlayers = (e) => {
    if (enterNewGame.players.includes(e.target.value)) {
      if (window.confirm("Player already chosen would you like to remove this player?")) {
        const name = e.target.value
        setEnterNewGame({...enterNewGame, winners: [...enterNewGame.winners.filter((e) => (e !== name))], players: [...enterNewGame.players.filter((e) => (e !== name))]})
      } else {}
    } else {
      setEnterNewGame({...enterNewGame, players: [...enterNewGame.players, e.target.value]})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: "post",
      url: "https://sleepy-ocean-12912.herokuapp.com/api/games",
      headers: {
        Authorization:
          `Bearer ${userInfoReceived.jwt}`,
      },
      data: {
        data: {
          betAmount: enterNewGame.betAmount,
          date: enterNewGame.date,
          winners: enterNewGame.winners.toString(),
          players: enterNewGame.players.toString()
        }
      },
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (response) {
      console.log(response)
    })

    setEnterNewGame({
      betAmount: "",
      date: "",
      winners: [],
      players: []
    })

    setUpdateApi(!updateApi)
  }

  return (
    <div className="enter-game-main">
      <div className="enter-game-main-top">
        <div className="enter-game-main-top-one">
          <input
            type="number" 
            name="betAmount" 
            value={enterNewGame.betAmount}
            onChange={handleChange}
            placeholder="Bet Amount"
          ></input>
          
          <input
            type="date" 
            name="date" 
            value={enterNewGame.date}
            onChange={handleChange}
          ></input>

          <select name="winners" value={"Choose Players"} onChange={handlePushChangeWinners}>
            <option>Choose Winners</option>
            {
              playersRender?.sort((a,b) => (a.attributes.playerName > b.attributes.playerName) ? 1 : ((b.attributes.playerName > a.attributes.playerName) ? -1 : 0))?.map((item) => {               
                return (
                  <option key={item.id} value={item.attributes.playerName}>{item.attributes.playerName}</option>
                )
              })
            }
          </select>
          
          <select name="players" value={"Choose Players"} onChange={handlePushChangePlayers}>
            <option>Choose Players</option>
            {
              playersRender?.sort((a,b) => (a.attributes.playerName > b.attributes.playerName) ? 1 : ((b.attributes.playerName > a.attributes.playerName) ? -1 : 0))?.map((item) => {
                return (
                  <option key={item.id} value={item.attributes.playerName}>{item.attributes.playerName}</option>
                )
              })
            }
          </select>
        </div>

        <div className="enter-game-main-top-two">
          <p>{`${enterNewGame.betAmount ? enterNewGame.betAmount : "0"}nis`}</p>
          <p>{`Date: ${enterNewGame.date}`}</p>

          <div>
            <p>Winners: </p>

            {
              enterNewGame.winners?.map((item) => {               
                return (
                  item + ", "
                )
              })
            }
          </div>
          
          <div>
            <p>Players: </p>

            {
              enterNewGame.players?.map((item) => {               
                return (
                  item + ", "
                )
              })
            }
          </div>
        </div>
      </div>

        <div className="enter-game-main-bottom">
          <input
            type="submit" 
            name="submit" 
            value={"Verify Game Upload"}
            onClick={handleSubmit}
          ></input>
        </div>
    </div>
  )
}

export default EnterGame