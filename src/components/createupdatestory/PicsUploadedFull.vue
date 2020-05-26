<template>
  <draggable
    :list="pics_uploaded"
    ghost-class="moving-card"
    handle=".handle"
    :animation="200"
    @change="draggableChange"
  >
    <div
      v-for="(pic, idx) in pics_uploaded"
      :key="idx"
      class="columns box uploadedImageBox is-mobile"
      style="border: 1px solid #ccc"
      :class="{first: idx === 0}"
    >
      <div class="controlIcons">
        <span class="icon icon-hover is-medium handle">
          <font-awesome-icon class="fas fa-lg shadow" icon="arrows-alt"></font-awesome-icon>
        </span>
        <span class="icon icon-hover has-text-danger is-medium trash">
          <font-awesome-icon class="fas fa-lg shadow" icon="trash-alt" @click="removePic(idx)"></font-awesome-icon>
        </span>
      </div>
      <!-- :width="isHorizontal(pic.small) ? 270 : 160" -->
      <div class="pic column is-narrow handle">
        <img
          :src="pic.medium.web_path"
          :class="isHorizontal(pic.small) ? 'pic-horizontal' : 'pic-vertical'"
        />
      </div>
      <div class="picInfo column">
        <div class="field">
          <label
            class="label"
            v-if="caption_errors.includes(idx)"
            style="color:red"
          >Caption must be max 256 characters</label>
          <label class="label" v-else>Caption</label>
          <!--- XOXO --->

          <!--- XOXO --->
          <div class="control">
            <textarea
              class="textarea"
              :class="{ 'is-danger': caption_errors.includes(idx) }"
              placeholder="Enter your caption"
              rows="2"
              :value="pic.caption"
              @input="setCaption(idx, $event)"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label
            class="label"
            v-if="description_errors.includes(idx)"
            style="color:red"
          >Description must be max 64 characters</label>
          <label class="label" v-else>Description (Alt tag)</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': description_errors.includes(idx) }"
              type="text"
              placeholder="A short description"
              :value="pic.description"
              @input="setDescription(idx, $event)"
              @keydown.enter.prevent
            />
          </div>
        </div>
      </div>
    </div>
  </draggable>
  <!-- END LOOP PICS -->
</template>
<script>
import Draggable from "vuedraggable";
import { picsUploadedMixin } from "../../mixins/picsUploadedMixin";
export default {
  name: "PicsUploadedFull",
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
  width: 270px;
  height: auto;
}
.pic-vertical {
  width: 160px;
  height: auto;
}
/***** Uploaded images ******/
.uploadedImageBox {
  margin: 12px 0 0 0;
  padding: 0;
  border-radius: 0;
  position: relative;
}
.uploadedImageBox.first {
  margin: 15px 0 0 0;
}
.picInfo {
  margin-top: 13px;
}
.picInfo label {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 90%;
}
.uploadedImageBox .controlIcons {
  position: absolute;
  top: 3px;
  right: 3px;
  text-align: right;
  margin: 0;
  padding: 0;
}
/* icons shadow */
.shadow {
  -webkit-filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.2));
  /* Similar syntax to box-shadow */
}
</style>