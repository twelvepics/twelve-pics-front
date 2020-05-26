<template>
  <!-- CATEGORIES MODAL -->
  <div class="modal" id="categories-modal" :class="{ 'is-active': isActive }">
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
              <button class="button is-light" @click.prevent="closeCategoriesModal">Cancel</button>
            </div>
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
import { EventBus } from "../event-bus.js";

export default {
  data() {
    return {
      // categories: [],
      loading: false,
      categoriesList,
      categories: this.$store.getters.getCategories
    };
  },
  props: ["isActive"],
  methods: {
    closeCategoriesModal() {
      this.categories = this.$store.getters.getCategories;
      this.$emit("closeModal");
    },
    async onSubmit() {
      console.log("onSubmit");
      await this.$store.dispatch("save_categories", this.categories);
      EventBus.$emit("categoriesChanged");
      this.closeCategoriesModal();
    }
  },
  created() {
    console.log("categories created");
    // console.log(this.categories);
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

@media only screen and (max-width: 999px) {
  .modal {
    justify-content: start;
  }
  .modal-content {
    max-height: 100%;
  }
  .categories-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
