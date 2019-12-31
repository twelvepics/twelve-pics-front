<template>
  <!-- START MAIN CONTENT -->
  <main>
    <div class="container is-fluid" ref="stories-container">
      <div class="columns">
        <div class="column auto">
          <page-loader v-if="this.isAuthenticated && !this.isUserInited"></page-loader>
          <!-- STORIES -->
          <div>
            <story-brief v-for="(story, idx) in stories" :key="idx" :story="story"></story-brief>
            <infinite-loading
              v-if="!this.isAuthenticated || this.isUserInited"
              @infinite="infiniteHandler"
              :identifier="infiniteId"
            >
              <div slot="spinner">
                <page-loader></page-loader>
              </div>
              <div slot="no-more">
                <page-error errorMessage="No more stories :("></page-error>
              </div>
              <div slot="no-results">
                <page-error errorMessage="No result :("></page-error>
              </div>
              <div slot="error">
                <page-error errorMessage="Ooops, something went wrong :("></page-error>
              </div>
            </infinite-loading>
          </div>

          <!-- END STORIES -->
        </div>
        <div class="is-divider-vertical"></div>
        <div class="column is-narrow is-hidden-touch">
          <div class="notification is-danger" style="padding:1em;">
            <p class="title is-5">Fixed column</p>
            <p class="content">This column is fixed 300px wide.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- END MAIN CONTENT -->
</template>

<script>
// eslint-disable-next-line
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";
import { EventBus } from "../event-bus.js";
import { mapActions, mapGetters } from "vuex";
import store from "@/store/store.js";
import { categoriesToIds } from "@/utils/categories.js";
import axiosBase from "../services/axiosBase";
// import StoryModal from "../components/StoryModal.vue";
import StoryBrief from "../components/StoryBrief.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";

///////////////////////////////////////
// @ is an alias to /src
///////////////////////////////////////
export default {
  name: "home",
  components: {
    InfiniteLoading,
    StoryBrief,
    PageLoader,
    PageError
  },
  data: function() {
    return {
      page: 1,
      stories: [],
      infiniteId: +new Date(),
      is_error: false,
      errorMessage: "",
      is_debug: true
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser", "isUserInited"])
  },
  methods: {
    ...mapActions(["resetStoryComponentHomeLayout"]),
    async fetchStories($state) {
      try {
        console.log("infiniteHandler called");
        console.log(`Fetching page ${this.page}`);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        let params = {};
        // not authenticated user, need to send categories as a qs
        const categories = store.getters.getCategories;
        console.log("***");
        // console.log(categories);
        const categories_by_ids = categories
          .map(c => categoriesToIds[c])
          .sort((a, b) => a - b)
          .join("-");
        console.log(categories_by_ids);
        params.categories = categories_by_ids;
        params.page = this.page;
        const response = await axiosBase.get(`/stories`, {
          params
        });
        // console.log(response.data.stories);
        const stories = response.data.stories;
        if (stories.length) {
          this.page += 1;
          this.stories.push(...stories);
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (e) {
        console.log(e);
        $state.error();
        //     this.is_loading = false;
        //     this.is_error = true;
        //     if (e.response) {
        //       if (e.response.status === 404) {
        //         this.errorMessage = "NOT FOUND";
        //       } else {
        //         // Most probably a 500
        //         this.errorMessage = "SERVER ERROR";
        //       }
        //     } else {
        //       console.log(e);
        //       // throw e;
        //     }
      }
    },
    async onCategoriesChanged() {
      console.log("Categories changed, refresh page");
      this.changeFilter();
    },
    async infiniteHandler($state) {
      await this.fetchStories($state);
    },
    changeFilter() {
      console.log("Change filter");
      console.log(`InfiniteId = > ${this.infiniteId}`);
      this.page = 1;
      this.stories = [];
      this.infiniteId += 1;
    }
  },
  created() {
    console.log(`User inited -> ${this.isUserInited}`);
    // get stories if no auth or user inited
    // if (!this.isAuthenticated || this.isUserInited) {
    // XOXO PUT BACK
    // this.fetchStories();
    // }
  },
  mounted() {
    console.log("Home mounted");
    EventBus.$on("categoriesChanged", () => {
      this.onCategoriesChanged();
    });
  },
  beforeDestroy() {
    console.log("Home beforeDestroyed");
    EventBus.$off("categoriesChanged");
  },
  destroyed() {
    console.log("Home destroyed");
  },
  watch: {
    // ----------------------------------------------------------------------
    isUserInited(newVal, oldVal) {
      console.log(`User inited watcher: ${oldVal} to ${newVal}`);
      // this.fetchStories();
    },
    // ----------------------------------------------------------------------
    $route(to, from) {
      // TODO UPDATE NUM COMMENTS IF ROUTE FROM == view-story
      console.log("# --- Watch route --- #");
      console.log(to);
      console.log(from);
      console.log("# -------------- #");
    }
  }
};
</script>

<style scoped></style>
