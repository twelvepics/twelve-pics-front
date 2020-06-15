<template>
  <div>
    <!-- DRAFT BOX-->
    <div v-if="is_draft && show_drafts" class="box story-item-draft" style="position: relative;">
      <button
        v-if="showEditButton"
        class="button is-primary"
        @click.prevent="goToEditStory(story._key)"
        style="position: absolute; top:.7rem; right:.7rem;"
      >Edit</button>

      <p class="title is-5" style="margin-bottom:.6em;padding-right:4rem;">
        <a v-if="story.is_viewable" @click.prevent="storyClicked">[DRAFT] {{ story.title }}</a>
        <span v-else>[DRAFT] {{ story.title }}</span>
      </p>
      <p class="pitch" v-html="nl2br(story.pitch)"></p>
      <div class="is-divider story-divider"></div>
      <p class="bottom-line">
        <span class="cat" v-if="category_display">[{{ category_display }}] -</span>
        Created {{ elapsed() }}
      </p>
    </div>
    <!-- END DRAFT BOX-->

    <!-- PIC LANDSCAPE BOX -->
    <div
      v-if="is_published && is_thumb_horizontal"
      class="box story-item-pic-landscape"
      style="position: relative; border: 1px solid #ddd;"
    >
      <button
        v-if="showEditButton"
        class="button is-primary"
        @click.prevent="goToEditStory(story._key)"
        style="position: absolute; top:.7rem; right:.7rem;"
      >Edit</button>
      <p class="title is-5" style="margin-bottom:.6em;padding-right:4rem;">
        <a @click.prevent="storyClicked">{{ story.title }}</a>
      </p>
      <p class="pic">
        <a @click.prevent="storyClicked">
          <img
            :src="story_thumb.web_path"
            :alt="story_thumb.description"
            :width="story_thumb.width"
            :height="story_thumb.height"
          />
        </a>
      </p>
      <p class="pitch" v-html="nl2br(story.pitch)"></p>
      <div class="is-divider story-divider"></div>
      <p class="bottom-line">
        <span
          class="icon is-left star"
          :class="{ upvoted, 'tooltip is-tooltip-warning is-tooltip-right': !isAuthenticated }"
          data-tooltip="Please authenticate to star a story"
          @click="starMe"
        >
          <font-awesome-icon icon="star"></font-awesome-icon>
        </span>
        <span class="cat">[{{ category_display }}]</span>
        - Posted {{ elapsed() }} -
        {{ story.comments_count || "No" }}
        {{ story.comments_count === 0 || story.comments_count > 1 ? "comments" : "comment" }}
      </p>
    </div>
    <!-- END PIC LANDSCAPE BOX-->

    <!-- PIC PORTRAIT BOX-->
    <div
      v-if="is_published && is_thumb_vertical"
      class="box story-item-pic-portrait"
      style="position: relative;border: 1px solid #ddd;"
    >
      <button
        v-if="showEditButton"
        class="button is-primary"
        @click.prevent="goToEditStory(story._key)"
        style="position: absolute; top:.7rem; right:.7rem;"
      >Edit</button>
      <div class="title-pitch">
        <p class="title is-5" style="margin-bottom:.6em;padding-right:4rem;">
          <a @click.prevent="storyClicked">{{ story.title }}</a>
        </p>
        <p class="pitch" v-html="nl2br(story.pitch)"></p>
      </div>
      <p class="pic" style="padding-top:.3rem;">
        <a @click.prevent="storyClicked">
          <img
            :src="story_thumb.web_path"
            :alt="story_thumb.description"
            :width="story_thumb.width"
            :height="story_thumb.height"
          />
        </a>
      </p>
      <div class="is-divider story-divider"></div>
      <p class="bottom-line">
        <span
          class="icon is-left star"
          :class="{ upvoted, 'tooltip is-tooltip-warning is-tooltip-right': !isAuthenticated }"
          data-tooltip="Please authenticate to star a story"
          @click="starMe"
        >
          <font-awesome-icon icon="star"></font-awesome-icon>
        </span>
        <span class="cat">[{{ category_display }}]</span>
        - Posted {{ elapsed() }} -
        {{ story.comments_count || "No" }}
        {{ story.comments_count === 0 || story.comments_count > 1 ? "comments" : "comment" }}
      </p>
    </div>
    <!-- END PIC PORTRAIT BOX-->
  </div>
