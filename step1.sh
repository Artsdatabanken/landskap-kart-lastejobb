mkdir data
ogr2ogr -t_srs EPSG:32633 -f GeoJSON data/landskap.geojson kildedata/landskap.shp 
ogr2ogr -t_srs EPSG:32633 -f GeoJSON data/marint.geojson kildedata/marint.shp 
