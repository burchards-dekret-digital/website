$(document).ready(function () {

  const xmldata = document.createElement('data');


async function fetchDataAndPopulateData() {
  const list_ms = window.BDD_MSS || [];

  for (const ms of list_ms) {
    const url = (window.BDD_PATHS && typeof window.BDD_PATHS.msdesc === "function")
    ? window.BDD_PATHS.msdesc(ms)   // canonical default
    : (`../data/mss/${(ms.folder || ms.sigle)}/Tei/v1/${(ms.msdescFile || "msdesc.xml")}`);


    const response = await fetch(url, { cache: "no-cache" });
    if (response.ok) {
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const msDesc = xmlDoc.querySelector("msDesc");
      if (msDesc) xmldata.appendChild(msDesc);
    } else {
      console.warn("Map: failed to fetch", url, response.status);
    }
  }

  parseXml(xmldata);
}
fetchDataAndPopulateData();
});


// ICON (different colours for manuscript type)

var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// Select colour based on <msDesc type="">
function iconForType(type) {
  if (!type) return greyIcon;

  type = type.trim().toLowerCase();
  if (type === "full") return blueIcon;
  if (type === "fragment") return orangeIcon;
  if (type === "excerpt") return yellowIcon;
  if (type === "separate-transmission") return violetIcon;

  return greyIcon; // default fallback
}


// MAP CLUSTER GROUP
var clusterGroup = L.markerClusterGroup().addTo(mymap);

// arrays storing all markers, used for filtering by type
var allLibraryMarkers = [];
var allProvenanceMarkers = [];


