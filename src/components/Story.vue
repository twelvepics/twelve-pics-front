<template>
  <div class="card">
    <!-- START CONTENT -->
    <div class="card-content">
      <p class="title is-size-4">{{ story.title }}</p>
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
  mounted() {
    console.log("#--- story mounted ---#");
    console.log(this.story);
  }
};
</script>