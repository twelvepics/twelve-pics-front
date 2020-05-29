<template>
  <!-- TODO -->
  <!-- LATER - MESSAGE FOR UNSAVED DATA ON LEAVE PAGE -->
  <main>
    <div class="container is-fluid narrow-container">
      <div class="columns is-centered">
        <!-- CENTER COLUMNN -->
        <div class="column">
          <!-- -->
          <!-- TOAST USED FOR form errors and deleted -->
          <toast v-show="showToast" :closeToast="closeToast" :toastType="toastType">
            <template v-slot:default>
              <div v-html="toastMessageJoined"></div>
            </template>
          </toast>
          <!-- END TOAST -->

          <!-- -->
          <!-- SERVER SIDE ERRORS AND AUTH -->
          <page-loader v-if="is_loading"></page-loader>
          <page-error v-else-if="is_error  || (story && !story.is_in)" :errorMessage="errorMessage"></page-error>
          <!-- ENDS SERVER ERRORS AND AUTH -->

          <!-- -->
          <!-- START FORM -->
          <div class="card" v-else>
            <!-- CARD CONTENT -->
            <div class="card-content">
              <form>
                <!-- -->
                <!-- API ERRORS -->
                <div
                  v-if="is_api_error || is_form_error"
                  class="isError"
                  style="text-align:center;"
                >
                  <div
                    v-if="['INVALID_CREATE_STORY_ERROR', 'INVALID_UPDATE_STORY_ERROR'].includes(apiErrorType)"
                  >
                    <p>
                      <b>VALIDATIONS ERRORS</b>
                    </p>
                    <ul id="apiErrors">
                      <li v-for="(k, v, idx) in apiErrors" :key="idx">{{ k }}</li>
                    </ul>
                  </div>
                  <!-- <div v-else-if="is_form_error">PLEASE FIX THE FORM ERRORS.</div> -->
                  <div
                    v-else-if="apiErrorType === 'SERVER ERROR'"
                  >SERVER ERROR, SORRY. TRY AGAIN LATER.</div>
                </div>
                <!-- ENDS API ERRORS -->

                <!-- -->
                <p
                  class="title is-size-4"
                >{{ $route.name === "create-story" ? 'Add a' : 'Edit' }} story</p>
                <p class="subtitle is-size-6">
                  Build your story, 6 to 12 photos. An informative text is required. Your images must be your own. Do not post any photos from other photographers.
                  Do not hesitate to start the title of your story with [NSFW] if it is a mature or hard to view subject.
                  <br />Once saved, you can update your post at any time through the top right menu > my stories.
                </p>

                <!-- -->
                <!-- SHOW STORY URL -->
                <div
                  class="hide-if-mobile"
                  v-if="story.page_url && (canDisplay || story.is_viewable)"
                  style="margin-bottom:-.8rem; line-height:150%;"
                >
                  <p
                    class="is-size-5"
                    :class="story.status === 'draft' ? 'page-link-title-draft' : 'page-link-title-published'"
                  >
                    <b>PAGE URL</b>
                  </p>
                  <p class="content">
                    This will be the public URL for your page, it will be linked on the site once you have decided to publish it.
                    <br />
                    <router-link
                      :to="{ name: 'view-story', params: { slug: story.slug }}"
                      class="is-size-5"
                      :class="story.status === 'draft' ? 'page-link-title-draft' : 'page-link-title-published'"
                    >{{ story.page_url}}</router-link>
                  </p>
                </div>
                <!-- ENDS SHOW STORY URL -->

                <!-- -->
                <!-- TOP BOXES -->
                <story-top-boxes
                  :story="story"
                  @selectLayout="selectPicsLayout"
                  @saveStory="saveStory"
                  @deleteStory="deleteStory"
                />
                <!-- ENDS DELETE BOX -->
                <!-- END TOP BOXES -->

                <!-- -->
                <!-- CATEGORY -->
                <div class="field">
                  <label class="label is-marginless">Category</label>
                  <p class="content is-small is-marginless pb-05">
                    <span class="isError" v-if="$v.story.category.$error">Please select a category</span>
                    <span v-else>(Required) Please select the theme that better fits your story</span>
                  </p>
                  <div class="select" :class="{ 'is-danger': $v.story.category.$error }">
                    <select v-model="story.category">
                      <option disabled value="0">Select a theme</option>
                      <option
                        v-for="category in categoriesList"
                        :key="category.id"
                        :value="category.key"
                      >{{ category.display }}</option>
                    </select>
                  </div>
                </div>
                <!-- CATEGORY -->

                <!-- -->
                <!-- TITLE -->
                <div class="field form-item">
                  <label class="label is-marginless">Title</label>
                  <p class="content is-small is-marginless pb-05">
                    <span
                      class="isError"
                      v-if="$v.story.title.$error"
                    >Title must be min 8 characters and max 128 characters</span>
                    <span v-else>(Required) Title must be min 8 characters up to 128 characters</span>
                  </p>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Title"
                      v-model="story.title"
                      :class="{ 'is-danger': $v.story.title.$error }"
                      @blur="{$v.story.title.$touch()}"
                      @input="resetApiErrors()"
                      @keydown.enter.prevent
                    />
                  </div>
                </div>
                <!-- TITLE -->

                <!-- -->
                <!-- ABOUT MY STORY -->
                <div class="field form-item">
                  <label class="label is-marginless">Describe your story</label>
                  <p class="content is-small is-marginless pb-05">
                    <span
                      class="isError"
                      v-if="$v.story.pitch.$error"
                    >Must be at least 300 and at most 5000 Characters</span>
                    <span
                      v-else
                    >(Required) May be some context, additional information, your thoughts about the subject. Min 300 to max 5000 characters.</span>
                  </p>
                  <div class="control">
                    <textarea
                      class="textarea"
                      :class="{ 'is-danger': $v.story.pitch.$error }"
                      placeholder="Pitch your story"
                      v-model="story.pitch"
                      @blur="{$v.story.pitch.$touch()}"
                      @keyup.22="$v.story.pitch.$touch()"
                    ></textarea>
                  </div>
                </div>
                <!-- ABOUT MY STORY -->

                <!-- -->
                <!-- UPOLAD PICS -->
                <div class="field form-item">
                  <p
                    class="content is-marginless images-txt"
                    :class="{isError: $v.pics_uploaded.$error}"
                  >
                    <b>Upload your images</b>
                  </p>
                  <p class="content is-small is-marginless pb-05">
                    <span
                      class="isError"
                      v-if="$v.pics_uploaded.$error"
                    >Minimum 6, Maximum 12 photos - Maximum caption length 256 characters</span>
                    <span v-else>(required) Minimum 6, Maximum 12 photos - JPEG or PNG</span>
                  </p>

                  <!-- PIC UPLOAD BUTTON-->
                  <div class="file is-primary" style="margin:0;">
                    <button class="button is-primary" @click.prevent="openUploadModal">
                      <span class="icon">
                        <font-awesome-icon class="fas" icon="upload"></font-awesome-icon>
                      </span>
                      <span>Add your images</span>
                    </button>
                  </div>
                  <!-- END PIC UPLOAD BUTTON-->
                  <!-- UPLOADED PICS -->
                  <!-- LOOP PICS-->
                  <component
                    :is="picsUploadedComponent"
                    :pics_uploaded="pics_uploaded"
                    @openPicInfoModal="openPicInfoMobileModal"
                  ></component>
                  <!-- END UPLOADED PICS -->
                </div>
                <!-- END UPOLAD PICS -->

                <!-- -->
                <!-- MORE INFO -->
                <div class="field form-item">
                  <label class="label is-marginless">Gear, technique, inspiration</label>
                  <p class="content is-small is-marginless pb-05">
                    <span
                      class="isError"
                      v-if="$v.story.inspiration.$error"
                    >Must be at most 5000 Characters</span>
                    <span v-else>Everything that is not directly related to your story may come here</span>
                  </p>
                  <div class="control">
                    <textarea
                      class="textarea"
                      :class="{ 'is-danger': $v.story.inspiration.$error }"
                      placeholder="A few worlds about you..."
                      v-model="story.inspiration"
                      @keyup="$v.story.inspiration.$touch()"
                      @keyup.22="$v.story.inspiration.$touch()"
                    ></textarea>
                  </div>
                </div>
                <!-- MORE INFO -->

                <!-- -->
                <!-- TAGS -->
                <div class="field form-item">
                  <label class="label is-marginless">Add tags</label>
                  <p class="content is-small is-marginless pb-05">
                    <span
                      class="isError"
                      :class="{ 'is-danger': $v.tagsStr.$error }"
                      v-if="$v.tagsStr.$error"
                    >Comma separated list of words, max length 64 characters</span>
                    <span
                      v-else
                    >Tags will be used amongst other criteria by users to search for and find you story - Coma separated list of single words</span>
                  </p>
                  <div class="control">
                    <input
                      class="input"
                      type="tags"
                      placeholder="Tag1,Tag2,Tag3"
                      value
                      v-model="tagsStr"
                      @blur="$v.tagsStr.$touch()"
                    />
                  </div>
                </div>
                <!-- TAGS -->

                <!-- -->
                <!-- LOCATION -->
                <div class="field form-item">
                  <label class="label is-marginless">Your story's location</label>
                  <p class="content is-small is-marginless pb-05">
                    <span
                      style="color:red;"
                      v-if="$v.story.location.place_name.$error"
                    >Max length is 128 characters.</span>
                    <span v-else>Where was it?</span>
                  </p>
                  <div class="control" style="max-width: 500px;">
                    <input
                      autocomplete="off"
                      class="input"
                      :class="{ 'is-danger': $v.story.location.place_name.$error }"
                      type="text"
                      v-model="story.location.place_name"
                      placeholder="Type on and select your location"
                      list="locations"
                      @input="searchLocation"
                      @change="setSelectedLocation"
                      @keyup="$v.story.location.place_name.$touch()"
                      @keyup.22="$v.story.location.place_name.$touch()"
                      @keydown.enter.prevent
                    />
                    <datalist id="locations">
                      <select>
                        <option
                          v-for="(option, idx) in mapboxOptions"
                          :value="option.place_name"
                          :key="idx"
                        ></option>
                      </select>
                    </datalist>
                  </div>
                </div>
                <!-- LOCATION -->

                <!-- -->
                <!-- ALLOW COMMENTS -->
                <div class="field form-item">
                  <div>
                    <label class="label is-marginless">
                      Allows users to comment my
                      story
                    </label>
                    <p class="content is-small is-marginless pb-05">You may change your mind later</p>
                  </div>
                  <div></div>
                  <div class="field switch-btn-align">
                    <input
                      id="switch-contact"
                      type="checkbox"
                      name="witch-contact"
                      class="switch is-success"
                      :checked="story.allow_comments"
                      v-model="story.allow_comments"
                      @change="setAllowComments"
                    />
                    <label
                      for="switch-contact"
                    >Comments are {{ story.allow_comments ? "" : "not"}} allowed</label>
                  </div>
                </div>
                <!-- ALLOW COMMENTS-->

                <!-- -->
                <!-- SUBMIT -->
                <div class="is-divider submit-top"></div>
                <div class="field is-grouped submit-buttons">
                  <div class="control">
                    <button
                      class="button"
                      :class="{'is-warning': isDraft, 'is-primary': isPublished}"
                      type="submit"
                      :disabled="submit_pending"
                      @click.prevent="saveStory('save')"
                    >Save</button>
                  </div>
                  <div class="control">
                    <button
                      class="button"
                      :class="{'is-warning': isDraft, 'is-primary': isPublished}"
                      type="submit"
                      @click.prevent="saveStory('view')"
                      :disabled="submit_pending"
                    >View</button>
                  </div>
                  <div class="control hide-if-mobile" v-if="!isPublished">
                    <button
                      class="button is-success"
                      @click.prevent="saveStory('publish')"
                      :disabled="submit_pending"
                    >Publish</button>
                  </div>
                  <div class="control hide-if-mobile" v-else>
                    <button
                      class="button is-warning"
                      @click.prevent="saveStory('unpublish')"
                      :disabled="submit_pending"
                    >Unpublish</button>
                  </div>
                  <div class="control">
                    <button class="button is-light" @click.prevent="cancel">Cancel</button>
                  </div>
                  <div class="control hide-if-full">
                    <button
                      class="button is-light"
                      type="submit"
                      @click.prevent="deleteStory()"
                    >Delete</button>
                  </div>
                </div>
                <!-- SUBMIT -->
                <div style="margin-top:25px;"></div>
              </form>
            </div>
            <!-- END CARD CONTENT -->
          </div>
        </div>
      </div>

      <!-- -->
      <!-- DEBUG -->
      <div class="columns is-centered">
        <div v-if="is_debug" class="column is-three-quarters-desktop">
          <!-- START -->
          <div class="card" style="padding:20px;">
            <p>DEBUG</p>
            <!-- <p>{{ $v }}</p> -->
            <p>{{ $v }}</p>
          </div>
        </div>
      </div>
      <!-- END DEBUG -->

      <!-- -->
      <!-- Pics upload modal -->
      <pics-upload-modal
        :isActive="uploadModalActive"
        :maxUploads="maxUploads"
        :remainingUploads="remainingUploads"
        @uploadModalClosed="closeUploadModal"
        @onPicUpload="picUploaded"
      ></pics-upload-modal>
      <!-- Message composer modal -->
      <pic-info-mobile-modal
        :isActive="picInfoMobileModalActive"
        :picId="picInfoMobileModalSelected"
        :pic="pics_uploaded[picInfoMobileModalSelected]"
        @picInfoMobileModalClosed="closePicInfoMobileModal"
        @setPicInfo="mobileSetPicInfo"
      ></pic-info-mobile-modal>
    </div>
  </main>
