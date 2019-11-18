 <template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- ERRORS AND AUTH -->
        <div
          class="card"
          v-if="is_loading || is_error"
          style="text-align:center;height:60px;padding-top:10px;"
        >
          <div v-if="is_error" class="isError" style="margin-top:7px;">{{ errorMessage }}</div>
        </div>

        <!-- START FORM -->
        <div class="card" v-else>
          <!-- CARD CONTENT -->
          <div class="card-content">
            <form @submit.prevent="onSubmit">
              <p class="title is-size-4">{{ user.username }}'s profile</p>
              <p class="subtitle is-size-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
                praesentium esse veritatis nemo!
              </p>
              <!-- AVATAR -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Profile pic</label>
                <p
                  v-if="isUploadFailed"
                  class="content is-small is-marginless pb-05 isError"
                >{{uploadErrorMessage}}</p>
                <p
                  v-else
                  class="content is-small is-marginless pb-05"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
                <!-- DROP BOX -->
                <div v-if="!hasPic && (isUploadInitial || isUploadSaving || isUploadFailed)">
                  <div class="dropbox">
                    <input
                      type="file"
                      :name="uploadFieldName"
                      :disabled="isUploadSaving"
                      @change="fileChange($event.target.name, $event.target.files[0]);"
                      accept="image/*"
                      class="input-file"
                    />
                    <p v-if="!hasPic && (isUploadInitial || isUploadFailed)">
                      Drag your file here
                      <br />or click to browse
                    </p>
                    <p v-if="isUploadSaving">Uploading file...</p>
                  </div>
                </div>
                <div v-if="hasPic || isUploadSuccess" width="200" height="200">
                  <img :src="profile.avatar_path" width="200" height="200" />
                  <p class="control">
                    <button class="button is-small is-primary" @click.prevent="resetAvatar">Change</button>
                    <button
                      class="button is-small is-dark"
                      style="margin-left:10px"
                      @click.prevent="deleteAvatar"
                    >Delete</button>
                  </p>
                </div>

                <!-- END DROP BOX -->
              </div>
              <!-- END AVATAR -->

              <!-- DISPLAY NAME -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Display name (Optional)</label>
                <p
                  class="content is-small is-marginless pb-05"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
                <div class="control" style="max-width: 500px;">
                  <input
                    class="input"
                    type="text"
                    v-model="profile.display_name"
                    placeholder="Display name (Optional)"
                    @keydown.enter.prevent
                  />
                </div>
              </div>
              <!-- DISPLAY NAME -->

              <!-- INTRO -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">A short intro</label>
                <p
                  class="content is-small is-marginless pb-05"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="profile.intro"
                    placeholder="A short intro"
                    @keydown.enter.prevent
                  />
                </div>
              </div>
              <!-- INTRO -->

              <!-- ABOUT ME -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">More about you</label>
                <p
                  class="content is-small is-marginless pb-05"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
                <div class="control">
                  <textarea
                    class="textarea"
                    v-model="profile.about_me"
                    placeholder="A few worlds about you..."
                  ></textarea>
                </div>
              </div>
              <!-- ABOUT ME -->

              <!-- TECH STUFF -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Gear, technique, inspiration...</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
                <div class="control">
                  <textarea
                    class="textarea"
                    v-model="profile.inspiration"
                    placeholder="A few worlds about you..."
                  ></textarea>
                </div>
              </div>
              <!-- TECH STUFF -->

              <!-- LOCATION -->
              <div class="field m-30-0-15-0">
                <label class="label is-marginless">Your location</label>
                <p
                  class="content is-small is-marginless pb-05"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
                <div class="control" style="max-width: 500px;">
                  <input
                    autocomplete="off"
                    class="input"
                    type="text"
                    v-model="profile.location.place"
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

              <!-- SUBMIT -->
              <div class="is-divider" style="margin-top:35px;"></div>
              <div class="field is-grouped submit-buttons">
                <div class="control">
                  <button type="submit" class="button is-primary">Save</button>
                </div>
                <div class="control">
                  <button class="button is-dark" @click.prevent="backToProfile">Cancel</button>
                </div>
              </div>
              <!-- SUBMIT -->
              <div style="margin-top:25px;"></div>
            </form>
          </div>
          <!-- END CARD CONTENT -->
          <!-- <div>
            <ul>
              <li v-for="(item, key, index) in profile" :key="index">
                {{ key }}: {{ item }}
              </li>
            </ul>
          </div>-->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import axiosUpload from "../services/axiosUpload";
import axiosBase from "../services/axiosBase";
const UPLOAD_STATUS_INITIAL = 0,
  UPLOAD_STATUS_SAVING = 1,
  UPLOAD_STATUS_SUCCESS = 2,
  UPLOAD_STATUS_FAILED = 3;
const AVATARS_BASE_URL = "http://localhost/images/avatars";

