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
                            <div v-if="is_api_error" class="isError" style="text-align:center;margin-bottom:12px;">
                                <div v-if="apiErrorType == 'UPDATE ERROR'">
                                    <p><b>VALIDATIONS ERRORS</b></p>
                                    <ul id="apiErrors">
                                        <li v-for="(k, v, idx) in apiErrors" :key="idx">{{ k | cleanApiError }}</li>
                                    </ul>
                                </div>
                                <div v-else>
                                    SERVER ERROR, SORRY. TRY AGAIN LATER.
                                </div>
                            </div>
                            <p class="title is-size-4">{{ user.username }}'s profile</p>
                            <p class="subtitle is-size-6">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
                                praesentium esse veritatis nemo!
                            </p>
                            <!-- AVATAR -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">Profile pic</label>
                                <p v-if="isUploadFailed" class="content is-small is-marginless pb-05 isError">
                                    {{ uploadErrorMessage }}
                                </p>
                                <p v-else class="content is-small is-marginless pb-05">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!
                                </p>
                                <!-- DROP BOX -->
                                <div v-if="!hasPic && (isUploadInitial || isUploadSaving || isUploadFailed)">
                                    <div class="dropbox">
                                        <input
                                            type="file"
                                            :name="uploadFieldName"
                                            :disabled="isUploadSaving"
                                            @change="fileChange($event.target.name, $event.target.files[0])"
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
                                        <button class="button is-small is-primary" @click.prevent="resetAvatar">
                                            Change
                                        </button>
                                        <button
                                            class="button is-small is-dark"
                                            style="margin-left:10px"
                                            @click.prevent="deleteAvatar"
                                        >
                                            Delete
                                        </button>
                                    </p>
                                </div>

                                <!-- END DROP BOX -->
                            </div>
                            <!-- END AVATAR -->

                            <!-- DISPLAY NAME -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">Display name</label>
                                <p class="content is-small is-marginless pb-05">
                                    <span style="color:red;" v-if="$v.profile.display_name.$error"
                                        >Display name max length is 32 characters.</span
                                    >
                                    <span v-else>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</span
                                    >
                                </p>
                                <div class="control" style="max-width: 500px;">
                                    <input
                                        class="input"
                                        :class="{ 'is-danger': $v.profile.display_name.$error }"
                                        type="text"
                                        v-model="profile.display_name"
                                        placeholder="Display name (Optional)"
                                        @keyup="$v.profile.display_name.$touch()"
                                        @keyup.22="$v.profile.display_name.$touch()"
                                        @input="resetApiErrors()"
                                        @keydown.enter.prevent
                                    />
                                </div>
                            </div>
                            <!-- DISPLAY NAME -->

                            <!-- INTRO -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">A short intro</label>
                                <p class="content is-small is-marginless pb-05">
                                    <span style="color:red;" v-if="$v.profile.intro.$error"
                                        >Intro max length is 256 characters.</span
                                    >
                                    <span v-else>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</span
                                    >
                                </p>
                                <div class="control">
                                    <input
                                        class="input"
                                        :class="{ 'is-danger': $v.profile.intro.$error }"
                                        type="text"
                                        v-model="profile.intro"
                                        placeholder="A short intro"
                                        @keyup="$v.profile.intro.$touch()"
                                        @keyup.22="$v.profile.intro.$touch()"
                                        @input="resetApiErrors()"
                                        @keydown.enter.prevent
                                    />
                                </div>
                            </div>
                            <!-- INTRO -->

                            <!-- ABOUT ME -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">More about you</label>
                                <p class="content is-small is-marginless pb-05">
                                    <span style="color:red;" v-if="$v.profile.about_me.$error"
                                        >Max length is 3000 characters.</span
                                    >
                                    <span v-else>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</span
                                    >
                                </p>
                                <div class="control">
                                    <textarea
                                        class="textarea"
                                        :class="{ 'is-danger': $v.profile.about_me.$error }"
                                        v-model="profile.about_me"
                                        placeholder="A few worlds about you..."
                                        @keyup="$v.profile.about_me.$touch()"
                                        @keyup.22="$v.profile.about_me.$touch()"
                                        @input="resetApiErrors()"
                                    ></textarea>
                                </div>
                            </div>
                            <!-- ABOUT ME -->

                            <!-- TECH STUFF -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">Gear, technique, inspiration...</label>
                                <p class="content is-small is-marginless pb-05">
                                    <span style="color:red;" v-if="$v.profile.inspiration.$error"
                                        >Max length is 3000 characters.</span
                                    >
                                    <span v-else>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</span
                                    >
                                </p>
                                <div class="control">
                                    <textarea
                                        class="textarea"
                                        :class="{ 'is-danger': $v.profile.inspiration.$error }"
                                        v-model="profile.inspiration"
                                        placeholder="Gear, technique, inspiration..."
                                        @keyup="$v.profile.inspiration.$touch()"
                                        @keyup.22="$v.profile.inspiration.$touch()"
                                        @input="resetApiErrors()"
                                    ></textarea>
                                </div>
                            </div>
                            <!-- TECH STUFF -->

                            <!-- LOCATION -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">Your location</label>
                                <p class="content is-small is-marginless pb-05">
                                    <span style="color:red;" v-if="$v.profile.location.place_name.$error"
                                        >Max length is 128 characters.</span
                                    >
                                    <span v-else>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</span
                                    >
                                </p>
                                <div class="control" style="max-width: 500px;">
                                    <input
                                        autocomplete="off"
                                        class="input"
                                        :class="{ 'is-danger': $v.profile.location.place_name.$error }"
                                        type="text"
                                        v-model="profile.location.place_name"
                                        placeholder="Type on and select your location"
                                        list="locations"
                                        @input="searchLocation"
                                        @change="setSelectedSelection"
                                        @keyup="$v.profile.location.place_name.$touch()"
                                        @keyup.22="$v.profile.location.place_name.$touch()"
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

                            <!-- WEBSITE & SOCIAL -->
                            <div class="field m-30-0-15-0">
                                <label class="label is-marginless">Website and socials</label>
                                <p class="content is-small is-marginless pb-05">
                                    <span
                                        style="color:red;"
                                        v-if="
                                            $v.profile.links.website.$error ||
                                                $v.profile.links.instagram.$error ||
                                                $v.profile.links.facebook.$error ||
                                                $v.profile.links.twitter.$error ||
                                                $v.profile.links.flickr.$error
                                        "
                                        >Max length is 128 characters.</span
                                    >
                                    <span v-else>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</span
                                    >
                                </p>
                                <!-- HORIZONTAL 1 -->
                                <div class="field is-horizontal socials">
                                    <div class="field-label is-normal">
                                        <label class="label">Website:</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left">
                                                <input
                                                    class="input"
                                                    :class="{ 'is-danger': $v.profile.links.website.$error }"
                                                    type="text"
                                                    placeholder="Your website url"
                                                    v-model="profile.links.website"
                                                    @keyup="$v.profile.links.website.$touch()"
                                                    @keyup.22="$v.profile.links.website.$touch()"
                                                    @input="resetApiErrors()"
                                                    @keydown.enter.prevent
                                                />
                                                <span class="icon is-left">
                                                    <font-awesome-icon icon="file-code" size="lg"></font-awesome-icon>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="field-label is-normal">
                                        <label class="label">Instagram:</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left">
                                                <input
                                                    class="input"
                                                    :class="{ 'is-danger': $v.profile.links.instagram.$error }"
                                                    type="text"
                                                    placeholder="Your Instagram url"
                                                    v-model="profile.links.instagram"
                                                    @keyup="$v.profile.links.instagram.$touch()"
                                                    @keyup.22="$v.profile.links.instagram.$touch()"
                                                    @input="resetApiErrors()"
                                                    @keydown.enter.prevent
                                                />
                                                <span class="icon is-left">
                                                    <font-awesome-icon
                                                        :icon="['fab', 'instagram']"
                                                        size="lg"
                                                    ></font-awesome-icon>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- ENDS HORIZONTAL 1-->
                                <!-- HORIZONTAL 2 -->
                                <div class="field is-horizontal socials">
                                    <div class="field-label is-normal">
                                        <label class="label">Twitter:</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left">
                                                <input
                                                    class="input"
                                                    :class="{ 'is-danger': $v.profile.links.twitter.$error }"
                                                    type="text"
                                                    placeholder="Your Twitter url or handle"
                                                    v-model="profile.links.twitter"
                                                    @keyup="$v.profile.links.twitter.$touch()"
                                                    @keyup.22="$v.profile.links.twitter.$touch()"
                                                    @input="resetApiErrors()"
                                                    @keydown.enter.prevent
                                                />
                                                <span class="icon is-left">
                                                    <font-awesome-icon
                                                        :icon="['fab', 'twitter-square']"
                                                        size="lg"
                                                    ></font-awesome-icon>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="field-label is-normal">
                                        <label class="label">Facebook:</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left">
                                                <input
                                                    class="input"
                                                    :class="{ 'is-danger': $v.profile.links.facebook.$error }"
                                                    type="text"
                                                    placeholder="Your Facebook url"
                                                    v-model="profile.links.facebook"
                                                    @keyup="$v.profile.links.facebook.$touch()"
                                                    @keyup.22="$v.profile.links.facebook.$touch()"
                                                    @input="resetApiErrors()"
                                                    @keydown.enter.prevent
                                                />
                                                <span class="icon is-left">
                                                    <font-awesome-icon
                                                        :icon="['fab', 'facebook-square']"
                                                        size="lg"
                                                    ></font-awesome-icon>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- ENDS HORIZONTAL 2-->
                                <!-- HORIZONTAL 3 -->
                                <div class="field is-horizontal socials">
                                    <div class="field-label is-normal">
                                        <label class="label">Flickr:</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left">
                                                <input
                                                    class="input"
                                                    :class="{ 'is-danger': $v.profile.links.flickr.$error }"
                                                    type="text"
                                                    placeholder="Your Flickr url"
                                                    v-model="profile.links.flickr"
                                                    @blur="$v.profile.links.flickr.$touch()"
                                                    @input="resetApiErrors()"
                                                    @keydown.enter.prevent
                                                />
                                                <span class="icon is-left">
                                                    <font-awesome-icon
                                                        :icon="['fab', 'flickr']"
                                                        size="lg"
                                                    ></font-awesome-icon>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <!-- DUMMY -->
                                    <div class="field-label is-normal"></div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left"></p>
                                        </div>
                                    </div>
                                    <!-- DUMMY -->
                                </div>
                                <!-- ENDS HORIZONTAL 3-->
                            </div>
                            <!-- ENDS WEBSITE & SOCIAL -->

                            <!-- SUBMIT -->
                            <div class="is-divider" style="margin-top:35px;"></div>
                            <div class="field is-grouped submit-buttons">
                                <div class="control">
                                    <button
                                        type="submit"
                                        class="button is-primary"
                                        :disabled="$v.$invalid || is_saving"
                                    >
                                        Save
                                    </button>
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
        <!-- DEBUG -->
        <div class="columns is-centered">
            <div v-if="is_debug" class="column is-three-quarters-desktop">
                <!-- START PROFILE -->
                <div class="card" style="padding:20px;">
                    <p>DEBUG</p>
                    <!-- <p>{{ $v }}</p> -->
                </div>
            </div>
        </div>
        <!-- END DEBUG -->
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
import { maxLength } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            is_debug: true,
            is_loading: true,
            // fetch errors
            is_error: false,
            errorMessage: "",
            // api submit errors
            is_api_error: false,
            apiErrors: "",
            apiErrorType: "",
            // 
            is_saving: false,
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
                location: {},
                links: {}
            },
            /* location */
            mapboxOptions: [],
            deepMapboxOptions: [],
            selectedLocationPlace: "",
            selectedLocationObj: null
        };
    },

    methods: {
        // TODO
        // PUT API ERRORS SOMEWHERE, NOT DETAILED
        // form errors
        async onSubmit() {
            try {
                console.log("onSubmit");
                console.log(this.profile);
                this.is_saving = true;
                this.resetApiErrors();
                await this.$store.dispatch("save_profile", this.profile);
                this.$router.push({
                    name: "user",
                    params: { username: this.authenticatedUser.username }
                });
            } catch (error) {
                console.log("__ERROR_CAUGHT__");
                console.log(error.response.status);
                console.log(error.response.data);
                this.is_saving = false;
                this.is_api_error = true;
                if (error.response.data.error_type === "INVALID_UPDATE_ERROR") {
                    this.apiErrors = error.response.data.errors;
                    // this.apiErrorMessage = error.response.data.errors;
                    this.apiErrorType = "UPDATE ERROR";
                } else {
                    this.apiErrorType = "SERVER ERROR";
                }
                window.scrollTo(0, 0);
            }
        },
        backToProfile() {
            this.resetApiErrors();
            this.is_saving = false;
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
                                `UploadProgress: ${Math.round((uploadEvent.loaded / uploadEvent.total) * 100)}%`
                            );
                        }
                    }
                );
                this.uploadedFile = uploaded;
                this.profile.avatar_path = uploaded.data.web_path;
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
            this.resetApiErrors();
            try {
                if (e.target.value.length > 1 && e.inputType === "insertText") {
                    console.log("@@@");
                    const foundLocations = await axiosBase.get(
                        `/users/${this.authenticatedUser._key}/locate?location=${encodeURIComponent(e.target.value)}`
                    );
                    console.log("@@@");
                    // console.log(foundLocations);
                    this.mapboxOptions = foundLocations.data.found;
                    this.deepMapboxOptions = foundLocations.data.found;
                } else {
                    this.mapboxOptions = [];
                }
            } catch (err) {
                // DO SOMETHING/WHAT? LOG IT
                console.log("++++");
                console.log(err.response);
                console.log(err.response.status);
                console.log(err.response.statusText);
                console.log(err.response.data.errorType);
                console.log(err.response.data.error);
                // console.log("++++");
            }
        },
        async setSelectedSelection(e) {
            try {
                // console.log(e);
                this.selectedLocationPlace = e.target.value;
                this.selectedLocationObj = await this.deepMapboxOptions.filter(l => {
                    return l.place_name == this.selectedLocationPlace;
                });
                // console.log("# -- loc selected --#");
                // console.log(this.deepMapboxOptions);
                // console.log(this.selectedLocationPlace);
                // console.log(this.selectedLocationObj);
                // console.log("# -- end loc selected --#");
                if (this.selectedLocationObj.length > 0) {
                    this.profile.location = this.selectedLocationObj[0];
                } else {
                    this.profile.location = {
                        place_name: e.target.value,
                        latitude: null,
                        longitude: null
                    };
                }
                // console.log(this.profile.location);
                this.mapboxOptions = [];
            } catch (e) {
                console.log(e);
            }
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
        this.profile.links = this.getProfile.links;
    },
    mounted() {
        this.initAvatar();
    },
    filters: {
        cleanApiError: function(value) {
            const cleans = {
                display_name: "Display name",
                intro: "Intro",
                about_me: "More about you",
                inspiration: "Gear, technique...",
                "location.place_name": "Location",
                "links.website": "Website",
                "links.instagram": "Instagram",
                "links.twitter": "Twitter",
                "links.flickr": "Flickr",
                "links.facebook": "Facebook"
            };
            for (let k of Object.keys(cleans)) {
                if (value.includes(k)) {
                    return value.replace(k, cleans[k]);
                }
            }
            return value;
        }
    },
    validations: {
        profile: {
            display_name: {
                maxLen: maxLength(32)
            },
            intro: {
                maxLen: maxLength(256)
            },
            about_me: {
                maxLen: maxLength(3000)
            },
            inspiration: {
                maxLen: maxLength(3000)
            },
            location: {
                place_name: {
                    maxLen: maxLength(128)
                }
            },
            links: {
                website: {
                    maxLen: maxLength(128)
                },
                instagram: {
                    maxLen: maxLength(128)
                },
                twitter: {
                    maxLen: maxLength(128)
                },
                flickr: {
                    maxLen: maxLength(128)
                },
                facebook: {
                    maxLen: maxLength(128)
                }
            }
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

/***** website and socials *********/
.socials .field-label {
    /* background-color: pink; */
    flex-grow: 0;
    margin-right: 0.5rem;
    min-width: 5rem;
    text-align: left;
}
.socials .field {
    margin-right: 1.5rem;
}
</style>
