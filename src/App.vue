<template>
  <div id="app">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link"
                     to="/"><strong>US Bird Observations</strong></router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
    </ul>
    <router-view/>
    <div class="nav footStyle">
      <p class="aboutHome">
        All data is fetched from the
        <a href="https://documenter.getpostman.com/view/664302/ebird-api-20/2HTbHW#3833c40c-9733-dd2a-94e0-abcdd6938f0e">
          eBird API 2.0
        </a>
        provided by
        <a href="https://ebird.org/">eBird.org</a>
        and the
        <a href="http://www.birds.cornell.edu/">
          Cornell Lab of Ornithology
        </a>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
}

h2 {
  color: whitesmoke;
}
.nav {
  padding: 10px;
  background: #314354;
  a {
    font-weight: bold;
    color: whitesmoke;
    &.router-link-exact-active {
      color: whitesmoke;
    }
  }
}
.footStyle{
  height: 75px;

}
  .aboutHome {
    margin: 0 auto;
    text-align: center;
    /*width: 700px;*/
  }
</style>
