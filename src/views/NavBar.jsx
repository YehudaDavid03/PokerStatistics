import React from "react"

const NavBar = ({ gamesRender, loading, userInfoReceived, logout }) => {
  var r = 0

  for (let i = 0; i < gamesRender?.length; i++) {
    r += gamesRender?.[i].attributes.players.split(",").length * gamesRender?.[i].attributes.betAmount
  }
  return (
    <div className="nav-bar-main">
      {userInfoReceived.jwt ? <h4 onClick={() => {logout()}}><span className="material-icons-outlined">logout</span> Logout</h4> : <h1>Poker Statistic DashBoard</h1>}
      {userInfoReceived.jwt ? <h4><span className="material-icons-outlined">military_tech</span>{`Total Bets ${loading ? "0" : r.toLocaleString()}nis`}</h4> : <></>}
    </div>
  )
}

export default NavBar