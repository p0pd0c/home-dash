const faunadb = require('faunadb')
let { Create, Collection, Paginate, Match, Index, Map, Lambda, Get, Var } = faunadb.query
const client = new faunadb.Client({ secret: process.env.DB_KEY })

export default async function handler(req, res) {
    if(req.method === "POST") {
        let body = await JSON.parse(req.body)
        let ref = await client.query(
            Create(Collection("chess-games"), {
                data: {...body}
            })
        )
        return res.status(200).json(ref)
    }

    if(req.method === "PUT") {
        return res.status(500).json({ message: "Method not yet supported. Should accept a game by it's fauna gameID and should allow for updates to that document" })
    }

    if(req.method === "GET") {
        if(req.query.timestamp) {
            let data = {}
            console.log("TODO")
            return res.status(200).json(data)
        }
        // GET By winner's name
        if(req.query.winner) {
            let { data } = await client.query(Map(Paginate(Match(Index("games_by_winner"), req.query.winner)), Lambda("gameRef", Get(Var("gameRef")))))
            return res.status(200).json(data)
        }

        if(req.query.white) {
            let { data } = await client.query(Map(Paginate(Match(Index("games_by_white"), req.query.white)), Lambda("gameRef", Get(Var("gameRef")))))
            return res.status(200).json(data)
        }

        if(req.query.black) {
            let { data } = await client.query(Map(Paginate(Match(Index("games_by_black"), req.query.black)), Lambda("gameRef", Get(Var("gameRef")))))
            return res.status(200).json(data)
        }

        if(req.query.gameID) {
            let { data } = await client.query(Map(Paginate(Match(Index("games_by_id"), req.query.gameID)), Lambda("gameRef", Get(Var("gameRef")))))
            return res.status(200).json(data)
        }

        // GET ALL
        let { data } = await client.query(
            Map(Paginate(Match(Index("all_games"))), Lambda("gameRef", Get(Var("gameRef"))))
        )

        // FILTER OUT GAMES AFTER GET ALL
        if(req.query.details) {
            data = data.filter(datum => datum.data.details.includes(req.query.details))
        }
        
        return res.status(200).json(data)
    }
}
