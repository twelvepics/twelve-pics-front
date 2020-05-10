<template>
  <!-- The Modal -->
  <div
    id="story-modal"
    class="story-modal"
    style="display: block;"
    v-on:click.stop.self="closeStory"
  >
    <!-- STICKY HEADER -->
    <div class="heady">
      <div class="columns is-mobile" style="margin:0;padding:0;">
        <div
          v-if="story"
          class="column"
          style="padding-left:35px;"
        >{{story.author_info.display_name || story.author_info.username}} - {{ elapsed() }}</div>
        <div v-if="story" class="column is-narrow has-text-right" style="padding-right:35px;">
          <span style="font-weight:medium;padding-right:3px;">
            <a @click.prevent="closeStory()">CLOSE</a>
          </span>
          <button class="delete" style="margin-top:2px;" @click.prevent="closeStory()"></button>
        </div>
      </div>
    </div>
    <!-- END STICKY -->

    <!-- START LOADER / SERVER ERRORS-->
    <div class="card">
      <!-- Modal content -->
      <div class="story-modal-content">
        <page-loader v-if="is_loading"></page-loader>
        <page-error v-else-if="is_error" :errorMessage="errorMessage"></page-error>
        <div v-else class="content">
          <!-- START STORY -->
          <story :story="story"></story>
          <!-- END STORY -->
          <!-- START COMMENTS -->
          <story-comments :story_key="story._key" v-if="story.allow_comments"></story-comments>
          <!-- END COMMENTS -->
          <div style="margin-top:50px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axiosBase from "../services/axiosBase";
import Story from "../components/Story";
import StoryComments from "../components/StoryComments";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import * as Sentry from "@sentry/browser";
import { timeSince } from "../utils/dateutils";

export default {
  name: "storyModal",
  components: {
    Story,
    StoryComments,
    PageLoader,
    PageError
  },
  data() {
    return {
      is_debug: true,
      is_loading: false,
      // fetch errors
      is_error: false,
      errorMessage: "",
      //
      story: null,
      comments: []
    };
  },
  mounted() {
    console.log("StoryModal mounted");
    // this.$store.state.storyMounted = true;
    // can pass only one arg to state, so make it an object
    this.setStoryComponentMounted();
  },
  methods: {
    ...mapActions([
      "setStoryComponentMounted",
      "resetStoryComponentHomeLayout",
      "resetStoryComponentGenericLayout"
    ]),
    elapsed() {
      return timeSince(this.story.date_created);
    },
    closeStory() {
      // console.log("Closing story");
      // this.resetStoryComponentHomeLayout();
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async fetchData() {
      try {
        this.is_loading = true;
        const slug = this.$route.params.slug;
        // console.log(slug);
        //     // await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axiosBase.get(`/stories/${slug}`);
        this.story = response.data.story;
        // GET COMMENTS
        this.is_loading = false;
      } catch (e) {
        this.is_loading = false;
        this.is_error = true;
        if (e.response) {
          if (e.response.status === 404) {
            this.errorMessage = "STORY NOT FOUND";
          } else {
            // Most probably a 500
            this.errorMessage = "SERVER ERROR";
          }
        } else {
          console.log(e);
          Sentry.captureException(e);
        }
      }
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    console.log("StoryModal beforeDestroy");
    // this.resetStoryComponentGenericLayout();
    this.resetStoryComponentHomeLayout();
  },
  destroy() {
    // reset scrollbar
    console.log("StoryModal destroy");
  }
};
</script>

<style>
/***** SCROLL BAR WEBKIT & GECKO *****/
.story-modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 10;
  /* Sit on top */
  left: 0;
  top: 52px;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.8);
  /* Black w/ opacity */
  padding: 0 5rem 0 5rem;
}

/* Modal Content/Box */
.story-modal-content {
  background-color: #eff0eb;
  /* 15% from the top and centered */
  padding: 35px 20px 20px 20px;
  /* border: 1px solid #222; */
  width: 100%;
}

/* Modal / hide scrollbar chrome applekit */
body.no-scrollbar-webkit::-webkit-scrollbar {
  display: none;
}

/* Modal / hide scrollbar firefox */
html.frf-hide-sb {
  scrollbar-width: none;
}

/*** sticky header ***/
.heady {
  position: -webkit-sticky;
  /* Safari */
  position: sticky;
  top: 0px;
  left: 0px;
  background: rgb(38, 96, 161);
  z-index: 1000;
  height: 45px;
  color: white;
}

.heady a,
.heady a:hover {
  color: white;
}

/*** content takes all width if <= 1024 ***/
@media only screen and (max-width: 1024px) {
  .story-modal {
    padding: 0;
  }
}

@media only screen and (max-width: 600px) {
  .heady {
    font-size: 90%;
  }
  .story-modal-content {
    background-color: #eff0eb;
    /* 15% from the top and centered */
    padding: 25px 15px 15px 15px;
    /* border: 1px solid #222; */
    width: 100%;
  }
}

/************** spinner **************/
.loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*** spacing ***/
</style>
