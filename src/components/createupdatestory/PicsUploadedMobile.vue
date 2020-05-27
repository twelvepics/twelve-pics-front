<template>
  <div class="pics-uploaded-container">
    <draggable
      :list="pics_uploaded"
      ghost-class="moving-card"
      handle=".handle"
      :animation="200"
      @change="draggableChange"
    >
      <div class="outer-grid-container">
        <div
          v-for="(pic, idx) in pics_uploaded"
          :key="idx"
          style="border: 1px solid #ccc"
          class="outer-grid-item"
          :class="{first: idx === 0}"
        >
          <div class="square">
            <img :src="pic.medium.web_path" />
          </div>
        </div>
      </div>
    </draggable>
  </div>
  <!-- END LOOP PICS -->
</template>

<script>
import Draggable from "vuedraggable";
import { picsUploadedMixin } from "../../mixins/picsUploadedMixin";
export default {
  name: "PicsUploadedMobile",
  components: {
    Draggable
  },
  props: { pics_uploaded: Array },
  mixins: [picsUploadedMixin]
};
</script>
<style scoped>
/*************** draggable ******************/
.moving-card {
  opacity: 0.7;
  border: 1px solid #aaa;
  background: #eee;
}
.handle {
  cursor: move;
}
.trash {
  cursor: pointer;
}
.pic-horizontal {
  width: 120px;
  height: auto;
}
.pic-vertical {
  width: 80px;
  height: auto;
}
/* icons shadow */
.shadow {
  -webkit-filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.2));
  /* Similar syntax to box-shadow */
}

.pics-uploaded-container {
  margin-top: 10px;
}

/******** grid ************/
.outer-grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
}
.outer-grid-item {
  align-self: center;
}
.square {
  width: 100%;
  position: relative;
}
.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.square img {
  position: absolute;
  max-width: 85%;
  max-height: 85%;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* .image-div img {
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
} */
</style>