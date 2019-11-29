<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- ERRORS AND AUTH -->
        <div
          class="card"
          v-if="is_loading || is_error || (story && !story.is_in)"
          style="text-align:center;height:60px;padding-top:10px;"
        >
          <div v-if="is_error" class="isError" style="margin-top:7px;">{{ errorMessage }}</div>
          <div
            v-if="(story && !story.is_in)"
            class="isError"
            style="margin-top:7px;"
          >THIS STORY HAS BEEN DELETED</div>
        </div>
        <!-- START FORM -->
        <div class="card" v-else>
          <!-- CARD CONTENT -->
          <div class="card-content">
            <form @submit.prevent="onSubmit">
              <p class="title is-size-4">Add a story</p>
              <p class="subtitle is-size-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum,
                facilis
                praesentium esse veritatis nemo!
              </p>
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
                          style="font-size:.85rem"
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
                  <button class="button is-primary" @click="openUploadModal">
                    <span class="icon">
                      <font-awesome-icon class="fas" icon="upload"></font-awesome-icon>
                    </span>
                    <span>Add your images</span>
                  </button>
                </div>
                <!-- PIC UPLOAD BUTTON-->
                <!-- UPLOADED PICS -->
                <!-- LOOP PICS PIC-->
                <div
                  v-for="(pic, idx) in pics_uploaded"
                  :key="idx"
                  class="box uploadedImageBox"
                  :class="{first: idx === 0}"
                >
                  <div class="controlIcons">
                    <span class="icon icon-hover is-medium">
                      <font-awesome-icon class="fas fa-lg shadow" icon="arrow-up"></font-awesome-icon>
                    </span>
                    <span class="icon icon-hover is-medium">
                      <font-awesome-icon class="fas fa-lg shadow" icon="arrow-down"></font-awesome-icon>
                    </span>
                    <span class="icon icon-hover has-text-danger is-medium">
                      <font-awesome-icon class="fas fa-lg shadow" icon="trash-alt"></font-awesome-icon>
                    </span>
                  </div>
                  <div class="pic">
                    <img
                      :src="pic.thumb.web_path"
                      :width="isHorizontal(pic) ? 300 : 200"
                      height="auto"
                    />
                  </div>
                  <div class="picInfo">
                    <div class="field">
                      <label class="label">Caption</label>
                      <div class="control">
                        <textarea class="textarea" placeholder="2 lines of textarea" rows="2"></textarea>
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
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END LOOP PICS -->
                <!-- UPLOADED PICS -->
              </div>
              <!-- UPOLAD PICS -->

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
                    placeholder="Add Tag"
                    value="Tag1,Tag2,Tag3"
                    v-model="story.tags"
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
                  <button class="button is-primary">Save</button>
                </div>
                <div class="control">
                  <button class="button is-success">Save and publish</button>
                </div>
                <div class="control">
                  <button class="button is-dark">Cancel</button>
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
            {{ story.tags }}
          </p>
          <p>
            <b>Location:</b>
            {{ story.location }}
          </p>
          <p>
            <b>Allow comments:</b>
            {{ story.allow_comments }}
          </p>
          <p>
            <b>Pics uploaded:</b>
            {{ pics_uploaded }}
          </p>
        </div>
      </div>
    </div>
    <!-- END DEBUG -->
    <!-- Message composer modal -->
    <pics-upload-modal
      :isActive="uploadModalActive"
      :action="modalAction"
      :maxUploads="remainingUploads"
      @uploadModalClosed="closeUploadModal"
      @onPicUpload="picUploaded"
    ></pics-upload-modal>
  </main>
</template>

<script>
// TODO DELETE STORY
// TODO AXIOS SET IS_IN=FALSE SERVER SIDE
// TODO POST STORY BUTTON DOESN'T WORK ANYMORE AFTER DELETE BECAUSE SAME URL
//      SEND TO A DELETED KINDA STATIC PAGE?
//      Voir https://michaelnthiessen.com/force-re-render/

// TODO PICS
// MAX REMAINING UPLOADS
// SHOW DOWNLOADED ON CREATE PAGE
// ETC...

// TODO TAGS
// to array on submit

// eslint-disable-next-line
import axiosBase from "../services/axiosBase";
// eslint-disable-next-line
import { mapGetters } from "vuex";
import PicsUploadModal from "../components/PicsUploadModal.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";
import { categoriesList } from "../utils/categories";
import { isHorizontal, isVertical } from "../utils/pics";

export default {
  data() {
    return {
      is_debug: true,
      is_loading: false,
      // fetch errors
      is_error: false,
      errorMessage: "",
      // api submit errors
      is_api_error: false,
      apiErrors: "",
      apiErrorType: "",
      //
      categoriesList,
      story: {
        layout: "vertical",
        status: "draft",
        is_in: true,
        category: "0",
        title: "",
        pics: {},
        inspiration: "",
        tags: "",
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

      modalAction: "create",
      // pics uploaded
      pics_uploaded: [],
      remainingUploads: 12
    };
  },
  components: {
    PicsUploadModal
  },
  methods: {
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
      this.pics_uploaded.push(pic);
    },
    async onSubmit() {
      try {
        console.log("onSubmit");
      } catch (error) {
        console.log(error);
      }
    },
    selectLayout(layout) {
      console.log(`selectLayout(${layout}`);
      this.story.layout = layout;
    },
    setStatus(status) {
      console.log(`selectLayout(${status}`);
      this.story.status = status;
    },
    deleteStory() {
      console.log("deleteStory()");
      const resp = window.confirm("Really, delete?");
      console.log(resp);
      if (resp) {
        this.story.is_in = false;
        // TODO DELETE STORY
        // TODO AXIOS SET IS_IN=FALSE SERVER SIDE
        // TODO POST STORY BUTTON DOESN'T WORK ANYMORE AFTER DELETE BECAUSE SAME URL
      }
    },
    async searchLocation(e) {
      this.resetApiErrors();
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
        // console.log(err.response.status);
        // console.log(err.response.statusText);
        // console.log(err.response.data.errorType);
        // console.log(err.response.data.error);
        // console.log("++++");
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
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "authenticatedUser"]),
    user: function() {
      return this.authenticatedUser;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("BEFORE ROUTE ENTER");
      // access to component instance via `vm`
      // console.log(vm);
      // console.log(vm.isAuthenticated);
      // console.log(vm.authenticatedUser._key);
      // console.log(vm.$route.params.user_key);
      if (!vm.isAuthenticated) {
        vm.is_error = true;
        vm.errorMessage = "PLEASE AUTHENTICATE";
      }
      vm.is_loading = false;
      next();
    });
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
  padding: 10px;
  border-radius: 0;
  position: relative;
}
.uploadedImageBox.first {
  margin: 15px 0 0 0;
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

/*************** errors  *************/
.isError {
  color: red;
}
</style>