<template>
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
            <!-- SELECT FILES -->
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
                <p v-if="selectFiles">
                  Drag your file here
                  <br />or click to browse
                </p>
              </div>
            </div>
            <!-- END SELECT FILES -->
            <!-- VIEW FILES LIST -->
            <div v-else-if="viewFilesList">
              <div class="selectedImages">
                <div>
                  <button
                    class="button is-warning is-fullwidth"
                    style="margin-bottom:1rem"
                    @click="submitFiles"
                  >Upload</button>
                </div>
                <div class="is-divider upload-divider" style="margin-bottom:.7rem"></div>

                <!-- PICS LOOP -->
                <div class="uploadPicInfo">
                  <!-- LOOP -->
                  <div v-for="(file, idx) in selectedFiles" :key="idx">
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
                  <!-- END LOOP -->
                </div>
                <!-- ENDS PICS LOOP -->
                <!-- -->
              </div>
            </div>
            <!-- ENDS VIEW FILES LIST -->
            <!-- UPLOAD FILES -->
            <div v-else-if="uploadFiles">
              <!-- UPLOADING PICS -->
              <div class="imagesToUpload">
                <div>
                  <b>Uploading</b>
                </div>
                <div class="is-divider upload-divider" style="margin-bottom:.7rem"></div>
                <div class="uploadPicInfo">
                  <div v-for="(file, idx) in filesToUpload" :key="idx" style="margin-bottom:12px;">
                    <div class="columns is-mobile">
                      <div class="column is-narrow picContainer">
                        <img class="preview" :ref="'pic'+parseInt( idx )" />
                      </div>
                      <div
                        class="column uploadFileInfo textContainer"
                      >{{`${file.name} [${(file.size / (1024 * 1024)).toFixed(1)}MB]`}}</div>
                    </div>
                    <progress
                      class="progress is-success"
                      :ref="'progress'+parseInt( idx )"
                      value="0"
                      max="100"
                    >0%</progress>
                  </div>
                </div>
              </div>
              <!-- ENDS UPLOADING PICS -->
              <!-- START COMPLETED PICS -->
              <div class="completedUploads">
                <div>
                  <b>Completed</b>
                </div>
                <div class="is-divider upload-divider" style="margin-bottom:.7rem"></div>
                <div class="uploadPicInfo">
                  <div v-for="(file, idx) in completedFiles" :key="idx" style="margin-bottom:12px;">
                    <div class="columns is-mobile">
                      <div class="column is-narrow picContainer">
                        <img class="preview" :ref="'pic'+parseInt( idx )" />
                      </div>
                      <div
                        class="column uploadFileInfo textContainer"
                      >{{`${file.name} [${(file.size / (1024 * 1024)).toFixed(1)}MB]`}}</div>
                    </div>
                    <progress class="progress is-success" value="0" max="100">0%</progress>
                  </div>
                </div>
              </div>
              <!-- ENDS COMPLETED PICS -->
            </div>
            <!-- ENDS UPLOAD FILES -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axiosUpload from "../services/axiosUpload";
// eslint-disable-next-line
import axiosBase from "../services/axiosBase";
// const UPLOAD_STATUS_INITIAL = 0,
//   UPLOAD_STATUS_SAVING = 1,
//   UPLOAD_STATUS_SUCCESS = 2,
//   UPLOAD_STATUS_FAILED = 3;
// eslint-disable-next-line
const PICS_BASE_URL = "http://localhost/images/pics";
// eslint-disable-next-line
import { maxLength } from "vuelidate/lib/validators";

