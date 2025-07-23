import React, { version } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import './Map.css'
import { useRef, useEffect } from 'react'


export default function Map({ onFoundLocation }) {

    const mapContainer = useRef(null)

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            center: [100, 19],
            zoom: 5,
            style: 'https://api.maptiler.com/maps/landscape/style.json?key=QcH5sAeCUv5rMXKrnJms'
        })

        let nav = new maplibregl.NavigationControl();
        map.addControl(nav, 'top-right');

        let geolocate = new maplibregl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true, // เปิดใช้งานการติดตามต่อเนื่อง
            showUserLocation: true, // แสดงจุดตำแหน่งผู้ใช้
        });

        geolocate.on('geolocate', (e) => {
            // console.log(e);
            if (!e?.coords) return;

            const location = { lat: e.coords.latitude, lng: e.coords.longitude, accuracy: e.coords.accuracy }
            onFoundLocation(location)

        })

        geolocate.on('trackuserlocationstart', () => {
            console.log('A trackuserlocationstart event has occurred.')
        });

        map.addControl(geolocate)

        // clear ข้อมูลเมื่อคอมโพเนนต์ถูกถอน
        return () => map.remove()
    }, [])


    return (
        <div
            ref={mapContainer}
            className="card shadow-sm map">
        </div>
    )
}
