/* Michael Schonhardt, Projekt BDD, m.schonhardtATuni-kassel.de
Laden der Handschriften Koordinaten, besser in eigenes js file, da sonst escapes benutzt werden müssen */

// Abfragen der Daten aus collection



$(document).ready(function () {
  const xmldata = document.createElement('data')
  async function fetchDataAndPopulateData() {
      const list_ms = ["B", "F", "K", "V1", "V2"]
      for (var ms in list_ms){
          const folderPath = '../data/mss/' + list_ms[ms] + '/Tei/v1'; // Update this with your XML folder path
          const response = await fetch(folderPath + '/msdesc.xml'); // Fetch the XML file
          if (response.ok) {
              const xmlText = await response.text();
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
              xmldata.appendChild(xmlDoc.querySelectorAll("msDesc")[0])
          }
        }
      parseXml(xmldata)
    }
    fetchDataAndPopulateData()
});

// parseXml zum parsen der Daten nach Abfrag

// Farben der Marker (https://github.com/pointhi/leaflet-color-markers) nach HS Gruppen

// A
var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// B - German Group
var goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// B - Early Lombard-Burgundian Group
var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// B - Italian Main Group
var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// no type
var greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//Cluster Gruppe erstellen
var clusterGroup = L.markerClusterGroup().addTo(mymap);

// Erstellen von Gruppen "Bibliothek" und "Herkunft", prüfen der Gruppenzugehörigkeit und Zuteilen einer Frabe
function parseXml (xml) {
  var color = "";

  // Bibliothek
  var libraryList =[];
  // Hier muss statt msIdentifier msDesc genommen werden, damit alle Infos ausgelesen werdenkönnen. Irgendwie mit der doppelten geo in Einklang bringen
  $(xml).find("msDesc").each(function(){
    var name = $(this).find("msName");
    name = name[0].innerHTML;
    //console.log(name);
    var origPlace = $(this).find("origPlace").text();
    origPlace = origPlace.split(/(\d+)/)[0];
    //console.log(origPlace)
    var origDate = $(this).find("origDate").text();
    var geodata = $(this).find("geo");
    geodata = geodata[0].textContent.split(",");


    // Prüfen der Familienzugehörigkeit und Zuteilung der Farbe
    $(this).find("note").each(function() {
      if ($(this).text().indexOf('Order of Worms, Type A.') != -1) { //it should be Wormser Ordnung A
        color = blueIcon;
      } else if ($(this).text().indexOf('Wormser Ordnung B') != -1) {
        color = goldIcon;
      } else if ($(this).text().indexOf('Early Lombard-Burgundian Codices') != -1) {
        color = yellowIcon;
      } else if ($(this).text().indexOf('Order of Worms, Type B (Italian Main Group of Manuscripts)') != -1) {
        color = orangeIcon;
      }
    });
    
    // Bildung von Markergruppe
    if (color){
            mapPoint = L.marker([geodata[0].trim(),geodata[1].trim()],{icon: color}).bindPopup('<b>'+name+'</b><br>Entstehungsort: '+origPlace+'<br>Entstehungszeit: '+origDate);
    }
    else{
            mapPoint = L.marker([geodata[0].trim(),geodata[1].trim()],{icon: greyIcon}).bindPopup('<b>'+name+'</b><br>Entstehungsort: '+origPlace+'<br>Entstehungszeit: '+origDate);
    }
    libraryList.push(mapPoint);
  });

  // Übergabe an Gruppenlayer
  var libraryMarkers = L.featureGroup.subGroup(clusterGroup);
  for (var i = 0; i < libraryList.length; i++) {
      var currentLibrary = libraryList[i];
      currentLibrary.addTo(libraryMarkers);
  }


  // Herkunft
  var provenanceList =[];
  var geodata="";
  $(xml).find("msDesc").each(function() {
    var origPlace = $(this).find("origPlace").text();
    origPlace = origPlace.split(/(\d+)/)[0];
var origDate = $(this).find("origDate").text();
    var name = $(this).find("msName");
    name = name[0].innerHTML;
    var geodata = $(this).find("geo");
    console.log(geodata);
    geodata = geodata[1].textContent.split(",");

    // Prüfen der Familienzugehörigkeit und Zuteilung der Farbe
    $(this).find("note").each(function() {
      if ($(this).text().indexOf('Order of Worms, Type A.') != -1) {
        color = blueIcon;
      } else if ($(this).text().indexOf('Wormser Ordnung B') != -1) {
        color = goldIcon;
      } else if ($(this).text().indexOf('Early Lombard-Burgundian Codices') != -1) {
        color = yellowIcon;
      } else if ($(this).text().indexOf('Order of Worms, Type B (Italian Main Group of Manuscripts)') != -1) {
        color = orangeIcon;
      }
    });

    // Bildung von Markergruppe
    mapPoint = L.marker([geodata[0].trim(),geodata[1].trim()],{icon: color}).bindPopup('<b>'+name+'</b><br>Entstehungsort: '+origPlace+'<br>Entstehungszeit: '+origDate);
    provenanceList.push(mapPoint);
  });

  // Übergabe an Gruppenlayer
  var provenanceMarkers = L.featureGroup.subGroup(clusterGroup);
  for (var n = 0; n < provenanceList.length; n++) {
      var currentProvenance = provenanceList[n];
      currentProvenance.addTo(provenanceMarkers);
  }

  // Bildung der Layer
  var overlayMaps = {
    "Aufbewahrungsort": libraryMarkers,
    "Entstehungsort": provenanceMarkers
  };

  // Erstellung der Layercontroll
  L.control.layers(overlayMaps).addTo(mymap);
  libraryMarkers.addTo(mymap);
}