export default {
  props: ["isActive"],
  data() {
    return {
      /** file uploads **/
      selectFiles: true,
      viewFilesList: false,
      uploadFiles: false,
      uploadFieldName: "pics",
      selectedFiles: [],
      filesToUpload: [],
      completedFiles: [],
      uploadError: null,
      currentStatus: null
    };
  },
  methods: {
    getImagePreviews(target) {
      // console.log(target.length);
      // console.log(target[0]);
      for (let i = 0; i < target.length; i++) {
        // console.log(target[i]);
        if (/\.(jpe?g|png|gif)$/i.test(target[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function() {
              this.$refs["pic" + parseInt(i)][0].src = reader.result;
            }.bind(this),
            false
          );
          reader.readAsDataURL(target[i]);
        }
      }
    },
    closeUploadModal(e) {
      console.log(e);
      this.reset();
      this.$emit("uploadModalClosed");
    },
    onFilesSelected(e) {
      console.log(e);
      console.log("files selected");
      this.selectFiles = false;
      this.viewFilesList = true;
      const sel = this.$refs.pics.files;
      // keep track of selected files
      for (let i = 0; i < sel.length; i++) {
        this.selectedFiles.push(sel[i]);
      }
      this.getImagePreviews(this.selectedFiles);
    },
    async submitFiles() {
      this.selectFiles = false;
      this.viewFilesList = false;
      this.uploadFiles = true;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.filesToUpload.push(this.selectedFiles[i]);
      }
      console.log("++++++++++++++++++");
      console.log(this.filesToUpload);
      console.log("++++++++++++++++++");
      for (let i = 0; i < this.filesToUpload.length; i++) {
        let formData = new FormData();
        let file = this.filesToUpload[i];
        file.id = i;
        // console.log(file.name);
        // formData.append("pics[" + i + "]", file, file.name);
        formData.append("pics", file, file.name);
        /////////////////////////////////////////////////////////
        // single
        /////////////////////////////////////////////////////////
        const uploaded = await axiosUpload.post(
          `/stories/${this.authenticatedUser._key}/upload-file`,
          formData,
          {
            onUploadProgress: uploadEvent => {
              let progress = Math.round(
                (uploadEvent.loaded / uploadEvent.total) * 100
              );
              console.log(`UploadProgress[${i}]: ${progress}%`);
              this.$refs["progress" + parseInt(i)][0].value = progress;
            }
          }
        );
        console.log("---------------");
        console.log(uploaded);
        console.log("---------------");
      }
      try {
        /////////////////////////////////////////////////////////
        // multi
        /////////////////////////////////////////////////////////
        // let config;
        // const myUploadProgress = myFileId => progress => {
        //   let percentage = Math.floor((progress.loaded * 100) / progress.total);
        //   console.log(`${myFileId} -> ${percentage}`);
        // };
        // for (var i = 0; i < this.filesToUpload.length; i++) {
        //   console.log(this.filesToUpload[i].id);
        //   config = {
        //     onUploadProgress: myUploadProgress(this.filesToUpload[i].id)
        //   };
        // }
        // // eslint-disable-next-line
        // const uploaded = await axiosUpload.post(
        //   `/stories/${this.authenticatedUser._key}/upload-files`,
        //   formData,
        //   config
        // );
      } catch (error) {
        console.log(error);
      }
    },
    removeFromSelection(idx) {
      console.log(`Removing ${idx}`);
      console.log(this.selectedFiles);
      this.selectedFiles.splice(idx, 1);
      // this.selectedFiles[idx] = null;
      // don't fuckin change index, set pic to null
      this.getImagePreviews(this.selectedFiles);
      if (this.selectedFiles.length === 0) {
        this.reset();
      }
    },
    init() {
      // reset form to initial state
      // this.uploadCurrentStatus = UPLOAD_STATUS_INITIAL;
      this.selectFiles = true;
      this.viewFilesList = false;
      this.uploadFiles = false;
      this.selectedFiles = [];
      this.filesToUpload = [];
      this.completedFiles = [];
      this.uploadError = null;
    },
    reset() {
      // reset form to initial state
      this.init();
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "authenticatedUser"])
    // user: function() {
    //   return this.authenticatedUser;
    // }
    // isUploadInitial() {
    //   return this.uploadCurrentStatus === UPLOAD_STATUS_INITIAL;
    // },
    // isUploadSaving() {
    //   return this.uploadCurrentStatus === UPLOAD_STATUS_SAVING;
    // },
    // isUploadSuccess() {
    //   return this.uploadCurrentStatus === UPLOAD_STATUS_SUCCESS;
    // },
    // isUploadFailed() {
    //   return this.uploadCurrentStatus === UPLOAD_STATUS_FAILED;
    // }
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
