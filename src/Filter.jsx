import React from 'react'
export default function Filter({ filter, setFilter, handleFilterSubmit, criteria, setCriteria }) {
    React.useEffect(() => {
        setCriteria({ ...criteria, from: "", to: "" })
    }, [])
    return (
        <div id="filterContainer" className="flex flex-row w-full p-1">
            <label className="text-white p-1 w-1/4">Search By</label>
            <select id="filter" name="filter" className="p-1 focus:outline-none w-1/4" onChange={(e) => { setFilter(e.target.value) }} value={filter}>
              <option value="">none</option>
              <option value="winner">winner</option>
              <option value="white">white</option>
              <option value="black">black</option>
              <option value="details">detail</option>
              <option value="gameID">gameID</option>
              <option value="timestamp">timestamp</option>
            </select>
            { (filter !== "" && filter !== "timestamp") &&
              <form onSubmit={handleFilterSubmit} className="w-1/2">
                <input type="text" name="criteria" placeholder="search criteria" value={criteria} onChange={(e) => setCriteria(e.target.value)} className="w-full focus:outline-none p-1" />
                <button type="submit" className="text-white text-center hover:bg-white hover:text-black focus:outline-none w-full p-1">Search</button>
              </form>
            }
            { (filter === "timestamp" && criteria.from && criteria.to) &&
                <form onSubmit={handleFilterSubmit}>
                    <div className="flex flex-row">
                      <div className="flex flex-column w-1/2">
                        <input type="datetime-local" placeholder="From" value={criteria.from} onChange={(e) => setCriteria({ ...criteria, from: e.target.value })} className="h-1/2 focus:outline-none p-1" />
                        <input type="datetime-local" placeholder="To" value={criteria.to} onChange={(e) => setCriteria({ ...criteria, to: e.target.value })} className="h-1/2 focus:outline-none p-1" />
                      </div>
                      <button type="submit" className="text-white text-center hover:bg-white hover:text-black focus:outline-none w-1/2 p-1">Search</button>
                    </div>
                </form>
            
            }
            { filter === "" &&
                <button className="text-white w-1/2 focus:outline-none hover:bg-white hover:text-black" onClick={handleFilterSubmit}>Reset</button>
            }
        </div>
    )
}
