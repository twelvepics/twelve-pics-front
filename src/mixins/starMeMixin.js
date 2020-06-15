import axiosBase from '../services/axiosBase';
import * as Sentry from '@sentry/browser';

export const starMeMixin = {
  methods: {
    async starMe() {
      console.log('starMe');
      try {
        if (this.isAuthenticated) {
          if (!this.upvoted) {
            await axiosBase.post(`/stories/${this.story._key}/upvote`);
            // console.log('__UPVOTE__');
            this.upvoted = true;
          } else {
            // :story_key/upvotes/:upvote_key
            // console.log('__DOWNVOTE__');
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
  },
};
