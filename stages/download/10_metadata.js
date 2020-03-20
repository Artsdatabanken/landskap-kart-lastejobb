const { http } = require("lastejobb");

const url = "https://data.artsdatabanken.no/Natur_i_Norge/Landskap/metadata_med_undertyper.json"
http.downloadJson(url, 'metadata.json')
