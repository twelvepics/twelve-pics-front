<template>
  <div class="pics-uploaded-container">
    <draggable
      :list="pics_uploaded"
      ghost-class="moving-card"
      handle=".handle"
      :animation="200"
      @change="draggableChange"
      class="outer-grid-container"
    >
      <div
        v-for="(pic, idx) in pics_uploaded"
        :key="idx"
        style="border: 1px solid #ccc"
        class="outer-grid-item"
        :class="{first: idx === 0}"
      >
        <div class="square">
          <div class="icon-move">
            <span class="icon icon-hover is-medium handle">
              <font-awesome-icon class="fas fa-lg" icon="arrows-alt"></font-awesome-icon>
            </span>
          </div>
          <div class="icon-edit" :class="isHorizontal(pic.small) ? 'horiz' : 'vert'">
            <span class="icon icon-hover is-medium ptr">
              <font-awesome-icon class="fas fa-lg" icon="edit" @click="openPicInfoModal(idx)"></font-awesome-icon>
            </span>
          </div>
          <div class="icon-trash">
            <span class="icon icon-hover has-text-danger is-medium ptr">
              <font-awesome-icon class="fas fa-lg" icon="trash-alt" @click="removePic(idx)"></font-awesome-icon>
            </span>
          </div>
          <div>
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
  mixins: [picsUploadedMixin],
  methods: {
    openPicInfoModal(idx) {
      console.log("SET_PIC_INFO_CALL");
      this.$emit("openPicInfoModal", idx);
    }
  }
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
.ptr {
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
.square div img {
  position: absolute;
  max-width: 85%;
  max-height: 85%;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.icon-edit {
  position: absolute;
  z-index: 10;
  color: #bbb;
  font-size: 90%;
}
.icon-edit.vert {
  left: 0;
  top: 28px;
}
.icon-edit.horiz {
  left: 33px;
  top: 0;
}
.icon-move {
  position: absolute;
  z-index: 10;
  left: 0;
  color: #bbb;
  font-size: 90%;
}
.icon-trash {
  position: absolute;
  z-index: 10;
  right: 0;
  font-size: 90%;
}
</style>