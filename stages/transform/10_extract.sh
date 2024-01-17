echo "Extract from source archive"
cd temp
tar -zxvf ../kildedata/Landskap.tar.gz 
echo "Convert to UTM GeoJSON"
ogr2ogr -t_srs EPSG:32633 -f GeoJSON landskap_32633.geojson NIN_LA_HT_GT.shp 
cd ..