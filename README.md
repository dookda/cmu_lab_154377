# cmu_lab_154377

```bash
# install tileserver-gl-light
npm install -g tileserver-gl-light

# install tippecanoe 
brew install tippecanoe

# install ogr2ogr
brew install gdal

# convert overlay.gpkg to GeoJSON and create mbtiles
ogr2ogr -f GeoJSON overlay.geojson overlay.gpkg
ogr2ogr -f GeoJSON -t_srs EPSG:4326 overlay.geojson \
    -dialect SQLite -sql "SELECT * FROM overlay WHERE geometry_type IN ('Point', 'LineString')" \
    -where "geometry_type IN ('Point', 'LineString')" overlay.gpkg
ogr2ogr -f GeoJSON -t_srs EPSG:4326 overlay.geojson overlay.geojson

# create GeoJSON from PostGIS database
ogr2ogr -f GeoJSON -t_srs EPSG:4326 overlay.geojson \
    PG:"host=localhost user=postgres dbname=cmu_lab_154377 password=your_password" \
    -dialect SQLite -sql "SELECT * FROM overlay WHERE geometry_type IN ('Point', 'LineString')" \
    -where "geometry_type IN ('Point', 'LineString')"

# create GeoJSON from Shapefile
ogr2ogr -f GeoJSON overlay.geojson overlay.shp -t_srs EPSG:4326  

# create mbtiles from GeoJSON with zoom levels
ogr2ogr -f MBTILES overlay.mbtiles overlay.geojson -dsco TILE_FORMAT=PNG -dsco MAXZOOM=18 -dsco MINZOOM=0   

# convert GeoJSON to mbtiles
tippecanoe -o overlay.mbtiles -Z0 -z18 --drop-densest-as-needed overlay.geojson

# convert raster to mbtiles
tippecanoe -o raster.mbtiles -Z0 -z18 --drop-densest-as-needed raster.tif

# serve mbtiles with tileserver-gl-light
tileserver-gl-light overlay.mbtiles --no-cors