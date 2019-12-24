<template>
  <div class="card">
    <!-- START CONTENT -->
    <div class="card-content">
      <p class="title is-size-4">{{ story.title }}</p>
      <div class="content">
        <div>
          <b>Author:&nbsp;</b>
          <a
            @click.prevent="gotoUserProfile(story.author_info.username)"
          >{{story.author_info.display_name || story.author_info.username}}</a>
        </div>
        <div v-if="story.location.place_name">
          <b>Location:</b>
          {{ story.location.place_name}}
        </div>
        <div v-if="story.tags.length">
          <b>Tags:&nbsp;</b>
          <span class="greyish">{{ getTags() }}</span>
        </div>
      </div>
      <p class="content">{{ story.pitch}}</p>
      <component :is="storyLayout" :pics="story.pics"></component>
      <p class="content">{{story.inspiration}}</p>
    </div>
    <!-- END CONTENT -->
  </div>
</template>
<script>
export default {
  props: ["story"],
  computed: {
    storyLayout() {
      if (this.story.layout === "horizontal") {
        return () => import("../components/StoryLayoutHorizontal.vue");
      } else if (this.story.layout === "vertical") {
        return () => import("../components/StoryLayoutVertical.vue");
      } else if (this.story.layout === "tiles") {
        return () => import("../components/StoryLayoutTiles.vue");
      }
      return () => import("../components/StoryLayoutCarousel.vue");
    }
  },
  methods: {
    gotoUserProfile(username) {
      this.$router.push({
        name: "user",
        params: { username }
      });
    },
    getTags() {
      return this.story.tags.map(item => `#${item}`).join(", ");
    }
  },
  mounted() {
    console.log("#--- story component mounted ---#");
    console.log(this.story);
  }
};
</script>
<style scoped>
.greyish {
  color: #999;
}
</style>>
