<template>
  <div class="card">
    <!-- START CONTENT -->
    <div class="card-content">
      <p class="title is-size-4">{{ story.title }}</p>
      <div class="content">
        <div>
          <b>Author:&nbsp;</b>
          <a @click.prevent="gotoUserProfile(story.author_info.username)">
            {{
            story.author_info.display_name || story.author_info.username
            }}
          </a>
        </div>
        <div v-if="story.location.place_name">
          <b>Location:</b>
          {{ story.location.place_name }}
        </div>
        <div v-if="story.tags.length">
          <b>Tags:&nbsp;</b>
          <span class="greyish">{{ getTags() }}</span>
        </div>
      </div>
      <p class="content">{{ story.pitch }}</p>
      <component
        :is="storyLayout"
        :pics="story.pics"
        :tiles="story.layout === 'tiles' ? story.pics_tiles_layout : null"
        @pics-loaded="picsLoaded"
      ></component>
      <p class="content">{{ story.inspiration }}</p>
    </div>
    <!-- END CONTENT -->
  </div>
</template>
<script>
import StoryLayoutHorizontal from "../components/story/StoryLayoutHorizontal.vue";
import StoryLayoutVertical from "../components/story/StoryLayoutVertical.vue";
import StoryLayoutTiles from "../components/story/StoryLayoutTiles.vue";
import StoryLayoutCarousel from "../components/story/StoryLayoutCarousel.vue";
import StoryLayoutMobile from "../components/story/StoryLayoutMobile.vue";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;
const LAYOUT_SWITCH = 600;
export default {
  props: ["story"],
  components: {
    StoryLayoutHorizontal,
    StoryLayoutVertical,
    StoryLayoutTiles,
    StoryLayoutCarousel,
    StoryLayoutMobile
  },
  data: function() {
    return {
      layout: null
    };
  },
  computed: {
    storyLayout() {
      let l = this.layout;
      if (l === LAYOUT_MOBILE) {
        return StoryLayoutMobile;
      } else if (l === LAYOUT_FULL) {
        if (this.story.layout === "horizontal") {
          return StoryLayoutHorizontal;
        } else if (this.story.layout === "vertical") {
          return StoryLayoutVertical;
        } else if (this.story.layout === "tiles") {
          return StoryLayoutTiles;
        } else if (this.story.layout === "carousel") {
          return StoryLayoutCarousel;
        }
      }
      return null;
    }
  },
  //   computed: {
  //     storyLayout() {
  //       if (this.story.layout === "horizontal") {
  //         return () => import("../components/StoryLayoutHorizontal.vue");
  //       } else if (this.story.layout === "vertical") {
  //         return () => import("../components/StoryLayoutVertical.vue");
  //       } else if (this.story.layout === "tiles") {
  //         return () => import("../components/StoryLayoutTiles.vue");
  //       }
  //       return () => import("../components/StoryLayoutCarousel.vue");
  //     }
  //   },
  methods: {
    gotoUserProfile(username) {
      this.$router.push({
        name: "user",
        params: { username }
      });
    },
    getTags() {
      return this.story.tags.map(item => `#${item}`).join(", ");
    },
    picsLoaded() {
      console.log("pics loaded");
    },
    handleWindowChange(event) {
      if (event.matches) {
        // < LAYOUT_SWITCH
        console.log(`CHANGE < ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_MOBILE;
      } else {
        // >= LAYOUT_SWITCH
        console.log(`CHANGE >= ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_FULL;
      }
    },
    isLayoutMobile() {
      return this.layout === LAYOUT_MOBILE;
    },
    isLayoutFull() {
      return this.layout == LAYOUT_FULL;
    }
  },
  mounted() {
    console.log("#--- story component mounted ---#");
    // console.log(this.story);
  },
  created() {
    _mql = window.matchMedia(`(max-width: ${LAYOUT_SWITCH}px)`);
    console.log(_mql.matches);
    if (_mql.matches) {
      // < LAYOUT_SWITCH
      console.log(`INITIAL < ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_MOBILE;
    } else {
      // >= LAYOUT_SWITCH
      console.log(`INITIAL >= ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_FULL;
    }
    console.log(_mql);
    // initial state here
    _mql.addListener(this.handleWindowChange);
  },
  beforeDestroy() {
    _mql.removeListener(this.handleWindowChange);
  }
};
</script>
<style scoped>
.greyish {
  color: #999;
}
@media only screen and (max-width: 600px) {
  .is-size-4 {
    font-size: 1.1rem !important;
    line-height: 1.4rem;
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
}
</style>
