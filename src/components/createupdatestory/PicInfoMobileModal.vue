<template>
  <div class="modal" id="pic-info-modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="message" @submit.prevent="onSubmit" novalidate>
        <div class="message-header">
          <p class="is-1">Image caption</p>
          <button class="delete is-medium" id="pic-info-close" @click.prevent="cancel"></button>
        </div>
        <!-- pic -->
        <div class="message-body" v-if="pic">
          <div class="pic-info-img">
            <img :src="pic.medium.web_path" />
          </div>
          <!-- caption -->
          <div class="field">
            <label
              class="label"
              v-if="caption_error"
              style="color:red"
            >Caption must be max 256 characters</label>
            <label class="label" v-else>Caption</label>
            <div class="control">
              <textarea
                class="textarea"
                :class="{ 'is-danger': caption_error }"
                placeholder="Enter your caption"
                rows="2"
                :value="pic.caption"
                @input="checkCaption($event)"
                ref="caption"
              ></textarea>
            </div>
          </div>
          <!-- alt -->
          <div class="field">
            <label
              class="label"
              v-if="description_error"
              style="color:red"
            >Description must be max 64 characters</label>
            <label class="label" v-else>Description (Alt tag)</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="A short description"
                :value="pic.description"
                @keydown.enter.prevent
                @input="checkDescription($event)"
                ref="description"
              />
            </div>
          </div>
          <!-- buttons -->
          <div class="field is-grouped submit-buttons">
            <div class="control">
              <button
                class="button is-primary"
                :disabled="caption_error || description_error"
                type="submit"
                @click.prevent="save"
              >Save</button>
            </div>
            <div class="control">
              <button class="button is-light" @click.prevent="cancel">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { picsUploadedMixin } from "../../mixins/picsUploadedMixin";
const CAPTION_MAXLEN = 256;
const DESCRIPTION_MAXLEN = 64;
export default {
  props: ["isActive", "picId", "pic", "pics_uploaded"],
  mixins: [picsUploadedMixin],
  data() {
    return {
      caption_error: false,
      description_error: false
    };
  },
  methods: {
    save() {
      console.log("__SAVE__");
      if (this.caption_error || this.description_error) {
        return;
      }
      // check caption / alt valid?
      // emit save?
      this.pics_uploaded[this.picId].caption = this.$refs["caption"].value;
      this.pics_uploaded[this.picId].description = this.$refs[
        "description"
      ].value;
      this.$emit("picInfoMobileModalClosed");
    },
    cancel() {
      this.resetErrors();
      this.$emit("picInfoMobileModalClosed");
    },
    resetErrors() {
      this.caption_error = false;
      this.description_error = false;
    },
    checkCaption(event) {
      console.log("CHECK_CAPTION");
      console.log(this.CAPTION_MAXLEN);
      this.pic.caption = event.target.value;
      if (this.pic.caption.length > CAPTION_MAXLEN) {
        this.caption_error = true;
      } else {
        this.caption_error = false;
      }
    },
    checkDescription() {
      console.log("CHECK_DESCRIPTION");
      this.pic.description = event.target.value;
      if (this.pic.description.length > DESCRIPTION_MAXLEN) {
        this.description_error = true;
      } else {
        this.description_error = false;
      }
    }
  },
  mounted() {
    console.log("__MOUNTED__");
  },
  created() {
    console.log("__PICINFO___CREATED__");
  }
};
</script>
<style scoped>
.modal {
  justify-content: start;
}
.modal-content {
  max-height: 100%;
}
.pic-info-img {
  margin-top: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.pic-info-img img {
  display: block;
  margin: auto;
  max-width: 50%;
  max-height: 200px;
}
input,
textarea {
  font-size: 90%;
  padding: 0.3rem;
}
.label {
  color: #888;
  font-size: 0.9rem;
  margin-top: 10px;
}
.label:not(:last-child) {
  margin-bottom: 0.3em;
}
button {
  font-size: 90%;
  padding: 0 0.7rem 0 0.7rem;
}
.submit-buttons {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 20px;
}
</style>