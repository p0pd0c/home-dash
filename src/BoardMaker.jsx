import React from 'react'
import { v4 as uuidv4 } from 'uuid'
export default function BoardMaker({ maker }) {
    const [makerData, setMakerData] = React.useState({
        white: "",
        black: "",
        details: ""
    })

    const handleMakerUpdate = (e) => {
        setMakerData({...makerData, [e.target.name]: e.target.value })
    }

    const handleMakerSave = async () => {
        let FEN = maker.fen()
        maker.clear()
        if(makerData.white.length === 0 || makerData.black.length === 0 || makerData.winner.length === 0) return
        let rsp = await fetch(`/api/chess`, { 
          method: "POST", 
          body: JSON.stringify({ fen: FEN, white: makerData.white, black: makerData.black, winner: makerData.winner, details: makerData.details, gameID: uuidv4() })
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

    return (
        <>
            <div id="boardMaker" className="w-full"></div>
            <form onSubmit={e => e.preventDefault()} className="flex flex-row w-full">
                <input type="text" name="white" id="white_player_name" placeholder="White" className="w-1/5 p-1 border-2 focus:outline-none" value={makerData.white} onChange={handleMakerUpdate} />
                <input type="text" name="black" id="black_player_name" placeholder="Black" className="w-1/5 p-1 border-2 focus:outline-none" value={makerData.black} onChange={handleMakerUpdate} />
                <input type="text" name="winner" id="winner_name" placeholder="Winner" className="w-1/5 p-1 border-2 focus:outline-none" value={makerData.winner} onChange={handleMakerUpdate} />
                <input type="text" name="details" id="details" placeholder="Details" className="w-1/4 p-1 border-2 focus:outline-none" value={makerData.details} onChange={handleMakerUpdate} />
                <button type="submit" className="text-white text-center w-1/4 hover:bg-white hover:text-black focus:outline-none" onClick={handleMakerSave}>Save</button>
          </form>
        </>
    )
}