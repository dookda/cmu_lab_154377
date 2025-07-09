import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';
import style from './style.json';

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
        })

        map.on('load', () => {
            map.addSource('overlay', {
                type: 'vector',
                tiles: ['http://localhost:8080/data/overlay/{z}/{x}/{y}.pbf'],
                minzoom: 0,
                maxzoom: 18
            });

            map.addLayer({
                id: 'overlay-id',
                type: 'circle',
                source: 'overlay',
                'source-layer': 'overlay',
                paint: {
                    'circle-radius': [
                        'interpolate', ['linear'], ['zoom'],
                        8, 4,
                        14, 10
                    ],
                    'circle-color': [
                        'match',
                        ['get', 'category'],
                        'restaurant', '#e91e63',
                        'hotel', '#3f51b5',
            /* default */ '#9e9e9e'
                    ],
                    'circle-opacity': 0.8
                }
            })
        })



        // zurich_switzerland

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