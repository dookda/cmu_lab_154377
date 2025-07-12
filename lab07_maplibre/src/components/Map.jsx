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
            // Set the projection to globe
            map.setProjection({
                type: 'globe'
            });

            // add navigation control
            map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

            // add scale control
            map.addControl(new maplibregl.ScaleControl({
                maxWidth: 80,
                unit: 'metric'
            }), 'bottom-left');

            // add new marker
            new maplibregl.Marker()
                .setLngLat([98.95028216958734, 18.802614467416145])
                .setPopup(new maplibregl.Popup().setHTML('CMU'))
                .addTo(map);

            // add source overlay layer from geojson
            map.addSource('overlay-points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [98.95482935430704, 18.80377569858811]
                        },
                        properties: {
                            title: 'CMU',
                            description: 'Chiang Mai University'
                        }
                    }, {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [98.95182386943839, 18.800535923885263]
                        },
                        properties: {
                            title: 'CMU Library',
                            description: 'Chiang Mai University Library'
                        }
                    }, {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [98.9554349611185, 18.799386068791478]
                        },
                        properties: {
                            title: 'CMU Hospital',
                            description: 'Chiang Mai University Hospital'
                        }
                    }]
                }
            });

            // add overlay points layer
            map.addLayer({
                id: 'overlay-points',
                type: 'circle',
                source: 'overlay-points',
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#FF0000',
                    'circle-opacity': 0.8
                }
            });

            // add wms source
            // map.addSource('cmu-wms', {
            //     type: 'raster',
            //     tiles: [
            //         'http://localhost:8081/geoserver/cm/ows?' +
            //         'service=WMS&version=1.1.0&request=GetMap&layers=cm:cm_dwr_landuse_4326' +
            //         '&styles=&format=image/png&transparent=true' +
            //         '&width=256&height=256' +
            //         '&srs=EPSG:3857&bbox={bbox-epsg-3857}'
            //     ],
            //     tileSize: 256,
            //     attribution: '&copy; <a href="https://www.chiangmai.ac.th/">Chiang Mai University</a>'
            // });

            // map.addLayer({
            //     id: 'cmu-wms-layer',
            //     type: 'raster',
            //     source: 'cmu-wms',
            //     paint: {
            //         'raster-opacity': 0.5
            //     }
            // });


            // add source overlay lines layer from http://localhost:8080/data/landuse.json
            // map.addSource('overlay-lines', {
            //     type: 'vector',
            //     url: 'http://localhost:8080/data/landuse.json'
            // });
            // map.addLayer({
            //     id: 'overlay-lines',
            //     type: 'line',
            //     source: 'overlay-lines',
            //     'source-layer': 'landuse',
            //     paint: {
            //         'line-color': '#0000FF',
            //         'line-width': 2,
            //         'line-opacity': 0.8
            //     }
            // });

            // add vector tile source from http://localhost:8080/data/landuse/{z}/{x}/{y}.pbf
            map.addSource('cmu-landuse', {
                type: 'vector',
                tiles: [
                    'http://localhost:8080/data/landuse/{z}/{x}/{y}.pbf'
                ],
                minzoom: 0,
                maxzoom: 14,
                attribution: '&copy; <a href="https://www.chiangmai.ac.th/">Chiang Mai University</a>'
            });
            // add vector tile layer
            map.addLayer({
                id: 'cmu-landuse',
                type: 'line',
                source: 'cmu-landuse',
                'source-layer': 'landuse',
                paint: {
                    'line-color': '#0000FF',
                    'line-width': 2,
                    'line-opacity': 0.8
                }
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