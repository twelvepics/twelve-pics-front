<template>
  <main>
    <!-- STORIES COLUMN -->
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START LOADER / SERVER ERRORS-->
        <div
          class="card"
          v-if="is_loading || is_error"
          style="text-align:center;height:60px;padding-top:10px;margin-bottom:10px"
        >
          <div
            v-if="!is_loading &&  is_error"
            class="isError"
            style="margin-top:7px;"
          >{{ errorMessage }}</div>
          <div v-if="is_loading" class="loader" style="margin:auto;"></div>
        </div>
        <!-- ENDS LOADER / SERVER ERRORS-->

        <!-- START STORIES -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Alain's stories</p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis praesentium
              esse veritatis nemo!
            </p>
            <!-- STORIES -->
            <story-brief v-for="(story, idx) in stories" :key="idx" :story="story"></story-brief>
            <!-- END STORIES -->
          </div>
        </div>
        <!-- ENDS STORIES -->
      </div>
    </div>
    <!-- ENDS STORIES COLUMN -->
    <!-- DEBUG -->
    <div class="columns is-centered">
      <div v-if="is_debug" class="column is-three-quarters-desktop">
        <!-- START PROFILE -->
        <div class="card" style="padding:20px;">
          <p>DEBUG</p>
          <p>
            <a @click="goToEditStory('e4d7e328-613e-41a1-b072-60d45ef3bc59')">Edit story</a>
            <br />
            <a @click="goToEditStory('45c744fe-e1e3-45c2-8df6-46a40fcfb27b')">Edit another story</a>
            <br />
            <a
              @click="goToEditStory('d17f6137-6765-48ea-a7b8-522561119ffa')"
            >Edit not authorized story</a>
            <br />
            <a @click="goToEditStory('056ca2a2-b2bd-41e9-9742-04319f9f1a')">Edit not found story</a>
          </p>
        </div>
      </div>
    </div>
    <!-- END DEBUG -->
  </main>
</template>

<script>
import axiosBase from "../services/axiosBase";
import UserStory from "../components/UserStory.vue";
export default {
  components: {
    UserStory
  },
  data() {
    return {
      is_debug: true,
      is_loading: false,
      // fetch errors
      is_error: false
    };
  },
  methods: {
    // CLEAN  EDIT / CREATE STORY FORM BEFORE LOADING IT
    async goToEditStory(key) {
      await this.$store.dispatch("clearCreateFormCache");
      this.$router.push({
        name: "edit-story",
        params: { key }
      });
    },
    async fetchData() {}
  },
  created() {
    this.fetchData();
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
</style>

