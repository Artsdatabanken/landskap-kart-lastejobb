const { io, json } = require('@artsdatabanken/lastejobb')
const fs = require("fs");

var meta = io.lesTempJson('metadata.json')
meta = json.arrayToObject(meta.items, { uniqueKey: "kode" })
const geojson = read("temp/landskap_32633.geojson", "S_kode");
geojson.name = "NiN Landskap"
console.log("Mapping to GeoJSON");
//fs.writeFileSync("build/polygon.32633.geojson", JSON.stringify(geojson));
io.skrivBuildfil("polygon.32633.geojson", geojson)

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
    const metadata = meta["NN-" + props.kode]
    props.navn = metadata.tittel.nb
    props.grunntype = props["GT_nr"]
    delete props["GT_nr"]
    props.hovedtype = props.HT[1]
    delete props.HT
    props.hovedtypegruppe = props.HTG
    delete props.HTG
    props.arealbrukspreg = metadata.flagg["NN-LA-TI-AP-AL"] ? 1 : 0
    // TODO:     if (props.Arealbrukspreg != props.Naturlands) debugger
    delete props.Naturlands
    delete props.Navn
    delete props.KLG_RE_ID_
    delete props.S_kode
    delete props.Shape_Leng
    delete props.Shape_Area
    delete props.UID_GT
    delete props.Nivå
    delete props.Pred_Lnr
    const klger = ["AI", "AI_KS", "BP", "IP", "IYK", "JP", "KA", "RE_IA", "RE_ID", "RE_KS", "VE", "VP"]
    for (var k of klger)
        klg(props, "KLG_" + k)
}

function klg(props, srcKey) {
    const destKey = srcKey.toLowerCase()
    var value = props[srcKey]
    if (value !== "NA") value = parseInt(value)
    props[destKey] = value
    delete props[srcKey]
}

function fixKode(kode) {
    kode = kode.replace('LA-', 'LA-TI-')
    if (kode.length < 8) return kode;
    if (kode[7] == "-") return kode;
    return kode.substring(0, 7) + "-" + kode.substring(7);
}

