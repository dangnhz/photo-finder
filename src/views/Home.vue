<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <ImageListing :images="listPhotos"></ImageListing>
    <button @click="loadMoreListPhotos" class="btn btn-danger">More Photos</button>
    <!-- lightbox -->
    <LightBox :images="listPhotos" :imageIndex="imageIndex"></LightBox>
    <!-- end light box -->

  </div>
</template>

<script>
import HomeHeader from '../components/HomeHeader'
import ImageListing from "../components/ImageListing";
import LightBox from '../components/LightBox'
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      index: null
    }
  },
  components: {
    HomeHeader,
    ImageListing,
    LightBox
  },
  methods: {
    loadMoreListPhotos() {
      this.$store.dispatch("setCurrentPage", this.currentPage + 1);
       this.$store.dispatch('listPhotos')
    }
  },
  computed: {
    ...mapGetters(["listPhotos", "currentPage", "showLoading", "imageIndex"])
  },
  mounted() {
    this.$store.dispatch('setCurrentPage', 1)
    this.$store.dispatch('listPhotos')

    // infinite scroll
    // window.addEventListener('scroll', () => {
    //   if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
    //     this.loadMoreListPhotos()
    //   }
    // })

  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
}
</style>
