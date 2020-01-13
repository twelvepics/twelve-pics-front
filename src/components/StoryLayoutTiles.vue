<template>
    <div
        class="content"
        style="margin:30px 0 30px 0;line-height:1.3rem;border: 1px #ccc solid;padding:1rem .5rem 1rem .5rem"
    >
        <div class="tiles-layout" v-show="!isImageSelected">
            <div v-for="(row, rowIdx) in tiles" :key="rowIdx" :style="getRowStyle(rowIdx)">
                <div v-for="(pic, picIdx) in row" :key="picIdx">
                    <div class="pic">
                        <img :src="tiles[rowIdx][picIdx].web_path" @click="imageClicked(rowIdx, picIdx)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-show="isImageSelected" style="width:100%;text-align: center;">
            <div
                :style="{
                    'max-width': picOrientation() === 'horizontal' ? '850px' : '450px',
                    display: 'inline-block',
                    position: 'relative'
                }"
            >
                <a class="delete is-medium" style="position:absolute;right:5px;top:5px;" @click="closeImage"></a>
                <img
                    :src="imageSelected !== null && pics[imageSelected].large.web_path"
                    ref="imageLarge"
                    :width="picOrientation() === 'horizontal' ? '850px' : '450px'"
                />
                <div class="caption" style="text-align:left;">
                    {{ imageSelected !== null && pics[imageSelected].caption }}
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
            debug: false,
            isImageSelected: false,
            imageSelected: null
        };
    },
    methods: {
        getRowStyle(idx) {
            // CALCULATE HEIGHT OF TILES AREA HERE
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
            // get id of image
            let idx = 0;
            for (let i = 0; i < rowIdx; i++) {
                idx += this.tiles[i].length;
            }
            idx += picIdx;
            console.log(`idx -> ${idx}`);
            console.log(this.pics[idx].large.web_path);
            // console.log(this.$refs);
            this.imageSelected = idx;
            if (this.$refs.imageLarge) this.$refs.imageLarge.src = this.pics[idx].large.web_path;
            this.isImageSelected = true;
            console.log(this.$refs.imageLarge);
        },
        closeImage() {
            this.isImageSelected = false;
            this.imageSelected = null;
            this.$refs.imageLarge.src = "";
        },
        picOrientation() {
            let pic;
            if (this.imageSelected !== null) {
                pic = this.pics[this.imageSelected].large;
                return pic.width >= pic.height ? "horizontal" : "vertical";
            }
            return null;
        }
        // tilesHeight() {
        //     console.log(this.tiles);
        //     console.log(this.tiles.length);
        //     let total = 0;
        //     for (let i = 0; i < this.tiles.length; i++) {
        //         total += this.tiles[i][0].tile_height;
        //     }
        //     total += this.tiles.length * 5;
        //     console.log(`${total}px`);
        //     return `${total}px`;
        // }
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
