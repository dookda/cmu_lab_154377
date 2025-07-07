import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const startMarkerRef = useRef(null);
    const endMarkerRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        // Initialize map
        const map = L.map(mapContainer.current, {
            center: [18.802614467416145, 98.95028216958734],
            zoom: 15,
        });
        mapRef.current = map;

        // Basemap
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        });

        // Overlay maps
        const province = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/th/wms?', {
            layers: 'th:province_4326',
            format: 'image/png',
            transparent: true,
        });

        const amphoe = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/th/wms?', {
            layers: 'th:amphoe_4326',
            format: 'image/png',
            transparent: true,
        });

        // Add layers to map
        const baseMap = {
            'แผนที่ OSM': osm.addTo(map),
        };

        const overlayMap = {
            'ขอบเขตจังหวัด': province.addTo(map),
            'ขอบเขตอำเภอ': amphoe.addTo(map),
        };

        L.control.layers(baseMap, overlayMap).addTo(map);

        // Initialize start marker
        const start = L.latLng(18.802279095186158, 98.96749412237442);
        startMarkerRef.current = L.marker(start, { name: 'start', draggable: true }).addTo(map);

        // Function to remove destination marker
        const removeDestinationLayer = () => {
            if (endMarkerRef.current) {
                map.removeLayer(endMarkerRef.current);
                endMarkerRef.current = null;
            }
        };

        // Function to open Google Maps directions
        const goRoute = () => {
            if (startMarkerRef.current && endMarkerRef.current) {
                const startLatLng = startMarkerRef.current.getLatLng();
                const endLatLng = endMarkerRef.current.getLatLng();
                window.open(
                    `https://www.google.com/maps/dir/${startLatLng.lat},${startLatLng.lng}/${endLatLng.lat},${endLatLng.lng}`,
                    '_blank'
                );
            }
        };

        // Click handler for adding destination marker
        const handleMapClick = (e) => {
            removeDestinationLayer();
            const end = e.latlng;
            endMarkerRef.current = L.marker(end, { name: 'dest', draggable: true })
                .addTo(map)
                .bindPopup(
                    `<b>หาเส้นทางมายังที่นี่ !</b><br>
           <button id="routeBtn">ok</button>`
                )
                .openPopup();

            // Add event listener to the button after popup is created
            setTimeout(() => {
                document.getElementById('routeBtn')?.addEventListener('click', goRoute);
            }, 0);
        };

        map.on('click', handleMapClick);

        // Cleanup on component unmount
        return () => {
            map.off('click', handleMapClick);
            map.eachLayer((layer) => map.removeLayer(layer));
            map.remove();
            mapRef.current = null;
            startMarkerRef.current = null;
            endMarkerRef.current = null;
        };
    }, []);

    return (
        <div
            ref={mapContainer}
            className="map"
            style={{ height: '500px', width: '100%' }}
        >
            Map
        </div>
    );
}