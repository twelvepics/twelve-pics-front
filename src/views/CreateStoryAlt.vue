<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START FORM -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
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
                        src="/img/layout-horizontal-on.png"
                      />
                    </p>
                    <p class="content" style="margin-bottom:0;">
                      <img
                        class="icon-hover"
                        style="width:48px; height:auto;"
                        src="/img/layout-tile.png"
                      />
                    </p>

                    <p class="content" style="margin-bottom:0;">
                      <img
                        class="icon-hover"
                        style="width:48px; height:auto;"
                        src="/img/layout-list.png"
                      />
                    </p>
                    <p class="content" style="margin-bottom:0;">
                      <img
                        class="icon-hover"
                        style="width:48px; height:auto;"
                        src="/img/layout-carousel.png"
                      />
                    </p>
                    <p class="content selected-layout">HORIZONTAL</p>
                  </div>
                </article>
              </div>
              <!-- STATUS PUBLISHED -->
              <!-- <div>
                              <article class="message is-success is-small box-has-shadow">
                                  <div class="message-header">
                                      <p>STATUS</p>
                                  </div>
                                  <div class="message-body pub-unpub-story-layout-box">
                                      <p class="icon icon-hover has-text-success is-large"
                                          style="padding:0 0 0 0;margin-bottom:0;">
                                          <i class="fas fa-3x fa-check-circle"
                                              style="padding:0; margin:0;"></i>
                                      </p>
                                      <p class="content has-text-success is-medium pub-unpub-story-txt">
                                          PUBLISHED
                                      </p>
                                  </div>
                              </article>
              </div>-->
              <!-- STATUS DRAFT -->
              <div>
                <article class="message is-warning is-small box-has-shadow">
                  <div class="message-header">
                    <p>STATUS</p>
                  </div>
                  <div class="message-body pub-unpub-story-layout-box">
                    <p
                      class="icon icon-hover has-text-warning is-large"
                      style="padding:0 0 0 0;margin-bottom:0;"
                    >
                      <span class="icon is-small is-left">
                        <font-awesome-icon class="fas fa-3x" icon="ban"></font-awesome-icon>
                      </span>
                    </p>
                    <p class="content has-text-warning is-medium pub-unpub-story-txt">DRAFT</p>
                  </div>
                </article>
              </div>
              <div>
                <article class="message is-danger is-small box-has-shadow">
                  <div class="message-header">
                    <p>DELETE</p>
                  </div>
                  <div class="message-body delete-story">
                    <p class="icon icon-hover has-text-danger is-large">
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
                <select>
                  <option>Select a theme</option>
                  <option>Documentary</option>
                  <option>Still life</option>
                  <option>Street photography</option>
                  <option>Nature and Wildlife</option>
                  <option>Wedding</option>
                  <option>Travel</option>
                  <option>Daily life</option>
                  <option>Fine art</option>
                  <option>Portrait</option>
                  <option>Sport</option>
                  <option>Architecture</option>
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
                <input class="input" type="text" placeholder="Title" />
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
                <textarea class="textarea" placeholder="Pitch your story"></textarea>
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
                <!-- <label class="file-label">
                  <input class="file-input" type="file" name="pics-upload" />
                  <span class="file-cta">
                    <span class="file-icon">
                      <font-awesome-icon class="fas" icon="upload"></font-awesome-icon>
                    </span>
                    <span class="file-label">Add images</span>
                  </span>
                </label>-->

                <button class="button is-primary" @click="openUploadModal">
                  <span class="icon">
                    <font-awesome-icon class="fas" icon="upload"></font-awesome-icon>
                  </span>
                  <span>Add your images</span>
                </button>
              </div>
              <!-- PIC UPLOAD BUTTON-->
              <!-- UPLOADED PICS -->
              <!-- ONE PIC-->
              <!--
              <div class="box uploadedImageBox first">
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
                  <img src="/img/thumb2.png" width="200" height="auto" />
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
              -->
              <!-- END ONE PIC -->
              <!-- ONE PIC-->
              <!-- 
              <div class="box uploadedImageBox">
                <div class="pic">
                  <img src="/img/thumb6.png" width="130" height="auto" />
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
              -->
              <!-- END ONE PIC -->
              <!-- UPLOADED PICS -->
            </div>
            <!-- UPOLAD PICS -->

            <!-- MORE INFO -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">Gear, technique, inspiration... (Optional)</label>
              <p class="content is-small is-marginless pb-05">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                accusamus!
              </p>
              <div class="control">
                <textarea class="textarea" placeholder="A few worlds about you..."></textarea>
              </div>
            </div>
            <!-- MORE INFO -->

            <!-- TAGS -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">Add tags (Optional)</label>
              <p class="content is-small is-marginless pb-05">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                accusamus!
              </p>
              <div class="control">
                <input class="input" type="tags" placeholder="Add Tag" value="Tag1,Tag2,Tag3" />
              </div>
            </div>
            <!-- TAGS -->

            <!-- LOCATION -->
            <div class="field m-40-0-15-0">
              <label class="label is-marginless">Story's location (Optional)</label>
              <p class="content is-small is-marginless pb-05">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                accusamus!
              </p>
              <div class="control" style="max-width: 500px;">
                <input class="input" type="text" placeholder="My location (Optional)" />
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
                  checked="checked"
                />
                <label for="switch-contact">Allow</label>
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
          </div>
          <!-- END CARD CONTENT -->
        </div>
      </div>
    </div>
    <!-- Message composer modal -->
    <pics-upload-modal :isActive="uploadModalActive" @uploadModalClosed="closeUploadModal"></pics-upload-modal>
  </main>
</template>

<script>
// eslint-disable-next-line
import axiosBase from "../services/axiosBase";
// eslint-disable-next-line
import { mapGetters } from "vuex";
import PicsUploadModal from "../components/PicsUploadModal.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";

export default {
  data() {
    return {
      uploadModalActive: false
    };
  },
  components: {
    PicsUploadModal
  },
  methods: {
    openUploadModal() {
      lockBgScroll();
      this.uploadModalActive = true;
    },
    closeUploadModal() {
      unlockBgScroll();
      this.uploadModalActive = false;
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
  display: grid;
  grid-template-columns: 3fr 2fr 1fr;
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

.pub-unpub-story-layout-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}

.pub-unpub-story-txt {
  grid-column: 2 / span 4;
  justify-self: start;
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
</style>