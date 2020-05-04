<template>
  <div
    class="content"
    style="margin:30px 0 30px 0;line-height:1.3rem;border: 1px #ccc solid;padding:1rem .5rem 1rem .5rem;position:relative;"
  >
    <a
      class="delete is-medium"
      style="position:absolute;right:5px;top:5px;background:#777;"
      @click="closeImage"
      v-show="isImageSelected"
    ></a>
    <div class="tiles-layout" v-show="!isImageSelected" :style="{ 'min-height': tilesHeight() }">
      <div v-for="(row, rowIdx) in tiles" :key="rowIdx" :style="getRowStyle(rowIdx)">
        <div v-for="(pic, picIdx) in row" :key="picIdx">
          <div class="pic">
            <img :src="tiles[rowIdx][picIdx].web_path" @click="imageClicked(rowIdx, picIdx)" />
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-show="isImageSelected" style="width:100%;text-align:center;">
      <div
        class="loader"
        style="position:absolute;"
        :style="{ visibility: selected_pic_loaded ? 'hidden' : 'visible' }"
      ></div>
      <div
        :style="{
                    'max-width': pics[imageSelected] && `${pics[imageSelected].large.width}px`,
                    'min-height': pics[imageSelected] && getPicMinHeight(pics[imageSelected]),
                    display: 'inline-block',
                    position: 'relative',
                    visibility: selected_pic_loaded ? 'visible' : 'hidden'
                }"
      >
        <img ref="imageLarge" @load="onPicLoad()" />
        <div
          class="caption"
          style="text-align:left;"
        >{{ imageSelected !== null && pics[imageSelected].caption }}</div>
      </div>
    </div>
  </div>
</template>

<script>
//  breakpoints: { // default breakpoints - customize this
//     mobile: 768,
//     tablet: 1023,
//     desktop: 1215,
//     widescreen: 1407,
//     fullhd: Infinity,
//   }
export default {
  props: ["pics", "tiles"],
  data() {
    return {
      debug: false,
      isImageSelected: false,
      imageSelected: null,
      selected_pic_loaded: false
    };
  },
  methods: {
    onPicLoad() {
      console.log("PIC LOADED");
      this.selected_pic_loaded = true;
      if (!this.$refs.imageLarge.width)
        this.$refs.imageLarge.width = this.pics[this.imageSelected].large.width;
    },
    resampler(dim) {
      if (this.$mq === "widescreen") {
        return Math.round((dim / 5) * 4);
      } else if (this.$mq === "desktop") {
        return Math.round((dim / 16) * 11);
      } else if (this.$mq === "tablet") {
        return Math.round((dim / 3) * 2);
      } else if (this.$mq === "mobile") {
        return Math.round((dim / 12) * 5);
      }
      return dim;
    },
    getPicMinHeight(pic) {
      return `${this.resampler(pic.large.height)}px`;
    },
    getRowStyle(idx) {
      // CALCULATE HEIGHT OF TILES AREA HERE
      const colStr = this.tiles[idx]
        .map(p => {
          return `${this.resampler(p.tile_width)}px`;
        })
        .join(" ");
      // console.log(colStr);
      return {
        display: "grid",
        "grid-template-columns": colStr,
        "grid-column-gap": "5px"
      };
    },
    imageClicked(rowIdx, picIdx) {
      console.log("IMAGE CLICKED");
      // get id of image
      let idx = 0;
      for (let i = 0; i < rowIdx; i++) {
        idx += this.tiles[i].length;
      }
      idx += picIdx;
      // console.log(`idx -> ${idx}`);
      // console.log(this.pics[idx].large.web_path);
      this.imageSelected = idx;
      // console.log(this.$refs);
      this.$refs.imageLarge.src = this.pics[idx].large.web_path;
      if (this.$refs.imageLarge.complete) {
        console.log("IMAGE COMPLETE");
        this.$refs.imageLarge.width = this.pics[idx].large.width;
        this.selected_pic_loaded = true;
      }

      this.isImageSelected = true;
      // console.log(this.$refs.imageLarge);
    },
    closeImage() {
      this.isImageSelected = false;
      this.imageSelected = null;
      this.selected_pic_loaded = false;
      this.$refs.imageLarge.src = "";
    },
    picOrientation() {
      let pic;
      if (this.imageSelected !== null) {
        pic = this.pics[this.imageSelected].large;
        return pic.width >= pic.height ? "horizontal" : "vertical";
      }
      return null;
    },
    tilesHeight() {
      let total = 0;
      for (let i = 0; i < this.tiles.length; i++) {
        total += this.tiles[i][0].tile_height;
      }
      total = this.resampler(total);
      return `${total}px`;
    },
    picHeight() {}
  },
  mounted() {
    console.log("#--- pics tiles mounted ---#");
    console.log(`pixel ratio -> ${window.devicePixelRatio}`);
    // console.log(this.pics);
    // console.log(this.tiles);
    const images = new Array();
    function preload(pics) {
      for (let i = 0; i < pics.length; i++) {
        images[i] = new Image();
        images[i].src = pics[i];
        console.log(`preloaded ${pics[i]}`);
      }
    }
    // console.log(this.pics.map(p => p.large.web_path));
    preload(this.pics.map(p => p.large.web_path));
  }
};
</script>
<style scoped>
.tiles-layout {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
.pic img {
  cursor: pointer;
}
.caption {
  font-size: 0.85rem;
}
/* media queries */
@media only screen and (min-width: 1024px) {
  .story-padding {
    padding: 0 5rem 0 5rem;
  }
}

.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  top: 35%;
  left: 50%;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
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
