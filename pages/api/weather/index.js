export default async function handler(req, res) {
    if(req.method === "GET") {
        console.log('serving weather...')
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${process.env.WEATHER_KEY}`
        let rsp = await fetch(url, {
            method: "GET"
        })
        let data = await rsp.json()
        res.status(200).json(data)
    }
            
}