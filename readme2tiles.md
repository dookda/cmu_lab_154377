Here are two common ways to turn a Shapefile into a tile layer you can load in MapLibre (or any Leaflet/Mapbox-style map):

1. **Vector tiles via Tippecanoe → MBTiles → Tile Server**
2. **Raster (or Vector) tiles via GeoServer → WMTS/XYZ**

---

## 1. Vector-Tile Workflow (Tippecanoe + Tileserver)

### 1.1 Install prerequisites

```bash
# GDAL (for converting Shapefile → GeoJSON)
# macOS (Homebrew):
brew install gdal

# Ubuntu/Debian:
sudo apt-get update
sudo apt-get install -y gdal-bin

# Tippecanoe (from Mapbox)
# macOS (Homebrew):
brew install tippecanoe

# Ubuntu/Debian:
git clone https://github.com/mapbox/tippecanoe.git
cd tippecanoe
make -j && sudo make install
```

### 1.2 Convert Shapefile → GeoJSON

```bash
ogr2ogr -f GeoJSON -t_srs EPSG:4326 output.geojson input.shp
```

* `-t_srs EPSG:4326` ensures latitude/longitude coordinates.

### 1.3 (Optional) Simplify or filter

To reduce size or zoom-range, you can pre-filter features:

```bash
# keep only features where “population” > 1000
ogr2ogr -where "population>1000" filtered.geojson output.geojson
```

### 1.4 Generate an MBTiles vector‐tile bundle

```bash
tippecanoe \
  -o tiles.mbtiles \        # output file
  -zg \                     # zoom levels based on data extent
  --drop-densest-as-needed \# automatic simplification to meet tile size
  --extend-zooms-if-still-dropping \ 
  filtered.geojson
```

This creates `tiles.mbtiles`, containing vector tiles at multiple zoom levels.

### 1.5 Serve your MBTiles

#### Option A. TileServer-GL (Node.js)

```bash
npm install -g tileserver-gl
tileserver-gl tiles.mbtiles
# opens http://localhost:8080; vector-tile endpoint:
# http://localhost:8080/data/tiles/{z}/{x}/{y}.pbf
```

#### Option B. tileserver-php

```bash
git clone https://github.com/klokantech/tileserver-php.git
# copy tiles.mbtiles into tileserver-php root
php -S localhost:8000
# vector-tile URL: http://localhost:8000/tileserver.php?/tiles.mbtiles/{z}/{x}/{y}.pbf
```

### 1.6 Add as a MapLibre source & layer

```js
const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      mytiles: {
        type: 'vector',
        tiles: ['http://localhost:8080/data/tiles/{z}/{x}/{y}.pbf'],
        minzoom: 0,
        maxzoom: 14
      }
    },
    layers: [
      {
        id: 'my-fill',
        type: 'fill',
        source: 'mytiles',
        'source-layer': 'filtered', // layer name inside your GeoJSON
        paint: {
          'fill-color': '#88c',
          'fill-opacity': 0.6
        }
      }
    ]
  },
  center: [100.5, 13.75],
  zoom: 6
});
```

---

## 2. Raster-Tile or Vector-Tile via GeoServer

### 2.1 Install & run GeoServer

Download from [https://geoserver.org](https://geoserver.org) and unzip, then:

```bash
cd geoserver-<version>/bin
./startup.sh      # Linux/macOS
# or startup.bat for Windows
```

Access [http://localhost:8080/geoserver](http://localhost:8080/geoserver)

### 2.2 Add your Shapefile as a Store

1. Log in (default `admin`/`geoserver`).
2. **“Data” → “Adds new Store” → “Shapefile”**.
3. Upload your `.shp,.dbf,.shx` pack.
4. Publish it as a **Layer**.

### 2.3 Enable WMTS or XYZ tiles

* Under your layer’s **Publishing** tab, enable **WMTS** or **Tile Caching** via GeoWebCache.
* You’ll then get URLs like

  ```
  /geoserver/gwc/service/wmts
  or
  /geoserver/gwc/service/tms/1.0.0/<workspace>:<layer>@EPSG:3857@png/{z}/{x}/{y}.png
  ```

### 2.4 Use in MapLibre (Raster)

```js
map.addSource('raster-tiles', {
  type: 'raster',
  tiles: [
    'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/workspace:layer@EPSG:3857@png/{z}/{x}/{y}.png'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'raster-layer',
  type: 'raster',
  source: 'raster-tiles'
});
```

---

## Tips & Best Practices

* **Always reproject** to Web Mercator (EPSG:3857) or WGS84 (EPSG:4326) as your tile server expects.
* **Simplify data** if it’s complex—Tippecanoe’s `--drop-densest-as-needed` helps.
* **Use metadata** in Tippecanoe (e.g. `--name=… --description=…`) so your tileserver can show layer info.
* **Version control** your MBTiles and style definitions in Git, and tag releases.
* For large datasets, consider a **PostGIS→Tegola** or **PostGIS→TileServer** stack to render on the fly.

---

With these workflows, you can take any Shapefile, turn it into vector or raster tiles, host them locally (or in the cloud), and then simply point your MapLibre map at that endpoint to display your data as a tiled layer.
