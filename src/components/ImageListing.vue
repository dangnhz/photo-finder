<template>
  <div class="images">
    <div v-masonry transition-duration="0.1s" item-selector=".image-item" class="masonry-container">
      <div v-masonry-tile @click="viewImage(index)" class="image-item col-md-4" :key="index" v-for="(image, index) in images">
        <div class="image-detail">
          <div class="detail-wrapper d-flex align-items-center">
            <a :href="image.user.links.html" target="_blank" class="user col-9 d-flex align-items-center">
              <div class="col-2 text-left p-0">
                <img
                  style="width: 40px; height: 40px; border-radius: 50%"
                  :src="image.user.profile_image.large"
                  alt
                />
              </div>
              <div class="col-10" style="text-align: left;">{{image.user.name}}</div>
            </a>

            <div class="image-likes col-3 d-flex text-right align-items-center">
              <v-icon style="color:#e44d66" name="heart"></v-icon>
              <span class="ml-2">{{image.likes}}</span>
            </div>
          </div>
        </div>

        <img :src="image.urls.small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "image-listing",
  data() {
    return {
      index: null
    }
  },
  props: {
    images: {
      type: Array,
      default: null
    }
  },
  methods: {
    viewImage(index) {
      this.index = index
      this.$store.dispatch('setImageIndex', this.index)
      this.$store.dispatch('toggleLightBox')
    }
  }
};
</script>

<style lang="scss" scoped>
.masonry-container {
  width: 80%;
  height: 100%;
  margin: 5rem auto;
  column-count: 3;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
  overflow: hidden;

  .image-item {
    position: relative;
    margin-bottom: 30px;
    transition: 0.5s;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      .image-detail {
        opacity: 1;
      }
    }
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
    }
    .image-detail {
      position: absolute;
      top: 0;
      left: auto;
      right: auto;
      bottom: 0;
      width: calc(100% - 30px);
      background: rgba(0, 0, 0, 0.2);
      opacity: 0;
      color: #fff;
      transition: all 0.5s;

      .detail-wrapper {
        position: absolute;
        bottom: 1rem;
        width: 100%;
      }
    }
  }
}
</style>
