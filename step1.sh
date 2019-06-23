echo "Extract from source archive"
tar --directory=kildedata -zxvf kildedata/Landskap.tar.gz 
echo "Convert to UTM GeoJSON"
ogr2ogr -t_srs EPSG:32633 -f GeoJSON temp/landskap_32633.geojson kildedata/NIN_LA_HT_GT.shp 
