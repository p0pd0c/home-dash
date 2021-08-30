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

export default function ChessBoard({ board }) {
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

    const [mappedBoard, setMappedBoard] = React.useState(null)
    const [displayDetails, setDisplayDetails] = React.useState(false)

    React.useEffect(() => {
        setMappedBoard(fenToBoard(board))

    }, [])
    const fenToBoard = (b) => {
        // p7/8/8/8/8/8/8/8
        let board = [[],[],[],[],[],[],[],[]]

        console.log('converting', b)
        let fen = b.fen
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

    if(mappedBoard === null) return <></>
    return (
        <div className={`flex flex-row ${displayDetails? "w-full justify-center order-first" : ""}`}>
            <div className={`flex flex-col p-4 ${displayDetails? "w-1/2" : ""} items-center`}>
            {
            mappedBoard.map((row, ri) => {
                return (
                <div key={ri} className={`h-8 flex flex-row`}>
                    { 
                    row.map((slot, si) => {
                        return (
                        <div 
                            key={si}
                            className={
                                `flex w-8 m-0 justify-center items-center ${
                                (ri % 2 === 0)? ((si % 2 === 1)? "bg-peru": "bg-wheat") 
                                    : 
                                ((si % 2 === 1)? "bg-wheat": "bg-peru")
                                }`
                            }
                            onClick={() => {displayDetails? setDisplayDetails(false) : setDisplayDetails(true)}} // Handle Modal Here
                            >
                            {slot}
                        </div>
                        )
                    })
                    }
                </div>
                )
            })
            }
            </div>
            { displayDetails && 
                <div className="w-1/2 p-4">
                    <div className="bg-white w-max h-full p-4 flex flex-col justify-between">
                        <p>White: {board.white}</p>
                        <p>Black: {board.black}</p>
                        <p className="w-2/3">Details: {board.details}</p>
                        <button className="hover:bg-black hover:text-white border border-transparent focus:ring-2 focus:ring-purple-400 w-max" onClick={() => {navigator.clipboard.writeText(board.gameID)}}>Game ID</button>
                    </div>
                </div>
            }
        </div>
    )
}