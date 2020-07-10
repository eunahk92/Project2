L.mapquest.key = "73YJDA218NrKCKrYr26MlqZldZPNKktE";

let pathArray = window.location.pathname.split("/");
let searchTerm = pathArray[pathArray.length - 1];
if (!searchTerm || isNaN(searchTerm)) {
  console.log('1')
  let arrayOfAddresses = [];
  $.ajax('/api/foodtrucks/', {
    type: "GET"
  }).then(result => {
    for (i = 0; i < result.length; i++) {
      let fullAddress =
        result[i].truck_name +
        ": " +
        result[i].street_address +
        ", " +
        result[i].city +
        ", " +
        result[i].state +
        " " +
        result[i].zipcode;
      arrayOfAddresses.push(fullAddress);
    }
    Promise.all(arrayOfAddresses)
      .then(() => L.mapquest.geocoding().geocode(arrayOfAddresses, createMap))
  });
} else {
  console.log('2')
  console.log(parseInt(searchTerm))
  getMap(parseInt(searchTerm))
}

function getMap(searchTerm) {
  let arrayOfAddresses = [];
  $.ajax("/api/foodtrucks", {
    type: "GET"
  }).then(result => {
    for (i = 0; i < result.length; i++) {
      if (result[i].CategoryId === searchTerm) {
        let fullAddress =
          result[i].truck_name +
          ": " +
          result[i].street_address +
          ", " +
          result[i].city +
          ", " +
          result[i].state +
          " " +
          result[i].zipcode;;
        arrayOfAddresses.push(fullAddress);
      }
    }
    Promise.all(arrayOfAddresses)
      .then(L.mapquest.geocoding().geocode(arrayOfAddresses, createMap))
  });
}

function createMap(error, response) {
  let map = L.mapquest.map("map", {
    layers: L.mapquest.tileLayer("map"),
    center: [0, 0],
    zoom: 30
  });

  map.addControl(L.mapquest.control({
    position: 'bottomleft'
  }));
  map.addControl(L.mapquest.geocodingControl({
    position: 'topleft'
  }));

  // const directionsControl = L.mapquest
  //   .directionsControl({
  //     className: "",
  //     directions: {
  //       options: {
  //         timeOverage: 25,
  //         doReverseGeocode: false
  //       }
  //     },
  //     directionsLayer: {
  //       startMarker: {
  //         title: "Drag to change location",
  //         draggable: true,
  //         icon: "marker-start",
  //         iconOptions: {
  //           size: "sm"
  //         }
  //       },
  //       endMarker: {
  //         draggable: true,
  //         title: "Drag to change location",
  //         icon: "marker-end",
  //         iconOptions: {
  //           size: "sm"
  //         }
  //       },
  //       viaMarker: {
  //         title: "Drag to change route"
  //       },
  //       routeRibbon: {
  //         showTraffic: true
  //       },
  //       alternateRouteRibbon: {
  //         showTraffic: true
  //       },
  //       paddingTopLeft: [20, 20],
  //       paddingBottomRight: [20, 20]
  //     },
  //     startInput: {
  //       compactResults: true,
  //       disabled: false,
  //       location: {},
  //       placeholderText: "Starting point or click on the map...",
  //       geolocation: {
  //         enabled: true
  //       },
  //       clearTitle: "Remove starting point"
  //     },
  //     endInput: {
  //       compactResults: true,
  //       disabled: false,
  //       location: {},
  //       placeholderText: "Destination",
  //       geolocation: {
  //         enabled: true
  //       },
  //       clearTitle: "Remove this destination"
  //     },
  //     addDestinationButton: {
  //       enabled: true,
  //       maxLocations: 10
  //     },
  //     routeTypeButtons: {
  //       enabled: true
  //     },
  //     reverseButton: {
  //       enabled: true
  //     },
  //     optionsButton: {
  //       enabled: true
  //     },
  //     routeSummary: {
  //       enabled: true,
  //       compactResults: false
  //     },
  //     narrativeControl: {
  //       enabled: true,
  //       compactResults: false,
  //       interactive: true
  //     }
  //   })
  //   .addTo(map);

  L.marker([0, 0], {
    icon: L.mapquest.icons.marker({
      primaryColor: '#22407F',
      secondaryColor: '#3B5998',
      shadow: true,
      size: 'md',
      symbol: 'A'
    })
  });

  map.on(L.Draw.Event.CREATED, event => {
    const layer = event.layer;

    drawnItems.addLayer(layer);
  });


  const featureGroup = generateMarkersFeatureGroup(response);

  featureGroup.addTo(map);
  map.fitBounds(featureGroup.getBounds());
}

function generateMarkersFeatureGroup(response) {
  const group = [];
  for (let i = 0; i < response.results.length; i++) {
    const location = response.results[i].locations[0];
    const locationLatLng = location.latLng;

    const marker = L.marker(locationLatLng, {
      icon: L.mapquest.icons.marker()
    }).bindPopup(
      response.results[i].providedLocation.street
    );

    group.push(marker);
  }
  return L.featureGroup(group);
}
