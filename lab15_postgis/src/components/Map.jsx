import React from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { useRef, useState, useEffect } from 'react'
import './Map.css'

export default function Map() {
    const mapContainer = useRef(null)

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=QcH5sAeCUv5rMXKrnJms',
            center: [98.978, 18.79],
            zoom: 14
        })

        let nav = new maplibregl.NavigationControl();
        map.addControl(nav)

        const markers = [];
        map.on('click', async (e) => {
            console.log(e);
            try {
                markers.forEach(m => m.remove());
                const response = await fetch(`http://localhost:3000/api/gethospital/${e.lngLat.lat}/${e.lngLat.lng}/1000`)
                let data = await response.json()
                data.forEach(item => {
                    const geom = JSON.parse(item.json);
                    const marker = new maplibregl.Marker()
                        .setLngLat(geom.coordinates)
                        .addTo(map);
                    markers.push(marker);
                });
            } catch (error) {
                console.log(error);
            }
        })

        return () => map.remove()
    }, [])

    return (
        <div ref={mapContainer} className='card shadow-sm map mt-5'></div>
    )
}
