<template>
    <div class="content" style="border: 1px solid #ccc;  margin:30px 0 30px; 0;padding:0 25px 25px 25px">
        <!-- top selected image -->
        <div class="slideshow-pic-container">
            <div class="slideshow-pic">
                <img :src="pics[0].display.web_path" style="max-height:650px;" ref="top_pic" alt />
                <p class="caption" style="width:800px;text-align:left;" ref="top_caption">
                    {{ pics[0].caption }}
                </p>
            </div>
        </div>
        <!-- top selected image -->
        <!-- Start Carousel -->
        <!-- :style="{width: picOrientation(pic.display) === 'horizontal' ? '210px' : '150px'}" -->
        <!--
          style="margin:0; padding:0;border: 1px solid blue;"
          :style="{
              'max-width': picOrientation(pic.display) === 'horizontal' ? '210px' : '150px',
              'max-height': picOrientation(pic.display) === 'horizontal' ? '150px' : '190px'
          }"
        -->
        <!-- Slider main container -->
        <div class="swiper-container" ref="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <div
                    v-for="(pic, index) in pics"
                    :key="index"
                    class="swiper-slide"
                    :style="{
                        width: `${getThumbSize(pic.thumb).width}px`,
                        height: `${getThumbSize(pic.thumb).height}px`
                    }"
                >
                    <!-- Slide Content -->
                    <img
                        :src="pic.thumb.web_path"
                        :data-idx="index"
                        style="cursor:pointer;"
                        :style="{
                            'max-width': `${getThumbSize(pic.thumb).width}px`,
                            'max-height': `${getThumbSize(pic.thumb).height}px`,
                            border: '1px solid #777'
                        }"
                    />
                    <!-- Slide {{ index }} -->
                </div>
            </div>
            <!-- END Additional required wrapper -->
            <!-- If we need navigation buttons -->
            <!-- <div class="swiper-button-prev" style="color:red"></div>
            <div class="swiper-button-next" style="color:red"></div> -->
        </div>
        <!-- End Slider main container -->
    </div>
</template>

<script>
import Swiper from "swiper";

export default {
    props: ["pics"],
    data() {
        return {
            carousel: null
        };
    },

    methods: {
        picOrientation(pic) {
            return pic.width >= pic.height ? "horizontal" : "vertical";
        },
        getThumbSize(pic) {
            const _h = pic.height;
            const _w = pic.width;
            let width, height, divider;
            if (_w >= _h) {
                // horizontal, make it 126 high
                divider = _h / 126;
            } else {
                // vertical, make it 150 high
                divider = _h / 160;
            }
            width = Math.floor(_w / divider);
            height = Math.floor(_h / divider);
            return { width, height };
        },
        thumbClicked(item) {
            console.log("thumbClicked");
            console.log(item);
            console.log(item.getAttribute("data-idx"));
            const top_pic = this.$refs.top_pic;
            console.log(top_pic);
            console.log(top_pic.src);
            //
            const i = item.getAttribute("data-idx");
            top_pic.src = this.pics[i].display.web_path;
            this.$refs.top_caption.textContent = this.pics[i].caption;
        }
    },
    mounted() {
        console.log("GO");
        console.log(this.$refs["swiper-container"]);
        const vm = this;
        this.carousel = new Swiper(this.$refs["swiper-container"], {
            slidesPerView: "auto",
            spaceBetween: 15,
            grabCursor: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            on: {
                click: function(e) {
                    /* do something */
                    vm.thumbClicked(e.target);
                }
            }
        });
        console.log(this.carousel);
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
.caption {
    font-size: 0.85rem;
}

.swiper-container {
    width: 100%;
    height: 100%;
}

.slideshow-pic-container {
    margin: 15px auto 35px auto;
    width: 100%;
}

/* media queries */
@media only screen and (min-width: 1024px) {
    .story-padding {
        padding: 0 5rem 0 5rem;
    }
}
</style>
