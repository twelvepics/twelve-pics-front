<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- TOAST USED FOR form errors and deleted -->
        <transition name="fade">
          <toast
            v-show="show_toast"
            :duration="toast_duration"
            :type="toast_type"
            :show="show_toast"
            :closeToast="closeToast"
          >{{ toast_message }}</toast>
        </transition>
        <!-- END TOAST -->
        <!-- SERVER SIDE ERRORS AND AUTH -->
        <page-loader v-if="is_loading"></page-loader>
        <page-error v-else-if="is_error  || (story && !story.is_in)" :errorMessage="errorMessage"></page-error>
        <!-- ENDS SERVER ERRORS AND AUTH -->
        <!-- START FORM -->
        <div class="card" v-else>
          <!-- CARD CONTENT -->
          <div class="card-content">
            <form @submit.prevent="onSubmit">
              <!-- API ERRORS -->
              <div
                v-if="is_api_error || is_form_error"
                class="isError"
                style="text-align:center;margin-bottom:12px;"
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
              <p
                class="title is-size-4"
              >{{ $route.name === "create-story" ? 'Add a' : 'Edit' }} story</p>
              <p class="subtitle is-size-6">
                Build your story, 6 to 12 photos. An informative text is required. Your images must be your own. Do not post any photos from other photographers.
                Do not hesitate to start the title of your story with [NSFW] if it is a mature or hard to view subject.
                <br />Once saved, you can update/modify your post at any time through the top right menu > my stories.
              </p>

              <!-- SHOW STORY URL -->
              <div v-if="story.page_url" style="margin-bottom:-.8rem; line-height:150%;">
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
              <!-- TOP BOXES -->
              <div
                class="columns is-variable is-2-mobile is-3-tablet is-8-desktop is-8-widescreen is-8-fullhd"
                style="margin-top:40px;"
              >
                <!-- LAYOUT BOX -->
                <div class="column is-two-fifths">
                  <article class="message is-small box-has-shadow">
                    <div class="message-header">
                      <p>LAYOUT</p>
                    </div>
                    <div
                      class="message-body add-story-layout-icons-box p8"
                      style="background-color:#999;"
                    >
                      <p class="content" style="margin-bottom:0;">
                        <img
                          class="icon-hover"
                          style="width:48px; height:auto;"
                          :src="story.layout === 'horizontal' ? '/img/layout-horizontal-on.png' : '/img/layout-horizontal-off.png'"
                          @click="selectLayout('horizontal')"
                        />
                      </p>
                      <p class="content" style="margin-bottom:0;">
                        <img
                          class="icon-hover"
                          style="width:48px; height:auto;"
                          :src="story.layout === 'tiles' ? '/img/layout-tiles-on.png' : '/img/layout-tiles-off.png'"
                          @click="selectLayout('tiles')"
                        />
                      </p>

                      <p class="content" style="margin-bottom:0;">
                        <img
                          class="icon-hover"
                          style="width:48px; height:auto;"
                          :src="story.layout === 'vertical' ? '/img/layout-vertical-on.png' : '/img/layout-vertical-off.png'"
                          @click="selectLayout('vertical')"
                        />
                      </p>
                      <p class="content" style="margin-bottom:0;">
                        <img
                          class="icon-hover"
                          style="width:48px; height:auto;"
                          :src="story.layout === 'carousel' ? '/img/layout-carousel-on.png' : '/img/layout-carousel-off.png'"
                          @click="selectLayout('carousel')"
                        />
                      </p>
                      <p
                        class="content selected-layout"
                        style="padding-top: .2rem"
                      >{{ story.layout.toUpperCase() }}</p>
                    </div>
                  </article>
                </div>
                <!-- ENDS LAYOUT BOX -->
                <!-- STATUS BOX -->
                <!-- STATUS PUBLISHED -->
                <div v-if="story.status === 'published'" class="column is-two-fifths">
                  <article class="message is-success is-small box-has-shadow">
                    <div class="message-header">
                      <p>STATUS</p>
                    </div>
                    <div
                      class="message-body pub-unpub-story-layout-box"
                      style="padding:.75rem 1rem 1rem 1rem"
                    >
                      <p
                        class="icon icon-hover has-text-success is-large"
                        style="padding:0;margin:0;"
                      >
                        <span class="icon is-left">
                          <font-awesome-icon class="fas fa-2x" icon="check-circle"></font-awesome-icon>
                        </span>

                        <span
                          class="content has-text-success pub-unpub-story-txt"
                          style="padding-left:.3rem; font-size: 140%;"
                        >PUBLISHED</span>
                      </p>
                      <p>
                        <button
                          class="button is-success"
                          style="font-size:.85rem"
                          @click.prevent="setStatus('draft')"
                        >UNPUBLISH</button>
                      </p>
                    </div>
                  </article>
                </div>
                <!-- STATUS DRAFT -->
                <div v-if="story.status === 'draft'" class="column is-two-fifths">
                  <article class="message is-warning is-small box-has-shadow">
                    <div class="message-header">
                      <p>STATUS</p>
                    </div>
                    <div
                      class="message-body pub-unpub-story-layout-box"
                      style="padding:.75rem 1rem 1rem 1rem"
                    >
                      <p
                        class="icon icon-hover has-text-warning is-large"
                        style="padding:0;margin:0;"
                      >
                        <span class="icon is-left">
                          <font-awesome-icon class="fas fa-2x" icon="ban"></font-awesome-icon>
                        </span>

                        <span
                          class="content has-text-warning pub-unpub-story-txt"
                          style="padding-left:.3rem; font-size:130%;"
                        >DRAFT</span>
                      </p>
                      <p>
                        <button
                          class="button is-warning"
                          style="font-size:.85rem;"
                          @click.prevent="setStatus('published')"
                        >PUBLISH</button>
                      </p>
                    </div>
                  </article>
                </div>
                <!-- ENDS STATUS BOX -->
                <!-- DELETE BOX -->
                <div class="column">
                  <article class="message is-danger is-small box-has-shadow">
                    <div class="message-header">
                      <p>DELETE</p>
                    </div>
                    <div class="message-body delete-story">
                      <p class="icon icon-hover has-text-danger is-large" @click="deleteStory()">
                        <font-awesome-icon class="fas fa-3x" icon="trash-alt"></font-awesome-icon>
                      </p>
                    </div>
                  </article>
                </div>
              </div>
              <!-- TOP BOXES -->
              <!-- ENDS DELETE BOX -->
              <!-- CATEGORY -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Category</label>
                <p class="content is-small is-marginless pb-05">
                  <span class="isError" v-if="$v.story.category.$error">Please select a category</span>
                  <span v-else>(Required) Please select the theme that better fits your photo story</span>
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

              <!-- TITLE -->
              <div class="field m-30-0-15-0">
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

              <!-- ABOUT MY STORY -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Describe your story</label>
                <p class="content is-small is-marginless pb-05">
                  <span
                    class="isError"
                    v-if="$v.story.pitch.$error"
                  >Must be at least 300 and at most 5000 Characters</span>
                  <span
                    v-else
                  >(Required) May be some context, additional information, your thoughts about the subject. Min 300 to 5000 characters.</span>
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

              <!-- UPOLAD PICS -->
              <div class="field m-30-0-15-0">
                <p class="content is-marginless" :class="{isError: $v.pics_uploaded.$error}">
                  <b>Upload your images</b>
                </p>
                <p class="content is-small is-marginless pb-05">
                  <span
                    class="isError"
                    v-if="$v.pics_uploaded.$error"
                  >Minimum 6, Maximum 12 photos - Maximum caption length 256 characters</span>
                  <span v-else>(required) Obviously :) Minimum 6, Maximum 12 photos - JPEG or PNG</span>
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
                <draggable
                  :list="pics_uploaded"
                  ghost-class="moving-card"
                  handle=".handle"
                  :animation="200"
                >
                  <div
                    v-for="(pic, idx) in pics_uploaded"
                    :key="idx"
                    class="columns box uploadedImageBox"
                    :class="{first: idx === 0}"
                  >
                    <div class="controlIcons">
                      <span class="icon icon-hover is-medium handle">
                        <font-awesome-icon class="fas fa-lg shadow" icon="arrows-alt"></font-awesome-icon>
                      </span>
                      <span class="icon icon-hover has-text-danger is-medium">
                        <font-awesome-icon
                          class="fas fa-lg shadow"
                          icon="trash-alt"
                          @click="removePic(idx)"
                        ></font-awesome-icon>
                      </span>
                    </div>
                    <div class="pic column is-narrow handle">
                      <img
                        :src="pic.medium.web_path"
                        :width="isHorizontal(pic.small) ? 270 : 160"
                        height="auto"
                      />
                    </div>
                    <div class="picInfo column">
                      <div class="field">
                        <label class="label">Caption</label>
                        <div class="control">
                          <textarea
                            class="textarea"
                            placeholder="2 lines of textarea"
                            rows="2"
                            :value="pic.caption"
                            @blur="setPicCaption(idx, $event)"
                          ></textarea>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                          <input
                            class="input"
                            type="text"
                            placeholder="A short description"
                            style="max-width:30rem;"
                            :value="pic.description"
                            @blur="setPicDescription(idx, $event)"
                            @keydown.enter.prevent
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </draggable>
                <!-- END LOOP PICS -->
                <!-- END UPLOADED PICS -->
              </div>
              <!-- END UPOLAD PICS -->

              <!-- MORE INFO -->
              <div class="field m-30-0-15-0">
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

              <!-- TAGS -->
              <div class="field m-30-0-15-0">
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

              <!-- LOCATION -->
              <div class="field m-30-0-15-0">
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
                    @change="setSelectedSelection"
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

              <!-- ALLOW COMMENTS -->
              <div class="field m-30-0-15-0">
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

              <!-- SUBMIT -->
              <div class="is-divider" style="margin-top:35px;"></div>
              <div class="field is-grouped submit-buttons">
                <div class="control">
                  <button
                    class="button is-primary"
                    type="submit"
                    @click.prevent="saveAndGoToList"
                    :disabled="submit_pending"
                  >Save</button>
                </div>
                <div class="control">
                  <button
                    class="button is-primary"
                    type="submit"
                    :disabled="submit_pending"
                  >Save and continue editing</button>
                </div>
                <div class="control" v-if="!isPublished">
                  <button
                    class="button is-success"
                    @click.prevent="saveAndPublish"
                    :disabled="submit_pending"
                  >Save and publish</button>
                </div>
                <div class="control">
                  <button class="button is-dark" @click.prevent="cancel">Cancel</button>
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
    <!-- Message composer modal -->
    <pics-upload-modal
      :isActive="uploadModalActive"
      :maxUploads="maxUploads"
      :remainingUploads="remainingUploads"
      @uploadModalClosed="closeUploadModal"
      @onPicUpload="picUploaded"
    ></pics-upload-modal>
  </main>
