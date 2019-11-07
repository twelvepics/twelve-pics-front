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

              <!-- PIC -->
              <figure class="image is-128x128" style="margin:30px 0 15px 0;">
                <img src="/img/128x128.png" />
              </figure>
              <!-- PIC -->
              <!-- UPLOAD BUTTON -->
              <div class="file">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume" />
                  <span class="file-cta">
                    <span class="file-icon">
                      <font-awesome-icon class="fas" icon="upload"></font-awesome-icon>
                    </span>
                    <span class="file-label">Your picture (Optional)</span>
                  </span>
                </label>
              </div>
              <!-- UPLOAD BUTTON -->

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
                    class="input"
                    type="text"
                    v-model="profile.location"
                    placeholder="My location (Optional)"
                  />
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
                  <button class="button is-dark">Cancel</button>
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

export default {
  data() {
    return {
      is_loading: true,
      is_error: false,
      errorMessage: ""
    };
  },

  methods: {
    async onSubmit() {
      console.log("onSubmit");
      console.log(this.profile);
      await this.$store.dispatch("save_profile", this.profile);
      this.$router.push({
        name: "user",
        params: { username: this.authenticatedUser.username }
      });
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "authenticatedUser"]),
    profile: function() {
      // return this.$store.getters.getProfile;
      return this.getProfile;
    },
    user: function() {
      return this.authenticatedUser;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // access to component instance via `vm`
      console.log(vm);
      console.log(vm.isAuthenticated);
      // console.log(vm.authenticatedUser._key);
      // console.log(vm.$route.params.user_key);
      if (!vm.isAuthenticated) {
        vm.is_error = true;
        vm.errorMessage = "PLEASE AUTHENTICATE";
      } else if (vm.authenticatedUser._key != vm.$route.params.user_key) {
        vm.is_error = true;
        vm.errorMessage = "NOT AUTHORIZED";
      } else {
        vm.is_loading = false;
      }
      next();
    });
  }

  // created() {
  //   console.log("created")
  //   this.profile = this.getProfile
  //   console.log(`PROFILE: ${this.getProfile}`)
  // },
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
</style>