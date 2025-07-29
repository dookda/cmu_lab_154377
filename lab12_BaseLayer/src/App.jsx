import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './index.css'
import json from './assets/data.json'

import Map from './components/Map'
import Info from './components/Info'

function App() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 })
  const [data, setData] = useState([])

  useEffect(() => {
    setData(json)
  }, [])

  const handleClick = (e) => {
    setCoords(e)
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-8">
            <Map
              jsonData={data}
              onClick={handleClick} /></div>
          <div className="col-sm-4">
            <Info latlng={coords} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
