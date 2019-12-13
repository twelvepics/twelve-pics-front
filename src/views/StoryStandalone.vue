<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-four-fifths-desktop">
        <!-- START LOADER / SERVER ERRORS-->
        <page-loader v-if="is_loading"></page-loader>
        <page-error v-else-if="is_error" :errorMessage="errorMessage"></page-error>
        <!-- ENDS LOADER / SERVER ERRORS-->
        <div v-else>
          <!-- START STORY -->
          <story :story="story"></story>
          <!-- END STORY -->
          <!-- START COMMENTS -->
          <story-comments :comments="comments"></story-comments>
          <!-- END COMMENTS -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Story from "../components/Story";
import StoryComments from "../components/StoryComments";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";

export default {
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
  props: {
    picsLayout: {
      default: "layout-tiles",
      type: String
    }
  }
};
</script>
<style>
/************** layout ***********/
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

main {
  flex-grow: 1;
}

navbar,
main,
footer {
  flex-shrink: 0;
}

main {
  margin-top: 90px;
}

footer {
  margin-top: 30px;
}

/************** spacing ***********/
.mt10p20 {
  margin-top: 10px;
  padding-bottom: 20px;
}
</style>
