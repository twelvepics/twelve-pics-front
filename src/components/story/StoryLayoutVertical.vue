<template>
  <div
    class="content"
    style="width:100%; min-height:1200px;margin:30px 0 20px 0;border:1px solid #aaa; padding:1rem .5rem 1rem .5rem;"
  >
    <div
      class="pic-items"
      style="width:100%;text-align:center;"
      v-for="(pic, index) in pics"
      :key="index"
    >
      <div
        class="pic"
        :style="{
                    'max-width': `${pic.large.width}px`,
                    display: 'inline-block',
                    visibility: 'hidden'
                }"
      >
        <img :src="pic.large.web_path" :width="pic.large.width" alt @load="onPicLoad($event)" />
        <div class="caption" style="text-align:left;" v-html="nl2br(pic.caption)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { nl2br } from "../../utils/typography";

export default {
  props: ["pics"],
  data() {
    return {
      debug: false,
      pics_loaded_num: 0,
      all_pics_loaded: false
    };
  },
  methods: {
    picOrientation(pic) {
      return pic.width >= pic.height ? "horizontal" : "vertical";
    },
    onPicLoad(event) {
      event.target.parentNode.style.visibility = "visible";
      this.pics_loaded_num += 1;
      if (this.pics_loaded_num === this.num_pics) {
        // console.log("all pics loaded");
        this.all_pics_loaded = true;
        // emit to parent
        this.$emit("pics-loaded");
      }
    },
    nl2br
  },
  computed: {
    num_pics() {
      return this.pics.length;
    }
  },
  mounted() {
    console.log("#--- pics horizontal mounted ---#");
    // console.log(this.pics);
  }
};
</script>
<style scoped>
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
