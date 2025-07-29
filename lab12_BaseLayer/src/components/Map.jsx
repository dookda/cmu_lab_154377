import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'

export default function Map({ onClick, jsonData }) {
    const mapContainer = useRef()
    const mapRef = useRef()
    const [baseMap, setBaseMap] = useState('maptiler')

    const defaultStyle = {
        version: 8,
        sources: {},
        layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#d8d4d4ff' } },]
    }

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            center: [100, 14],
            zoom: 2,
            // style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=QcH5sAeCUv5rMXKrnJms'
            style: defaultStyle,
        })

        // new maplibregl.Marker({})
        //     .setLngLat([100.00154495239104, 13.998334370960308])
        //     .addTo(map)

        map.on('style.load', () => {
            map.setProjection({
                type: 'globe', // Set projection to globe
            });
        });

        map.on("click", (e) => {
            onClick(e.lngLat)
        })

        map.on('style.load', () => {
            console.log("onload");

            map.addSource("point-data", {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/dookda/cmu_lab_154377/refs/heads/main/data/hostpital_4326.geojson'

            })

            map.addLayer({
                id: 'point-data',
                type: 'circle',
                source: 'point-data',
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#f00',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#f00'
                }
            })
        })

        mapRef.current = map
        return () => map.remove()
    }, [])

    useEffect(() => {
        if (!mapRef.current) return
        const map = mapRef.current
        jsonData.forEach(i => {
            // console.log(i);
            new maplibregl.Marker()
                .setLngLat([i.station.tele_station_long, i.station.tele_station_lat])
                .setPopup(new maplibregl.Popup()
                    .setHTML(i.station.tele_station_name.th)
                )
                .addTo(map)
        });

    }, [jsonData])

    useEffect(() => {
        if (!mapRef.current) return
        const map = mapRef.current
        const BASE_MAPS = {
            osm: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            grod: 'https://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
            ghyb: 'https://mt0.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}',
            gsat: 'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        };

        let newStyle = defaultStyle;
        if (baseMap === 'maptiler') {
            newStyle = `https://api.maptiler.com/maps/streets/style.json?key=QcH5sAeCUv5rMXKrnJms`;
        } else {
            const tileUrl = BASE_MAPS[baseMap];
            newStyle = {
                version: 8,
                sources: { 'raster-tiles': { type: 'raster', tiles: [tileUrl], tileSize: 256 } },
                layers: [{ id: 'raster-layer', type: 'raster', source: 'raster-tiles', minzoom: 0, maxzoom: 22 }]
            };
        }
        map.setStyle(newStyle);
    }, [baseMap])

    return (
        <>
            <div
                ref={mapContainer}
                className='map'
            ></div>
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor=""></label>
                        <select className="form-select"
                            onChange={(i) => setBaseMap(i.target.value)}>
                            <option value="maptiler">Maptiler 3D</option>
                            <option value="osm" >OpenStreetMap</option>
                            <option value="grod">Google Road</option>
                            <option value="gsat">Google Satellite</option>
                            <option value="ghyb">Google Hybrid</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
