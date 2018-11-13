<template>
  <div>
    <b-form-input v-model="term"
                  type="text"
                  placeholder="Enter a US State or Territory"></b-form-input>
    <div v-if="suggestions.length"
         class="card ddown">
      <div v-for="sug in suggestions">
        <b-dropdown-item @click="suggestionClick(sug)">
          {{sug.name}}
        </b-dropdown-item>
      </div>
    </div>
  </div>
</template>
<script>
  import * as JsSearch from 'js-search';
  import regionCoords from '../static/regionCoords.json';

  export default {
    data () {
      return {
        suggestions: [],
        items: regionCoords,
        term: '',
        search: '',
      }
    },
    props: {
      regionCode: {
        type: String,
        required: false,
      }
    },
    mounted() {
      this.setSearchIndex();
    },
    watch: {
      term() {
        this.getMatches();
      },
      regionCode() {
        if (this.regionCode) {
          this.term = this.regionCode;
          this.getMatches();
          if (this.suggestions.length === 1) {
            this.suggestionClick(this.suggestions[0]);
          }
        }
      }
    },
    methods: {
      setSearchIndex() {
        this.search = new JsSearch.Search('code');
        this.search.addIndex('code');
        this.search.addIndex('name');
        const searchDoc = this.items;
        this.search.addDocuments(searchDoc);
      },
      getMatches() {
        this.suggestions = this.search.search(this.term);
      },
      suggestionClick(termObj) {
        this.$emit('interface', termObj);
        this.suggestions = [];
        this.term = ''
      },
    }
  }
</script>
<style>
  .ddown {
    text-align: left;
  }
</style>
