<template>
  <!-- START MAIN CONTENT -->
  <main>
    <div class="container is-fluid max-container" ref="stories-container">
      <!-- YOLO -->
      <!-- <div class="columns">
        <div class="column auto">
          <div class="box">Search terms: GO GO GO YOLO</div>
        </div>
      </div>-->
      <!-- YOLO -->

      <div class="columns">
        <div class="column auto">
          <!-- YOLO -->
          <div class="box search-terms">
            <span class="st-label">Search terms:</span>
            {{searchStr && searchStr.trim()}}
          </div>
          <!-- YOLO -->
          <!-- STORIES -->
          <div>
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
        <!-- <div class="is-divider-vertical"></div> -->
        <!-- right col -->
        <home-right-col />
        <!-- end right col -->
      </div>
    </div>
  </main>
  <!-- END MAIN CONTENT -->
</template>

<script>
// eslint-disable-next-line
import Vue from "vue";
import * as Sentry from "@sentry/browser";
import InfiniteLoading from "vue-infinite-loading";
import { EventBus } from "../event-bus.js";
import { mapActions, mapGetters } from "vuex";
import axiosBase from "../services/axiosBase";
// import StoryModal from "../components/StoryModal.vue";
import FullStoryBrief from "../components/storybrief/FullStoryBrief.vue";
import MobileStoryBrief from "../components/storybrief/MobileStoryBrief.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import HomeRightCol from "../components/HomeRightCol.vue";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;
const LAYOUT_SWITCH = 600;

///////////////////////////////////////
// @ is an alias to /src
///////////////////////////////////////
export default {
  name: "search",
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
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),
    searchStr: function() {
      return this.$route.query.q;
    }
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
        console.log("infiniteHandler called");
        console.log(`Fetching page ${this.page}`);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        let params = {};
        if (this.page > 1) {
          params.page = this.page;
        }
        params.q = this.searchStr;
        const response = await axiosBase.get(`/stories/search`, {
          params
        });
        console.log(response.data.stories);
        const stories = response.data.stories;
        if (stories.length) {
          this.page += 1;
          this.stories.push(...stories);
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (e) {
        Sentry.captureException(e);
        console.log(e);
        $state.error();
      }
    },
    async onSearchTriggered(searchStr) {
      console.log(`Search for "${searchStr}"`);
      this.changeFilter();
      this.$router.push({ name: "search", query: { q: searchStr } });
    },
    async infiniteHandler($state) {
      await this.fetchStories($state);
    },
    changeFilter() {
      console.log("Change filter");
      // console.log(`InfiniteId = > ${this.infiniteId}`);
      this.page = 1;
      this.stories = [];
      this.infiniteId += 1;
    },
    updateStory(story) {
      console.log("updating story");
      // console.log(story);
      const [story_to_update] = this.stories.filter(s => s._key === story._key);
      // console.log(story_to_update);
      story_to_update.comments_count = story.comments_count;
    }
  },
  mounted() {
    console.log("Search mounted");
    EventBus.$on("searchTriggered", searchStr => {
      this.onSearchTriggered(searchStr);
    });
  },
  created() {
    // this.searchStr = this.$route.query.q;
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
  beforeDestroy() {
    console.log("Search beforeDestroyed");
    EventBus.$off("searchTriggered");
    _mql.removeListener(this.handleWindowChange);
  },
  destroyed() {
    console.log("Search destroyed");
  },
  watch: {
    // ----------------------------------------------------------------------
    $route(to, from) {
      // UPDATE NUM COMMENTS IF ROUTE FROM == view-story
      console.log("# --- Search: watch route --- #");

      console.log("# -------------- #");
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
            console.log(e);
            Sentry.captureException(e);
          });
      } else if (from.name === "search") {
        console.log("Watcher: search");
      }
    }
  }
};
</script>

<style scoped>
.search-terms {
  padding: 0.5rem 1rem;
}
.search-terms .st-label {
  color: #999;
  font-weight: bold;
  font-size: 95%;
}
</style>
