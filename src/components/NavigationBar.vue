<template>
<div class="nav-bar">
  <b-navbar toggleable="lg">
    <b-navbar-brand><router-link :to="{name:'home'}" class="text-dark"> <b>Photo Finder</b></router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <SearchForm id="form-input"></SearchForm>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import SearchForm from '../components/SearchForm'
    export default {
        name: 'navigation-bar',
        components: {
            SearchForm
        }
    }
</script>

<style lang="scss" scoped>
.nav-bar {
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    background: white !important;
    z-index: 999;
    padding: 1rem 3rem;
    @media screen and (min-width: 320px) and (max-width: 768px) {
        padding: 0;
    }
        
    }
    #form-input {
        min-width: 50vw !important;
        @media screen and (min-width: 320px) and (max-width: 768px) {
        margin-top: 1rem;
    }
    }

</style>