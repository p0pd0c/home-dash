import React from 'react'

export default function Home() {
  const [backgroundURL, setBackgroundURL] = React.useState(null)
  React.useEffect(async () => {
    let data = await fetch(`/api/unsplash/cats`)
    let body = await data.json()
    setBackgroundURL(body.url)
  }, [])
  return (
    <div className="w-screen h-screen bg-black">
      {backgroundURL &&
        <img className="w-full h-full" src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNTE3MDh8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTYyOTQ5NTkwMg&ixlib=rb-1.2.1&q=85" />
      }
    </div>
  )
}