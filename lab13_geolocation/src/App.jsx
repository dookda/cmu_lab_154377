import { useState, useEffect } from 'react'
import './App.css'
import Map from './components/Map'
import Info from './components/Info'

function App() {
  const [location, setLocation] = useState({ lat: null, lng: null, accuracy: null })

  const handleLocation = (loc) => {
    setLocation(loc)
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <Map onFoundLocation={handleLocation} />
          <Info location={location} />
        </div>
      </div>
    </>
  )
}

export default App
