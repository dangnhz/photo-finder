<template>
  <div class="search-form" ref="searchForm">
    <div class="search-form-wrapper">
        <div >
          <form @submit.prevent="handleSubmit" class="input-group ">
            <input
              type="text"
              class="form-control"
              style="border-radius: 0"
              :placeholder="placeholder"
              v-model="searchTerm"
              required=""
            />
            <div class="input-group-append">
              <button class="btn btn-danger" type="submit">
                <v-icon name="search"></v-icon>
              </button>
            </div>
          </form>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "search-form",
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (this.searchTerm) {
        await this.$store.dispatch("setSearchTerm", this.searchTerm);
        await this.$store.dispatch("setCurrentPage", 1);
        await this.$store.dispatch("searchImages");
        this.$router.push({name: 'search', params: {search_term: this.searchTerm}})
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.search-form-wrapper {
  width: 100%;
  background: none;
}
</style>
