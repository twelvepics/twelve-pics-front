<template>
  <!-- 
    TODO
    SHOW COMMENTS SERVER ERRORS SOMEWHERE HERE
  -->
  <div class="card comments" style="margin-top:25px;">
    <!-- CARD CONTENT -->
    <div class="card-content">
      <p class="title is-size-4" style="margin:0 0 1rem 0">Comments</p>
      <p class="content">
        <span
          v-if="isAuthenticated"
        >Please always remain civil, courteous and constructive. No spam or self promotion here.</span>
        <span v-else>You must be logged in to post a comment.</span>
      </p>
      <!-- ADD COMMENT FORM -->
      <form @submit.prevent="postComment" v-if="isAuthenticated">
        <div>
          <label class="label is-marginless">Add a comment</label>
          <div>
            <p
              v-if="comment.length <= 5000"
              class="content is-small is-marginless pb-05"
            >Have a comment about this story? Got a question? Post it.</p>
            <p
              v-else
              class="content isError is-small is-marginless pb-05"
            >Max length 5000 Characters</p>
          </div>
          <div class="control">
            <textarea class="textarea" placeholder="Your comment" v-model="comment" rows="3"></textarea>
          </div>
        </div>
        <div class="control mt10p20">
          <button
            class="button is-primary"
            :disabled="comment.trim().length === 0 || comment.length > 5000"
          >Add comment</button>
        </div>
      </form>
      <!-- ADD COMMENT FORM -->
      <!-- START COMMENT ITEMS -->
      <!-- ONE COMMENT -->
      <div v-for="(comment, idx) in comments" :key="idx">
        <div class="is-divider is-comment-divider"></div>
        <div class="comment-info">
          <a
            @click.prevent="gotoUserProfile(comment.from_username)"
          >{{ comment.from_user_display_name || comment.from_username }}</a>
          - {{ elapsed(comment.date_created) }}
          <span
            v-if="isMyComment(comment.from_user_key)"
          >
            -
            <a @click.prevent="editComment(idx)">Edit</a> -
            <a @click.prevent="deleteComment(comment._key, idx)">Delete</a>
          </span>
          <span
            v-if="comment_edit_idx === idx && comments[idx].comment.length > 5000"
            class="content isError is-small is-marginless pb-05"
          >- Max length 5000 Characters</span>
        </div>
        <div class="content comment" v-if="comment_edit_idx !== idx">
          <p class="comment">{{ comment.comment }}</p>
        </div>
        <!-- -->
        <div class="comment-edit" v-if="comment_edit_idx === idx">
          <div style="margin-top:.5rem">
            <textarea class="textarea" rows="2" v-model="comments[idx].comment" ref="new_comments"></textarea>
          </div>
          <button
            class="button is-primary is-small mt10p20"
            @click.prevent="updateComment($event, comment._key, idx)"
            :disabled="comments[idx].comment.trim().length === 0 || comments[idx].comment.length > 5000"
          >Save</button>
          <button
            class="button is-light is-small mt10p20 ml10"
            @click.prevent="cancelUpdateComment(idx)"
          >Cancel</button>
        </div>
        <!-- -->
      </div>
      <p class="is-divider is-comment-divider"></p>
      <!-- END ONE COMMENT -->
      <!-- END COMMENT ITEMS -->
    </div>
  </div>
</template>
<script>
// import { mapActions } from "vuex";
import axiosBase from "../services/axiosBase";
import { timeSince } from "../utils/dateutils";
import { mapGetters } from "vuex";
import * as Sentry from "@sentry/browser";

export default {
  props: ["story_key"],
  data() {
    return {
      is_debug: true,
      // page
      is_loading: false,
      is_error: false,
      errorMessage: "",
      // post comment
      is_sending: false,
      is_post_error: false,
      is_post_error_message: "",
      // comments
      comments: [],
      comment: "",
      comment_edit_idx: -1,
      current_comment: ""
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"])
  },
  methods: {
    async postComment() {
      try {
        this.is_sending = true;
        const response = await axiosBase.post(
          `/stories/${this.story_key}/comments`,
          {
            comment: this.comment
          }
        );
        const data = response.data;
        // console.log(this.comments);
        this.comments.unshift(data.comment);
        this.comment = "";
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          // console.log(error.response.status);
          // console.log(error.response.data);
          this.is_post_error = true;
          this.is_post_error_message = error.response.data.error;
        } else {
          console.log(error);
          Sentry.captureException(error);
        }
      } finally {
        this.is_sending = false;
      }
    },
    async getComments() {
      try {
        this.is_loading = true;
        const response = await axiosBase.get(
          `/stories/${this.story_key}/comments`
        );
        this.comments = response.data.comments;
      } catch (error) {
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.data);
          this.is_error = true;
          this.errorMessage = error.response.data.error;
        } else {
          console.log(error);
          Sentry.captureException(error);
        }
      } finally {
        this.is_loading = false;
      }
    },
    elapsed(ts) {
      return timeSince(ts);
    },
    gotoUserProfile(username) {
      this.$router.push({
        name: "user",
        params: { username }
      });
    },
    isMyComment: function(comment_from_user_key) {
      return (
        this.isAuthenticated &&
        comment_from_user_key === this.authenticatedUser._key
      );
    },
    editComment: async function(idx) {
      // console.log("editComment");
      // console.log(idx);
      this.comment_edit_idx = idx;
      this.current_comment = this.comments[idx].comment;
    },
    updateComment: async function(event, comment_key, idx) {
      try {
        console.log("editComment");
        // console.log(comment_key);
        // console.log(idx);
        // console.log(event);
        // console.log(this.$refs.new_comments[0].value);
        const rez = await axiosBase.put(
          `/stories/${this.story_key}/comments/${comment_key}`,
          {
            comment: this.$refs.new_comments[0].value
          }
        );
        this.comment_edit_idx = -1;
        this.comments[idx].comment = rez.data.comment;
        this.current_comment = "";
      } catch (error) {
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.data);
          this.is_error = true;
          this.errorMessage = error.response.data.error;
        } else {
          console.log(error);
          Sentry.captureException(error);
        }
      }
    },
    cancelUpdateComment: function(idx) {
      this.comments[idx].comment = this.current_comment;
      this.comment_edit_idx = -1;
    },
    deleteComment: async function(comment_key, idx) {
      try {
        // console.log("DeleteComment");
        // console.log(comment_key);
        // console.log(idx);
        await axiosBase.delete(
          `/stories/${this.story_key}/comments/${comment_key}`
        );
        this.comments.splice(idx, 1);
        this.comment_edit_idx = -1;
        this.current_comment = "";
      } catch (error) {
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.data);
          this.is_error = true;
          this.errorMessage = error.response.data.error;
        } else {
          console.log(error);
          Sentry.captureException(error);
        }
      }
    }
  },
  created() {
    this.getComments();
  }
};
</script>

<style scoped>
/*** comments ****/
.card.comments {
  margin-top: 25px;
}
.is-divider.is-comment-divider {
  margin: 12px 0 12px 0;
  border-top: 1px solid #dbdbdb;
}
.comment-info {
  color: #aaa;
  font-size: 90%;
  margin-bottom: 0.2rem !important;
}
.ml10 {
  margin-left: 0.5rem;
}
.isError {
  color: red;
}
</style>
