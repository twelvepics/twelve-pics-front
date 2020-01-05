<template>
    <div class="content" style="border: 1px solid #ddd; width:100%; margin:30px 0 30px 0;">
        <!-- Slider main container -->
        <div class="swiper-container" ref="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <div
                    v-for="(pic, index) in pics"
                    :key="index"
                    class="swiper-slide"
                    :style="{
                        width: `${getPicSize(pic.large).width}px`,
                        'padding-bottom': '15px'
                    }"
                >
                    <img
                        :src="pic.large.web_path"
                        :style="{
                            'max-width': `${getPicSize(pic.small).width}px`,
                            'max-height': `${getPicSize(pic.small).height}px`,
                            border: '1px solid #777'
                        }"
                    />
                    <p class="caption">{{ pic.caption }}</p>
                </div>
            </div>
            <!-- END Additional required wrapper -->
            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev" v-show="$mq !== 'mobile'" style="color:red"></div>
            <div class="swiper-button-next" v-show="$mq !== 'mobile'" style="color:red"></div>
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
            debug: false
        };
    },
    methods: {
        picOrientation(pic) {
            return pic.width >= pic.height ? "horizontal" : "vertical";
        },
        getPicSize(pic) {
            console.log("->", this.$mq);
            const _h = pic.height;
            const _w = pic.width;
            let width, height, divider;
            if (this.$mq === "mobile") {
                if (_w >= _h) {
                    // horizontal, make it 530 high
                    divider = _h / 300;
                } else {
                    // vertical, make it 647 high
                    divider = _h / 370;
                }
            } else if (this.$mq === "tablet") {
                if (_w >= _h) {
                    // horizontal, make it 530 high
                    divider = _h / 480;
                } else {
                    // vertical, make it 647 high
                    divider = _h / 550;
                }
            } else {
                if (_w >= _h) {
                    // horizontal, make it 530 high
                    divider = _h / 530;
                } else {
                    // vertical, make it 647 high
                    divider = _h / 647;
                }
            }
            width = Math.floor(_w / divider);
            height = Math.floor(_h / divider);
            return { width, height };
        }
    },
    mounted() {
        console.log("#--- pics horizontal mounted ---#");
        // console.log(this.pics);
        this.carousel = new Swiper(this.$refs["swiper-container"], {
            slidesPerView: "auto",
            spaceBetween: 20,
            grabCursor: true,
            centeredSlides: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    }
};
</script>
<style scoped>
.swiper-container {
    width: 100%;
    height: 100%;
}
.caption {
    font-size: 0.85rem;
}
.swiper-button-prev,
.swiper-button-next {
    top: 37%;
}
/* media queries */
@media only screen and (min-width: 1024px) {
    .story-padding {
        padding: 0 5rem 0 5rem;
    }
}
</style>
