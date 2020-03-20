const fs = require("fs");

const json = read("temp/landskap_32633.geojson", "S_kode");
console.log("Mapping to GeoJSON");
fs.writeFileSync("build/polygon.32633.geojson", JSON.stringify(json));

function read(fn) {
    const json = JSON.parse(fs.readFileSync(fn));
    json.features.forEach(f => {
        f.geometry.coordinates = floatToInt(f.geometry.coordinates)
        map(f.properties)
    });
    return json;
}

function floatToInt(geom) {
    if (!Array.isArray(geom)) return Math.round(geom)
    geom = geom.map(e => floatToInt(e))
    return geom
}

function map(props) {
    props.kode = fixKode(props.S_kode)
    props.KLG_RE_ID = props.KLG_RE_ID_
    delete props.KLG_RE_ID_
    delete props.S_kode
    delete props.Shape_Leng
    delete props.Shape_Area
    delete props.UID_GT
    delete props.Nivå
    delete props.Pred_Lnr
}

function fixKode(kode) {
    kode = kode.replace('LA-', 'LA-TI-')
    if (kode.length < 8) return kode;
    if (kode[7] == "-") return kode;
    return kode.substring(0, 7) + "-" + kode.substring(7);
}

