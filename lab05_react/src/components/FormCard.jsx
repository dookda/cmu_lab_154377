import React from 'react'
import { useState } from 'react'

export default function FormCard() {
    const [count, setCount] = useState(null)
    return (
        <div className='card mt-2' >
            <div className="card-body">
                <h3>Count:{count}</h3>
                <button
                    className='btn btn-success'
                    onClick={() => setCount(count + 1)}
                >ตกลง</button>
            </div>
        </div>
    )
}
