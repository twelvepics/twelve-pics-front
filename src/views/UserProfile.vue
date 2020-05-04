<template>
  <main>
    <!-- PROFILE COLUMN -->
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
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
        <!-- START PROFILE -->
        <page-loader v-if="is_loading"></page-loader>
        <page-error v-if="is_error" :errorMessage="errorMessage"></page-error>

        <div class="card" v-if="!!user && !is_loading">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <div
              class="columns is-mobile"
              style="margin-bottom:1.5rem;border-bottom:1px solid #bbb;padding-bottom:.5rem"
            >
              <div class="column is-half">
                <p class="title is-size-4">
                  <router-link :to="{ name: 'user-stories', params: { username: user.username } }">
                    {{
                    user.profile.display_name || user.username
                    }}
                  </router-link>
                </p>
              </div>
              <div v-if="showEditButton" class="column is-half" style="margin:0;padding:0;">
                <p class="has-text-right" style="padding:3px 5px 0 0">
                  <router-link
                    class="button is-primary"
                    id="profile-edit-btn"
                    :to="`/user/${authenticatedUser._key}/edit`"
                  >
                    <strong>Edit</strong>
                  </router-link>
                </p>
              </div>
              <div v-if="showMessageButton" class="column is-half" style="margin:0; padding:0;">
                <p class="has-text-right" style="padding:3px 5px 0 0;">
                  <button
                    class="button is-primary"
                    @click.prevent="openMessageModal"
                    :disabled="!messagingEnabled"
                  >Send message</button>
                </p>
              </div>
            </div>
            <div v-if="profileIsEmpty">
              <p class="subtitle is-size-6">
                <b>{{ user.username }}</b> did not fill his profile yet.
              </p>
            </div>
            <div v-else>
              <!-- START PROFILE ITEMS -->
              <p
                class="subtitle is-size-5"
                style="color: #555;"
                v-if="user.profile.intro"
              >{{ user.profile.intro }}</p>

              <!-- PIC -->
              <div style="margin:30px 0 15px 0;" v-if="!!user.profile.avatar_path">
                <img :src="user.profile.avatar_path" width="200px" height="200px" />
              </div>
              <!-- PIC -->

              <!-- ABOUT ME -->
              <div class="field m-30-0-15-0 ta-html" v-if="user.profile.about_me">
                <h5 class="has-text-weight-semibold is-2">A few worlds about me</h5>
                <p class="is-size-6" v-html="nl2p(user.profile.about_me)"></p>
              </div>
              <!-- ABOUT ME -->

              <!-- TECH STUFF -->
              <div class="field m-30-0-15-0 ta-html" v-if="user.profile.inspiration">
                <h5 class="has-text-weight-semibold is-2">Gear, technique, inspiration</h5>
                <p class="is-size-6" v-html="nl2p(user.profile.inspiration)"></p>
              </div>
              <!-- TECH STUFF -->

              <!-- LOCATION -->
              <div class="field m-30-0-15-0" v-if="user.profile.location.place_name">
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
              <div class="field m-30-0-15-0 ta-html" v-if="hasLinks">
                <h5 class="has-text-weight-semibold is-2">Links</h5>
                <div class="is-divider links-divider"></div>
                <div class="links">
                  <span v-if="user.profile.links.website" style="padding-right:1rem;">
                    <a :href="user.profile.links.website" target="_blank">
                      <font-awesome-icon icon="file-code" size="2x" :style="{ color: '#348BF8' }"></font-awesome-icon>
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
            <div style="margin-top:20px;"></div>
          </div>
        </div>
        <!-- END PROFILE -->
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
    <div v-if="is_debug" class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START PROFILE -->
        <div class="card" style="padding:20px;">
          <router-link :to="{ name: 'user', params: { username: 'sboobi' } }">Sboobi</router-link>
          <br />
          <router-link :to="{ name: 'user', params: { username: 'empty' } }">Empty</router-link>
          <br />
          <router-link :to="{ name: 'user', params: { username: 'emptou' } }">Emptou</router-link>
          <br />
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
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";

export default {
  components: {
    MessageComposerModal,
    PageLoader,
    PageError
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
      confirmEmailSent: false
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
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),
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
footer {
  margin-top: 30px;
}

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
</style>
