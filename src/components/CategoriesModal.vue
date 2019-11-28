<template>
  <!-- CATEGORIES MODAL -->
  <div class="modal" id="categories-modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="message" @submit.prevent="onSubmit">
        <div class="message-header">
          <p class="is-1" style="font-style:normal;">Select the themes you are interested in.</p>
          <button
            class="delete is-medium"
            id="categories-close"
            @click.prevent="closeCategoriesModal"
          ></button>
        </div>
        <div class="message-body">
          <ul class="categories-grid">
            <li v-for="category in categoriesList" :key="category.id" class="field">
              <input :id="category.key" type="checkbox" :value="category.key" v-model="categories" />
              <label :for="category.key">{{ category.display }}</label>
            </li>
          </ul>
          <div class="is-divider"></div>
          <div class="field is-grouped submit-buttons">
            <div class="control">
              <button type="submit" class="button is-primary">Save</button>
            </div>
            <div class="control">
              <button class="button is-dark" @click.prevent="closeCategoriesModal">Cancel</button>
            </div>
          </div>
          <div>
            <!-- <ul>
              <li v-for="category in categoriesList" :key="category.id">{{ category.display }}</li>
            </ul>-->
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- END CATEGORIES MODAL -->
</template>
 
 <script>
// import { mapGetters } from "vuex";
import { categoriesList } from "../utils/categories";

export default {
  //////////////////////////////////////////////
  // TODO REFACTOR: MAKE A DICT AND LOOP!!!!!
  //////////////////////////////////////////////
  data() {
    return {
      // categories: [],
      loading: false,
      categoriesList
    };
  },
  props: ["isActive"],
  methods: {
    closeCategoriesModal() {
      this.$emit("categoriesModalClosed", this.isActive);
    },
    async onSubmit() {
      console.log("onSubmit");
      console.log(this.categories);
      await this.$store.dispatch("save_categories", this.categories);
      this.closeCategoriesModal();
    }
  },
  computed: {
    // ...mapGetters(["getCategories"]),
    categories: {
      get() {
        return this.$store.getters.getCategories;
      },
      set(value) {
        this.$store.commit("setCategories", value);
      }
    }
  }
};
</script>

<style scoped>
.categories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.submit-buttons {
  margin-top: 10px;
}

input[type="checkbox"] {
  margin-right: 6px;
}
</style>