import React from 'react'

export default function Info({ latlng }) {

    return (
        <div>
            <div className="card">
                <div className="card-body" >
                    {(latlng.lat).toFixed(4)} {(latlng.lng).toFixed(4)}
                </div>
            </div>
        </div>
    )
}
