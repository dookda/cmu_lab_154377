import React, { useEffect, useRef } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = L.map(mapContainer.current, {
            center: [18.802614467416145, 98.95028216958734],
            zoom: 15,
        });

        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        });

        const Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        });

        const google_road = L.tileLayer("https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}", {
            maxZoom: 20,
            subdomains: ["mt0", "mt1", "mt2", "mt3"]
        });

        const googleHybridge = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
            maxZoom: 20,
            subdomains: ["mt0", "mt1", "mt2", "mt3"]
        });

        const googleTerrain = L.tileLayer("http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}", {
            maxZoom: 20,
            subdomains: ["mt0", "mt1", "mt2", "mt3"]
        });

        const province = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/th/wms?", {
            layers: 'th:province_4326',
            format: 'image/png',
            transparent: true,
            attribution: `map by <a href=“https://engrids.soc.cmu.ac.th/”>engrids</a>`
        })

        let baseMaps = {
            "แผนที่ osm": osm,
            "แผนที่ Esri": Esri_WorldStreetMap,
            "แผนที่ Google Road": google_road,
            "แผนที่ Google Hybridge": googleHybridge.addTo(map.current),
            "แผนที่ Google Terrain": googleTerrain
        };

        let overlayMaps = {
            "ขอบเขตจังหวัด": province.addTo(map.current)
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map.current);

        return () => {
            map.current.remove();
            map.current = null;
        };
    }, []);

    return (
        <div ref={mapContainer}
            className="map"
        ></div>
    )
}
