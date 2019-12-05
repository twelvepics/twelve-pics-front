<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- DELETED NOTIF -->
        <div
          class="notification is-danger"
          v-if="!is_loading && showDeletedNotif"
          style="padding:.5rem .8rem"
        >
          <button class="delete" @click="dismissDeletedNotif"></button>
          The story has been deleted
        </div>
        <!-- END DELETED NOTIF -->
        <!-- SERVER SIDE ERRORS AND AUTH -->
        <div
          class="card"
          v-if="is_loading || is_error || (story && !story.is_in)"
          style="text-align:center;height:60px;padding-top:10px;"
        >
          <div v-if="is_error" class="isError" style="margin-top:7px;">{{ errorMessage }}</div>
        </div>
        <!-- ENDS SERVER ERRORS AND AUTH -->
        <!-- START FORM -->
        <div class="card" v-else>
          <!-- CARD CONTENT -->
          <div class="card-content">
            <form @submit.prevent="onSubmit">
              <!-- API ERRORS -->
              <div
                v-if="is_api_error"
                class="isError"
                style="text-align:center;margin-bottom:12px;"
              >
                <div v-if="apiErrorType == 'INVALID_CREATE_STORY_ERROR'">
                  <p>
                    <b>VALIDATIONS ERRORS</b>
                  </p>
                  <ul id="apiErrors">
                    <li v-for="(k, v, idx) in apiErrors" :key="idx">{{ k }}</li>
                  </ul>
                </div>
                <div v-else>SERVER ERROR, SORRY. TRY AGAIN LATER.</div>
              </div>
              <!-- ENDS API ERRORS -->
              <p class="title is-size-4">{{ action === 'create' ? 'Add a' : 'Edit' }} story</p>
              <p class="subtitle is-size-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum,
                facilis praesentium esse veritatis nemo! Quis autem vel eum iure reprehenderit qui in ea voluptate
                velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
              </p>

              <!-- SHOW STORY URL -->
              <div v-if="story.page_url" style="margin-bottom:-.8rem; line-height:150%;">
                <p class="is-size-5 page-link-title">
                  <b>PAGE URL</b>
                </p>
                <p class="content">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus:
                  <br />
                  <router-link
                    :to="{ name: 'view-story', params: { slug: story.slug }}"
                    class="page-link-title is-size-5"
                  >{{ story.page_url}}</router-link>
                </p>
              </div>
              <!-- ENDS SHOW STORY URL -->
              <!-- TOP BOXES -->
              <div class="top-boxes-grid" style="margin-top:40px;">
                <div>
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
                      <p class="content selected-layout">{{ story.layout.toUpperCase() }}</p>
                    </div>
                  </article>
                </div>
                <!-- STATUS PUBLISHED -->
                <div v-if="story.status === 'published'">
                  <article class="message is-success is-small box-has-shadow">
                    <div class="message-header">
                      <p>STATUS</p>
                    </div>
                    <div class="message-body pub-unpub-story-layout-box">
                      <p
                        class="icon icon-hover has-text-success is-large"
                        style="padding:0;margin:0;"
                      >
                        <span class="icon is-left">
                          <font-awesome-icon class="fas fa-2x" icon="check-circle"></font-awesome-icon>
                        </span>

                        <span
                          class="content has-text-success pub-unpub-story-txt"
                          style="padding-left:.5rem; font-size: 110%;"
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
                <div v-if="story.status === 'draft'">
                  <article class="message is-warning is-small box-has-shadow">
                    <div class="message-header">
                      <p>STATUS</p>
                    </div>
                    <div class="message-body pub-unpub-story-layout-box">
                      <p
                        class="icon icon-hover has-text-warning is-large"
                        style="padding:0;margin:0;"
                      >
                        <span class="icon is-left">
                          <font-awesome-icon class="fas fa-2x" icon="ban"></font-awesome-icon>
                        </span>

                        <span
                          class="content has-text-warning pub-unpub-story-txt"
                          style="padding-left:.5rem; font-size:125%;"
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
                <div>
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
              <!-- CATEGORY -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Category</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
                <div class="select">
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Title"
                    v-model="story.title"
                    @keydown.enter.prevent
                  />
                </div>
              </div>
              <!-- TITLE -->

              <!-- ABOUT MY STORY -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Pitch your story</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
                <div class="control">
                  <textarea class="textarea" placeholder="Pitch your story" v-model="story.pitch"></textarea>
                </div>
              </div>
              <!-- ABOUT MY STORY -->

              <!-- UPOLAD PICS -->
              <div class="field m-30-0-15-0">
                <p class="content is-marginless">
                  <b>Upload your images</b>
                </p>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
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
                <!-- PIC UPLOAD BUTTON-->
                <!-- UPLOADED PICS -->

                <!-- LOOP PICS-->
                <!-- <draggable :list="pics_uploaded"  filter=".not-draggable" ghost-class="moving-card" :animation="200"> -->
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
                        <font-awesome-icon class="fas fa-lg shadow" icon="trash-alt"></font-awesome-icon>
                      </span>
                    </div>
                    <div class="pic column is-narrow handle">
                      <img
                        :src="pic.thumb.web_path"
                        :width="isHorizontal(pic.thumb) ? 270 : 160"
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
                <label class="label is-marginless">Gear, technique, inspiration...</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="A few worlds about you..."
                    v-model="story.inspiration"
                  ></textarea>
                </div>
              </div>
              <!-- MORE INFO -->

              <!-- TAGS -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Add tags</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
                <div class="control">
                  <input
                    class="input"
                    type="tags"
                    placeholder="Tag1,Tag2,Tag3"
                    value
                    v-model="tagsStr"
                  />
                </div>
              </div>
              <!-- TAGS -->

              <!-- LOCATION -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Your location</label>
                <p class="content is-small is-marginless pb-05">
                  <span style="color:red;" v-if="false">Max length is 128 characters.</span>
                  <span
                    v-else
                  >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</span>
                </p>
                <div class="control" style="max-width: 500px;">
                  <input
                    autocomplete="off"
                    class="input"
                    type="text"
                    v-model="story.location.place_name"
                    placeholder="Type on and select your location"
                    list="locations"
                    @input="searchLocation"
                    @change="setSelectedSelection"
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
                  <p class="content is-small is-marginless pb-05">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                    accusamus!
                  </p>
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
                    :disabled="is_saving_story"
                  >Save</button>
                </div>
                <div class="control">
                  <button
                    class="button is-primary"
                    type="submit"
                    :disabled="is_saving_story"
                  >Save and continue editing</button>
                </div>
                <div class="control" v-if="!isPublished">
                  <button class="button is-success" @click.prevent="saveAndPublish">Save and publish</button>
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
        <!-- START PROFILE -->
        <div class="card" style="padding:20px;">
          <p>DEBUG</p>
          <!-- <p>{{ $v }}</p> -->
          <p>
            <b>category selected:</b>
            {{ story.category }}
          </p>
          <p>
            <b>Title:</b>
            {{ story.title }}
          </p>
          <p>
            <b>Layout:</b>
            {{ story.layout }}
          </p>
          <p>
            <b>Status:</b>
            {{ story.status }}
          </p>
          <p>
            <b>Tags:</b>
            {{ tagsStr }}
          </p>
          <p>
            <b>Location:</b>
            {{ story.location }}
          </p>
          <p>
            <b>Allow comments:</b>
            {{ story.allow_comments }}
          </p>
          <!-- <p>
            <b>Pics uploaded:</b>
            {{ pics_uploaded }}
          </p>-->
          <p>
            <b>Page url:</b>
            {{ story.page_url }}
          </p>
          <ul>
            <li
              v-for="(pic, idx) in pics_uploaded"
              :key="idx"
            >{{ idx }} => {{ pic.original.original_name }}</li>
          </ul>
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
// TODO SERVER SIDE TESTS AND POSTMAN VERIFS
// TODO CLIENT SIDE AND SERVER SIDE VALIDATIONS, REVIEW AND INSURE PROPER ERRORS, ITS A MESS FOR NOW
// TODO REMOVE SELECTED PIC