</template>

<script>
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import Toast from "../components/Toast.vue";
import axiosBase from "../services/axiosBase";
import Draggable from "vuedraggable";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import * as Sentry from "@sentry/browser";
import { mapGetters } from "vuex";
import PicsUploadModal from "../components/PicsUploadModal.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";
import { categoriesList } from "../utils/categories";
import { isHorizontal, isVertical } from "../utils/pics";

const MAX_PICS = 12;
const MIN_PICS = 6;

// custom validators
const notZero = value => value !== "0";
const isTagsList = value => {
  if (value.trim().length)
    return /^[a-zA-Z0-9 _-]+(,[a-zA-Z0-9 _-]+)*$/.test(value);
  return true;
};

export default {
  name: "CreateUpdateStory",
  components: {
    PicsUploadModal,
    Draggable,
    PageLoader,
    PageError,
    Toast
  },
  data() {
    return {
      is_debug: false,
      is_loading: false,
      // action: "",
      // fetch auth / not found errors, hide the rest of the page
      is_error: false,
      errorMessage: "",
      // api submit validation errors
      // don't block the page
      is_api_error: false,
      apiErrors: "",
      apiErrorType: "",
      // --=
      // this form errors
      is_form_error: false,
      // form submitted
      submit_pending: false,

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
        use_white_borders: false
      },
      // location
      mapboxOptions: [],
      deepMapboxOptions: [],
      selectedLocationPlace: "",
      selectedLocationObj: null,
      // pics modal
      uploadModalActive: false,
      // pics uploaded
      pics_uploaded: [],
      maxUploads: MAX_PICS,
      // toast
      toast_message: "",
      toast_type: "",
      toast_duration: 4000,
      show_toast: false
    };
  },
  methods: {
    persistStory() {
      console.log("persisting story to store");
      // copy pics to story
      this.story.pics = [];
      for (let pic of this.pics_uploaded) {
        this.story.pics.push(pic);
      }
      // tags to Array
      this.story.tags = this.tagsStr.trim().length
        ? this.tagsStr.split(",").map(x => x.trim())
        : [];
      this.$store.commit("setCreateFormCache", this.story);
    },
    formIsValid() {
      this.is_form_error = false;
      this.submit_pending = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.is_form_error = true;
        this.submit_pending = false;
        window.scrollTo(0, 0);
        this.toastFormErrors();
        return false;
      }
      return true;
    },
    async onSubmit(check_form = true) {
      if (check_form) {
        if (!this.formIsValid()) return;
      }
      try {
        console.log("onSubmit");
        let action;
        if (this.story._key) {
          action = "update";
        } else {
          action = "create";
        }
        let response = null;
        this.resetApiErrors();
        // copy pics to story
        this.story.pics = [];
        for (let pic of this.pics_uploaded) {
          this.story.pics.push(pic);
        }
        // tags to Array
        this.story.tags = this.tagsStr.trim().length
          ? this.tagsStr.split(",").map(x => x.trim())
          : [];
        if (action === "update") {
          console.log("I am an update");
          response = await axiosBase.put(`/stories/${this.story._key}`, {
            story: this.story
          });
        } else {
          console.log("I am a create");
          response = await axiosBase.post("/stories", {
            story: this.story
          });
        }
        const data = response.data;
        // console.log(data);
        // this.story.page_url = data.story.page_url
        this.story = Object.assign({}, data.story);
        this.pics_uploaded = this.story.pics;
        this.tagsStr = this.story.tags.join(", ");
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
        window.scrollTo(0, 0);
        this.submit_pending = false;
      }
    },
    async saveAndGoToList() {
      await this.onSubmit();
      // if no errors go to list
      if (!this.is_error && !this.is_api_error && !this.is_form_error) {
        this.$router.push({
          name: "user-stories",
          params: { username: this.authenticatedUser.username }
        });
      }
    },
    isHorizontal,
    isVertical,
    openUploadModal() {
      lockBgScroll();
      this.uploadModalActive = true;
    },
    closeUploadModal() {
      unlockBgScroll();
      this.uploadModalActive = false;
    },
    picUploaded(pic) {
      // console.log(pic);
      this.pics_uploaded.push({
        original: pic.original,
        small: pic.small,
        medium: pic.medium,
        large: pic.large
      });
    },
    setPicDescription(idx, event) {
      // console.log(event.target.value);
      this.pics_uploaded[idx].description = event.target.value;
    },
    setPicCaption(idx, event) {
      // console.log(event.target.value);
      this.pics_uploaded[idx].caption = event.target.value;
    },
    removePic(idx) {
      this.pics_uploaded.splice(idx, 1);
    },
    selectLayout(layout) {
      // console.log(`selectLayout(${layout}`);
      this.story.layout = layout;
    },
    // ERRORS TODO
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
    async setSelectedSelection(e) {
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
    setAllowComments(e) {
      // console.log(e.target.checked);
      this.story.allow_comments = e.target.checked;
    },
    resetApiErrors() {
      this.is_api_error = false;
      this.apiErrors = "";
      this.apiErrorType = "";
    },
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
    async saveAndPublish() {
      console.log("saveAndPublish");
      this.setStatus("published");
    },
    async setStatus(status) {
      // console.log(`selectLayout(${status}`);
      // reset all errors
      this.is_error = false;
      this.is_api_error = false;
      this.is_form_error = false;
      // check I'm valid
      if (!this.formIsValid()) return;
      // go and change status if im good
      this.story.status = status;
      await this.onSubmit(false);
    },

    // user cannot access story if its not his own or not found
    // properly handled server side, so it's fine
    async deleteStory() {
      console.log("deleteStory()");
      const resp = window.confirm("Really, delete?");
      // console.log(resp);
      if (resp) {
        window.scrollTo(0, 0);
        this.is_loading = true;
        this.$store.commit("clearCreateFormCache");
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
      }
    },
    cancel() {
      console.log("goBack");
      // this.resetAll();
      this.$store.commit("clearCreateFormCache");
      this.$router.go(-1);
    },
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
    },
    dismissDeletedNotif() {
      this.showDeletedNotif = false;
    },
    //////////////////////////////////
    // Toaster
    //////////////////////////////////
    closeToast() {
      this.show_toast = false;
      this.toast_message = "";
      this.toast_type = "";
    },
    toastSaveSuccess() {
      this.show_toast = true;
      this.toast_message = "The story has been saved";
      this.toast_type = "is-success";
    },
    toastFormErrors() {
      this.show_toast = true;
      this.toast_message = "Please fix the form errors";
      this.toast_type = "is-danger";
    },
    toastStoryDeleted() {
      this.show_toast = true;
      this.toast_message = "This Story has been deleted";
      this.toast_type = "is-warning";
    }
    ///////////////////////////
  },
  computed: {
    ...mapGetters([
      "isAuthenticated",
      "authenticatedUser",
      "getCreateFormCache"
    ]),
    user: function() {
      return this.authenticatedUser;
    },
    remainingUploads: function() {
      return this.maxUploads - this.pics_uploaded.length;
    },
    isPublished() {
      return this.story.status === "published";
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isAuthenticated) {
        vm.is_error = true;
        vm.errorMessage = "PLEASE AUTHENTICATE";
      }
      vm.is_loading = false;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.persistStory();
    next();
  },
  created() {
    const cache = this.$store.getters.getCreateFormCache;
    // console.log(cache);
    if (this.$route.name === "edit-story" && !cache.story) {
      this.is_loading = true;
      return this.fetchAndSetData();
    }
    if (cache.story) {
      this.story = cache.story;
      this.pics_uploaded = cache.story.pics;
      this.tagsStr = cache.story.tags.join(", ");
    }
  },
  validations: {
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
      maxLength: maxLength(MAX_PICS),
      $each: {
        original: {
          required
        },
        small: {
          required
        },
        medium: {
          required
        },
        large: {
          required
        },
        caption: {
          maxLength: maxLength(256)
        },
        description: {
          maxLength: maxLength(64)
        }
      }
    } // TODO
  }
};
</script>
<style>
/************** layout ***********/
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
main {
  flex-grow: 1;
}
navbar,
main,
footer {
  flex-shrink: 0;
}
main {
  margin-top: 90px;
}
footer {
  margin-top: 30px;
}
/************** spacing ***********/
.m-40-0-15-0 {
  margin: 40px 0 15px 0;
}
.p8 {
  padding: 9px;
}
/************** misc ***********/
.pics-box {
  border: 2px dashed gray;
  box-shadow: none;
}
.text-has-shadow {
  text-shadow: 2px 2px 8px #333;
}
.box-has-shadow {
  box-shadow: 2px 2px 8px #aaa;
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
.icon-hover {
  cursor: pointer;
}
/************** grids ***********/
.add-story-layout-icons-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  align-items: start;
}
.selected-layout {
  grid-column: 1 / span 4;
  justify-self: center;
  color: yellow;
  font-weight: bold;
}
.pub-unpub-story-layout-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
}
.pub-unpub-story-txt {
  /* grid-column: 2 / span 4; */
  /* justify-self: start; */
  font-weight: bold;
}
.delete-story {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
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
  margin-top: 15px;
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
/*************** draggable ******************/
.moving-card {
  opacity: 0.7;
  border: 1px solid #aaa;
  background: #eee;
}
.handle {
  cursor: move;
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
</style>