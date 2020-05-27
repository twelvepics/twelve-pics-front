<template>
  <main>
    <div class="container is-fluid narrow-container">
      <!-- PROFILE COLUMN -->
      <div class="columns is-centered" style="margin:0;padding:0;">
        <!-- CENTER COLUMNN -->
        <div class="column">
          <!-- EMAIL NOT CONFIRMED WARNINGS -->
          <div class="notification is-warning" v-if="showShouldConfirmMessage && !is_loading">
            <span v-if="!confirmEmailSent">
              In order to send to or receive messages from other users of the site, you need to confirm your email address.
              <br />
              <a @click.prevent="sendConfirmEmail">Resend confirmation email</a>
            </span>
            <span v-else>
              We have sent you a confirmation request email. Please click on the link in it to confirm your
              email address.
              <br />&nbsp;
            </span>
            <br />
          </div>
          <!-- END EMAIL NOT CONFIRMED WARNINGS -->
          <!-- START PROFILE_ALL -->
          <page-loader v-if="is_loading"></page-loader>
          <page-error v-if="is_error" :errorMessage="errorMessage"></page-error>

          <div class="card" v-if="!!user && !is_loading">
            <!-- CARD CONTENT -->
            <div class="card-content">
              <!-- START COLUMNS IS-MOBILE -->
              <!-- VIEW PROFILE TOP -->
              <component
                :is="profileTopLayout"
                :user="user"
                :showMessageButton="showMessageButton"
                :showEditButton="showEditButton"
                :messagingEnabled="messagingEnabled"
                @openMessageModal="openMessageModal"
              ></component>
              <!-- ENDS VIEW PROFILE TOP -->

              <!-- START PROFILE_DETAIL -->
              <!-- IF PROFILE EMPTY -->
              <div class="profile-detail">
                <div v-if="profileIsEmpty">
                  <p class="subtitle is-size-6">
                    <b>{{ user.username }}</b> did not fill his profile yet.
                  </p>
                </div>
                <!-- ELSE IF PROFILE -->
                <div v-else>
                  <!-- START PROFILE ITEMS -->
                  <!-- PIC -->
                  <!-- shameless reorder -->
                  <div
                    class="avatar-container"
                    v-if="!!user.profile.avatar_path && isLayoutMobile()"
                  >
                    <img :src="user.profile.avatar_path" class="avatar-img" />
                  </div>
                  <!-- PIC -->
                  <p
                    class="subtitle is-size-5"
                    style="color: #555;"
                    v-if="user.profile.intro"
                  >{{ user.profile.intro }}</p>
                  <!-- PIC -->
                  <div class="avatar-container" v-if="!!user.profile.avatar_path && isLayoutFull()">
                    <img :src="user.profile.avatar_path" class="avatar-img" />
                  </div>
                  <!-- PIC -->

                  <!-- ABOUT ME -->
                  <div class="field user-info ta-html" v-if="user.profile.about_me">
                    <h5 class="has-text-weight-semibold is-2">A few worlds about me</h5>
                    <p class="is-size-6" v-html="nl2p(user.profile.about_me)"></p>
                  </div>
                  <!-- ABOUT ME -->

                  <!-- TECH STUFF -->
                  <div class="field user-info ta-html" v-if="user.profile.inspiration">
                    <h5 class="has-text-weight-semibold is-2">Gear, technique, inspiration</h5>
                    <p class="is-size-6" v-html="nl2p(user.profile.inspiration)"></p>
                  </div>
                  <!-- TECH STUFF -->

                  <!-- LOCATION -->
                  <div class="field user-info" v-if="user.profile.location.place_name">
                    <h5 class="has-text-weight-semibold is-2">
                      Location:
                      <span class="is-size-6 has-text-weight-normal">
                        {{
                        user.profile.location.place_name
                        }}
                      </span>
                    </h5>
                  </div>
                  <!-- LOCATION -->

                  <!-- LINKS -->
                  <div class="field user-info ta-html" v-if="hasLinks">
                    <h5 class="has-text-weight-semibold is-2">Links</h5>
                    <div class="is-divider links-divider"></div>
                    <div class="links">
                      <span v-if="user.profile.links.website" style="padding-right:1rem;">
                        <a :href="user.profile.links.website" target="_blank">
                          <font-awesome-icon
                            icon="file-code"
                            size="2x"
                            :style="{ color: '#348BF8' }"
                          ></font-awesome-icon>
                        </a>
                      </span>
                      <span v-if="user.profile.links.instagram">
                        <a :href="user.profile.links.instagram" target="_blank">
                          <font-awesome-icon
                            :icon="['fab', 'instagram']"
                            size="2x"
                            :style="{ color: '#348BF8' }"
                          ></font-awesome-icon>
                        </a>
                      </span>
                      <span v-if="user.profile.links.twitter">
                        <a :href="user.profile.links.twitter" target="_blank">
                          <font-awesome-icon
                            :icon="['fab', 'twitter-square']"
                            size="2x"
                            :style="{ color: '#348BF8' }"
                          ></font-awesome-icon>
                        </a>
                      </span>
                      <span v-if="user.profile.links.facebook">
                        <a :href="user.profile.links.facebook" target="_blank">
                          <font-awesome-icon
                            :icon="['fab', 'facebook-square']"
                            size="2x"
                            :style="{ color: '#348BF8' }"
                          ></font-awesome-icon>
                        </a>
                      </span>
                      <span v-if="user.profile.links.flickr">
                        <a :href="user.profile.links.flickr" target="_blank">
                          <font-awesome-icon
                            :icon="['fab', 'flickr']"
                            size="2x"
                            :style="{ color: '#348BF8' }"
                          ></font-awesome-icon>
                        </a>
                      </span>
                    </div>
                  </div>
                  <!-- LINKS -->
                  <!-- ENDS PROFILE ITEMS -->
                </div>
              </div>
              <!-- END PROFILE_DETAIL -->
            </div>
          </div>
          <!-- END PROFILE_ALL -->
        </div>
      </div>
      <!-- ENDS PROFILE COLUMN -->

      <!-- Message composer modal -->
      <message-composer-modal
        :isActive="messageModalActive"
        :username="user && (user.profile.display_name || user.username)"
        :to_user_key="user && user._key"
        @messageModalClosed="closeMessageModal"
      ></message-composer-modal>

      <!-- DEBUG -->
      <div v-if="is_debug" class="columns is-centered" style="margin:0;padding:0">
        <!-- CENTER COLUMNN -->
        <div class="column is-three-quarters-desktop">
          <!-- START PROFILE -->
          <div class="card" style="padding:20px;">
            <!-- 
          <router-link :to="{ name: 'user', params: { username: 'sboobi' } }">Sboobi</router-link>
          <br />
          <router-link :to="{ name: 'user', params: { username: 'empty' } }">Empty</router-link>
          <br />
          <router-link :to="{ name: 'user', params: { username: 'emptou' } }">Emptou</router-link>
            <br />-->
            Email confirmed: {{ userEmailConfirmed }}
          </div>
        </div>
      </div>
    </div>
    <!-- END DEBUG -->
  </main>
