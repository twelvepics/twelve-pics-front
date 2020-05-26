<template>
  <main>
    <div class="container is-fluid max-container">
      <!-- STORIES COLUMN -->
      <div class="columns is-centered" style="margin:0;padding:0;">
        <!-- CENTER COLUMNN -->
        <div class="column is-three-quarters-desktop">
          <!-- START LOADER / SERVER ERRORS-->
          <page-loader v-if="is_loading"></page-loader>
          <page-error v-else-if="is_error" :errorMessage="errorMessage"></page-error>
          <!-- ENDS LOADER / SERVER ERRORS-->
          <!-- START STORIES -->
          <div v-else class="card">
            <!-- CARD CONTENT -->
            <div class="card-content">
              <p class="title is-size-4 page-title">
                Stories by
                <router-link :to="{ name: 'user', params: { username: user_info.username } }">
                  {{
                  user_info.display_name || user_info.username
                  }}
                </router-link>
              </p>
              <!-- STORIES -->
              <component
                v-for="(story, idx) in stories"
                :key="idx"
                :story="story"
                :user_info="user_info"
                :is="storyBrief"
              ></component>
              <!-- END STORIES -->
            </div>
          </div>
          <!-- ENDS STORIES -->
        </div>
      </div>
      <!-- ENDS STORIES COLUMN -->
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import axiosBase from "../services/axiosBase";
import UserStoryFull from "../components/userstory/UserStoryFull.vue";
import UserStoryMobile from "../components/userstory/UserStoryMobile.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import * as Sentry from "@sentry/browser";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;
const LAYOUT_SWITCH = 600;

export default {
  components: {
    UserStoryFull,
    UserStoryMobile,
    PageLoader,
    PageError
  },
  data() {
    return {
      storyBrief: null,
      layout: null,
      is_debug: true,
      is_loading: false,
      // fetch errors
      is_error: false,
      errorMessage: "",
      //
      stories: [],
      user_info: {},
      count: 0,
      fullCount: 0,
      username: this.$route.params.username
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"])
  },
  methods: {
    handleWindowChange(event) {
      if (event.matches) {
        // < LAYOUT_SWITCH
        console.log(`CHANGE < ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_MOBILE;
        this.storyBrief = UserStoryMobile;
      } else {
        // >= LAYOUT_SWITCH
        console.log(`CHANGE >= ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_FULL;
        this.storyBrief = UserStoryFull;
      }
    },
    isLayoutMobile() {
      return this.layout === LAYOUT_MOBILE;
    },
    isLayoutFull() {
      return this.layout == LAYOUT_FULL;
    },
    async fetchData() {
      try {
        console.log("fetch data");
        // this.username = this.$route.params.username;
        this.is_loading = true;
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // console.log('******************');
        // console.log(this.username);
        // console.log('******************');

        const response = await axiosBase.get(`/users/${this.username}/stories`);
        // console.log(response.data);
        const { stories, count, fullCount, user_info } = response.data;
        for (let story of stories) {
          story.num_comments = Math.floor(Math.random() * 10);
        }
        this.stories = stories;
        this.count = count;
        this.fullCount = fullCount;
        this.user_info = user_info;
        this.is_loading = false;
      } catch (e) {
        this.is_loading = false;
        this.is_error = true;
        if (e.response) {
          if (e.response.status === 404) {
            this.errorMessage = "USER NOT FOUND";
          } else {
            // Most probably a 500
            this.errorMessage = "SERVER ERROR";
          }
        } else {
          Sentry.captureException(e);
          console.log(e);
        }
      }
    }
  },
  created() {
    _mql = window.matchMedia(`(max-width: ${LAYOUT_SWITCH}px)`);
    console.log(_mql.matches);
    if (_mql.matches) {
      // < LAYOUT_SWITCH
      console.log(`INITIAL < ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_MOBILE;
      this.storyBrief = UserStoryMobile;
    } else {
      // >= LAYOUT_SWITCH
      console.log(`INITIAL >= ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_FULL;
      this.storyBrief = UserStoryFull;
    }
    console.log(_mql);
    // initial state here
    _mql.addListener(this.handleWindowChange);
    // --
    this.fetchData();
  },
  beforeDestroy() {
    _mql.removeListener(this.handleWindowChange);
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      if (to.name === "user-stories") {
        this.username = this.$route.params.username;
      }
      // react to route changes...
      this.fetchData();
    }
  }
};
</script>

<style scoped>
.page-title {
  border-bottom: 1px solid #aaa;
  padding-bottom: 0.8rem;
}

.column {
  padding: 0;
}

@media only screen and (max-width: 600px) {
  .is-size-4 {
    font-size: 1.1rem !important;
    line-height: 1.4rem;
    margin: 0 0 0.3rem 0 !important;
    font-weight: 400;
  }
  .title:not(:last-child) {
    margin-bottom: 0.4rem;
  }
  .is-size-4 {
    font-size: 1.1rem !important;
    line-height: 1.4rem;
    margin: 0 0 0.3rem 0 !important;
  }
  .title:not(:last-child) {
    margin-bottom: 0.4rem;
  }
  .content {
    font-size: 90%;
  }

  .content:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .card-content {
    padding: 0.75rem;
  }
  .column {
    padding: 0;
  }
}
</style>
