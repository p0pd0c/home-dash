import React from 'react'

import games from '../public/games.json'

import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  function* chessGameID() {
    let i = 0
    while(true) {
      yield i++
    }
  }

  const [boards, setBoards] = React.useState([])
  const [maker, setMaker] = React.useState(null)
  const [makerData, setMakerData] = React.useState({
    white: "",
    black: "",
    details: ""
  })

  const handleMakerUpdate = (e) => {
    setMakerData({...makerData, [e.target.name]: e.target.value })
  }

  const handleMakerSave = async () => {
    console.log(maker.fen())
    if(makerData.white.length === 0 || makerData.black.length === 0) return
    let rsp = await fetch(`/api/chess`, { 
      method: "POST", 
      body: JSON.stringify({ fen: maker.fen(), white: makerData.white, black: makerData.black, details: makerData.details, gameID: uuidv4() })
    })
    let data = await rsp.json()
    console.log(data)
    setMakerData({
      white: "",
      black: "",
      details: ""
    })
  }

  const handleGameLoad = async (e) => {
    console.log('loaded', e)
  }

  React.useEffect(async () => {
    let rsp = await fetch(`/api/chess`, { method: "GET" })
    let data = await rsp.json()
    setBoards(data.map(game => {
      return game.data
    }))
    if(typeof window.console !== 'undefined') {
      let boardMaker = await Chessboard('boardMaker', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true,
        showNotation: false
      })
      setMaker(boardMaker)
      console.log('mounted board maker')
    }
  }, [])

  return (
    <>
      <div className="w-full h-full bg-black">
        <div id="makerContainer" className="w-96">
          <div id="boardMaker" className="w-full"></div>
          <form onSubmit={e => e.preventDefault()} className="flex flex-row w-full">
            <input type="text" name="white" id="white_player_name" placeholder="White name" className="w-1/4 p-1 border-2 focus:outline-none" value={makerData.white} onChange={handleMakerUpdate} />
            <input type="text" name="black" id="black_player_name" placeholder="Black name" className="w-1/4 p-1 border-2 focus:outline-none" value={makerData.black} onChange={handleMakerUpdate} />
            <input type="text" name="details" id="details" placeholder="Details" className="w-1/4 p-1 border-2 focus:outline-none" value={makerData.details} onChange={handleMakerUpdate} />
            <button type="submit" className="text-white text-center w-1/4 hover:bg-white hover:text-black focus:outline-none" onClick={handleMakerSave}>Submit</button>
          </form>
          <div id="filterContainer" className="flex flex-row w-full text-white p-1">
            Search By
          </div>
        </div>
        <div id="gamesContainer" className="h-screen">
          {boards.map(board => {
            return <div key={board.gameID} id={board.gameID}></div>
          })}
        </div>
      </div>
    </>
  )
}