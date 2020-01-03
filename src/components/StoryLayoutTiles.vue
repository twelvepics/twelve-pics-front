<template>
    <div class="content" style="margin:30px 0 30px 0;line-height:1.3rem;">
        <div class="tiles-layout" v-show="!isImageSelected">
            <div v-for="(row, rowIdx) in tiles" :key="rowIdx" :style="getRowStyle(rowIdx)">
                <div v-for="(pic, picIdx) in row" :key="picIdx">
                    <!-- 
          --- {{rowIdx}}/{{picIdx}} ---
          -->
                    <div class="pic">
                        <img :src="tiles[rowIdx][picIdx].web_path" @click="imageClicked(rowIdx, picIdx)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-show="isImageSelected" style="width:100%;text-align: center;">
            <div
                :style="{
                    'max-width': picOrientation(pics[imageSelected].display) === 'horizontal' ? '900px' : '450px',
                    display: 'inline-block',
                    position: 'relative'
                }"
            >
                <a class="delete is-medium" style="position:absolute;right:5px;top:5px;" @click="closeImage"></a>
                <img
                    :src="pics[imageSelected].display.web_path"
                    ref="imageSelected"
                    :width="picOrientation(pics[imageSelected].display) === 'horizontal' ? '900px' : '450px'"
                />
                <div class="caption" style="text-align:left;">{{ pics[imageSelected].caption }}</div>
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
            imageSelected: 0
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
        },
        imageClicked(rowIdx, picIdx) {
            // console.log(`Image clicked ${rowIdx}/${picIdx}`);
            this.isImageSelected = true;
            // get id of image
            let idx = 0;
            for (let i = 0; i < rowIdx; i++) {
                idx += this.tiles[i].length;
            }
            idx += picIdx;
            // console.log(this.pics[idx].display.web_path);
            // console.log(this.$refs);
            this.imageSelected = idx;
            this.$refs.imageSelected.src = this.pics[idx].display.web_path;
        },
        closeImage() {
            this.isImageSelected = false;
            this.imageSelected = 0;
        },
        picOrientation(pic) {
            return pic.width >= pic.height ? "horizontal" : "vertical";
        }
    },
    mounted() {
        console.log("#--- pics tiles mounted ---#");
        // console.log(this.pics);
        // console.log(this.tiles);
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
</style>
