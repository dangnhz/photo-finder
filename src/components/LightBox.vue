<template>
  <div id="light-box" v-if="showLightBox">
    <v-icon class="btn-close" name="times" @click="closeLightBox"></v-icon>
    <v-icon class="btn-next" name="arrow-right" @click="nextImage"></v-icon>
    <v-icon class="btn-prev" name="arrow-left" @click="prevImage"></v-icon>
    <!-- display image here -->
    <div class="images-wrapper">
      <img id="image" @click="zoomImage" :src="images[imageIndex].urls.regular" alt="image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "light-box",
  props: ["images", "imageIndex"],
  data: function() {
    return {
      //   index: this.imageIndex
    };
  },
  methods: {
    closeLightBox() {
      this.$store.dispatch("toggleLightBox");
    },
    nextImage() {
      if (this.imageIndex < this.images.length - 1) {
        this.$store.dispatch("setImageIndex", this.imageIndex + 1);
      } else this.$store.dispatch("setImageIndex", 0);
    },
    prevImage() {
      if (this.imageIndex > 0) {
        this.$store.dispatch("setImageIndex", this.imageIndex - 1);
      } else this.$store.dispatch("setImageIndex", this.images.length - 1);
    },
    zoomImage() {
      const image = document.querySelector("#image");
      if (image.style.width === "100%") {
        image.style.cursor = "zoom-in";
        image.style.width = "50%";
      } else {
        image.style.cursor = "zoom-out";
        image.style.width = "100%";
      }
    }
  },
  computed: {
    showLightBox() {
      return this.$store.getters.showLightBox;
    }
  }
};
</script>
<style lang="scss" scoped>
#light-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: block;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  .btn-close {
    width: 30px;
    height: 30px;
    color: #fff;
    cursor: pointer;
    position: fixed;
    top: 2rem;
    right: 2rem;
    opacity: 0.5;
    mix-blend-mode: difference;
    transition: 0.5s;
    &:hover {
      opacity: 1;
    }
  }
  .btn-prev,
  .btn-next {
    width: 30px;
    height: 30px;
    color: #fff;
    cursor: pointer;
    position: fixed;
    opacity: 0.5;
    transition: 0.5s;
    &:hover {
      opacity: 1;
    }
  }
  .btn-prev {
    top: 50%;
    left: 2rem;
  }
  .btn-next {
    top: 50%;
    right: 2rem;
  }
  .images-wrapper {
    background: #fff;
    //    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    width: 80%;
    min-height: 100vh;
    height: fit-content;
    margin: 2rem auto;
    @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
    img {
      cursor: zoom-in;
      width: 50%;
      height: auto;
      @media only screen and (min-width: 320px) and (max-width: 767px) {
            width: 100%;
        }
    }
  }
}
</style>