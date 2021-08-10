import React from 'react'
import TODO from '../src/TODO'
import WEATHER from '../src/WEATHER'
import Head from 'next/head'

export default function Home() {
  const [error, setError] = React.useState({ show: false, message: "" })

  React.useEffect(() => {
    setTimeout(() => {
      setError({ ...error, show: false })
    }, 3000)
  }, [error])

  const handleClick = (e) => {
    setError({ show: true, message: "owwwyee! dont poke!" })
  }

  return (
    <div className="relative w-full h-auto flex flex-col md:flex-row">
      <Head>
        <title>HomeDash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen md:w-1/2">
        <TODO setError={setError} />
      </div>
      <div className="w-full h-screen md:w-1/2" onClick={handleClick}>
        <WEATHER setError={setError} />
      </div>
      {error.show &&
        <div className="absolute top-0 left-0 w-full opacity-70 bg-red text-white text-lg h-auto p-5" onClick={handleClick}>
          {error.message}
        </div>
      }
    </div>
  )
}