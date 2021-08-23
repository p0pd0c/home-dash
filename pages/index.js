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

import games from '../public/games.json'
import ChessBoard from '../src/ChessBoard'

const chessmap = {
  'P': <FontAwesomeIcon icon={faChessPawn} size="2x" className="text-white" />,
  'R': <FontAwesomeIcon icon={faChessRook} size="2x" className="text-white" />,
  'N': <FontAwesomeIcon icon={faChessKnight} size="2x" className="text-white" />,
  'B': <FontAwesomeIcon icon={faChessBishop} size="2x" className="text-white" />,
  'K': <FontAwesomeIcon icon={faChessKing} size="2x" className="text-white" />,
  'Q': <FontAwesomeIcon icon={faChessQueen} size="2x" className="text-white" />,
  ' ': <></>,
  'bP': <FontAwesomeIcon icon={faChessPawn} size="2x" className="text-black" />,
  'bR': <FontAwesomeIcon icon={faChessRook} size="2x" className="text-black" />,
  'bN': <FontAwesomeIcon icon={faChessKnight} size="2x" className="text-black" />,
  'bB': <FontAwesomeIcon icon={faChessBishop} size="2x" className="text-black" />,
  'bK': <FontAwesomeIcon icon={faChessKing} size="2x" className="text-black" />,
  'bQ': <FontAwesomeIcon icon={faChessQueen} size="2x" className="text-black" />
}

function* id() {
  let i = 0
  while(true) {
    yield i++
  }
}

export default function Home() {
  const [boards, setBoards] = React.useState([])
  React.useEffect(async () => {
    // Read chess game from FILE
    setBoards(games.map((game, index) => {
      return game.board.map(row => {
        return (
          row.map(slot => {
            return chessmap[slot]
          })
        )
      })
    }))
  }, [])
  return (
    <>
      <style jsx global>
        {`
          html {
            margin: 0;
            padding: 0;
            height: 100%;
            background-color: black;
          }
        `}
      </style>
      <div className="w-full h-full bg-black">
        <div className="w-full h-full flex flex-col relative sm:flex-row sm:flex-wrap sm:items-center">
          {
            boards.map(board => {
              return (
                <ChessBoard board={board} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}