import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';


export default function Map() {
    const mapContainer = useRef(null)
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
                data: 'https://raw.githubusercontent.com/dookda/cmu_lab_154377/refs/heads/main/data/hostpital_4326.geojson'
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
                const description = e.features[0].properties.name;

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

        // add line layer
        map.on('load', () => {
            map.addSource('overlay-line', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/dookda/cmu_lab_154377/refs/heads/main/data/trans_4326.geojson'
            });
            map.addLayer({
                id: 'overlay-line',
                type: 'line',
                source: 'overlay-line',
                paint: {
                    'line-color': '#3F51B5',
                    'line-width': 3,
                    'line-opacity': 0.8,
                    'line-dasharray': [3, 1],
                    'line-gap-width': 0,
                }
            });
        });

        // add polygon layer
        map.on('load', () => {
            map.addSource('overlay-polygon', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/dookda/cmu_lab_154377/refs/heads/main/data/amphoe_4326.geojson'
            });
            map.addLayer({
                id: 'overlay-polygon',
                type: 'fill',
                source: 'overlay-polygon',
                paint: {
                    'fill-color': '#3F51B5',
                    'fill-opacity': 0.2,
                    'fill-outline-color': '#3F51B5'
                }
            });
            // add outline layer
            map.addLayer({
                id: 'overlay-polygon-outline',
                type: 'line',
                source: 'overlay-polygon',
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 2,
                    'line-opacity': 0.8,
                    'line-dasharray': [2, 2],
                    'line-gap-width': 0,
                }
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