</template>

<script>
import { categoriesDisplay } from "../../utils/categories";
import { timeSince } from "../../utils/dateutils";
import { mapGetters } from "vuex";
import { nl2br } from "../../utils/typography";
import { starMeMixin } from "../../mixins/starMeMixin";

export default {
  props: ["story", "user_info"],
  mixins: [starMeMixin],
  data() {
    return {
      num_comments: 0,
      categoriesDisplay,
      upvoted: this.story.upvoted
    };
  },
  methods: {
    storyClicked() {
      this.$router.push({
        name: "view-story",
        params: { slug: this.story.slug }
      });
    },
    elapsed() {
      return timeSince(this.story.date_created);
    },
    // CLEAN  EDIT / CREATE STORY FORM BEFORE LOADING IT
    async goToEditStory(key) {
      this.$router.push({
        name: "edit-story",
        params: { key }
      });
    },
    nl2br
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),
    is_draft() {
      return this.story.status === "draft";
    },
    is_published() {
      return this.story.status === "published";
    },
    show_drafts() {
      return (
        this.isAuthenticated &&
        this.story.author_key === this.authenticatedUser._key
      );
    },
    story_thumb() {
      return this.story.pics[0].small;
    },
    is_thumb_horizontal() {
      return this.story_thumb.width >= this.story_thumb.height;
    },
    is_thumb_vertical() {
      return !this.is_thumb_horizontal;
    },
    category_display() {
      return this.categoriesDisplay[this.story.category];
    },
    showEditButton: function() {
      return (
        this.isAuthenticated &&
        this.story.author_key === this.authenticatedUser._key
      );
    }
  },
  created() {
    // console.log("*************************");
    // console.log(this.story.author_key);
    // console.log(this.authenticatedUser._key);
    // console.log("*************************");
  }
};
</script>

<style scoped>
/**************** STORIES BOXES STYLES *****************/
.box {
  margin-bottom: 1.5rem;
}
.story-item-draft {
  background-color: #ffc610;
}
.story-item-draft a,
.story-item-draft .cat {
  color: #333;
}
.story-item-draft a:hover {
  color: #666;
}
.story-item-draft .story-divider {
  border-top: 0.1px solid #666;
}

.story-item-pic-landscape {
  display: grid;
  grid-template-columns: 200px 15px 1fr;
}

.story-item-pic-landscape .title {
  grid-column: 1 / -1;
}

.story-item-pic-landscape .pitch {
  grid-column: 3 / -1;
}

.story-item-pic-portrait {
  display: grid;
  grid-template-columns: 122px 15px 1fr;
  grid-auto-rows: min-content;
}

.story-item-pic-portrait .pic {
  grid-column: 1 / 2;
  grid-row: 1 / span 2;
}

.story-item-pic-portrait .title-pitch {
  grid-column: 3 / -1;
  grid-row: 1 / span 2;
}

.bottom-line {
  grid-column: 1 / -1;
}

.story-divider {
  grid-column: 1 / -1;
  margin-bottom: 0.3rem;
  border-top: 0.1px solid #dbdbdb;
}

/**** types ******/
.title {
  line-height: 1.2em;
}
.cat {
  color: #aaa;
}
.star {
  display: inline-block;
  color: #aaa;
  padding: 0 0.3rem 0 0;
  height: 0rem;
  width: none;
  cursor: pointer;
}
.upvoted {
  color: orange;
}
.pitch {
  --lh: 1.4rem;
  line-height: var(--lh);
  --max-lines: 6;
  max-height: calc(var(--lh) * var(--max-lines));
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
