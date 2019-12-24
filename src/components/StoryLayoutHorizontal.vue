<template>
  <div class="content" style="border: 1px solid #ccc; width:100%; margin:30px 0 30px 0;">
    <div class="pic-items horizontal-scrollable">
      <div v-for="(pic, index) in pics" :key="index" class="pic">
        <img
          :src="pic.display.web_path"
          :width="picOrientation(pic.display) === 'horizontal' ? 800 : 427"
          height="auto"
          alt
        />
        <p class="caption" style="max-width:800px;">{{pic.caption}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pics"],
  data() {
    return {
      debug: false
    };
  },
  methods: {
    picOrientation(pic) {
      return pic.width >= pic.height ? "horizontal" : "vertical";
    }
  },
  mounted() {
    console.log("#--- pics horizontal mounted ---#");
    console.log(this.pics);
  }
};
</script>
<style scoped>
.horizontal-scrollable {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: center;
  padding: 25px;
}

.horizontal-scrollable:last-child {
  margin-right: 25px;
}

.pic {
  flex: 0 0 auto;
}

.pic + .pic {
  margin-left: 40px;
}

/* .pic {
            display: inline-block;
        } */

.caption {
  font-size: 0.85rem;
}
/* media queries */
@media only screen and (min-width: 1024px) {
  .story-padding {
    padding: 0 5rem 0 5rem;
  }
}
</style>