export default async function handler({ query: { search }, method }, res) {
    
    if(method === "GET") {
        let rsp = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${process.env.UNSPLASH_KEY}`)
        let data = await rsp.json()
        res.status(200).json({ url: data.results[0].urls.full })
    }
}