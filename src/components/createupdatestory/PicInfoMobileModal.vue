<template>
  <div class="modal" id="pic-info-modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="message" @submit.prevent="onSubmit" novalidate v-if="pic">
        <div class="message-header">
          <p class="is-1">Image caption</p>
          <button class="delete is-medium" id="pic-info-close" @click.prevent="cancel"></button>
        </div>
        <!-- pic -->
        <div class="message-body">
          <div class="pic-info-img">
            <img :src="pic.medium.web_path" />
          </div>

          <!-- caption -->
          <div class="field">
            <!-- <label
            class="label"
            v-if="caption_errors.includes(idx)"
            style="color:red"
          >Caption must be max 256 characters</label>
            <label class="label" v-else>Caption</label>-->
            <label class="label">Caption</label>
            <!--- XOXO --->
            <!--- XOXO --->
            <!-- <div class="control">
            <textarea
              class="textarea"
              :class="{ 'is-danger': caption_errors.includes(idx) }"
              placeholder="Enter your caption"
              rows="1"
              :value="pic.caption"
              @input="setCaption(idx, $event)"
            ></textarea>-->
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Enter your caption"
                rows="2"
                :value="pic.caption"
              ></textarea>
            </div>
          </div>
          <!-- alt -->
          <div class="field">
            <label class="label">Description (alt tag)</label>
            <div class="control">
              <input class="input" type="text" :value="pic.caption" @keydown.enter.prevent />
            </div>
          </div>
          <!-- buttons -->
          <div class="field is-grouped submit-buttons">
            <div class="control">
              <button class="button is-primary" type="submit" @click.prevent="save">Save</button>
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
export default {
  props: ["isActive", "picId", "pic"],
  data() {
    return {
      caption: ""
    };
  },
  methods: {
    save() {
      console.log("__SAVE__");
      // check caption / alt valid?
      // emit save?
    },
    cancel() {
      this.$emit("picInfoMobileModalClosed");
    }
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