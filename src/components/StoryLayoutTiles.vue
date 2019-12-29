<template>
  <div class="content" style="margin:30px 0 30px 0;line-height:1.3rem;">
    <div class="tiles-layout">
      <div v-for="(row, rowIdx) in tiles" :key="rowIdx" :style="getRowStyle(rowIdx)">
        <div v-for="(pic, picIdx) in row" :key="picIdx">
          <!-- 
          --- {{rowIdx}}/{{picIdx}} ---
          -->
          <div class="pic">
            <img :src="tiles[rowIdx][picIdx].web_path" />
          </div>
        </div>
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
      debug: false
    };
  },
  methods: {
    getRowStyle(idx) {
      const colStr = this.tiles[idx]
        .map(p => {
          // resize depending on screen size
          console.log(`Screen" ${this.$mq}`);
          if (this.$mq === "widescreen") {
            return `${Math.round((p.tile_width / 5) * 4)}px`;
          } else if (this.$mq === "desktop") {
            return `${Math.round((p.tile_width / 16) * 11)}px`;
          } else if (this.$mq === "tablet") {
            return `${Math.round(p.tile_width / 3) * 2}px`;
          } else if (this.$mq === "mobile") {
            return `${Math.round((p.tile_width / 12) * 5)}px`;
          }
          return `${p.tile_width}px`; // fullhd
        })
        .join(" ");
      // console.log(colStr);
      return {
        display: "grid",
        "grid-template-columns": colStr,
        "grid-column-gap": "5px"
      };
    }
  },
  mounted() {
    console.log("#--- pics tiles mounted ---#");
    console.log(this.pics);
    console.log(this.tiles);
  }
};
</script>
<style scoped>
.tiles-layout {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
/* media queries */
@media only screen and (min-width: 1024px) {
  .story-padding {
    padding: 0 5rem 0 5rem;
  }
}
</style>