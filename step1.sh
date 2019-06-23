mkdir temp
tar --directory=kildedata -zxvf kildedata/Landskap.tar.gz 
ogr2ogr -t_srs EPSG:32633 -f GeoJSON temp/landskap_32633.geojson kildedata/NIN_LA_HT_GT.shp 
