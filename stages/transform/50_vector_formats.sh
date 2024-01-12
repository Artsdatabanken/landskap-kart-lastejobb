#!/bin/bash
set -e
mkdir -p build
cd build
ogr2ogr -f GML polygon.32633.gml polygon.32633.geojson
ogr2ogr polygon.32633.spatialite.sqlite polygon.32633.geojson
ogr2ogr -t_srs EPSG:4326 polygon.4326.geojson polygon.32633.geojson
ogr2ogr -f GPKG polygon.32633.gpkg polygon.32633.geojson