</template>

<script>
import axiosBase from "../services/axiosBase";
import * as Sentry from "@sentry/browser";
import { mapGetters } from "vuex";
// Private messaging
import MessageComposerModal from "../components/MessageComposerModal.vue";
import ViewProfileFullTop from "../components/profile/ViewProfileFullTop.vue";
import ViewProfileMobileTop from "../components/profile/ViewProfileMobileTop.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;
const LAYOUT_SWITCH = 600;

export default {
  components: {
    MessageComposerModal,
    PageLoader,
    PageError,
    ViewProfileFullTop,
    ViewProfileMobileTop
  },
  data() {
    return {
      user: null,
      is_loading: true,
      is_error: false,
      errorMessage: "",
      is_debug: false,
      //-- messaging --
      messageModalActive: false,
      //-- warnings --
      confirmEmailSent: false,
      layout: null
    };
  },
  methods: {
    openMessageModal() {
      lockBgScroll();
      this.messageModalActive = true;
    },
    closeMessageModal() {
      unlockBgScroll();
      this.messageModalActive = false;
    },
    async sendConfirmEmail() {
      await axiosBase.post(
        `/users/${this.authenticatedUser._key}/send-confirm-email`
      );
      this.confirmEmailSent = true;
    },
    nl2p: function(str) {
      return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },
    async fetchData() {
      try {
        // refresh local user in case confirmed email from another browser
        if (this.isAuthenticated && !this.authenticatedUser.email_confirmed) {
          await this.$store.dispatch("initUser");
        }
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axiosBase.get(`/users/${this.username}`);
        // console.log(response.data.user);
        this.user = response.data.user;
        console.log(this.user);
        this.is_loading = false;
      } catch (e) {
        this.is_loading = false;
        this.is_error = true;
        if (e.response) {
          if (e.response.status === 404) {
            this.errorMessage = "USER NOT FOUND";
          } else {
            // Most probably a 500
            this.errorMessage = "SERVER ERROR";
          }
        } else {
          console.log(e);
          Sentry.captureException(e);
        }
      }
    },
    handleWindowChange(event) {
      if (event.matches) {
        // < LAYOUT_SWITCH
        console.log(`CHANGE < ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_MOBILE;
      } else {
        // >= LAYOUT_SWITCH
        console.log(`CHANGE >= ${LAYOUT_SWITCH}`);
        this.layout = LAYOUT_FULL;
      }
    },
    isLayoutMobile() {
      return this.layout === LAYOUT_MOBILE;
    },
    isLayoutFull() {
      return this.layout === LAYOUT_FULL;
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),
    // works not, try something else, later...
    userEmailConfirmed() {
      return this.isAuthenticated && this.authenticatedUser.email_confirmed;
    },
    profileTopLayout() {
      if (this.layout === LAYOUT_FULL) {
        return ViewProfileFullTop;
      } else {
        return ViewProfileMobileTop;
      }
    },
    messagingEnabled: function() {
      return (
        this.isAuthenticated &&
        this.authenticatedUser.email_confirmed &&
        this.user &&
        this.user.email_confirmed
      );
    },
    showShouldConfirmMessage: function() {
      return (
        this.authenticatedUser &&
        this.user &&
        !this.authenticatedUser.email_confirmed &&
        this.user._key != this.authenticatedUser._key
      );
    },
    showMessageButton: function() {
      return (
        this.authenticatedUser &&
        this.user &&
        this.user.email_confirmed &&
        this.user._key != this.authenticatedUser._key
      );
    },
    username: function() {
      return this.$route.params.username;
    },
    showEditButton: function() {
      return (
        this.isAuthenticated && this.user._key === this.authenticatedUser._key
      );
    },
    profileIsEmpty() {
      const p = this.user.profile;
      if (
        !p.display_name &&
        !p.avatar_path &&
        !p.intro &&
        !p.about_me &&
        !p.inspiration &&
        !p.location.place_name
      ) {
        return true;
      }
      return false;
    },
    hasLinks() {
      const l = this.user.profile.links;
      return !!(
        l.website ||
        l.instagram ||
        l.twitter ||
        l.facebook ||
        l.flickr
      );
    }
  },
  created() {
    this.fetchData();
    _mql = window.matchMedia(`(max-width: ${LAYOUT_SWITCH}px)`);
    console.log(_mql.matches);
    if (_mql.matches) {
      // < LAYOUT_SWITCH
      console.log(`INITIAL < ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_MOBILE;
    } else {
      // >= LAYOUT_SWITCH
      console.log(`INITIAL >= ${LAYOUT_SWITCH}`);
      this.layout = LAYOUT_FULL;
    }
    console.log(_mql);
    // initial state here
    _mql.addListener(this.handleWindowChange);
  },
  beforeDestroy() {
    _mql.removeListener(this.handleWindowChange);
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      if (to.name === "user") {
        // react to route changes...
        // console.log("#--- BEFORE ROUTE UPDATE --#");
        // console.log(to);
        // console.log(to.params.username);
        this.is_loading = true;
        this.confirmEmailSent = false;
        axiosBase
          .get(`/users/${to.params.username}`)
          .then(response => {
            // window.scrollTo(0, 0);
            this.user = response.data.user;
            this.is_loading = false;
            this.is_error = false;
          })
          .catch(e => {
            this.is_loading = false;
            this.is_error = true;
            this.user = null;
            if (e.response) {
              if (e.response.status === 404) {
                this.errorMessage = "USER NOT FOUND";
              } else {
                // Most probably a 500
                this.errorMessage = "SERVER ERROR";
              }
            } else {
              console.log(e);
              Sentry.captureException(e);
            }
          });
      }
    }
  }
};
</script>

<style scoped>
/************** layout ***********/

/************** spacing ***********/
.content h5 {
  margin-bottom: 0.5rem;
}

/***************** warnings **************/

/****************** v-html ***********/
div.ta-html br {
  display: block;
  margin-top: 2px;
  content: " ";
}

/************** links ************/
.links-divider {
  margin: 0.3rem 0 0.5rem 0;
}
.links span {
  padding-right: 1rem;
}
/* --- */
.profile-detail {
  margin-top: 2rem;
}
.avatar-img {
  width: 200px;
  height: 200px;
}
.avatar-container {
  margin: 10px 0 15px 0;
}
.user-info {
  margin: 30px 0 15px 0;
}
.card-content {
  padding-bottom: 4rem;
}
.column {
  padding: 0;
}
.card {
  margin-bottom: 2rem;
}
@media only screen and (max-width: 600px) {
  .card-content {
    margin: 0;
    padding: 0 0.75rem 4rem 0.75rem;
  }
  .avatar-img {
    width: 100px;
    height: 100px;
  }
  .is-size-5 {
    font-size: 1.1rem !important;
  }
  .avatar-container {
    margin: 10px 0 6px 0;
  }
  .user-info {
    margin: 10px 0 0 0;
    padding: 0;
  }
  .is-size-6 {
    font-size: 0.93rem !important;
  }
  .subtitle:not(:last-child) {
    margin-bottom: 0.7rem;
  }
  .notification {
    font-size: 90%;
    padding: 0.75rem 1.25rem 0.75rem 1.25rem;
  }
  .column {
    padding: 0;
  }
}
</style>
