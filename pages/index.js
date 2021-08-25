import React from 'react'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChessPawn, 
         faChessRook, 
         faChessKnight,
         faChessBishop,
         faChessKing,
        faChessQueen } from '@fortawesome/fontawesome-free-solid'

import ChessBoard from '../src/ChessBoard'

const chessmap = {
  'P': <FontAwesomeIcon icon={faChessPawn} size="2x" className="text-white" />,
  'R': <FontAwesomeIcon icon={faChessRook} size="2x" className="text-white" />,
  'N': <FontAwesomeIcon icon={faChessKnight} size="2x" className="text-white" />,
  'B': <FontAwesomeIcon icon={faChessBishop} size="2x" className="text-white" />,
  'K': <FontAwesomeIcon icon={faChessKing} size="2x" className="text-white" />,
  'Q': <FontAwesomeIcon icon={faChessQueen} size="2x" className="text-white" />,
  ' ': <></>,
  'p': <FontAwesomeIcon icon={faChessPawn} size="2x" className="text-black" />,
  'r': <FontAwesomeIcon icon={faChessRook} size="2x" className="text-black" />,
  'n': <FontAwesomeIcon icon={faChessKnight} size="2x" className="text-black" />,
  'b': <FontAwesomeIcon icon={faChessBishop} size="2x" className="text-black" />,
  'k': <FontAwesomeIcon icon={faChessKing} size="2x" className="text-black" />,
  'q': <FontAwesomeIcon icon={faChessQueen} size="2x" className="text-black" />
}

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
  const [filter, setFilter] = React.useState("")
  const [criteria, setCriteria] = React.useState("")

  // Runs when the component mounts to the DOM
  // Get all of the chessboards in the db and serve the Chessboard maker 
  React.useEffect(async () => {
    let rsp = await fetch(`/api/chess`, { method: "GET" })
    let data = await rsp.json()
    setBoards(data.map(game => {
      return game.data.fen
    }))
    
    // Only run this code on the client side, needed due to the Chessboard.js library
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

  // Convert fen -> 8x8 grid represented by an array of 8 arrays
  const fenToBoard = (fen) => {
    let board = [[],[],[],[],[],[],[],[]]
    console.log('converting')
    fen = fen.split('/')
    fen.forEach((rank, rankIndex) => {
      console.log('rank', rank)
      for(let j = 0; j < rank.length; j++) {
        //console.log('slot', parseInt(rank[j]))
        if(isNaN(parseInt(rank[j]))) {
          board[rankIndex].push(chessmap[rank[j]])
        } else {
          for(let i = 0; i < parseInt(rank[j]); i++) {
            board[rankIndex].push(chessmap[' '])
          }
        }
      }
    })
    return board
  }

  // Spread in the updates to the maker state
  const handleMakerUpdate = (e) => {
    setMakerData({...makerData, [e.target.name]: e.target.value })
  }

  // Validate maker inputs and create a document in db if valid
  const handleMakerSave = async () => {
    console.log(maker.fen())
    if(makerData.white.length === 0 || makerData.black.length === 0 || makerData.winner.length === 0) return
    let rsp = await fetch(`/api/chess`, { 
      method: "POST", 
      body: JSON.stringify({ fen: maker.fen(), white: makerData.white, black: makerData.black, winner: makerData.winner, details: makerData.details, gameID: uuidv4() })
    })
    let data = await rsp.json()
    console.log(data)
    setMakerData({
      white: "",
      black: "",
      winner: "",
      details: ""
    })
  }

  // If the filter criteria is blank, show all games, otherwise make a search with the given criteria
  const handleFilterSubmit = async (e) => {
    e.preventDefault()
    if(criteria === "") {
      let rsp = await fetch(`/api/chess`, { method: "GET" })
      let data = await rsp.json()
      setBoards(data.map(game => {
        return game.data.fen
      }))
    } else {
      let rsp = await fetch(`/api/chess?${filter}=${criteria}`, { method: "GET" })
      let data = await rsp.json()
      setBoards(data.map(game => {
        return game.data.fen
      }))
    }
    setFilter("")
    setCriteria("")
  }

  return (
    <>
      <div className="w-full h-full bg-black">
        <div id="makerContainer" className="w-96 m-auto">
          <div id="boardMaker" className="w-full"></div>
          <form onSubmit={e => e.preventDefault()} className="flex flex-row w-full">
            <input type="text" name="white" id="white_player_name" placeholder="White" className="w-1/5 p-1 border-2 focus:outline-none" value={makerData.white} onChange={handleMakerUpdate} />
            <input type="text" name="black" id="black_player_name" placeholder="Black" className="w-1/5 p-1 border-2 focus:outline-none" value={makerData.black} onChange={handleMakerUpdate} />
            <input type="text" name="winner" id="winner_name" placeholder="Winner" className="w-1/5 p-1 border-2 focus:outline-none" value={makerData.winner} onChange={handleMakerUpdate} />
            <input type="text" name="details" id="details" placeholder="Details" className="w-1/4 p-1 border-2 focus:outline-none" value={makerData.details} onChange={handleMakerUpdate} />
            <button type="submit" className="text-white text-center w-1/4 hover:bg-white hover:text-black focus:outline-none" onClick={handleMakerSave}>Submit</button>
          </form>
          <div id="filterContainer" className="flex flex-row w-full p-1">
            <label className="text-white p-1 w-1/4">Search By</label>
            <select id="filter" name="filter" className="p-1 focus:outline-none w-1/4" onChange={(e) => { setFilter(e.target.value) }} value={filter}>
              <option value="">none</option>
              <option value="winner">winner</option>
              <option value="white">white</option>
              <option value="black">black</option>
            </select>
            { filter !== "" &&
              <form onSubmit={handleFilterSubmit} className="w-1/2">
                <input type="text" name="criteria" placeholder="search criteria" value={criteria} onChange={(e) => setCriteria(e.target.value)} className="w-full focus:outline-none p-1" />
                <button type="submit" className="text-white text-center hover:bg-white hover:text-black focus:outline-none w-full p-1">Search</button>
              </form>
            }
          </div>
        </div>
        <div id="gamesContainer" className="h-auto">
          {boards.map(board => {
            let boardFromFen = fenToBoard(board)
            console.log('fen', board)
            return <ChessBoard key={uuidv4()} board={boardFromFen} />
          })}
        </div>
      </div>
    </>
  )
}