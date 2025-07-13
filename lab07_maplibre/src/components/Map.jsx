import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';


export default function Map() {
    const mapContainer = useRef(null)
    const mapRef = useRef(null)

    const mapboxAccessToken = 'pk.eyJ1IjoiZG9va2RhIiwiYSI6ImNsbHNxMHl1YjE3NmkzY3FpbzZ4amw0eDIifQ.3ssUxVdXm-vI7iOJgNzwIw';

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,

            // osm style
            // style: 'https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json',

            // ESRI style
            // style: 'https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/arcgis_hybrid.json',

            // cartocdn style
            // style: 'https://basemaps.cartocdn.com/gl/voyager-gl
            // style: 'https://demotiles.maplibre.org/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/light-matter-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',

            // maptiler style
            // style: 'https://api.maptiler.com/maps/streets/style.json?key=QcH5sAeCUv5rMXKrnJms',
            // style: 'https://api.maptiler.com/maps/bright/style.json?key=QcH5sAeCUv5rMXKrnJms',
            // style: 'https://api.maptiler.com/maps/darkmatter/style.json?key=QcH5sAeCUv5rMXKrnJms',
            // style: 'https://api.maptiler.com/maps/positron/style.json?key=QcH5sAeCUv5rMXKrnJms',
            // style: 'https://api.maptiler.com/maps/hybrid/style.json?key=QcH5sAeCUv5rMXKrnJms',
            // style: 'https://api.maptiler.com/maps/satellite/style.json?key=QcH5sAeCUv5rMXKrnJms',

            // style: {
            //     version: 8,
            //     sources: {},
            //     layers: [
            //         {
            //             id: 'background',
            //             type: 'background',
            //             paint: {
            //                 'background-color': '#ff00ff'
            //             }
            //         }
            //     ]
            // },

            // add mapbox style 2.5 d



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
            // new maplibregl.Marker()
            //     .setLngLat([98.95028216958734, 18.802614467416145])
            //     .setPopup(new maplibregl.Popup().setHTML('CMU'))
            //     .addTo(map);

            // add source overlay layer from geojson
            // map.addSource('overlay-points', {
            //     type: 'geojson',
            //     data: {
            //         type: 'FeatureCollection',
            //         features: [{
            //             type: 'Feature',
            //             geometry: {
            //                 type: 'Point',
            //                 coordinates: [98.95482935430704, 18.80377569858811]
            //             },
            //             properties: {
            //                 title: 'CMU',
            //                 description: 'Chiang Mai University'
            //             }
            //         }, {
            //             type: 'Feature',
            //             geometry: {
            //                 type: 'Point',
            //                 coordinates: [98.95182386943839, 18.800535923885263]
            //             },
            //             properties: {
            //                 title: 'CMU Library',
            //                 description: 'Chiang Mai University Library'
            //             }
            //         }, {
            //             type: 'Feature',
            //             geometry: {
            //                 type: 'Point',
            //                 coordinates: [98.9554349611185, 18.799386068791478]
            //             },
            //             properties: {
            //                 title: 'CMU Hospital',
            //                 description: 'Chiang Mai University Hospital'
            //             }
            //         }]
            //     }
            // });

            // add overlay points layer
            // map.addLayer({
            //     id: 'overlay-points',
            //     type: 'circle',
            //     source: 'overlay-points',
            //     paint: {
            //         'circle-radius': 8,
            //         'circle-color': '#FF0000',
            //         'circle-opacity': 0.8
            //     }
            // });

            // add wms source
            // map.addSource('cmu-wms', {
            //     type: 'raster',
            //     tiles: [
            //         'http://localhost:8081/geoserver/cm/ows?' +
            //         'service=WMS&version=1.1.0&request=GetMap&layers=cm:cm_dwr_amphoe_4326' +
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
            // map.addSource('cmu-landuse', {
            //     type: 'vector',
            //     tiles: [
            //         'http://localhost:8080/data/landuse/{z}/{x}/{y}.pbf'
            //     ],
            //     minzoom: 0,
            //     maxzoom: 14,
            //     attribution: '&copy; <a href="https://www.chiangmai.ac.th/">Chiang Mai University</a>'
            // });
            // map.addLayer({
            //     id: 'cmu-landuse',
            //     type: 'line',
            //     source: 'cmu-landuse',
            //     'source-layer': 'landuse',
            //     paint: {
            //         'line-color': '#0000FF',
            //         'line-width': 2,
            //         'line-opacity': 0.8
            //     }
            // });

            // add xyz tiles from google maps
            // map.addSource('google-maps', {
            //     type: 'raster',
            //     tiles: [
            //         'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
            //     ],
            //     tileSize: 256,
            //     attribution: '&copy; <a href="https://www.google.com/maps">  Google Maps</a>'
            // });
            // map.addLayer({
            //     id: 'google-maps-layer',
            //     type: 'raster',
            //     source: 'google-maps',
            //     paint: {
            //         'raster-opacity': 1.0
            //     }
            // });

            // add xyz tiles from google satellite
            // map.addSource('google-satellite', {
            //     type: 'raster',
            //     tiles: [
            //         'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            //     ],
            //     tileSize: 256,
            //     attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            // });
            // map.addLayer({
            //     id: 'google-satellite-layer',
            //     type: 'raster',
            //     source: 'google-satellite',
            //     paint: {
            //         'raster-opacity': 1.0
            //     }
            // });

            // add xyz tiles from mapbox
            // map.addSource('mapbox-satellite', {
            //     type: 'raster',
            //     tiles: ['https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken],
            //     tileSize: 256,
            //     attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            // });
            // map.addLayer({
            //     id: 'mapbox-satellite-layer',
            //     type: 'raster',
            //     source: 'mapbox-satellite',
            //     paint: {
            //         'raster-opacity': 1.0
            //     }
            // });


            // add mapbox style source 
            // map.addSource('mapbox-streets', {
            //     type: 'vector',
            //     url: 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8.json?access_token=' + mapboxAccessToken,
            //     attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            // });
            // map.addLayer({
            //     id: 'mapbox-streets-layer',
            //     type: 'line',
            //     source: 'mapbox-streets',
            //     'source-layer': 'water',
            //     paint: {
            //         'line-color': '#0000FF',
            //         'line-width': 2,
            //         'line-opacity': 0.8
            //     }
            // });

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