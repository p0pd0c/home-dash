export default function ChessBoard({ board, white, black, description }) {
    if(!board) return <></>
    return (
        <div className="w-min flex flex-col m-auto p-4">
        {
          board.map((row, ri) => {
            return (
              <div key={ri} className={`h-8 flex flex-row`}>
                { 
                  row.map((slot, si) => {
                    return (
                      <div key={si}
                           className={
                              `flex w-8 m-0 justify-center items-center ${
                                (ri % 2 === 0)? ((si % 2 === 1)? "bg-peru": "bg-wheat") 
                                  : 
                                ((si % 2 === 1)? "bg-wheat": "bg-peru")
                              }`
                            }>
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
    )
}