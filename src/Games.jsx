import { v4 as uuidv4 } from 'uuid'
import ChessBoard from '../src/ChessBoard'

export default function Games({ boards }) {
    
    return (
        <div id="gamesContainer" className="h-auto flex flex-row flex-wrap justify-center">
          {boards.map(board => {
            return <ChessBoard key={uuidv4()} board={board} />
          })}
        </div>
    )
}
