<template>
  <!-- PIC LANDSCAPE BOX -->
  <div class="box">
    <p class="title">
      <router-link
        v-bind:to="{
                    name: 'view-story',
                    params: { slug: story.slug }
                }"
      >{{ story.title }}</router-link>
    </p>
    <p class="info-line-1">
      <span class="cat">[{{ category_display }}]</span>
      - Author:
      <a
        @click.prevent="gotoUserProfile"
      >{{ story.author_info.display_name || story.author_info.username }}</a>
    </p>
    <p class="pic">
      <router-link
        v-bind:to="{
                    name: 'view-story',
                    params: { slug: story.slug }
                }"
      >
        <img
          :src="story_thumb.web_path"
          :alt="story_thumb.description"
          :width="is_thumb_horizontal ? story_thumb.width : story_thumb.width - 50"
          :height="story_thumb.height - 50"
        />
      </router-link>
    </p>
    <div class="is-divider story-divider"></div>
    <p class="info-line-2">
      <span
        class="icon is-left star"
        :class="{ upvoted, 'tooltip is-tooltip-warning is-tooltip-right': !isAuthenticated }"
        data-tooltip="Please authenticate to star a story"
        @click="starMe"
      >
        <font-awesome-icon icon="star"></font-awesome-icon>
      </span>
      {{ elapsed() }} -
      {{ story.comments_count || "No" }}
      {{ story.comments_count === 0 || story.comments_count > 1 ? "comments" : "comment" }}
    </p>
    <p class="pitch" v-html="nl2br(story.pitch)"></p>
  </div>

  <!-- END PIC LANDSCAPE BOX-->
</template>

<script>
import { categoriesDisplay } from "../../utils/categories";
import { timeSince } from "../../utils/dateutils";
// import axiosBase from "../../services/axiosBase";
import { starMeMixin } from "../../mixins/starMeMixin";
import { mapGetters } from "vuex";
// import * as Sentry from "@sentry/browser";
import { nl2br } from "../../utils/typography";

export default {
  props: ["story"],
  mixins: [starMeMixin],
  data() {
    return {
      categoriesDisplay,
      upvoted: this.story.upvoted
    };
  },
  methods: {
    elapsed() {
      return timeSince(this.story.date_created);
    },
    gotoUserProfile() {
      // console.log("gotoUserProfile");
      this.$router.push({
        name: "user",
        params: { username: this.story.author_info.username }
      });
    },
    nl2br
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),

    story_thumb() {
      return this.story.pics[0].medium;
    },
    is_thumb_horizontal() {
      return this.story_thumb.width >= this.story_thumb.height;
    },
    is_thumb_vertical() {
      return !this.is_thumb_horizontal();
    },
    category_display() {
      return this.categoriesDisplay[this.story.category];
    }
  },
  created() {
    // console.log("*************************");
    // // console.log(this.story);
    // console.log(this.categoriesDisplay);
    // console.log("*************************");
  }
};
</script>

<style scoped>
/**************** STORIES BOXES STYLES *****************/

/**** types ******/
.box {
  border-radius: 0;
  padding: 0.75rem;
}
.title {
  line-height: 1.3em;
  margin: 0 0 0.2rem 0 !important;
  font-weight: 400;
  font-size: 1rem;
}
.info-line-1 {
  font-size: 90%;
  margin-bottom: 0.6rem;
}
.info-line-2 {
  font-size: 90%;
}
.icon {
  width: auto;
}
.cat {
  color: #aaa;
}
.star {
  display: inline-block;
  color: #aaa;
  padding: 0 0.1rem 0 0;
  height: 0rem;
  width: none;
  cursor: pointer;
  font-size: 120%;
}
.upvoted {
  color: orange;
}
.pic {
  text-align: center;
}
.pitch {
  font-size: 90%;
  margin-top: 0.15rem;
  --lh: 1.4rem;
  line-height: var(--lh);
  --max-lines: 3;
  max-height: calc(var(--lh) * var(--max-lines));
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.story-divider {
  margin: 0.5rem 0 0 0;
}
</style>