// PARSE XML AND CREATE MARKERS
function parseXml(xml) {

  // STORAGE LOCATION (Bibliothek)
  var libraryList = [];

  $(xml).find("msDesc").each(function () {

    var msType = $(this).attr("type");  // <msDesc type="">
    var color = iconForType(msType);

    var name = $(this).find("msName")[0].innerHTML;
    var sigle = $(this).find('msName[type="sigle"]')[0].innerHTML;
    var origPlace = $(this).find("origPlace").text().split(/(\d+)/)[0];
    var origDate = $(this).find("origDate").text();

    var geodata = $(this).find("geo");
    geodata = geodata[0].textContent.split(",");

    var msObj = (typeof getMsBySigle === "function") ? getMsBySigle(sigle) : null;
    var isCore = msObj && msObj.kind === "core";

    var popupContent = "<b>";
    if (isCore) {
        popupContent += '<a href="ms-item.html?document=' + sigle + '">' + name + "</a>";
      } else {
        popupContent += name;
      }

    popupContent += "</b><br>";

    /* Temporarily hide Sigle in popup*/
    /*if ($(this).find('msName[type="sigle"]').length > 0) {
      popupContent += '<span lang="de">Sigle</span><span lang="en">Sigle</span>: ' +
                      sigle + "<br>";
    }*/

    if (isCore) {
      popupContent += '<span lang="de">Entstehungsort</span><span lang="en">Place of origin</span>: ' +
                      origPlace + "<br>";
    }

    popupContent += '<span lang="de">Entstehungszeit</span><span lang="en">Period of origin</span>: ' +
                    origDate;

    //store msType on the marker
    var mapPoint =
      L.marker([geodata[0].trim(), geodata[1].trim()], { icon: color });
    mapPoint.msType = (msType || "not-specified").trim().toLowerCase();
    mapPoint.bindPopup(popupContent);
    
    libraryList.push(mapPoint);
  });

  var libraryMarkers = L.featureGroup.subGroup(clusterGroup);
  libraryList.forEach(marker => marker.addTo(libraryMarkers));

  //keep a copy for filtering
  allLibraryMarkers = libraryList.slice();


  // ORIGIN (Herkunft)
  var provenanceList = [];

  $(xml).find("msDesc").each(function () {

    var msType = $(this).attr("type");
    var color = iconForType(msType);

    var name = $(this).find("msName")[0].innerHTML;
    var sigle = $(this).find('msName[type="sigle"]')[0].innerHTML;
    var origPlace = $(this).find("origPlace").text().split(/(\d+)/)[0];
    var origDate = $(this).find("origDate").text();

    var geodata = $(this).find("geo");

    // origin = second <geo>
    if (geodata.length > 1) {

      var coords = geodata[1].textContent.split(",");

      var msObj = (typeof getMsBySigle === "function") ? getMsBySigle(sigle) : null;
      var isCore = msObj && msObj.kind === "core";


      var popupContent = "<b>";
     if (isCore) {
        popupContent += '<a href="ms-item.html?document=' + sigle + '">' + name + "</a>";
      } else {
        popupContent += name;
      }

      popupContent += "</b><br>";

      /* Temporarily hide Sigle in popup*/
      /*if ($(this).find('msName[type="sigle"]').length > 0) {
        popupContent += '<span lang="de">Sigle</span><span lang="en">Sigle</span>: ' +
                        sigle + "<br>";
      }*/

      if (isCore) {
        popupContent += '<span lang="de">Entstehungsort</span><span lang="en">Place of origin</span>: ' +
                        origPlace + "<br>";
      }

      popupContent += '<span lang="de">Entstehungszeit</span><span lang="en">Period of origin</span>: ' +
                      origDate;

      //store msType on the marker
      var mapPoint =
        L.marker([coords[0].trim(), coords[1].trim()], { icon: color });
      mapPoint.msType = (msType || "not-specified").trim().toLowerCase();
      mapPoint.bindPopup(popupContent);

      provenanceList.push(mapPoint);
    }
  });

  var provenanceMarkers = L.featureGroup.subGroup(clusterGroup);
  provenanceList.forEach(marker => marker.addTo(provenanceMarkers));

  //keep a copy for filtering
  allProvenanceMarkers = provenanceList.slice();


  // LAYER CONTROL
  var overlayMaps = {
    "<span lang='de'>Aufbewahrungsort</span><span lang='en'>Storage location</span>": libraryMarkers,
    "<span lang='de'>Entstehungsort</span><span lang='en'>Place of origin</span>": provenanceMarkers
  };

  L.control.layers(overlayMaps).addTo(mymap);
  mymap.on('layeradd', function () { checkLanguage(); });

  libraryMarkers.addTo(mymap); // default view



  //LEGEND
  const legendHTML = `
    <h4 class="fw-bold mb-2">
        <span lang="de">Handschriftentyp</span>
        <span lang="en">Manuscript Type</span>
    </h4>

    <div class="d-flex align-items-center mb-2">
      <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png" width="18" height="28" class="me-2">
      <span lang="de">Vollständige Handschrift</span>
      <span lang="en">Full manuscript</span>
    </div>

    <div class="d-flex align-items-center mb-2">
      <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" width="18" height="28" class="me-2">
      <span lang="de">Fragment</span>
      <span lang="en">Fragment</span>
    </div>

    <div class="d-flex align-items-center mb-2">
      <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png" width="18" height="28" class="me-2">
      <span lang="de">Exzerpt</span>
      <span lang="en">Excerpt</span>
    </div>

    <div class="d-flex align-items-center mb-2">
      <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png" width="18" height="28" class="me-2">
      <span lang="de">Seperatüberlieferung</span>
      <span lang="en">Separate transmission</span>
    </div>

    
  `;

  /*<div class="d-flex align-items-center">
      <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png" width="18" height="28" class="me-2">
      <span lang="de">Nicht angegeben</span>
      <span lang="en">Not specified</span>
    </div> */

  document.getElementById("map-legend-outside").innerHTML = legendHTML;
  checkLanguage();


  // FILTER FUNCTION: show only selected manuscript type
  window.applyTypeFilter = function(type) {
    // type: "all", "full", "fragment", "excerpt", "separate-transmission", "not-specified"

    function markerMatches(marker, type) {
      if (type === "all") return true;

      var mType = (marker.msType || "not-specified").toLowerCase();

      // normalize "not specified"
      if (!mType || mType === "") {
        mType = "not-specified";
      }

      return mType === type;
    }

    // Clear both subgroups and re-add only markers of the selected type
    libraryMarkers.clearLayers();
    provenanceMarkers.clearLayers();

    allLibraryMarkers.forEach(function(marker) {
      if (markerMatches(marker, type)) {
        libraryMarkers.addLayer(marker);
      }
    });

    allProvenanceMarkers.forEach(function(marker) {
      if (markerMatches(marker, type)) {
        provenanceMarkers.addLayer(marker);
      }
    });
  };
}
