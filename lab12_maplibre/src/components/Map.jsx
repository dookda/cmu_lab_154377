import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null); // Store map instance
    const [activeBasemap, setActiveBasemap] = useState('osm'); // Track active basemap

    useEffect(() => {
        // Initialize map
        const map = new maplibregl.Map({
            container: mapContainer.current,
            center: [98.95028216958734, 18.802614467416145],
            zoom: 10,
            style: {
                version: 8,
                sources: {}, // Empty style to avoid loading a default style
                layers: []
            }
        });
        mapRef.current = map;

        map.on('style.load', () => {
            // Set projection to globe
            map.setProjection({
                type: 'globe'
            });

            // Add OSM raster tile source and layer
            map.addSource('osm', {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });
            map.addLayer({
                id: 'osm-layer',
                type: 'raster',
                source: 'osm',
                layout: {
                    visibility: activeBasemap === 'osm' ? 'visible' : 'none'
                }
            });

            // Add MapTiler raster tile source and layer
            map.addSource('maptiler', {
                type: 'raster',
                tiles: ['https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=QcH5sAeCUv5rMXKrnJms'],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
            });
            map.addLayer({
                id: 'maptiler-layer',
                type: 'raster',
                source: 'maptiler',
                layout: {
                    visibility: activeBasemap === 'maptiler' ? 'visible' : 'none'
                }
            });

            // Add Mapbox raster tile source and layer
            map.addSource('mapbox', {
                type: 'raster',
                tiles: ['https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9va2RhIiwiYSI6ImNreWxsNGhnazM3OTcydnA4bW1hbWpxdmMifQ.mGxUeCMxN-gdEfNy6BgAWA'],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
            });
            map.addLayer({
                id: 'mapbox-layer',
                type: 'raster',
                source: 'mapbox',
                layout: {
                    visibility: activeBasemap === 'mapbox' ? 'visible' : 'none'
                }
            });

            //add marker
            new maplibregl.Marker()
                .setLngLat([98.95028216958734, 18.802614467416145])
                .setPopup(new maplibregl.Popup().setHTML('<h3>Chiang Mai</h3><p>Welcome to Chiang Mai!</p>'))
                .addTo(map);

            // add geojson source
            map.addSource('geojson-source', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                "coordinates": [
                                    [
                                        [
                                            98.98419820148831,
                                            18.78072868483035
                                        ],
                                        [
                                            98.98419820148831,
                                            18.774138914436094
                                        ],
                                        [
                                            98.99169832578713,
                                            18.774138914436094
                                        ],
                                        [
                                            98.99169832578713,
                                            18.78072868483035
                                        ],
                                        [
                                            98.98419820148831,
                                            18.78072868483035
                                        ]
                                    ]
                                ],
                                "type": "Polygon"
                            },
                            properties: {
                                title: 'Chiang Mai',
                                description: 'Welcome to Chiang Mai!'
                            }
                        }
                    ]
                }
            });
            // Add polygon layer
            // Add polygon fill layer
            map.addLayer({
                id: 'polygon-layer',
                type: 'fill',
                source: 'geojson-source',
                layout: {},
                paint: {
                    'fill-color': '#ff8888',
                    'fill-opacity': 0.5
                }
            });

            // Add polygon outline layer
            map.addLayer({
                id: 'polygon-outline-layer',
                type: 'line',
                source: 'geojson-source',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 4,
                    'line-opacity': 1
                }
            });

        });

        // Add navigation controls
        map.addControl(new maplibregl.NavigationControl(), 'top-right');

        // Error handling
        map.on('error', (e) => {
            console.error('Map error:', e.error.message);
        });

        // Cleanup on unmount
        return () => {
            map.remove();
        };
    }, [activeBasemap]); // Re-run effect when activeBasemap changes

    // Handle basemap switching
    const handleBasemapChange = (basemap) => {
        setActiveBasemap(basemap);
        const map = mapRef.current;
        if (!map) return;

        // Toggle layer visibility
        ['osm-layer', 'maptiler-layer', 'mapbox-layer'].forEach((layerId) => {
            map.setLayoutProperty(
                layerId,
                'visibility',
                layerId === `${basemap}-layer` ? 'visible' : 'none'
            );
        });
    };

    return (
        <div>
            <div className="basemap-switcher" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: 'white', padding: '10px', borderRadius: '5px' }}>
                <label>
                    <input
                        type="radio"
                        name="basemap"
                        value="osm"
                        checked={activeBasemap === 'osm'}
                        onChange={() => handleBasemapChange('osm')}
                    />
                    OpenStreetMap
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        name="basemap"
                        value="maptiler"
                        checked={activeBasemap === 'maptiler'}
                        onChange={() => handleBasemapChange('maptiler')}
                    />
                    MapTiler
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        name="basemap"
                        value="mapbox"
                        checked={activeBasemap === 'mapbox'}
                        onChange={() => handleBasemapChange('mapbox')}
                    />
                    Mapbox
                </label>
            </div>
            <div ref={mapContainer} className="map" style={{ width: '100%', height: '100vh' }}>
                Map
            </div>
        </div>
    );
}