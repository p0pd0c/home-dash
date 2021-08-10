import React from 'react'

export default function WEATHER({ setError }) {
    const [weatherData, setWeatherData] = React.useState({ loaded: false })
    const [url, setURL] = React.useState(`https://images.unsplash.com/photo-1531101930610-1b86e66d5fd7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80`)

    React.useState(async () => {
        let rsp, data
        try {
            rsp = await fetch(`http://localhost:3000/api/weather?lat=44.46333967017092&lon=-73.18977650818735`, {
                method: "GET"
            })
            data = await rsp.json()
            await getBackgroundImgURL([data.current.weather[0].main, data.current.weather[0].description].join(" "))
            setWeatherData({...weatherData, loaded: true, data})
        } catch(err) {
            console.error(err)
            setError({ show: true, message: err.message })
        } finally {
            console.log(data)
        }
    }, [])

    const getBackgroundImgURL = async (searchterm) => {
        let rsp, data
        try {
            if(typeof searchterm !== "string") return
            rsp = await fetch(`http://localhost:3000/api/unsplash/${searchterm}`, {
                method: "GET"
            })
            data = await rsp.json()
            if(typeof data.url !== "string") return
            setURL(data.url)
        } catch (err) {
            console.error(err)
            setError({ show: true, message: err.message })
        } finally {
            console.log(data)
        }
    }

    return (
        <div className="w-full h-full bg-indigo-600 relative">
            {weatherData.loaded && 
                <img className="w-full h-full absolute top-0 left-0" src={url} alt="sawwwreeee"></img>
            }
        </div>
    )
}