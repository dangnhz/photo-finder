<template>
  <div class="home-header">
    <div class="home-header-wrapper">
      <div class="w-75">
        <div class="text-left">
          <h1>Photo Finder</h1>
          <p>
            The internet’s source of freely usable images. <br />Powered by
            Unsplash.
          </p>
        </div>
        <div class="form">
            <SearchForm placeholder="Search free high-resolutions photos"></SearchForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm'
export default {
  name: "search-form",
  components: {
    SearchForm,
  },
};
</script>

<style lang="scss" scoped>
.home-header-wrapper {
  width: 100%;
  height: 80vh;
  background: #333;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat !important;
  background-size: cover;
  background-position: center !important;
  background: url("https://images.unsplash.com/photo-1570528812862-9984124e7e22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2150&q=80");
  .form-control {
    &:focus {
      border: none;
      outline: none;
    }
  }
}
</style>
