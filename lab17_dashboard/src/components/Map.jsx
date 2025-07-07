import React, { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css'

export default function Map({ data }) {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        const map = L.map(mapContainer.current, {
            center: [18.7808, 98.902295],
            zoom: 11,
        });

        mapRef.current = map;
        // basemap
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" > OpenStreetMap</a> contributors'
        });
        var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Esri'
        });

        // overlay
        var province = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
            layers: "CM:amphoe_cm",
            format: "image/png",
            transparent: true
        })

        // add marker from data
        if (data && data.data && data.data.length > 0) {
            data.data.forEach(item => {
                if (item.lat && item.lon) {
                    L.marker([item.lat, item.lon])
                        .bindPopup(`<b>${item.station.name}</b><br>AQI: ${item.aqi}`)
                        .addTo(map);
                }
            });
        }

        var baseMap = {
            "OpenStreetMap": osm.addTo(map),
            "Esri WorldStreetMap": Esri_WorldStreetMap
        }
        var overlayMap = {
            "province": province.addTo(map)
        }

        L.control.layers(baseMap, overlayMap).addTo(map)

        return () => {
            mapRef.current.remove();
            mapRef.current = null;
        };

    }, [data])


    return (
        <div ref={mapContainer}
            className='map'
        ></div>
    )
}
