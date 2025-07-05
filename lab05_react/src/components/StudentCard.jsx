import React from 'react'

export default function StudentCard({ name, major }) {
    return (
        <div className='card mt-2'>
            <div className="card-body">
                <h3>{name}</h3>
                <p>{major}</p>
            </div>
        </div>
    )
}
