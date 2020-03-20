const fs = require("fs");

const json = read("build/polygon.32633.geojson", "kode");
console.log("Mapping type codes to RGB properties");
convert("temp/LA");

function read(fn, kodeAttributt) {
  const json = JSON.parse(fs.readFileSync(fn));
  json.features.forEach(f => {
    const kode = f.properties[kodeAttributt]
    f.properties = { kode: kode };
    f.geometry.coordinates.forEach(geom => )
  });
  return json;
}

function convert(baseName) {
  const keys = {};
  let watermark = 1;

  json.features.forEach(f => {
    const kode = f.properties.kode;
    if (!keys[kode]) {
      keys[kode] = watermark;
      watermark++;
    }
    const farge = keys[kode];
    f.properties.g = farge >> 8;
    f.properties.b = farge & 255;
  });

  fs.writeFileSync("build/LA_colors.json", JSON.stringify(keys));
  fs.writeFileSync(baseName + ".geojson", JSON.stringify(json));
}
