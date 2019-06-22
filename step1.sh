mkdir build
ogr2ogr -t_srs EPSG:32633 -f GeoJSON build/landskap.geojson kildedata/landskap.shp 
ogr2ogr -t_srs EPSG:32633 -f GeoJSON build/marint.geojson kildedata/marint.shp 
