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
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
  background: #0070E5;
}

h2 {
  color: whitesmoke;
}
.nav {
  padding: 10px;
  background: #0070E5;
  a {
    font-weight: bold;
    color: whitesmoke;
    &.router-link-exact-active {
      color: whitesmoke;
    }
  }
}

</style>
