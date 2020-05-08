<template>
  <!-- START MAIN CONTENT -->
  <main>
    <div class="container is-fluid max-container" ref="stories-container">
      <div class="columns">
        <div class="column auto">
          <!-- STORIES -->
          <div>
            <!-- <story-brief v-for="(story, idx) in stories" :key="idx" :story="story"></story-brief> -->
            <component v-for="(story, idx) in stories" :key="idx" :story="story" :is="storyBrief"></component>
            <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId">
              <div slot="spinner">
                <page-loader></page-loader>
              </div>
              <div slot="no-more">
                <page-error errorMessage="That's it :D"></page-error>
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
        <!-- right col -->
        <home-right-col />
        <!-- end right col -->
      </div>
    </div>
  </main>
  <!-- END MAIN CONTENT -->
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { EventBus } from "../event-bus.js";
import { mapActions, mapGetters } from "vuex";
import store from "@/store/store.js";
import { categoriesToIds } from "@/utils/categories.js";
import axiosBase from "../services/axiosBase";
import FullStoryBrief from "../components/storybrief/FullStoryBrief.vue";
import MobileStoryBrief from "../components/storybrief/MobileStoryBrief.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import HomeRightCol from "../components/HomeRightCol.vue";

import * as Sentry from "@sentry/browser";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;
const LAYOUT_SWITCH = 600;

///////////////////////////////////////
// @ is an alias to /src
///////////////////////////////////////
export default {
  name: "home",
  components: {
    InfiniteLoading,
    FullStoryBrief,
    MobileStoryBrief,
    PageLoader,
    PageError,
    HomeRightCol
  },
  data: function() {
    return {
      storyBrief: null,
      layout: null,
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
    handleWindowChange(event) {
      if (event.matches) {
        // < LAYOUT_SWITCH
        console.log(`CHANGE < ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_MOBILE;
        this.storyBrief = MobileStoryBrief;
      } else {
        // >= LAYOUT_SWITCH
        console.log(`CHANGE >= ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_FULL;
        this.storyBrief = FullStoryBrief;
      }
    },
    isLayoutMobile() {
      return this.layout === LAYOUT_MOBILE;
    },
    isLayoutFull() {
      return this.layout == LAYOUT_FULL;
    },
    async fetchStories($state) {
      try {
        console.log("# --- infiniteHandler called --- #");
        console.log(`# --- Fetching page ${this.page} --- #`);
        if (this.isAuthenticated && !this.isUserInited) {
          await this.$store.dispatch("initUser");
        }
        let params = {};
        // not authenticated user, need to send categories as a qs
        const categories = store.getters.getCategories;
        const categories_by_ids = categories
          .map(c => categoriesToIds[c])
          .sort((a, b) => a - b)
          .join("-");
        params.categories = categories_by_ids;
        params.page = this.page;
        const response = await axiosBase.get(`/stories`, {
          params
        });
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
        Sentry.captureException(e);
        $state.error();
      }
    },
    async onCategoriesChanged() {
      this.changeFilter();
    },
    async onSearchTriggered(searchStr) {
      // go to search page pass searchstr as qs
      // hide cats in header
      this.$router.push({ name: "search", query: { q: searchStr } });
    },
    async infiniteHandler($state) {
      await this.fetchStories($state);
    },
    changeFilter() {
      this.page = 1;
      this.stories = [];
      this.infiniteId += 1;
    },
    updateStory(story) {
      const [story_to_update] = this.stories.filter(s => s._key === story._key);
      story_to_update.comments_count = story.comments_count;
    }
  },
  created() {
    console.log(`User inited -> ${this.isUserInited}`);
    console.log(`Env: ${process.env.NODE_ENV}`);
    console.log(`Env base url: ${process.env.BASE_URL}`);
    _mql = window.matchMedia(`(max-width: ${LAYOUT_SWITCH}px)`);
    console.log(_mql.matches);
    if (_mql.matches) {
      // < LAYOUT_SWITCH
      console.log(`INITIAL < ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_MOBILE;
      this.storyBrief = MobileStoryBrief;
    } else {
      // >= LAYOUT_SWITCH
      console.log(`INITIAL >= ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_FULL;
      this.storyBrief = FullStoryBrief;
    }
    console.log(_mql);
    // initial state here
    _mql.addListener(this.handleWindowChange);
  },
  mounted() {
    console.log("Home mounted");
    // Keep eventBus stuff for now
    // OK
    EventBus.$on("categoriesChanged", () => {
      this.onCategoriesChanged();
    });
    // OK KEEP
    EventBus.$on("searchTriggered", searchStr => {
      this.onSearchTriggered(searchStr);
    });
    // OK
    EventBus.$on("login", () => {
      this.changeFilter();
    });
  },
  beforeDestroy() {
    console.log("Home beforeDestroyed");
    EventBus.$off("categoriesChanged");
    EventBus.$off("searchTriggered");
    EventBus.$off("login");
    console.log("#--- beforeDestroy ---#");
    _mql.removeListener(this.handleWindowChange);
    // _mql = null; // ?
  },
  destroyed() {
    console.log("Home destroyed");
  },
  watch: {
    // ----------------------------------------------------------------------
    isUserInited(newVal, oldVal) {
      console.log(`User inited watcher: ${oldVal} to ${newVal}`);
    },
    // ----------------------------------------------------------------------
    $route(to, from) {
      // UPDATE NUM COMMENTS IF ROUTE FROM == view-story
      console.log("# --- Watch route --- #");
      // if (from.name === "home") {
      //     try {
      //         this.changeFilter();
      //     } catch (e) {
      //         // do nothing
      //     }
      // }
      if (from.name === "view-story") {
        const from_slug = from.params.slug;
        axiosBase
          .get(`/stories/${from_slug}`)
          .then(response => {
            if (response && response.status === 200) {
              this.updateStory(response.data.story);
            }
          })
          .catch(e => {
            // just log me
            console.error(e);
            Sentry.captureException(e);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
