import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';


export default function Map() {
    const mapContainer = useRef(null)
    const mapboxAccessToken = 'pk.eyJ1IjoiZG9va2RhIiwiYSI6ImNsbHNxMHl1YjE3NmkzY3FpbzZ4amw0eDIifQ.3ssUxVdXm-vI7iOJgNzwIw';

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: [98.95028216958734, 18.802614467416145],
            zoom: 13
        });

        map.addControl(new maplibregl.NavigationControl());
        map.addControl(new maplibregl.GeolocateControl());

        // add marker
        const marker = new maplibregl.Marker()
            .setLngLat([98.95028216958734, 18.802614467416145])
            .setPopup(new maplibregl.Popup().setHTML('<h3>CMU</h3><p>Chiang Mai University</p>'))
            .addTo(map);
        marker.togglePopup();

        // add data from GeoJSON
        map.on('load', () => {
            map.addSource('overlay-points', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/dookda/cmu_lab_154377/refs/heads/main/data/overlay-points.geojson'
            });
            map.addLayer({
                'id': 'overlay-points',
                'type': 'circle',
                'source': 'overlay-points',
                'paint': {
                    'circle-radius': 6,
                    'circle-color': '#f00',
                    'circle-opacity': 0.8
                }
            });
            map.on('click', 'overlay-points', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new maplibregl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });
            map.on('mouseenter', 'overlay-points', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'overlay-points', () => {
                map.getCanvas().style.cursor = '';
            });
        });



        return () => map.remove();
    }, [])

    return (
        <>
            <div ref={mapContainer}
                className='map'>
            </div>
        </>
    );
}

