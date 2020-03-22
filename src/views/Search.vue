<template>
  <div class="search">
    <div class="header text-left">
      <h1>{{this.$route.params.search_term}}</h1>
      <h4>Total photos: {{searchResult.totalPhotos}} </h4>
    </div>
    <ImageListing :images="searchResult.photos"></ImageListing>
    <button @click="loadMoreImages" v-if="searchResult.totalPages >=2" class="btn btn-danger mb-5">More Photos</button>
    <LightBox :images="searchResult.photos" :imageIndex="imageIndex"></LightBox>
  </div>
</template>
<script>
import ImageListing from '../components/ImageListing'
import LightBox from '../components/LightBox'
import { mapGetters } from "vuex";
export default {
  name:'search',
  components: {
    ImageListing,
    LightBox
  },
  computed: {
    ...mapGetters(["searchResult", "currentPage", "showLoading", "imageIndex"])
  },
  methods: {
    loadMoreImages() {
      this.$store.dispatch("setCurrentPage", this.currentPage + 1);
      this.$store.dispatch("searchImages");
    },
    handlePageRefresh() {
      if (this.$route.params.search_term) {
         this.$store.dispatch("setSearchTerm", this.$route.params.search_term);
         this.$store.dispatch("setCurrentPage", 1);
         this.$store.dispatch("searchImages");
  }
    }
  },
  mounted () {
    this.handlePageRefresh()
    
}
}
</script>
<style lang="scss" scoped>
.search {
  margin-top: 10rem;
  .header {
    width: 80%;
    margin: 0 auto;
    padding: 15px;
    h1{
      font-size: 4rem;
    }
    @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    h1{
      font-size: 2rem;
    }
    h4{
      font-size: 1rem;
    }
    }
  }
}
</style>
