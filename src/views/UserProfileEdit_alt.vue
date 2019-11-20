<template>
    <main>
        <div class="columns is-centered">
            <!-- CENTER COLUMNN -->
            <div class="column is-three-quarters-desktop">
                <!-- ERRORS AND AUTH -->
                <div class="card" v-if="is_loading || is_error" style="text-align:center;height:60px;padding-top:10px;">
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
                                <img :src="profile.avatar_path || '/img/128x128.png'" />
                            </figure>
                            <!-- PIC -->
                            <!-- FILE FIELD -->
                            <div class="file">
                                <label class="file-label">
                                    <input
                                        type="file"
                                        class="file-input"
                                        name="file"
                                        ref="file"
                                        @change="onFileSelected"
                                    />
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <font-awesome-icon class="fas" icon="upload"></font-awesome-icon>
                                        </span>
                                        <span class="file-label">Select avatar</span>
                                    </span>
                                </label>
                                <button class="button is-primary" @click="uploadAvatar" style="margin-left:10px;">
                                    Save
                                </button>
                            </div>
                            <!-- FILE FIELD -->

                            <!-- DISPLAY NAME -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">Display name (Optional)</label>
                                <p class="content is-small is-marginless pb-05">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!
                                </p>
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
                                <p class="content is-small is-marginless pb-05">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!
                                </p>
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
                                <p class="content is-small is-marginless pb-05">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!
                                </p>
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
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!
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
                                <p class="content is-small is-marginless pb-05">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!
                                </p>
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
import axiosBase from "../services/axiosBase";

export default {
    data() {
        return {
            is_loading: true,
            is_error: false,
            apiErrors: null,
            errorMessage: "",
            avatarPic: null,
            profile: {
                display_name: "",
                avatar_path: "",
                intro: "",
                about_me: "",
                inspiration: "",
                location: {}
            }
        };
    },

    methods: {
        async onSubmit() {
            try {
                console.log("onSubmit");
                // console.log(this.profile);
                console.log("__GO__");
                // await this.$store.dispatch("save_profile", this.profile);
                this.$router.push({
                    name: "user",
                    params: { username: this.authenticatedUser.username }
                });
            } catch (error) {
                console.log("__ERROR_CAUGHT__");
                console.log(error.response.status);
                console.log(error.response.data);
                // if (e.response.data.error_type === "INVALID_USER_ERROR") {
                //     this.apiErrors = e.response.data.errors;
                // } else if (e.response.data.error_type === "INTEGRITY_ERROR") {
                //     this.apiErrors = e.response.data.errors;
                // } else {
                //     // most probably 500
                //     this.apiErrors = e.response.data.errors;
                // }
            }
        },
        backToProfile() {
            this.$router.push({
                name: "user",
                params: { username: this.authenticatedUser.username }
            });
        },
        async onFileSelected(event) {
            console.log("# --- onFileSelected --- #");
            console.log(event);
            console.log("# ---------------------- #");
            if (event.target.files.length > 0) {
                this.avatarPic = event.target.files[0];
            }
            // return false;
        },
        async uploadAvatar(event) {
            console.log("uploadAvatar I was called");
            if (event) event.preventDefault();
            const fd = new FormData();
            fd.append("avatar", this.avatarPic, this.avatarPic.name);
            const uploaded = await axiosBase.post(`/users/${this.authenticatedUser._key}/upload-avatar`, fd, {
                onUploadProgress: uploadEvent => {
                    console.log(`Upload progress: ${Math.round((uploadEvent.loaded / uploadEvent.total) * 100)}%`);
                }
            });
            this.profile.avatar_path = `/img/avatars/${uploaded.data.filename}`;
            console.log(uploaded);
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
    }
};

// ,
//   {
//     onUploadProgress: uploadEvent => {
//       console.log(
//         `Upload progress: ${Math.round(
//           (uploadEvent.loaded / uploadEvent.total) * 100
//         )}%`
//       );
//     }
//   }
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
