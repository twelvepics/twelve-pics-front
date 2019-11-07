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
            <li class="field">
              <input id="documentary" type="checkbox" value="documentary" v-model="categories" />
              <label for="documentary">Documentary</label>
            </li>
            <li class="field">
              <input id="stillLife" type="checkbox" value="stillLife" v-model="categories" />
              <label for="stillLife">Still life</label>
            </li>
            <li class="field">
              <input
                id="streetPhotography"
                type="checkbox"
                value="streetPhotography"
                v-model="categories"
              />
              <label for="streetPhotography">Street photography</label>
            </li>
            <li class="field">
              <input id="wildLife" type="checkbox" value="wildLife" v-model="categories" />
              <label for="wildLife">Nature and Wildlife</label>
            </li>
            <li class="field">
              <input id="wedding" type="checkbox" value="wedding" v-model="categories" />
              <label for="wedding">Wedding</label>
            </li>
            <li class="field">
              <input id="travel" type="checkbox" value="travel" v-model="categories" />
              <label for="travel">Travel</label>
            </li>
            <li class="field">
              <input id="dailyLife" type="checkbox" value="dailyLife" v-model="categories" />
              <label for="dailyLife">Daily life</label>
            </li>
            <li class="field">
              <input id="fineQrt" type="checkbox" value="fineArt" v-model="categories" />
              <label for="fineArt">Fine art</label>
            </li>
            <li class="field">
              <input id="portrait" type="checkbox" value="portrait" v-model="categories" />
              <label for="portrait">Portrait</label>
            </li>
            <li class="field">
              <input id="sport" type="checkbox" value="sport" v-model="categories" />
              <label for="sport">Sport</label>
            </li>
            <li class="field">
              <input id="architecture" type="checkbox" value="architecture" v-model="categories" />
              <label for="architecture">Architecture</label>
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
          <!-- <div>
            <ul>
                <li v-for="(category, index) in categories" :key="index">{{ category }}</li>
            </ul>
          </div>-->
        </div>
      </form>
    </div>
  </div>
  <!-- END CATEGORIES MODAL -->
</template>
 
 <script>
// import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // categories: [],
      loading: false
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