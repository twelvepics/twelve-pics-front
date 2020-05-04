<template>
  <div class="content mobile-content">
    <div
      class="pic-items"
      style="width:100%;text-align:center;"
      v-for="(pic, index) in pics"
      :key="index"
    >
      <!-- :style="{
                    'max-width': `${pic.large.width}px`,
                    display: 'inline-block',
                    visibility: 'hidden'
      }"-->
      <div
        class="pic"
        :style="{
                    'max-width': pic_width(pic),
                    display: 'inline-block',
                    visibility: 'hidden'
                }"
      >
        <img :src="pic.large.web_path" :width="pic.large.width" alt @load="onPicLoad($event)" />
        <div class="caption" style="text-align:left;">{{ pic.caption }}</div>
      </div>
    </div>
  </div>
</template>

<script>
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
      console.log(pic);
      return pic.large.width >= pic.large.height ? "horizontal" : "vertical";
    },
    pic_width(pic) {
      if (this.picOrientation(pic) === "horizontal") return "100%";
      return "70%";
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
    }
  },
  computed: {
    num_pics() {
      return this.pics.length;
    }
  },
  mounted() {
    console.log("#--- pics horizontal mounted ---#");
  }
};
</script>
<style scoped>
.pic {
  margin-bottom: 1.5em;
}

.caption {
  font-size: 0.85rem;
  color: #999;
}
.mobile-content {
  width: 100%;
  min-height: 1200px;
  margin: 0;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  padding: 1rem 0 0 0;
}
</style>
