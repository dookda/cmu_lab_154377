import { useEffect, useState } from 'react'
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Map from './components/Map';
import Chart from './components/Chart';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const token = "2b9b7d19f47c41ab2f58a00c0f61315f7a0c5926";
    const latlng = "18.669808,98.902295,18.940375,99.293044";

    fetch(`https://api.waqi.info/map/bounds/?latlng=${latlng}&token=${token}`)
      .then(response => response.json())
      .then(async (data) => {
        console.log("Fetched data:", data);
        setData(data)
      })
      .catch(error => console.error('Error fetching commits:', error));
  }, [])

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6">
            <Map data={data} /></div>
          <div className="col-sm-6">
            <Chart data={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
