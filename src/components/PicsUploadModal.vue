<template>
  <!-- RECOVER MODAL -->
  <div class="modal" id="pic-upload-modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div :class="{maxOnSelected: !selectFiles}">
        <div class="message" :class="{minOnSelected: !selectFiles}">
          <div class="message-header">
            <p>Images upload</p>
            <button class="delete is-medium" id="upload-close" @click.prevent="closeUploadModal"></button>
          </div>
          <div class="message-body">
            <!-- SELECTED FILES LIST -->
            <div v-if="selectFiles">
              <div class="dropbox">
                <input
                  multiple
                  type="file"
                  id="pics"
                  ref="pics"
                  :name="uploadFieldName"
                  @change="onFilesSelected"
                  accept="image/*"
                  class="input-file"
                />
                <p v-if="isUploadInitial">
                  Drag your file here
                  <br />or click to browse
                </p>
              </div>
            </div>
            <div v-else>
              <!-- START IMAGES -->
              <div class="selectedImages">
                <div>
                  <button class="button is-warning is-fullwidth" style="margin-bottom:1rem">Upload</button>
                </div>
                <div class="is-divider upload-divider" style="margin-bottom:.7rem"></div>

                <!-- PICS LOOP -->
                <div class="uploadPicInfo">
                  <!-- -->
                  <div v-for="(file, idx) in filesToUpload" :key="idx">
                    <div class="columns is-mobile">
                      <div class="column is-narrow picContainer">
                        <img class="preview" :ref="'pic'+parseInt( idx )" />
                      </div>
                      <div
                        class="column uploadFileInfo textContainer"
                      >{{`${file.name} [${(file.size / (1024 * 1024)).toFixed(1)}MB]`}}</div>
                      <div class="deleteButton">
                        <a class="delete" @click="removeFromSelection(idx)"></a>
                      </div>
                    </div>
                    <div class="is-divider upload-divider" style="margin:.2rem 0 .7rem 0"></div>
                  </div>
                </div>
                <!-- ENDS PICS LOOP -->
                <!-- -->
              </div>
              <!-- ENDS IMAGES -->
            </div>
            <!-- ENDS SELECTED FILES LIST -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axiosUpload from "../services/axiosUpload";
import axiosBase from "../services/axiosBase";
const UPLOAD_STATUS_INITIAL = 0,
  UPLOAD_STATUS_SAVING = 1,
  UPLOAD_STATUS_SUCCESS = 2,
  UPLOAD_STATUS_FAILED = 3;
const PICS_BASE_URL = "http://localhost/images/pics";
import { maxLength } from "vuelidate/lib/validators";

export default {
  props: ["isActive"],
  data() {
    return {
      selectFiles: true,
      uploadFieldName: "pics",
      filesToUpload: [],
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null
    };
  },
  methods: {
    closeUploadModal(e) {
      console.log(e);
      this.reset();
      this.$emit("uploadModalClosed");
    },
    onFilesSelected(e) {
      console.log("files selected");
      this.selectFiles = false;
      const sel = this.$refs.pics.files;
      // keep track of selected files
      for (let i = 0; i < sel.length; i++) {
        this.filesToUpload.push(sel[i]);
      }
      // Initialize a File Reader object
      console.log(this.filesToUpload);
      for (let i = 0; i < this.filesToUpload.length; i++) {
        if (/\.(jpe?g|png|webp)$/i.test(this.filesToUpload[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function() {
              this.$refs["pic" + parseInt(i)][0].src = reader.result;
            }.bind(this),
            false
          );
          reader.readAsDataURL(this.filesToUpload[i]);
        }
      }
    },
    removeFromSelection(idx) {
      console.log(`Removing ${idx}`);
      console.log(this.filesToUpload);
      this.filesToUpload.splice(idx, 1);
      if (this.filesToUpload.length === 0) {
        this.reset();
      }
    },
    init() {
      // reset form to initial state
      this.uploadCurrentStatus = UPLOAD_STATUS_INITIAL;
      this.uploadedFiles = [];
      this.filesToUpload = [];
      this.uploadError = null;
      this.selectFiles = true;
    },
    reset() {
      // reset form to initial state
      this.init();
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "authenticatedUser"]),
    user: function() {
      return this.authenticatedUser;
    },
    isUploadInitial() {
      return this.uploadCurrentStatus === UPLOAD_STATUS_INITIAL;
    },
    isUploadSaving() {
      return this.uploadCurrentStatus === UPLOAD_STATUS_SAVING;
    },
    isUploadSuccess() {
      return this.uploadCurrentStatus === UPLOAD_STATUS_SUCCESS;
    },
    isUploadFailed() {
      return this.uploadCurrentStatus === UPLOAD_STATUS_FAILED;
    }
  },
  created() {
    console.log("created");
    this.init();
  },
  mounted() {
    console.log("mounted");
    this.init();
  }
};
</script>
<style scoped lang="scss">
/************** modal ***********************/
/* #pic-upload-modal {
  height: 80rem;
} */
.minOnSelected {
  min-height: calc(65vh);
}
.maxOnSelected {
  max-height: calc(65vh);
}
/************ File upload list *************/
.upload-divider {
  margin: 0 0 0.5rem 0;
}

.uploadPicInfo .columns {
  margin: 0;
}
.picContainer {
  width: 70px;
  text-align: center;
  margin: 0;
  padding: 0;
}
.textContainer {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.deleteButton {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  padding: 0 0.5rem 0.75rem 0;
}
.progress {
  border-radius: 0;
  height: 3px;
}
.columns {
}
.column.uploadFileInfo {
  padding: 0.25rem 0 0.75rem 0;
}
img.isVertical {
  width: 40px;
  height: auto;
}
img.isHorizontal {
  width: 60px;
  height: auto;
}
.preview {
  max-width: 60px;
  max-height: 60px;
}

/************ File upload box *************/
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  /* outline-offset: -10px; */
  background: #eee;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  width: 100%;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1em;
  text-align: center;
  padding: 50px 0;
}
</style>
