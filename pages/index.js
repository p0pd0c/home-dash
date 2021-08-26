// TODO: Clear board on submission

import React from 'react'
import BoardMaker from '../src/BoardMaker'
import Games from '../src/Games'
import Filter from '../src/Filter'

export default function Home() {
  const [boards, setBoards] = React.useState([])
  const [maker, setMaker] = React.useState(null)
  const [filter, setFilter] = React.useState("")
  const [criteria, setCriteria] = React.useState("")

  const fetchBoards = async (filter = false, criteria = false) => {
    let rsp = filter && criteria? 
      await fetch(`/api/chess?${filter}=${criteria}`, { method: "GET" }) 
      : 
      await fetch(`/api/chess`, { method: "GET" })

    let data = await rsp.json()
    setBoards(data.map(game => {
      return game.data
    }))
  }

  // Runs when the component mounts to the DOM
  // Get all of the chessboards in the db and serve the Chessboard maker 
  React.useEffect(async () => {
    fetchBoards()
    
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

  // If the filter criteria is blank, show all games, otherwise make a search with the given criteria
  const handleFilterSubmit = async (e) => {
    e.preventDefault()
    if(criteria === "") {
      fetchBoards()
    } else {
      fetchBoards(filter, criteria)
    }
    setFilter("")
    setCriteria("")
  }

  return (
    <>
      <div className="w-full min-h-screen bg-black">
        <div id="makerContainer" className="m-auto w-96">
          <BoardMaker maker={maker} />
          <Filter filter={filter} setFilter={setFilter} handleFilterSubmit={handleFilterSubmit} criteria={criteria} setCriteria={setCriteria} />
        </div>
        <Games boards={boards} />
      </div>
    </>
  )
}