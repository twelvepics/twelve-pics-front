<template>
  <div>
    <!-- DRAFT -->
    <div v-if="is_draft && show_drafts" class="box story-item-draft" style="position: relative;">
      <p class="title">
        <!-- <a @click.prevent="storyClicked">[DRAFT] {{ story.title }}</a> -->
        <a v-if="story.is_viewable" @click.prevent="storyClicked">[DRAFT] {{ story.title }}</a>
        <span v-else>[DRAFT] {{ story.title }}</span>
      </p>
      <p class="pitch" v-html="nl2br(story.pitch)"></p>
      <div class="is-divider story-divider"></div>
      <p class="bottom-line">
        <button
          v-if="showEditButton"
          class="button edit-button is-primary is-small"
          @click.prevent="goToEditStory(story._key)"
        >Edit</button>
        <span class="cat" v-if="category_display">[{{ category_display }}] -</span>
        Created {{ elapsed() }}
      </p>
    </div>
    <!-- END DRAFT -->

    <!-- PIC LANDSCAPE BOX -->
    <div v-if="is_published" class="box">
      <p class="title">
        <a @click.prevent="storyClicked">{{ story.title }}</a>
      </p>
      <p class="pic">
        <a @click.prevent="storyClicked">
          <img
            :src="story_thumb.web_path"
            :alt="story_thumb.description"
            :width="is_thumb_horizontal ? story_thumb.width : story_thumb.width - 50"
            :height="story_thumb.height - 50"
          />
        </a>
      </p>
      <div class="is-divider story-divider"></div>
      <p class="bottom-line">
        <button
          v-if="showEditButton"
          class="button edit-button is-primary is-small"
          @click.prevent="goToEditStory(story._key)"
        >Edit</button>
        <span
          v-else
          class="icon is-left star"
          :class="{ upvoted, 'tooltip is-tooltip-warning is-tooltip-right': !isAuthenticated }"
          data-tooltip="Please authenticate to star a story"
          @click="starMe"
        >
          <font-awesome-icon icon="star"></font-awesome-icon>
        </span>
        <span class="cat">[{{ category_display }}]</span>
        - Posted {{ elapsed() }}
        <!-- 
        -
        {{ story.comments_count || "No" }}
        {{ story.comments_count === 0 || story.comments_count > 1 ? "comments" : "comment" }}
        -->
      </p>
      <p class="pitch" v-html="nl2br(story.pitch)"></p>
    </div>
    <!-- END PIC LANDSCAPE BOX-->
  </div>
</template>

<script>
import { categoriesDisplay } from "../../utils/categories";
import { timeSince } from "../../utils/dateutils";
import { mapGetters } from "vuex";
import axiosBase from "../../services/axiosBase";
import * as Sentry from "@sentry/browser";
import { nl2br } from "../../utils/typography";

export default {
  props: ["story", "user_info"],
  data() {
    return {
      num_comments: 0,
      categoriesDisplay,
      upvoted: this.story.upvoted
    };
  },
  methods: {
    async starMe() {
      console.log("starMe");
      try {
        if (this.isAuthenticated) {
          if (!this.upvoted) {
            await axiosBase.post(`/stories/${this.story._key}/upvote`);
            this.upvoted = true;
          } else {
            // :story_key/upvotes/:upvote_key
            await axiosBase.delete(
              `/stories/${this.story._key}/upvote/${this.authenticatedUser._key}`
            );
            this.upvoted = false;
          }
        }
      } catch (e) {
        if (e.response) {
          if (e.response.status) {
            console.log(e.response);
          }
        } else {
          console.log(e);
          Sentry.captureException(e);
        }
      }
    },
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
    // toast -----------------------------------------------------
    // toastIt
    toastIt(messageObj, duration = 3000) {
      // console.log("toastIt I was called");
      // console.log(messageObj.message.join('<br />'));
      this.showToast = true;
      this.toastMessage = messageObj.message;
      this.toastType = messageObj.messageType;
      this.showToastTimeout = setTimeout(() => {
        this.closeToast();
      }, duration);
    },
    // closeToast
    closeToast() {
      if (this.showToastTimeout) {
        clearTimeout(this.showToastTimeout);
      }
      this.showToast = false;
      this.toastMessageType = "";
      this.toasrMessage = "";
    },
    // toastStoryDeleted
    toastStoryDeleted() {
      this.toastIt({
        message: ["This Story has been deleted"],
        messageType: "toast-top-centered is-warning"
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
      return this.story.pics[0].medium;
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
  margin-top: 1.2rem;
}
.box {
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 0.75rem;
  /* margin-bottom: 1.2rem; */
}
.title {
  line-height: 1.3em;
  margin: 0 0 0.8rem 0 !important;
  font-weight: 400;
  font-size: 1rem;
}
.story-item-draft {
  background-color: #ffc610;
  border: 1px solid #d4a920;
}

.story-item-draft .title {
  margin-bottom: 0 !important;
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
.pitch {
  font-size: 90%;
  margin-top: 0.3rem;
  --lh: 1.3rem;
  line-height: var(--lh);
  --max-lines: 3;
  max-height: calc(var(--lh) * var(--max-lines));
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.story-divider {
  margin-bottom: 0.3rem;
  border-top: 0.1px solid #dbdbdb;
}
.bottom-line {
  font-size: 85%;
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
.cat {
  color: #aaa;
}
.pic {
  text-align: center;
}
.button {
  padding: 0 0.5rem 0 0.5rem;
  border-radius: 0;
  margin-right: 0.4rem;
  height: auto;
  border-radius: 2px;
}
</style>
