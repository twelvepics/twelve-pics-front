<template>
  <div class="content" style="border: 1px solid #ccc;  margin:30px 0 0 0;overflow:hidden;">
    <!-- Start Carousel -->
    <div id="carousel" ref="carousel" class="carousel">
      <div v-for="(pic, index) in pics" :key="index">
        <!-- Slide Content -->
        <img :src="pic.thumb.web_path" style="max-width:210px; max-height:180px;" />
      </div>
    </div>
    <!-- End Carousel -->
  </div>
</template>

<script>
// https://github.com/Wikiki/bulma-extensions/issues/18 YES YES YES
import BulmaCarousel from "bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js";

export default {
  props: ["pics"],
  mounted() {
    console.log("GO");
    this.carousel = new BulmaCarousel(this.$refs.carousel);
  }
};
</script>

<style scoped>
</style>