<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-four-fifths-desktop">
        <!-- START LOADER / SERVER ERRORS-->
        <div
          class="card"
          v-if="is_loading || is_error"
          style="text-align:center;height:60px;padding-top:10px;margin-bottom:10px"
        >
          <div
            v-if="!is_loading && is_error"
            class="isError"
            style="margin-top:7px;"
          >{{ errorMessage }}</div>
          <div v-if="is_loading" class="loader" style="margin:auto;"></div>
        </div>
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

export default {
  components: {
    Story,
    StoryComments
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

/************** spacing ***********/
.mt10p20 {
  margin-top: 10px;
  padding-bottom: 20px;
}
</style>