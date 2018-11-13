<template>
  <div class="birdMap" id="mapid"></div>
</template>

<script>
  import * as L from 'leaflet';
  import leafletKey from '../../secret.json';
  export default {
    name: 'mapView',
    props: {
      region: {
        type: Object,
        required: true,
      },
      observations: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        map: '',
        zoom: 6,
      }
    },
    mounted() {
      this.instantiateMap();
      this.addObservations();
    },
    watch: {
      region() {
        this.rebuildMap();
      },
      observations() {
        this.rebuildMap();
      }
    },
    methods: {
      instantiateMap() {
        this.map = L.map('mapid').setView([this.region.latitude, this.region.longitude], this.zoom);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: leafletKey.leafletKey,
        }).addTo(this.map)
      },
      rebuildMap() {
        this.map.remove();
        this.instantiateMap();
        this.addObservations();
      },
      addObservations() {
        this.observations.forEach(obs => {
          const marker = L.circle([obs.lat, obs.lng], {
            color: 'purple',
            fillColor: 'purple',
            fillOpacity: 0.5,
            radius: 2000
          }).addTo(this.map);
          marker.bindPopup(
            "<h6><strong>Common Name: " + obs.comName + "</strong></h6>" +
            "<h6>Scientific Name: <i>" + obs.sciName + "</i></h6>" +
            "<h6>Location: " + obs.locName + "</h6>" +
            "<h6>Number: " + obs.howMany + "</h6>" +
            "<h6>Date/Time: " + obs.obsDt + "</h6>" +
            "<span>Lat: " + obs.lat + " Long: " + obs.lng + "</span>"
          );
        })
      },
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '~leaflet/dist/leaflet.css';

  .birdMap {
    height: 600px;
    width: 100%;
  }
</style>
