<template>
  <div class="container-fluid fullBackground">
    <div class="row">
      <div class="col-3 p-3">
        <div class="card selectionArea">
          <div class="card-body p-2 mapHeader" style="height: 300px;">
            <h3>Region Search:</h3>
            <region-search @interface="regionHandler"
                           :regionCode="this.urlRegion"
            ></region-search>
          </div>
          <div class="card-body p-2 mapHeader" style="height: 300px">
            <h3>Species Search:</h3>
            <species-search @interface="speciesHandler"
                            :region="region"
            >
            </species-search>
            <div class="btn btn-outline-warning my-1"
                 v-if="currentSpecies"
                 @click="notableClick()">
              All Notable
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 p-3">
        <div class="card">
          <div class="card-header mapHeader" style="text-align: left">
           <div class="row">
             <div class="col-6"><h3>Region:</h3><h2>{{region.name}}</h2></div>
             <div class="col-6"><h3>Observations:</h3> <h2 v-html="observationMessage"></h2></div></div>
          </div>
          <div v-if="observations.length"
               class=" card-body p-0">
            <map-view :region="region"
                      :observations="observations">
            </map-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RegionSearch from '@/components/RegionSearch.vue';
  import SpeciesSearch from '@/components/SpeciesSearch.vue';
  import MapView from '@/components/MapView.vue';
  import * as EA from '@/resources/ebirdApi';

  export default {
    name: 'Home',
    components: {
      'region-search': RegionSearch,
      'species-search': SpeciesSearch,
      'map-view': MapView,
    },
    data () {
      return {
        speciesInfo: '',
        urlRegion: '',
        observationMessage: '<p>All recent notable observations</p>',
        observations: [],
        speciesList: [],
        currentSpecies: '',
        region: {
          "code": "US-OR",
          "name": "Oregon",
          "state": "OR",
          "latitude": 43.804133,
          "longitude": -120.554201
        },
      }
    },
    methods: {
      regionHandler(payload) {
        this.region = payload;
        const regionCode = this.region.code;
        this.$router.push({ path: `/region/${regionCode}` });
      },
      speciesHandler(payload) {
        this.speciesInfo = payload;
        this.currentSpecies = payload.speciesCode;
        const speciesCode = payload.speciesCode;
        this.$router.push({ path: `/region/${this.region.code}/species/${speciesCode}` });
      },
      async fetchRecentNotableSightings() {
        this.observations = [];
        try {
          let searchResponse = await EA.getNotableObservations(this.region.code);
          searchResponse.forEach(bird => {
            this.observations.push(bird)
          });
          searchResponse = null
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      async fetchObservationBySpecies(speciesCode) {
        this.observations = [];
        try {
          let searchResponse = await EA.getObservationBySpecies(this.region.code, speciesCode);
          searchResponse.forEach(bird => {
            this.observations.push(bird)
          });
          searchResponse = null
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      notableClick() {
        this.observationMessage = '<p>All recent notable observations</p>';
        this.currentSpecies = '';
        this.speciesInfo = '';
        this.fetchRecentNotableSightings();
      },
    },
    watch: {
      currentSpecies() {
        if (this.currentSpecies) {
          this.observationMessage = `<strong><i>${this.speciesInfo.sciName}</i></strong>  (${this.speciesInfo.comName})`;
        }
        else {
          this.observationMessage = '<p>All recent notable observations</p>';
        }
        this.fetchObservationBySpecies(this.currentSpecies);
      },
      region() {
        this.observationMessage = '<p>All recent notable observations</p>';
        this.currentSpecies = '';
        this.speciesInfo = '';
        this.fetchRecentNotableSightings();
      },
    },
    mounted() {
      if ('region' in this.$route.params) {
        this.urlRegion = this.$route.params.region;
      }
      if ('species' in this.$route.params) {
        this.currentSpecies = this.$route.params.speciesCode;
      }
      if (this.currentSpecies) {
        this.fetchObservationBySpecies(this.currentSpecies)
      } else {
        this.fetchRecentNotableSightings();
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2, h3 {
    font-weight: normal;
    color: whitesmoke;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .selectionArea {
    text-align: left;
    height: 100%;
  }
  .fullBackground {
    background: #003E7F;
  }
  .mapHeader {
    background: #005DBF;
  }
  .card {
    border: solid #007CFF 1px;
  }
</style>
