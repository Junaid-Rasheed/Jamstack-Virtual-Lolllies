import { gql, useMutation, useQuery } from "@apollo/client"
import React, { useRef, useState } from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"

export default function CreateNew() {
  const [color1, setColor1] = useState("#d52358")
  const [color2, setColor2] = useState("#e95946")
  const [color3, setColor3] = useState("#d52778")
  const ReceiverRef = useRef()
  const messageRef = useRef()
  const senderRef = useRef()

  // const QueryData = gql`
  //   {
  //     hello
  //   }
  // `

  const createLollyMutation = gql`
    mutation createLolly(
      $resepientName: String
      $message: String
      $senderName: String
      $flavorTop: String
      $flavorMiddle: String
      $flavorBottom: String
    ) {
      createLolly(
        resepientName: $resepientName
        message: $message
        senderName: $senderName
        flavorTop: $flavorTop
        flavorMiddle: $flavorMiddle
        flavorBottom: $flavorBottom
      ) {
        message
        lollyPath
      }
    }
  `
  // const { loading, error, data } = useQuery(QueryData)
  const [formLolly] = useMutation(createLollyMutation)

  const submitForm = async () => {
    // console.log("color1", color1)
    // console.log("sender", senderRef.current.value)
    // console.log("to:", ReceiverRef.current.value)
    // console.log("message:", messageRef.current.value)
    const result = await formLolly({
      variables: {
        resepientName: ReceiverRef.current.value,
        message: messageRef.current.value,
        senderName: senderRef.current.value,
        flavorTop: color1,
        flavorMiddle: color2,
        flavorBottom: color3,
      },
    })
    console.log("result is ", result)
  }
  return (
    <div className="container">
      {/* {data && data.hello && <div>{data.hello}</div>} */}
      <Header />
      <div className="lollyFormDiv">
        <div>
          <Lolly
            fillLollyTop={color1}
            fillLollyMiddle={color2}
            fillLollyBottom={color3}
          />
        </div>
        <div className="lollyFlavorDiv">
          <input
            type="color"
            name="flavorTop"
            value={color1}
            className="colorPicker"
            onChange={e => setColor1(e.target.value)}
          />
          <input
            type="color"
            name="flavorMid"
            value={color2}
            className="colorPicker"
            onChange={e => setColor2(e.target.value)}
          />
          <input
            type="color"
            name="flavorBottom"
            value={color3}
            className="colorPicker"
            onChange={e => setColor3(e.target.value)}
          />
        </div>
        <div>
          <div className="formDiv">
            <input
              type="text"
              name="recepientName"
              id="recepientName"
              ref={ReceiverRef}
              placeholder="To"
            />

            <textarea rows="15" ref={messageRef} placeholder="Enter message" />

            <input
              placeholder="from"
              type="text"
              name="senderName"
              id="senderName"
              ref={senderRef}
            />
          </div>
          <input value="Create Lolly" type="button" onClick={submitForm} />
        </div>
      </div>
    </div>
  )
}
