<template>
    <div class="modal" id="pic-upload-modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div :class="{ maxOnSelected: !selectFiles }">
                <div class="message" :class="{ minOnSelected: !selectFiles }">
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
                                <div
                                    v-if="tooManyPics"
                                    class="notification is-danger"
                                    style="padding:.3rem;margin-bottom:.6rem;"
                                >
                                    You can upload at most {{ maxUploads }} pics. {{ remainingUploads }} remaining
                                </div>
                                <div>
                                    <button
                                        class="button is-warning is-fullwidth"
                                        style="margin-bottom:1rem"
                                        @click="submitFiles"
                                        :disabled="tooManyPics"
                                    >
                                        Upload
                                    </button>
                                </div>
                                <div class="is-divider upload-divider" style="margin-bottom:.7rem"></div>

                                <!-- PICS LOOP -->
                                <div class="uploadPicInfo">
                                    <!-- LOOP -->
                                    <div v-for="(file, idx) in selectedFiles" :key="idx">
                                        <div class="columns is-mobile">
                                            <div class="column is-narrow picContainer">
                                                <img
                                                    class="preview"
                                                    :src="previews[file.name] || ''"
                                                    :ref="'pic' + parseInt(idx)"
                                                />
                                            </div>
                                            <div
                                                class="column uploadFileInfo textContainer"
                                                :class="{ isError: fileIsTooBig(file) }"
                                            >
                                                <p style="margin:0;padding:0;">
                                                    {{ `${file.name} [${(file.size / (1024 * 1024)).toFixed(1)}MB]` }}
                                                    <span v-if="fileIsTooBig(file)"
                                                        >- Error: max file size is 5 MB</span
                                                    >
                                                </p>
                                            </div>
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
                                <div v-if="uploadError" class="notification is-danger" style="padding:.5rem;">
                                    {{ uploadErrorMessage }}
                                </div>
                                <div>
                                    <b>Uploading</b>
                                </div>
                                <div class="is-divider upload-divider" style="margin-bottom:.7rem"></div>
                                <div class="uploadPicInfo">
                                    <div v-for="(file, idx) in filesToUpload" :key="idx" style="margin-bottom:12px;">
                                        <div class="columns is-mobile">
                                            <div class="column is-narrow picContainer">
                                                <!-- <img class="preview" :ref="'pic'+parseInt( idx )" /> -->
                                                <img class="preview" :src="previews[file.name]" />
                                            </div>
                                            <div class="column uploadFileInfo textContainer">
                                                {{ `${file.name} [${(file.size / (1024 * 1024)).toFixed(1)}MB]` }}
                                            </div>
                                        </div>
                                        <progress
                                            class="progress is-success"
                                            :ref="'progress' + parseInt(idx)"
                                            value="0"
                                            max="100"
                                        ></progress>
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
                                                <!-- <img class="preview" :ref="'pic'+parseInt( idx )" /> -->
                                                <img class="preview" :src="previews[file.name]" />
                                            </div>
                                            <div class="column uploadFileInfo textContainer">
                                                {{ `${file.name} [${(file.size / (1024 * 1024)).toFixed(1)}MB]` }}
                                            </div>
                                        </div>
                                        <progress class="progress is-success" value="100" max="100"></progress>
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
import * as Sentry from "@sentry/browser";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export default {
    props: ["isActive", "maxUploads", "remainingUploads"],
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
            previews: {},
            uploadError: null,
            uploadErrorMessage: ""
        };
    },
    methods: {
        getImagePreviews() {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                if (
                    !this.previews[this.selectedFiles[i].name] &&
                    /\.(jpe?g|png|gif)$/i.test(this.selectedFiles[i].name)
                ) {
                    let reader = new FileReader();
                    reader.addEventListener(
                        "load",
                        function() {
                            this.$refs["pic" + parseInt(i)][0].src = reader.result;
                            this.previews[this.selectedFiles[i].name] = reader.result;
                        }.bind(this),
                        false
                    );
                    reader.readAsDataURL(this.selectedFiles[i]);
                }
            }
        },
        closeUploadModal() {
            this.reset();
            this.$emit("uploadModalClosed");
        },
        onFilesSelected() {
            // SELECT FILES
            this.selectFiles = false;
            this.viewFilesList = true;
            ////////////////////////////
            // SELECTED FILES
            ////////////////////////////
            const sel = this.$refs.pics.files;
            /////////////////////////////////////
            // KEEP TRACK OF SELECTED FILES
            // COPY TO selectedFiles
            /////////////////////////////////////
            for (let i = 0; i < sel.length; i++) {
                this.selectedFiles.push(sel[i]);
            }
            // load images and make mini thumbs with a file reader
            this.getImagePreviews();
        },

        async submitFiles() {
            this.selectFiles = false;
            this.viewFilesList = false;
            this.uploadFiles = true;
            ////////////////////////////////////////
            // FILTER TOO BIG FILES
            // REMOVE THEM FROM selectedFiles
            ////////////////////////////////////////
            for (let i = 0; i < this.selectedFiles.length; i++) {
                if (this.fileIsTooBig(this.selectedFiles[i])) {
                    this.selectedFiles.splice(i, 1);
                }
            }
            //////////////////////////////////////////////////////
            // COPY TO UPLOADS DISPLAY ARRAY filesToUpload
            // WILL use previews to show mini thumbs
            //////////////////////////////////////////////////////
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.filesToUpload.push(this.selectedFiles[i]);
            }
            //////////////////////////////////////////////////////
            // UPLOAD ALL from selectedfiles
            // may need to be sequenced/windowed later
            //////////////////////////////////////////////////////
            try {
                for (let i = 0; i < this.selectedFiles.length; i++) {
                    let formData = new FormData();
                    let file = this.selectedFiles[i];
                    file.id = i;
                    formData.append("pics", file, file.name);
                    /////////////////////////////////////////////////////////
                    // USE multer single
                    /////////////////////////////////////////////////////////
                    const uploaded = await axiosUpload.post(
                        `/stories/${this.authenticatedUser._key}/upload-file`,
                        formData,
                        {
                            onUploadProgress: uploadEvent => {
                                try {
                                    let progress = Math.round((uploadEvent.loaded / uploadEvent.total) * 100);
                                    this.$refs["progress" + parseInt(i)][0].value = progress;
                                } catch (err) {
                                    // Do what here
                                    console.log(err.message);
                                    Sentry.captureException(err);
                                }
                            }
                        }
                    );
                    //////////////////////////////////////////////
                    // MOVE UPLOADED FILES TO comleted array
                    //////////////////////////////////////////////
                    // need to get idx from file name to splice
                    const fname = uploaded.data.original.original_name;
                    let idx = -1;
                    for (let i = 0; i < this.filesToUpload.length; i++) {
                        if (this.filesToUpload[i].name === fname) {
                            idx = i;
                            break;
                        }
                    }
                    let done;
                    // remove from filesToUpload array
                    if (idx !== -1) {
                        done = this.filesToUpload.splice(idx, 1);
                    }
                    // copy too completed array
                    this.completedFiles.push(done[0]);
                    /////////////////////////////////////////////
                    // EMIT FILE DATA TO PARENT COMP
                    /////////////////////////////////////////////
                    await this.$emit("onPicUpload", {
                        original: uploaded.data.original,
                        small: uploaded.data.small,
                        medium: uploaded.data.medium,
                        large: uploaded.data.large
                    });
                    // --
                    // Done close
                    if (this.filesToUpload.length === 0) {
                        setTimeout(() => {
                            this.closeUploadModal();
                        }, 1000);
                    }
                }
            } catch (error) {
                // TODO VUE ERRORS NOT CARED OF
                if (error.response) {
                    console.log(error);
                    this.uploadError = true;
                    const uploadErrorDetail = error.response;
                    if (uploadErrorDetail.status === 400) {
                        this.uploadErrorMessage = uploadErrorDetail.data.error;
                    } else if ([401, 403].includes(uploadErrorDetail.status)) {
                        // auth error
                        this.uploadErrorMessage = "AUTHENTICATION ERROR";
                    } else {
                        // Most probably 500
                        this.uploadErrorMessage = "SERVOR ERROR";
                    }
                } else {
                    // vue error
                    console.log(error);
                    Sentry.captureException(error);
                }
            }
        },
        removeFromSelection(idx) {
            this.selectedFiles.splice(idx, 1);
            // this.selectedFiles[idx] = null;
            // don't fuckin change index, set pic to null
            this.getImagePreviews();
            if (this.selectedFiles.length === 0) {
                this.reset();
            }
        },
        init() {
            // reset form to initial state
            this.selectFiles = true;
            this.viewFilesList = false;
            this.uploadFiles = false;
            this.selectedFiles = [];
            this.filesToUpload = [];
            this.completedFiles = [];
            this.previews = [];
            this.uploadError = null;
            this.uploadErrorMessage = "";
        },
        reset() {
            // reset form to initial state
            this.init();
        },
        fileIsTooBig(f) {
            return f.size > MAX_FILE_SIZE;
        }
    },
    computed: {
        ...mapGetters(["getProfile", "isAuthenticated", "authenticatedUser"]),
        tooManyPics() {
            return this.remainingUploads < this.selectedFiles.length;
        }
    },
    created() {
        console.log("Pics Upload created");
        this.init();
    },
    mounted() {
        console.log("Pics Upload mounted");
        this.init();
    }
};
</script>
<style scoped lang="scss">
/************** modal ***********************/
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

/***** Errors ******/
.isError {
    color: red;
}
</style>
