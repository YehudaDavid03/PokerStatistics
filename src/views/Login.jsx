import React, { useState, useEffect } from "react"
import axios from "axios"

const Login = ({ userInfoSend }) => {
  const [errorMessage, setErrorMessage] = useState("")

  const [userInfo, setUserInfo] = useState({
    jwt: null, 
    username: null,
    email: null
  })

  const [login, setLogin] = useState({
    emailAddress: "",
    password: "",
  })

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const loginApiCall = async () => {
        var { data } = await axios.post("https://sleepy-ocean-12912.herokuapp.com/api/auth/local", {
          identifier: login.emailAddress,
          password: login.password,
        })

        setUserInfo({
          jwt: data.jwt,
          username: data.user.username,
          email: data.user.email,
        })
      }
      loginApiCall()

      if (userInfo.jwt) {

      } else {
        setErrorMessage("*please verify your credentials")
        setLogin({
          emailAddress: "",
          password: "",
        })
      }
    } catch(error) {
    }
  }

  useEffect(() => {
    userInfoSend(userInfo)
  }, [userInfo])

  return (
    <div className="login-main">
      <div className="login-main-a">
        <h1>login</h1>
        {
          errorMessage 
          
          ?

          (
            <p>{errorMessage}</p>
          ) 

          :

          (
            <></>
          )
        }

        <input
          type="email" 
          name="emailAddress"
          value={login.emailAddress}
          onChange={handleChange}
          placeholder="Email Address"
        ></input>

        <input
          type="password" 
          name="password" 
          value={login.password}
          onChange={handleChange}
          placeholder="Password"
        ></input>

        <button onClick={handleSubmit}>Login</button>
      </div>

      <div className="login-main-b">

      </div>
    </div>
  )
}

export default Login