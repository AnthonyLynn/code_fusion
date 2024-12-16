const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
  "marker"
);
const { LatLng, LatLngBounds } = await google.maps.importLibrary("core");
const { DirectionsService, DirectionsRenderer } =
  await google.maps.importLibrary("routes");

export default class GoogleMap {
  constructor(mapId) {
    this._mapId = mapId;
    this._markers = [];
    this._directionsRenderer = new DirectionsRenderer();
    this._directionsService = new DirectionsService();
  }

  load(element) {
    this._map = new Map(element, {
      center: { lat: 0, lng: 0 },
      zoom: 10,
      mapId: this._mapId,
      gestureHandling: "greedy",
    });

    this._directionsRenderer.setMap(this._map);
  }

  createPin(scale, borderColor, background, glyph) {
    return new PinElement({
      scale,
      background,
      borderColor,
      glyph,
    });
  }

  addMarker(position, title, pin) {
    this._markers.push(
      new AdvancedMarkerElement({
        map: this._map,
        position,
        title,
        content: pin.element,
      })
    );
  }

  clearMarkers() {
    this._markers.forEach((marker) => {
      marker.position = null;
    });

    this._markers = [];
  }

  _getMarkerBounds() {
    const lats = [];
    const lngs = [];

    this._markers.forEach((marker) => {
      lats.push(marker.position.lat);
      lngs.push(marker.position.lng);
    });

    const maxLat = Math.max.apply(Math, lats);
    const minLat = Math.min.apply(Math, lats);
    const maxLng = Math.max.apply(Math, lngs);
    const minLng = Math.min.apply(Math, lngs);

    const min = new LatLng(minLat, minLng);
    const max = new LatLng(maxLat, maxLng);

    return new LatLngBounds(min, max);
  }

  focusViewOnMarkers() {
    const bounds = this._getMarkerBounds();
    this._map.fitBounds(bounds, 0.3);
  }

  displayRoute() {
    const start = this._markers[0].position;
    const end = this._markers[this._markers.length - 1].position;

    let waypoints = [];
    for (let i = 1; i < this._markers.length - 1; i++) {
      const { lat, lng } = this._markers[i].position;
      const latLng = new LatLng(lat, lng);
      waypoints.push({ location: latLng });
    }

    this._directionsService
      .route({
        origin: start,
        destination: end,
        waypoints: waypoints,
        //optimizeWaypointOrder: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        this._directionsRenderer.setDirections(res);
      })
      .catch(console.error);
  }
}
