import React from "react"
import Lolly from "../components/Lolly"
import Header from "../components/Header"
import { navigate } from "gatsby"

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="listlollies">
        <div>
          <Lolly
            fillLollyTop="yellow"
            fillLollyMiddle="green "
            fillLollyBottom="blue"
          />
        </div>
        <div>
          <Lolly
            fillLollyTop="pink"
            fillLollyMiddle="red "
            fillLollyBottom="blue"
          />
        </div>
        <div>
          <Lolly
            fillLollyTop="grey"
            fillLollyMiddle="white "
            fillLollyBottom="purple"
          />
        </div>
      </div>

      <input
        type="button"
        value="Create New Lolly"
        onClick={() => {
          navigate("/CreateNew")
        }}
      ></input>
      
    </div>
  )
}
