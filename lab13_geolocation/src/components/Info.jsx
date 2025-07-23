import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Info({ location }) {
    const [locInfo, setLocInfo] = useState({})
    useEffect(() => {
        console.log(location);
        setLocInfo(location);
    }, [location])
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                lat: {locInfo.lat} <br /> lng: {locInfo.lng}
            </div>
        </div>
    )
}