</template>

<script>
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import Toast from "../components/Toast.vue";
import StoryTopBoxes from "../components/createupdatestory/StoryTopBoxes.vue";
import PicsUploadedMobile from "../components/createupdatestory/PicsUploadedMobile.vue";
import PicsUploadedFull from "../components/createupdatestory/PicsUploadedFull.vue";
import PicInfoMobileModal from "../components/createupdatestory/PicInfoMobileModal.vue";
import axiosBase from "../services/axiosBase";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import * as Sentry from "@sentry/browser";
import { mapGetters } from "vuex";
import PicsUploadModal from "../components/createupdatestory/PicsUploadModal.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";
import { categoriesList } from "../utils/categories";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;

const MAX_PICS = 12;
const MIN_PICS = 6;

// custom validators
const notZero = value => value !== "0";
const isTagsList = value => {
  if (value.trim().length)
    return /^[a-zA-Z0-9 _-]+(,[a-zA-Z0-9 _-]+(,{0,1}))*$/.test(value);
  return true;
};

export default {
  name: "CreateUpdateStory",
  components: {
    PicsUploadModal,
    PageLoader,
    PageError,
    Toast,
    StoryTopBoxes,
    PicsUploadedMobile,
    PicsUploadedFull,
    PicInfoMobileModal
  },
  data() {
    return {
      is_debug: false,
      is_loading: false,

      // create or update
      is_create: false,
      is_edit: false,

      // validations -----------------------
      validate_for_draft: false,

      // layout/dyn components -------------
      picsUploadedComponent: null,
      page_layout: null,

      // server side auth 404 --------------
      is_error: false,
      errorMessage: "",

      // api errors ------------------------
      is_api_error: false,
      apiErrors: "",
      apiErrorType: "",

      // form errors -----------------------
      // form errors
      is_form_error: false,
      // form submitted
      submit_pending: false,

      // story -----------------------------
      categoriesList,
      tagsStr: "",
      story: {
        layout: "vertical",
        status: "draft",
        is_in: true,
        category: "0",
        title: "",
        pics: [],
        pitch: "",
        inspiration: "",
        tags: [],
        location: {},
        allow_comments: true,
        author_key: "",
        author_info: {},
        pics_tiles_layout: [],
        use_white_borders: false,
        is_viewable: null
      },
      // location -------------------------
      mapboxOptions: [],
      deepMapboxOptions: [],
      selectedLocationPlace: "",
      selectedLocationObj: null,

      // pics modal -----------------------
      uploadModalActive: false,

      // pics uploaded --------------------
      pics_uploaded: [],
      maxUploads: MAX_PICS,

      // pic info mobile modal ------------
      picInfoMobileModalActive: false,
      picInfoMobileModalSelected: null,

      // toast -----------------------------
      showToast: false,
      showToastTimeout: null,
      toastMessage: [],
      toastType: ""
    };
  },
  methods: {
    //////////////////////////////////////////////////
    // API v2
    //////////////////////////////////////////////////
    // top boxes ---------------------------------------
    //  selectPicsLayout
    selectPicsLayout(layout) {
      // console.log(`selectPicsLayout(${layout}`);
      this.story.layout = layout;
    },
    // deleteStory
    async deleteStory() {
      console.log("deleteStory()");
      const resp = window.confirm("Really, delete?");
      // console.log(resp);
      if (resp) {
        window.scrollTo(0, 0);
        // this.is_loading = true;
        // delete Server side only if already saved
        if (this.story._key) {
          // this.onSubmit();
          try {
            await axiosBase.delete(`/stories/${this.story._key}`);
          } catch (err) {
            // ERR TODO
            // 401 403 404 500 handled server side
            this.is_error = true;
            console.log(err);
            Sentry.captureException(err);
          }
        }
        this.resetAll();
        this.toastStoryDeleted();
        setTimeout(() => {
          this.$router.push({
            name: "user-stories",
            params: { username: this.user.username }
          });
        }, 1500);
      }
    },

    // fetch initial data ------------------------------
    // fetchAndSetData
    async fetchAndSetData() {
      // USE only for update story load initial data
      try {
        this.is_loading = true;
        const key = this.$route.params.key;
        const response = await axiosBase.get(`/stories/${key}`);
        // console.log("fetched");
        const data = response.data;
        // get story is unchecked server side, must validate auth here
        const author_key = data.story.author_key;
        if (author_key !== this.authenticatedUser._key) {
          // blocking
          this.is_error = true;
          this.errorMessage = "NOT AUTHORIZED";
        }
        // console.log(data);
        this.story = Object.assign({}, data.story);
        this.pics_uploaded = this.story.pics;
        this.tagsStr = this.story.tags.join(", ");
        this.is_loading = false;
      } catch (e) {
        if (e.response) {
          this.is_error = true;
          console.log(e); // GET ERROR MESSAGE FROM SERVER
          // get error message from server
          if (e.response.status === 404) {
            // blocking
            this.errorMessage = "STORY NOT FOUND";
          } else {
            // Most probably a 500
            this.errorMessage = "SERVER ERROR";
          }
        } else {
          console.log(e);
          Sentry.captureException(e);
        }
      } finally {
        this.is_loading = false;
      }
    },

    // save story ---------------------------------------
    // saveStory
    async saveStory(action) {
      // action -> one of: save, view, publish, unpublish
      ////////////////////////////////////////
      // what validation should I use?
      ////////////////////////////////////////
      // validate_for_draft: false,
      // validate_for_publication: false,

      // is_draft && save or action: unpublish -> validate_for_draft
      // else -> validate_for_publication

      try {
        this.submit_pending = true;
        if ((this.isDraft && action === "save") || action === "unpublish") {
          this.validate_for_draft = true;
        } else {
          this.validate_for_draft = false;
        }
        if (!this.formIsValid(action)) return;

        let response;
        this.resetApiErrors();

        // copy pics to story
        this.story.pics = [];
        for (let pic of this.pics_uploaded) {
          this.story.pics.push(pic);
        }

        // tags to Array
        this.story.tags = this.tagsStr.trim().length
          ? this.tagsStr
              .split(",")
              .map(x => x.trim())
              .filter(t => t.length)
          : [];

        const data = {
          story: this.story,
          // save, view, publish, unpublish
          action
        };
        if (this.is_edit) {
          // update
          console.log("I am an update");
          response = await axiosBase.put(`/stories/${this.story._key}`, data);
          // console.log(data);
          // this.story.page_url = data.story.page_url
        } else {
          //if (this.is_create) {
          // save and replace url
          console.log("I am a create");
          response = await axiosBase.post("/stories", data);
        }
        const response_data = response.data;
        this.story = Object.assign({}, response_data.story);
        this.pics_uploaded = this.story.pics;
        this.tagsStr = this.story.tags.join(", ");
        if (this.is_create) {
          this.$router.replace({
            name: "edit-story",
            params: { key: response_data.story._key }
          });
        }
        if (action === "view") {
          this.$router.push({
            name: "view-story",
            params: { slug: response_data.story.slug }
          });
        }
        this.toastSaveSuccess(action);
      } catch (error) {
        this.is_api_error = true;
        // at this point bother only for validation errors
        // all the rest goes as 500 whatever
        if (error.response) {
          if (
            [
              "INVALID_CREATE_STORY_ERROR",
              "INVALID_UPDATE_STORY_ERROR"
            ].includes(error.response.data.error_type)
          ) {
            this.apiErrors = error.response.data.errors;
            this.apiErrorType = error.response.data.error_type;
          } else {
            this.apiErrorType = "SERVER ERROR";
          }
        } else {
          // vue error
          console.log(error);
          Sentry.captureException(error);
        }
      } finally {
        this.submit_pending = false;
        window.scrollTo(0, 0);
      }
    },
    // form valid -------------------------------------
    // formIsValid
    formIsValid(action) {
      this.is_form_error = false;
      // this.submit_pending = true;
      this.$v.$touch();
      // TODO TODO PUT BACK NEXT LINE WITH PICS ERRORS
      // if (this.$v.$invalid || this.hasPicsError()) {
      if (this.$v.$invalid) {
        this.is_form_error = true;
        // this.submit_pending = false;
        // window.scrollTo(0, 0);
        this.toastFormErrors(action);
        return false;
      }
      return true;
    },
    // pics -------------------------------------------
    // openUploadModal
    openUploadModal() {
      lockBgScroll();
      this.uploadModalActive = true;
    },
    // closeUploadModal
    closeUploadModal() {
      unlockBgScroll();
      this.uploadModalActive = false;
    },
    //  picUploaded
    picUploaded(pic) {
      // console.log(pic);
      this.pics_uploaded.push({
        original: pic.original,
        small: pic.small,
        medium: pic.medium,
        large: pic.large
      });
    },
    // pic info mobile ----------------------------------------
    // closePicInfoMobileModal
    closePicInfoMobileModal() {
      console.log("CLOSE_PIC_INFO_MOBILE_MODAL");
      unlockBgScroll();
      this.picInfoMobileModalActive = false;
      // console.log(this.picInfoMobileModalActive);
      this.$nextTick(() => {
        this.picInfoMobileModalSelected = null;
      });
    },
    // openUploadModal
    openPicInfoMobileModal(picId) {
      console.log("OPEN_PIC_INFO_MOBILE_MODAL");
      lockBgScroll();
      this.picInfoMobileModalActive = true;
      this.picInfoMobileModalSelected = picId;
      console.log(this.picInfoMobileModalSelected);
      console.log(typeof this.picInfoMobileModalSelected);
    },
    mobileSetPicInfo(idx) {
      console.log(`mobileSetPicInfo => ${idx}`);
    },
    // location ------------------------------------------------
    // searchLocation
    async searchLocation(e) {
      // this.resetApiErrors();
      try {
        if (e.target.value.length > 1 && e.inputType === "insertText") {
          const foundLocations = await axiosBase.get(
            `/stories/${
              this.authenticatedUser._key
            }/locate?location=${encodeURIComponent(e.target.value)}`
          );
          this.mapboxOptions = foundLocations.data.found;
          this.deepMapboxOptions = foundLocations.data.found;
        } else {
          this.mapboxOptions = [];
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
        Sentry.captureException(err);
      }
    },
    // setSelectedLocation
    async setSelectedLocation(e) {
      try {
        this.selectedLocationPlace = e.target.value;
        this.selectedLocationObj = await this.deepMapboxOptions.filter(l => {
          return l.place_name == this.selectedLocationPlace;
        });
        if (this.selectedLocationObj.length > 0) {
          this.story.location = this.selectedLocationObj[0];
        } else {
          this.story.location = {
            place_name: e.target.value,
            latitude: null,
            longitude: null
          };
        }
        this.mapboxOptions = [];
      } catch (e) {
        console.log(e);
        Sentry.captureException(e);
      }
    },

    // allow comments -------------------------------------------
    // setAllowComments
    setAllowComments(e) {
      // console.log(e.target.checked);
      this.story.allow_comments = e.target.checked;
    },

    // reset errors ---------------------------------------------
    // resetApiErrors
    resetApiErrors() {
      this.is_api_error = false;
      this.apiErrors = "";
      this.apiErrorType = "";
    },
    // resetAll
    resetAll() {
      this.is_loading = false;
      this.is_error = false;
      this.errorMessage = "";
      // api submit errors
      this.is_api_error = false;
      this.apiErrors = "";
      this.apiErrorType = "";
      this.tagsStr = "";
      this.story = {
        layout: "vertical",
        status: "draft",
        is_in: true,
        category: "0",
        title: "",
        pics: [],
        inspiration: "",
        pitch: "",
        tags: [],
        location: {},
        allow_comments: true,
        author_key: "",
        author_info: {},
        pics_tiles_layout: [],
        use_white_borders: false
      };
      // location
      this.mapboxOptions = [];
      this.deepMapboxOptions = [];
      this.selectedLocationPlace = "";
      this.selectedLocationObj = null;
      // pics modal
      this.uploadModalActive = false;
      // pics uploaded
      this.pics_uploaded = [];
      this.submit_pending = false;
      // pic info mobile modal ------------
      this.picInfoMobileModalActive = false;
      this.picInfoMobileModalSelected = null;
    },

    // cancel ----------------------------------------------------
    // cancel
    cancel() {
      // console.log("goBack");
      // this.resetAll();
      this.$router.go(-1);
    },

    // toast -----------------------------------------------------
    // toastIt
    toastIt(messageObj, duration = 3000) {
      // console.log("toastIt I was called");
      // console.log(messageObj.message.join('<br />'));
      this.showToast = true;
      this.toastMessage = messageObj.message;
      this.toastType = messageObj.messageType;
      this.showToastTimeout = setTimeout(() => {
        this.closeToast();
      }, duration);
    },
    // closeToast
    closeToast() {
      if (this.showToastTimeout) {
        clearTimeout(this.showToastTimeout);
      }
      this.showToast = false;
      this.toastMessageType = "";
      this.toasrMessage = "";
    },
    // toastSaveSuccess
    toastSaveSuccess(action) {
      // action -> one of: save, view, publish, unpublish
      console.log(action);
      if (action === "view") {
        return;
      }
      let message = [];
      let messageType = "toast-top-centered is-success";
      if (action === "save") {
        message = ["The story has been saved"];
      } else if (action === "publish") {
        message = ["The story has been saved and published"];
      } else if (action === "unpublish") {
        message = ["The story has been unpublished"];
        messageType = "toast-top-centered is-warning";
      }
      this.toastIt({
        message,
        messageType
      });
    },
    // toastFormErrors
    toastFormErrors(action) {
      // action -> one of: save, view, publish, unpublish
      let message = [];
      console.log(action);
      if (action === "save") {
        message.push("Coud not save the story.");
      } else if (action === "view") {
        message.push("You need a valid story to view it.");
      } else if (action === "publish") {
        message.push("Invalid story");
      }
      message.push("Please fix the form errors");
      this.toastIt({
        message,
        messageType: "toast-top-centered is-danger"
      });
    },
    // toastStoryDeleted
    toastStoryDeleted() {
      this.toastIt(
        {
          message: ["This Story has been deleted"],
          messageType: "toast-top-centered is-warning"
        },
        1500
      );
    },

    // drag n drop ----------------------------------------------
    // draggableChange

    handleWindowChange(event) {
      if (event.matches) {
        // < 999
        console.log("CHANGE < 999");
        this.page_layout = LAYOUT_MOBILE;
        this.picsUploadedComponent = PicsUploadedMobile;
      } else {
        // >= 999
        console.log("CHANGE >= 999");
        this.page_layout = LAYOUT_FULL;
        this.picsUploadedComponent = PicsUploadedFull;
      }
    },
    isLayoutMobile() {
      return this.page_layout === LAYOUT_MOBILE;
    },
    isLayoutFull() {
      return this.page_layout == LAYOUT_FULL;
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),
    toastMessageJoined() {
      return this.toastMessage.join("<br />");
    },
    user: function() {
      return this.authenticatedUser;
    },
    remainingUploads: function() {
      return this.maxUploads - this.pics_uploaded.length;
    },
    isPublished() {
      return this.story.status === "published";
    },
    isDraft() {
      return this.story.status === "draft";
    },
    canDisplay() {
      // this.story.pics_tiles_layout.length means we have enough pics to display this story
      return (
        this.story.pitch.length &&
        this.story.pics_tiles_layout.length &&
        parseInt(this.story.category, 10) !== 0
      );
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isAuthenticated) {
        vm.is_error = true;
        vm.errorMessage = "PLEASE AUTHENTICATE";
      } else {
        vm.is_create = to.name === "create-story" ? true : false;
        vm.is_edit = to.name === "edit-story" ? true : false;
      }
      vm.is_loading = false;
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
  },
  // beforeRouteLeave(to, from, next) {
  // },
  created() {
    _mql = window.matchMedia("(max-width: 999px)");
    console.log(_mql.matches);
    if (_mql.matches) {
      // < 999
      console.log("INITIAL < 999");
      this.page_layout = LAYOUT_MOBILE;
      this.picsUploadedComponent = PicsUploadedMobile;
    } else {
      // >= 999
      console.log("INITIAL >= 999");
      this.page_layout = LAYOUT_FULL;
      this.picsUploadedComponent = PicsUploadedFull;
    }
    console.log(_mql);
    // initial state here
    _mql.addListener(this.handleWindowChange);
    /////////////////////////////////////////////////////////
    // components on change
    /////////////////////////////////////////////////////////
    if (this.$route.name === "edit-story") {
      this.is_loading = true;
      return this.fetchAndSetData();
    }
  },
  beforeDestroy: function() {
    console.log("#--- beforeDestroy ---#");
    _mql.removeListener(this.handleWindowChange);
    // _mql = null; // ?
  },
  validations() {
    if (this.validate_for_draft) {
      return {
        story: {
          category: {},
          title: {
            required,
            minLen: minLength(8),
            maxLen: maxLength(128)
          },
          pitch: {
            minLen: minLength(300),
            maxLen: maxLength(5000)
          },
          inspiration: {
            maxLen: maxLength(5000)
          },
          location: {
            place_name: {
              maxLen: maxLength(128)
            }
          }
        },
        tagsStr: {
          maxLen: maxLength(64),
          isTagsList
        },
        pics_uploaded: {
          maxLength: maxLength(MAX_PICS)
        }
      };
    } else {
      return {
        story: {
          category: {
            required,
            notZero
          },
          title: {
            required,
            minLen: minLength(8),
            maxLen: maxLength(128)
          },
          pitch: {
            required,
            minLen: minLength(300),
            maxLen: maxLength(5000)
          },
          inspiration: {
            maxLen: maxLength(5000)
          },
          location: {
            place_name: {
              maxLen: maxLength(128)
            }
          }
        },
        tagsStr: {
          maxLen: maxLength(64),
          isTagsList
        },
        pics_uploaded: {
          required,
          minLength: minLength(MIN_PICS),
          maxLength: maxLength(MAX_PICS)
        }
      };
    }
  }
};
</script>
<style scoped>
/************** misc ***********/
.pics-box {
  border: 2px dashed gray;
  box-shadow: none;
}
.text-has-shadow {
  text-shadow: 2px 2px 8px #333;
}
/************** images ***********/
.image-h {
  width: 201px;
  height: 134px;
}
.image-v {
  width: 134px;
  height: 201px;
}
.image-s {
  width: 170px;
  height: 170px;
}
/************** misc ***********/
.page-link-title-draft {
  color: #f8aa0f;
}
a.page-link-title-draft {
  color: #f8aa0f;
}
.page-link-title-published {
  color: #1ecf3c;
}
a.page-link-title-published {
  color: #1ecf3c;
}
.form-item {
  margin: 30px 0 15px 0;
}
.submit-top {
  margin-top: 35px;
}
.title {
  margin-bottom: 2.2rem !important;
}
.hide-if-full {
  display: none !important;
}
.images-txt {
  color: #363636;
}

@media only screen and (max-width: 768px) {
  .picInfo {
    margin-top: 0;
  }
  .picInfo.column {
    padding-top: 0;
    margin-top: 0;
  }
  .pic.column {
    padding-bottom: 0;
    margin-bottom: 0;
  }
}
@media only screen and (max-width: 600px) {
  .is-size-6 {
    font-size: 90% !important;
  }
  .is-size-4 {
    font-size: 1.1rem !important;
    line-height: 1.4rem;
    margin: 0 0 0.3rem 0 !important;
  }
  .title:not(:last-child) {
    margin-bottom: 0.4rem;
  }
  .title {
    margin-bottom: 1.8rem !important;
  }
  .content {
    font-size: 90%;
  }
  .content:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .card-content {
    padding: 0.75rem;
  }
  input,
  textarea,
  select,
  option {
    font-size: 90%;
    padding: 0.3rem;
  }
  .form-item {
    margin: 15px 0 15px 0;
  }
  .label {
    color: #888;
    font-size: 0.9rem;
  }
  .content.is-small {
    font-size: 0.7rem;
  }
  .submit-divider {
    margin-top: 10px;
  }
  .column {
    padding: 0;
  }
  .columns {
    margin: 0;
  }
  .hide-if-mobile {
    display: none;
  }
  .hide-if-full {
    display: block !important;
  }
  .subtitle:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .form-item {
    margin: 15px 0 15px 0;
  }
  .submit-top {
    margin-top: 20px;
  }
  button {
    font-size: 90%;
    padding: 0 0.7rem 0 0.7rem;
  }
  .switch[type="checkbox"] + label {
    font-size: 90%;
  }
  .pb-05 {
    padding-bottom: 0.2rem;
  }
  .images-txt {
    color: #888;
  }
}
</style>