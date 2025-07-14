import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Map from './components/Map';

function App() {

  const rand = Math.random() * 10
  const lottery = rand.toFixed(0);

  const onInputChange = (e) => {
    const myNumber = e.target.value;

    if (myNumber == lottery) {
      alert("เยี่ยมยอด")
    }

  }


  return (
    <>
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <label htmlFor="">วันนี้รวย</label>
            <input type="number"
              className="form-control mt-2"
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
