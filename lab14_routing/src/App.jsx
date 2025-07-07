import { useState } from 'react'
import Map from './components/Map'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Map />
    </>
  )
}

export default App
