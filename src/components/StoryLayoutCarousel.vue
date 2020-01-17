<template>
  <div
    class="content"
    id="top"
    style="margin:30px 0 25px 0;padding:0 25px 25px 25px;border:1px solid #ccc;padding:1rem 0 1rem 0"
  >
    <!-- Slider main container -->
    <div class="swiper-container" ref="swiper-container" style="padding-bottom:0;">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <div
          v-for="(pic, index) in pics"
          :key="index"
          class="swiper-slide"
          :style="{
                        width: `${pic.small.width}px`,
                        height: `${pic.small.height}px`
                    }"
        >
          <!-- Slide Content -->
          <!-- style="cursor:pointer;" -->
          <img
            :src="pic.small.web_path"
            class="thumb pointer"
            :style="{
                            'max-width': `${pic.small.width}px`,
                            'max-height': `${pic.small.height}px`,
                            border: '1px solid #777'
                        }"
            @click.self="thumbClicked($event, index)"
          />

          <!-- Slide {{ index }} -->
        </div>
      </div>
      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev" style="color:red;top:40%;left:.3rem;"></div>
      <div class="swiper-button-next" style="color:red;top:40%;right:.3rem;"></div>
    </div>
    <div style="border-bottom:1px solid #ccc;margin:1rem 0 1.5rem 0;"></div>
    <!-- End Slider main container -->

    <!-- bottom selected image -->
    <div class="slideshow-pic-container" style="position:relative;">
      <div
        class="loader"
        style="position:absolute;"
        :style="{ visibility: top_pic_visible ? 'hidden' : 'visible' }"
      ></div>
      <div class="slideshow-pic" :style="{ visibility: top_pic_visible ? 'visible' : 'hidden' }">
        <img ref="top_pic" alt @load="onPicLoad($event)" />
        <p
          class="caption"
          :style="{
                        'max-width': `${pics[selectedPicId].large.width}px`
                    }"
          style="text-align:left;"
          ref="top_caption"
        >{{ pics[0].caption }}</p>
      </div>
    </div>
    <!-- ends bottom selected image -->
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  props: ["pics"],
  data() {
    return {
      carousel: null,
      selectedPicId: 0,
      top_pic_visible: false
    };
  },

  methods: {
    // eslint-disable-next-line
    onPicLoad(e) {
      //   console.log("TOP_PIC_ONLOAD");
      //   console.log(e);
      this.top_pic_visible = true;
    },
    picOrientation(pic) {
      return pic.width >= pic.height ? "horizontal" : "vertical";
    },
    thumbClicked(event, idx) {
      //   console.log("THUMB CLICKED => " + idx);
      //   console.log("TOP_PIC COMPLETE = > " + this.$refs.top_pic.complete);
      this.top_pic_visible = false;
      this.selectedPicId = idx;
      this.$refs.top_pic.src = this.pics[idx].large.web_path;
      this.$refs.top_pic.width = this.pics[idx].large.width;
      this.$refs.top_caption.textContent = this.pics[idx].caption;
      if (this.$refs.top_pic.complete) {
        this.top_pic_visible = true;
      }
    },
    getCaptionWidth(maxHeight = 650) {
      const pic = this.pics[this.selectedPicId].large;
      const _h = pic.height;
      const _w = pic.width;
      let width, divider;
      divider = _h / maxHeight;
      width = Math.floor(_w / divider);
      return width;
    }
  },
  mounted() {
    // console.log("GO");
    // console.log(this.$refs["swiper-container"]);
    // const vm = this;
    this.carousel = new Swiper(this.$refs["swiper-container"], {
      slidesPerView: "auto",
      spaceBetween: 15,
      grabCursor: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
    // eslint-disable-next-line
    // this.carousel.on("transitionStart", function(e) {
    //   const thumbs = document.getElementsByClassName("thumb");
    //   for (var i = 0; i < thumbs.length; i++) {
    //     thumbs[i].classList.remove("pointer");
    //     thumbs[i].classList.add("grabing");
    //   }
    // });
    // eslint-disable-next-line
    this.carousel.on("touchEnd", function(e) {
      console.log("TOUCH END");
      const thumbs = document.getElementsByClassName("thumb");
      for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove("grabing");
        thumbs[i].classList.add("pointer");
      }
    });
    function throttle(callback, limit) {
      var wait = false;
      return function() {
        if (!wait) {
          callback.apply(null, arguments);
          wait = true;
          setTimeout(function() {
            wait = false;
          }, limit);
        }
      };
    }
    // eslint-disable-next-line
    this.carousel.on(
      "sliderMove",
      throttle(function() {
        console.log("SLIDER MOVE");
        const thumbs = document.getElementsByClassName("thumb");
        for (var i = 0; i < thumbs.length; i++) {
          if (thumbs[i].classList.contains("pointer")) {
            console.log("CLASS CHANGED");
            thumbs[i].classList.add("grabing");
            thumbs[i].classList.remove("pointer");
          }
        }
      }, 100)
    );

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
    // console.log(this.carousel);
    this.$refs.top_pic.src = this.pics[0].large.web_path;
    this.$refs.top_pic.width = this.pics[0].large.width;
  }
};
</script>

<style scoped>
.caption {
  font-size: 0.85rem;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
}
.swiper-container {
  width: 100%;
  height: 100%;
}

.slideshow-pic-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  top: 0;
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
.grabing {
  cursor: grab !important;
}

.pointer {
  cursor: pointer;
}
</style>
