import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;
        const map = L.map(mapContainer.current, {
            center: [18.802614467416145, 98.95028216958734],
            zoom: 13
        });

        mapRef.current = map;

        // add code here
        //basemap
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        });

        //overlaymap
        var province = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/th/wms?", {
            layers: "th:province_4326",
            format: "image/png",
            transparent: true
        })

        var amphoe = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/th/wms?", {
            layers: "th:amphoe_4326",
            format: "image/png",
            transparent: true
        })

        var baseMap = {
            "แผนที่ OSM": osm.addTo(map),
        }

        var overLaymap = {
            "ขอบเขตจังหวัด": province.addTo(map),
            "ขอบเขตอำเภอ": amphoe.addTo(map)
        }

        L.control.layers(baseMap, overLaymap).addTo(map)

        // local
        map.locate({ setView: true, maxZoom: 20 })

        function onLocationFound(e) {
            console.log(e);
            var radius = e.accuracy;
            var gps = L.marker(e.latlng, { draggable: true });
            var circle = L.circle(e.latlng, radius);

            circle.addTo(map);
            gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
        }


        function onLocationError(e) {
            console.log(e);
        }

        map.on('locationfound', onLocationFound);

        return () => {
            mapRef.current.remove();
            mapRef.current = null;
        }
    }, [])

    return (
        <div ref={mapContainer}
            className="map"
        >Map</div>
    )
}
