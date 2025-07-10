import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';


export default function Map() {
    const mapContainer = useRef(null)
    const mapRef = useRef(null)

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            // style: 'https://demotiles.maplibre.org/style.json',
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/light-matter-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            // style: 'http://localhost:8080/styles/basic-preview/style.json',
            center: [98.95028216958734, 18.802614467416145],
            zoom: 10
        });

        map.on('load', () => {

            map.setProjection({
                type: 'globe'
            });

            map.on('click', (e) => {
                console.log(`Clicked at ${e.lngLat.lng}, ${e.lngLat.lat}`);

                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`${e.lngLat.lng}<br/>${e.lngLat.lat}`)
                    .addTo(map);
            });

            map.on('mouseenter', 'overlay-points', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'overlay-points', () => {
                map.getCanvas().style.cursor = '';
            });

        })

        mapRef.current = map

        return () => {
            map.remove()
        }
    }, [])


    return (
        <div ref={mapContainer}
            className='map'>
        </div>
    );
}