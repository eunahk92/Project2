/* eslint-disable prefer-const */
L.mapquest.key = "73YJDA218NrKCKrYr26MlqZldZPNKktE";

$(".button").on("click", () => {
  init();
});

init();

function init() {
  let searchTerm = this.id;
  let arrayOfAddresses = [];
  let truckNameArray = [];
  $.ajax("/api/foodtrucks", {
    type: "GET"
  }).then(result => {
    console.log(result);
    for (i = 0; i < result.length; i++) {
      if (result[i].id === searchTerm) {
        let fullAddress =
          result[i].street_address +
          ", " +
          result[i].city +
          ", " +
          result[i].state +
          " " +
          result[i].zipcode;
        let truckName = result[i].trucker_name;
        truckNameArray.push(truckName);
        arrayOfAddresses.push(fullAddress);
      }
    }
    Promise.all(arrayOfAddresses)
      .then(runMapquest(arrayOfAddresses))
      .then(console.log(truckNameArray));
  });
}

function runMapquest(arrayOfAddresses) {
  L.mapquest.geocoding().geocode(arrayOfAddresses, createMap);
}

function createMap(error, response) {
  const map = L.mapquest.map("map", {
    layers: L.mapquest.tileLayer("map"),
    center: [0, 0],
    zoom: 30
  });

  // eslint-disable-next-line no-unused-vars
  const directionsControl = L.mapquest
    .directionsControl({
      className: "",
      directions: {
        options: {
          timeOverage: 25,
          doReverseGeocode: false
        }
      },
      directionsLayer: {
        startMarker: {
          title: "Drag to change location",
          draggable: true,
          icon: "marker-start",
          iconOptions: {
            size: "sm"
          }
        },
        endMarker: {
          draggable: true,
          title: "Drag to change location",
          icon: "marker-end",
          iconOptions: {
            size: "sm"
          }
        },
        viaMarker: {
          title: "Drag to change route"
        },
        routeRibbon: {
          showTraffic: true
        },
        alternateRouteRibbon: {
          showTraffic: true
        },
        paddingTopLeft: [20, 20],
        paddingBottomRight: [20, 20]
      },
      startInput: {
        compactResults: true,
        disabled: false,
        location: {},
        placeholderText: "Starting point or click on the map...",
        geolocation: {
          enabled: true
        },
        clearTitle: "Remove starting point"
      },
      endInput: {
        compactResults: true,
        disabled: false,
        location: {},
        placeholderText: "Destination",
        geolocation: {
          enabled: true
        },
        clearTitle: "Remove this destination"
      },
      addDestinationButton: {
        enabled: true,
        maxLocations: 10
      },
      routeTypeButtons: {
        enabled: true
      },
      reverseButton: {
        enabled: true
      },
      optionsButton: {
        enabled: true
      },
      routeSummary: {
        enabled: true,
        compactResults: false
      },
      narrativeControl: {
        enabled: true,
        compactResults: false,
        interactive: true
      }
    })
    .addTo(map);

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

    console.log(location);

    const marker = L.marker(locationLatLng, {
      icon: L.mapquest.icons.marker()
    }).bindPopup(
      location.street + ", " + location.adminArea5 + ", " + location.adminArea3
    );

    group.push(marker);
  }
  return L.featureGroup(group);
}