import axiosBase from "../services/axiosBase";
import Draggable from "vuedraggable";
// eslint-disable-next-line
import { mapGetters } from "vuex";
import PicsUploadModal from "../components/PicsUploadModal.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";
import { categoriesList } from "../utils/categories";
import { isHorizontal, isVertical } from "../utils/pics";

const MAX_PICS = 12;
// eslint-disable-next-line
const MIN_PICS = 6;

export default {
  name: "CreateUpdateStory",
  data() {
    return {
      is_debug: true,
      is_loading: false,
      // fetch auth / not found errors, hide the rest of the page
      is_error: false,
      errorMessage: "",
      // api submit validation errors
      // don't block the page
      is_api_error: false,
      apiErrors: "",
      apiErrorType: "",
      // --=
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
      // save
      is_saving_story: false,
      // delete
      showDeletedNotif: false
    };
  },
  components: {
    PicsUploadModal,
    Draggable
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
    // ERRORS OK
    async onSubmit() {
      try {
        console.log("onSubmit");
        let response = null;
        this.is_saving_story = true;
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
        if (this.action === "update") {
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
        console.log(data);
        // this.story.page_url = data.story.page_url
        this.story = Object.assign({}, data.story);
        this.pics_uploaded = this.story.pics;
        this.tagsStr = this.story.tags.join(", ");
        this.is_saving_story = false;
        // this.$store.commit("setCreateFormCache", this.story);
      } catch (error) {
        // as we are here these are non blocking errors
        // is_api_error / apiErrors
        // or vuejs errors
        console.log("__ERROR_CAUGHT__");
        this.is_saving_story = false;
        this.is_api_error = true;
        // at this point bother only for validation errors
        // all the rest goes as 500 whatever
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          if (error.response.data.error_type === "INVALID_CREATE_STORY_ERROR") {
            this.apiErrors = error.response.data.errors;
            this.apiErrorType = error.response.data.error_type;
          } else {
            this.apiErrorType = "SERVER ERROR";
          }
        } else {
          // vue error
          console.log(error);
        }
      } finally {
        window.scrollTo(0, 0);
      }
    },
    // ERRORS OK
    async saveAndGoToList() {
      await this.onSubmit();
      // if no errors go to list
      if (!this.is_error && !this.is_api_error) {
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
      console.log("GOT IT");
      console.log(pic);
      this.pics_uploaded.push({ original: pic.original, thumb: pic.thumb });
    },
    setPicDescription(idx, event) {
      console.log(event.target.value);
      this.pics_uploaded[idx].description = event.target.value;
    },
    setPicCaption(idx, event) {
      console.log(event.target.value);
      this.pics_uploaded[idx].caption = event.target.value;
    },
    selectLayout(layout) {
      console.log(`selectLayout(${layout}`);
      this.story.layout = layout;
    },
    // ERRORS TODO
    async searchLocation(e) {
      // this.resetApiErrors();
      try {
        if (e.target.value.length > 1 && e.inputType === "insertText") {
          // console.log("@@@");
          const foundLocations = await axiosBase.get(
            `/stories/${
              this.authenticatedUser._key
            }/locate?location=${encodeURIComponent(e.target.value)}`
          );
          // console.log("@@@");
          // console.log(foundLocations);
          this.mapboxOptions = foundLocations.data.found;
          this.deepMapboxOptions = foundLocations.data.found;
        } else {
          this.mapboxOptions = [];
        }
      } catch (err) {
        // DO SOMETHING/WHAT?
        console.log("++++");
        console.log(err.response);
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
      }
    },
    setAllowComments(e) {
      console.log(e.target.checked);
      this.story.allow_comments = e.target.checked;
    },
    resetApiErrors() {
      this.is_api_error = false;
      this.apiErrors = "";
      this.apiErrorType = "";
    },
    // ERRORS OK
    async fetchAndSetData() {
      // USE only for update story load initial data
      try {
        this.is_loading = true;
        const key = this.$route.params.key;
        const response = await axiosBase.get(`/stories/${key}`);
        console.log("fetched");
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
        }
      } finally {
        this.is_loading = false;
      }
    },
    async saveAndPublish() {
      console.log("saveAndPublish");
      this.setStatus("published");
      this.onSubmit();
    },
    async setStatus(status) {
      console.log(`selectLayout(${status}`);
      this.story.status = status;
      // save Server side only if already saved
      if (this.story._key) {
        this.onSubmit();
      }
    },
    // ERRORS OK
    // user cannot access story if its not his own or not found
    // properly handled server side, so it's fine
    async deleteStory() {
      console.log("deleteStory()");
      const resp = window.confirm("Really, delete?");
      console.log(resp);
      if (resp) {
        window.scrollTo(0, 0);
        this.is_loading = true;
        this.showDeletedNotif = true;
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
          }
        }
        this.resetAll();
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
      this.is_saving_story = false;
    },
    dismissDeletedNotif() {
      this.showDeletedNotif = false;
    }
  },
  computed: {
    ...mapGetters([
      "getProfile",
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
    isUpdate: function() {
      return !!this.story._key;
    },
    isPublished() {
      return this.story.status === "published";
    },
    action() {
      if (this.$route.name === "edit-story") {
        return "edit";
      } else {
        return "create";
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // TODO UPDATE VERIF USER IS STORY'S OWNER
    next(vm => {
      console.log("BEFORE ROUTE ENTER");
      if (!vm.isAuthenticated) {
        vm.is_error = true;
        vm.errorMessage = "PLEASE AUTHENTICATE";
      }
      vm.is_loading = false;
      const cache = vm.$store.getters.getCreateFormCache;
      const story = cache.story;
      // console.log(story);
      if (story) {
        vm.story = story;
        vm.pics_uploaded = story.pics;
        vm.tagsStr = story.tags.join(", ");
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log("before route leave");
    this.persistStory();
    next();
  },
  created() {
    // IF I AM AN UPDATE LOAD STORY
    console.log(this.action);
    const cache = this.$store.getters.getCreateFormCache;
    const story = cache.story;
    console.log(story);
    if (this.$route.name === "edit-story" && !story) {
      console.log("CREATED: I AM AN UPDATE");
      this.is_loading = true;
      return this.fetchAndSetData(); // errors handled in fetchAndSetData(), test if it ok
    } else {
      console.log("CREATED: I AM A CREATE");
    }
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
.top-boxes-grid {
  padding: 0 3px;
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
  grid-column-gap: 12%;
}

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

/* .pub-unpub-story-layout-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}

.pub-unpub-story-txt {
  grid-column: 2 / span 4;
  justify-self: start;
  font-weight: bold;
  font-size: 110%;
} */

.pub-unpub-story-layout-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  /* grid-template-columns: repeat(3, 1fr);
  align-items: center; */
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

/*************** errors  *************/
.isError {
  color: red;
}

/************** misc ***********/
.page-link-title {
  color: #f8aa0f;
}
a.page-link-title {
  color: #f8aa0f;
}
</style>