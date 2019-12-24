<template>
  <div class="content" style="width:100%; margin:30px 0 0 0;">
    <div class="pic-items" style="width:100%;text-align: center;">
      <div
        v-for="(pic, index) in pics"
        :key="index"
        class="pic"
        :style="{'max-width': picOrientation(pic.display) === 'horizontal' ? '850px' : '450px', display:'inline-block' }"
      >
        <img
          :src="pic.display.web_path"
          :width="picOrientation(pic.display) === 'horizontal' ? '850px' : '450px'"
          height="auto"
          alt
        />
        <div class="caption" style="text-align:left;">{{pic.caption}}</div>
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
.pb-05 {
  padding-bottom: 0.5rem;
}

.m-30-0-15-0 {
  margin: 30px 0 15px 0;
}

.mt10p20 {
  margin-top: 10px;
  padding-bottom: 20px;
}

.mt20 {
  margin-top: 20px;
}

/* ends local */

.pic {
  margin-bottom: 1.5em;
}

.caption {
  font-size: 0.85rem;
}

/* media queries */
/* @media only screen and (min-width: 1024px) {
  .story-padding {
    padding: 0 5rem 0 5rem;
  }
} */
</style>