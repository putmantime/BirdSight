<template>
  <div>
    <b-form-input v-model="term"
                  type="text"
                  placeholder="Enter a species common or scientific name"></b-form-input>
    <div v-if='suggestions.length'
         class="card"
         style="max-height: 250px; overflow: auto"
    >
      <div class='ddown'
           v-for="sug in suggestions">
        <b-dropdown-item @click="suggestionClick(sug)">
          {{sug.comName}}
        </b-dropdown-item>
      </div>
    </div>
  </div>
</template>
<script>
  import * as JsSearch from 'js-search';
  import * as EA from '@/resources/ebirdApi';

  export default {
    data() {
      return {
        suggestions: [],
        speciesList: [],
        items: [],
        term: '',
        search: ''
      }
    },
    props: {
      region: {
        type: Object,
        required: true,
      }
    },
    mounted() {
      this.fetchSpeciesByRegion();
      this.setSearchIndex();
    },
    watch: {
      term() {
        this.getMatches();
      },
      region() {
        this.fetchSpeciesByRegion();
      },
    },
    methods: {
      async fetchSpeciesByRegion() {
        try {
          let searchResponse = await EA.getSpeciesByRegion(this.region.code);
          searchResponse.forEach(bird => {
            this.speciesList.push(bird)
          });
          this.setSearchIndex();
          searchResponse = null
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      setSearchIndex() {
        this.search = new JsSearch.Search('speciesCode');
        this.search.addIndex('comName');
        this.search.addIndex('sciName');
        this.search.addIndex('speciesCode');
        this.search.addDocuments(this.speciesList);
      },
      getMatches() {
        this.suggestions = this.search.search(this.term);

      },
      suggestionClick(termObj) {
        this.$emit('interface', termObj);
        this.suggestions = [];
        this.term = '';
      },
    }
  }

  const example = {
    "speciesCode": "amecro",
    "comName": "American Crow",
    "sciName": "Corvus brachyrhynchos",
    "locId": "L793849",
    "locName": "Port of Siuslaw Campground and Marina",
    "obsDt": "2018-11-12 12:59",
    "howMany": 2,
    "lat": 43.9690364,
    "lng": -124.1009295,
    "obsValid": true,
    "obsReviewed": false,
    "locationPrivate": false
  }
</script>
<style>
  .ddown {
    text-align: left;
  }
</style>

