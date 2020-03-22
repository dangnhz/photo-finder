<template>
  <div id="app" :key="this.$route.fullPath">
    <NavigationBar></NavigationBar>
    <router-view />
  </div>
</template>
<script>
import NavigationBar from './components/NavigationBar'
export default {
  name:'app',
  components: {
NavigationBar
  },
  created () {
     this.$store.dispatch('randomImage')
  },
}
</script>
<style lang="less">
a {
  text-decoration: none !important;
  color: #fff !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