export default {
  data() {
    return {
      is_loading: true,
      is_error: false,
      errorMessage: "",
      /* file up */
      uploadedFile: null,
      uploadError: null,
      uploadErrorMessage: "",
      uploadCurrentStatus: null,
      uploadFieldName: "avatar",
      /* fetch avatars */
      avatars_base_url: AVATARS_BASE_URL,
      profile: {
        display_name: "",
        avatar_path: "",
        intro: "",
        about_me: "",
        inspiration: "",
        location: {}
      },
      /* location */
      mapboxOptions: [],
      selectedLocation: ""
    };
  },

  methods: {
    async onSubmit() {
      try {
        console.log("onSubmit");
        console.log(this.profile);
        await this.$store.dispatch("save_profile", this.profile);
        this.$router.push({
          name: "user",
          params: { username: this.authenticatedUser.username }
        });
      } catch (error) {
        console.log(error);
      }
    },
    backToProfile() {
      this.$router.push({
        name: "user",
        params: { username: this.authenticatedUser.username }
      });
    },
    async saveAvatar(formData) {
      this.uploadCurrentStatus = UPLOAD_STATUS_SAVING;
      try {
        const uploaded = await axiosUpload.post(
          `/users/${this.authenticatedUser._key}/upload-avatar`,
          formData,
          {
            onUploadProgress: uploadEvent => {
              console.log(
                `UploadProgress: ${Math.round(
                  (uploadEvent.loaded / uploadEvent.total) * 100
                )}%`
              );
            }
          }
        );
        this.uploadedFile = uploaded;
        this.profile.avatar_path = `${AVATARS_BASE_URL}/${uploaded.data.filename}`;
        this.uploadCurrentStatus = UPLOAD_STATUS_SUCCESS;
        // TODO SAVE AVATAR TO DB
        await this.$store.dispatch("save_avatar", this.profile.avatar_path);
        console.log(uploaded);
      } catch (err) {
        //////////////////////////////////////////////////////
        // TODO client side verif size and type too
        // Don't end up downloading 500 Megs files for nothing
        //////////////////////////////////////////////////////
        console.log(JSON.stringify(err));
        this.uploadError = err.response;
        // console.log(this.uploadError);
        // console.log(this.uploadError.data);
        console.log(this.uploadError.status === 400);
        console.log(this.uploadError.data.error);
        if (this.uploadError.status === 400) {
          this.uploadErrorMessage = this.uploadError.data.error;
        } else if ([401, 403].includes(this.uploadError.status)) {
          // auth error
          this.uploadErrorMessage = "AUTHENTICATION ERROR";
        } else {
          // Most probably 500
          this.uploadErrorMessage = "SERVOR ERROR";
        }
        this.uploadCurrentStatus = UPLOAD_STATUS_FAILED;
      }
    },
    fileChange(fieldName, file) {
      this.initAvatar();
      const fd = new FormData();
      if (!file) return;
      fd.append(fieldName, file, file.name);
      this.saveAvatar(fd);
    },
    initAvatar() {
      // reset form to initial state
      this.uploadCurrentStatus = UPLOAD_STATUS_INITIAL;
      this.uploadedFile = null;
      this.uploadError = null;
    },
    resetAvatar() {
      // reset form to initial state
      this.initAvatar();
      this.profile.avatar_path = "";
    },
    async deleteAvatar() {
      this.resetAvatar();
      await this.$store.dispatch("save_avatar", "");
      // TODO SAVE TO DB AVATAR DELETED
    },
    async searchLocation(e) {
      // console.log(e);
      // // console.log(e instanceof InputEvent);
      // console.log(e.target.value);
      // console.log(e.target.value.length);
      // this.mapboxOptions = [];
      if (e.target.value.length > 1 && e.inputType === "insertText") {
        try {
          const foundLocations = await axiosBase.get(
            `/users/${
              this.authenticatedUser._key
            }/locate?location=${encodeURIComponent(e.target.value)}`
          );
          // console.log(foundLocations);
          this.mapboxOptions = foundLocations.data.found;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.mapboxOptions = [];
      }
    },
    setSelectedSelection(e) {
      console.log("# -- loc selected --#");
      console.log(e);
      this.selectedLocation = e.target.value;
      this.mapboxOptions = [];
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
    },
    hasPic() {
      return !!this.profile.avatar_path;
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
      } else if (vm.authenticatedUser._key != vm.$route.params.user_key) {
        vm.is_error = true;
        vm.errorMessage = "NOT AUTHORIZED";
      }
      vm.is_loading = false;
      next();
    });
  },
  created() {
    console.log("CREATED EDIT PROFILE");
    this.profile.display_name = this.getProfile.display_name;
    this.profile.avatar_path = this.getProfile.avatar_path;
    this.profile.intro = this.getProfile.intro;
    this.profile.about_me = this.getProfile.about_me;
    this.profile.inspiration = this.getProfile.inspiration;
    this.profile.location = this.getProfile.location;
  },
  mounted() {
    this.initAvatar();
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
  margin-top: 80px;
}

footer {
  margin-top: 30px;
}

/************** spacing ***********/
/*************** errors  *************/
.isError {
  color: red;
}

/************ File upload box *************/
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  /* outline-offset: -10px; */
  background: #eee;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  width: 200px;
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
