prefix=temp/LA
dest=build/LA.mbtles
outsize=12000

rm -f $prefix.tif
# EW: 3045984+2500000=5545984  5546 = 999.997115037865115 m/px
# NS: 9045984-3500000=5545984  5546 = 999.997115037865115 m/px
gdal_rasterize -ot Byte -a_ullr -2500000 9045984 3045984 3500000 -burn 0 -burn 0 -burn 0 -outsize $outsize $outsize -of GTiff $prefix.geojson $prefix.tif
gdal_rasterize -a g -b 2 $prefix.geojson $prefix.tif
gdal_rasterize -a b -b 3 $prefix.geojson $prefix.tif
gdal_edit.py -a_srs EPSG:3857 -a_ullr -20037508.34 20037508.34 20037508.34 -20037508.34 $prefix.tif 
gdal_translate  -co "ZOOM_LEVEL_STRATEGY=upper" -ot Byte -r nearest -of MBTILES -co RESAMPLING=NEAREST $prefix.tif $dest

sqlite3 $prefix.mbtiles "select zoom_level, count(*) from tiles GROUP BY zoom_level"
gdaladdo -r nearest $dest 2 4 8 16 32 64 128 256 512 1024 2048 4096
sqlite3 $prefix.mbtiles "select zoom_level, count(*) from tiles GROUP BY zoom_level"

#scp $prefix.mbtiles grunnkart@hydra:tilesdata/indexed/
#cp -u $prefix.mbtiles ../gis/tiny-tileserver/data 
