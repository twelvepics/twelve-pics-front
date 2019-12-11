<template>
  <div class="card">
    <!-- START CONTENT -->
    <div class="card-content">
      <p class="title is-size-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquam eaque esse! Sint sit officia
        nulla iste minus.
      </p>
      <p class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolorum repellendus fugiat velit esse
        culpa sint quis cum optio minus consequatur laboriosam eveniet rem iure illum eos omnis, nulla
        assumenda dignissimos? Odit et dolores eveniet, quos iure saepe commodi? Suscipit vel expedita
        iusto perspiciatis amet ducimus omnis similique fuga nulla numquam, consectetur mollitia
        perferendis assumenda reiciendis odit! Excepturi, distinctio.
      </p>
      <component :is="storyLayout"></component>
      <p class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sint molestiae reiciendis dolor
        maiores blanditiis fuga vero dolorem officia quibusdam. Dicta sapiente iure ab odio ut libero,
        a minima ipsum vitae, consequuntur recusandae, ea officia. Iusto fugiat officia veritatis odit
        tenetur voluptatem tempore nesciunt omnis ducimus aliquid, adipisci harum accusamus.
      </p>
    </div>
    <!-- END CONTENT -->
  </div>
</template>
<script>
export default {
  props: ["story"],
  computed: {
    storyLayout() {
      if (this.picsLayout === "layout-horizontal") {
        return () => import("../components/StoryLayoutHorizontal.vue");
      } else if (this.picsLayout === "layout-vertical") {
        return () => import("../components/StoryLayoutVertical.vue");
      } else if (this.picsLayout === "layout-tiles") {
        return () => import("../components/StoryLayoutTiles.vue");
      }
      return () => import("../components/StoryLayoutCarousel.vue");
    }
  }
};
</script>