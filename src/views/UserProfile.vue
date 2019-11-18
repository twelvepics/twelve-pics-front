<template>
  <main>
    <!-- PROFILE COLUMN -->
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- EMAIL NOT CONFIRMED WARNINGS -->
        <div class="notification is-warning" v-if="ICannotSendMessage && !is_loading">
          <span v-if="!confirmEmailSent">
            In order to send messages to other users of the site, you need to confirm your email address.
            <a
              @click.prevent="sendConfirmEmail"
            >Resend confirmation email</a>
          </span>
          <span
            v-else
          >An email has been sent to you. Please click on the link in it to confirm your email address.</span>
          <br />
        </div>
        <div v-else-if="userCannotReceiveMessage  && !is_loading" class="notification is-warning">
          <b>{{authenticatedUser && user && (user.profile.display_name || user.username)}}</b> did not confirm his email address. You cannot message him. Sorry.
        </div>
        <!-- END EMAIL NOT CONFIRMED WARNINGS -->
        <!-- START PROFILE -->
        <div
          class="card"
          v-if="is_loading || is_error"
          style="text-align:center;height:60px;padding-top:10px;margin-bottom:10px"
        >
          <div
            v-if="is_error && !is_loading"
            class="isError"
            style="margin-top:7px;"
          >{{ errorMessage }}</div>
          <div v-if="is_loading" class="loader" style="margin:auto;"></div>
        </div>
        <div class="card" v-if="!!user && !is_loading">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <div class="columns is-mobile" style="margin-bottom:0;">
              <div class="column is-half">
                <p class="title is-size-4">{{user.profile.display_name || user.username}}</p>
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
                <b>{{user.username}}</b> did not fill his profile yet.
              </p>
            </div>
            <div v-else>
              <!-- START PROFILE ITEMS -->
              <p class="subtitle is-size-6">{{user.profile.intro}}</p>

              <!-- PIC -->
              <div style="margin:30px 0 15px 0;" v-if="!!user.profile.avatar_path">
                <img :src="user.profile.avatar_path" width="200px" height="200px" />
              </div>
              <!-- PIC -->

              <!-- ABOUT ME -->
              <div class="field m-30-0-15-0 ta-html">
                <h5 class="has-text-weight-semibold is-2">A few worlds about me</h5>
                <p class="is-size-6" v-html="nl2p(user.profile.about_me)"></p>
              </div>
              <!-- ABOUT ME -->

              <!-- TECH STUFF -->
              <div class="field m-30-0-15-0 ta-html">
                <h5 class="has-text-weight-semibold is-2">Gear, technique, inspiration</h5>
                <p class="is-size-6" v-html="nl2p(user.profile.inspiration)"></p>
              </div>
              <!-- TECH STUFF -->

              <!-- LOCATION -->
              <div class="field m-30-0-15-0">
                <h5 class="has-text-weight-semibold is-2">
                  My location:
                  <span
                    class="is-size-6 has-text-weight-normal"
                  >{{user.profile.location.place_name}}</span>
                </h5>
              </div>
              <!-- LOCATION -->
              <!-- ENDS PROFILE ITEMS -->
            </div>
            <div style="margin-top:20px;"></div>
          </div>
        </div>
        <!-- END PROFILE -->
      </div>
    </div>
    <!-- ENDS PROFILE COLUMN -->

    <!-- STORIES COLUMN -->
    <div class="columns is-centered" v-if="!!user && !is_loading">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START STORIES -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Alain's stories</p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
              praesentium esse veritatis nemo!
            </p>

            <!-- ONE STORY -->
            <div class="notification is-warning" style="padding-right:1.5rem;">
              <div class="columns" style="margin-bottom:0;">
                <div class="column is-11">
                  <p
                    class="title is-5"
                  >[DRAFT] Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus, consequatur. Quae modi culpa enim tenetur.</p>
                </div>
                <div class="column" style="margin-bottom:0;">
                  <p class="has-text-right">
                    <router-link
                      class="button is-primary"
                      id="profile-edit-btn"
                      to="/story/xoxoxixi/edit"
                    >
                      <strong>Edit</strong>
                    </router-link>
                  </p>
                </div>
              </div>

              <p class="content">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio saepe error quidem
                facere rerum numquam laborum nesciunt est quod autem, tempore modi aliquid sed.
                Molestias reiciendis dolorum laboriosam earum quis facere libero! Consectetur, enim.
                Deleniti ab doloremque velit consequuntur quia tenetur vel eaque. Dolor harum libero
                eligendi consectetur voluptatem aut?
              </p>
            </div>
            <!-- ONE STORY -->

            <!-- ONE STORY -->
            <div class="notification is-info" style="padding-right:1.5rem;">
              <div class="columns" style="margin-bottom:0;">
                <div class="column is-11">
                  <p
                    class="title is-5"
                  >[PUBLISHED] Lorem ipsum dolor sit amet consectetur adipisicing elit. In nobis tempore aliquam.</p>
                </div>
                <div class="column" style="margin-bottom:0;">
                  <p class="has-text-right">
                    <router-link
                      class="button is-primary"
                      id="profile-edit-btn"
                      to="/story/xoxoxixi/edit"
                    >
                      <strong>Edit</strong>
                    </router-link>
                  </p>
                </div>
              </div>
              <p class="content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ab non vitae
                consequatur eveniet, itaque magni debitis ipsam ad minima! Doloribus veniam cum,
                enim sit repellendus ea molestiae doloremque? Placeat ea aliquid sunt. Nulla, quod
                beatae sapiente consequatur dignissimos labore nisi eos amet facilis, odio nesciunt
                explicabo voluptatem minima voluptatum.
              </p>
            </div>
          </div>
        </div>
        <!-- ENDS STORIES -->
      </div>
    </div>
    <!-- ENDS STORIES COLUMN -->

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
          <router-link :to="{ name: 'user', params: { username: 'sboobi' }}">Sboobi</router-link>
          <br />
          <router-link :to="{ name: 'user', params: { username: 'empty' }}">Empty</router-link>
          <br />
          <router-link :to="{ name: 'user', params: { username: 'emptou' }}">Emptou</router-link>
          <br />
        </div>
      </div>
    </div>
    <!-- END DEBUG -->
  </main>
</template>

<script>
import axiosBase from "../services/axiosBase";
import { mapGetters } from "vuex";
// Private messaging
import MessageComposerModal from "../components/MessageComposerModal.vue";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";

export default {
  data() {
    return {
      user: null,
      is_loading: true,
      is_error: false,
      errorMessage: "",
      is_debug: true,
      //-- messaging --
      messageModalActive: false,
      //-- warnings --
      confirmEmailSent: false
    };
  },
  components: {
    MessageComposerModal
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
      const response = await axiosBase.post(
        `/users/${this.authenticatedUser._key}/send-confirm-email`
      );
      this.confirmEmailSent = true;
      console.log(response);
    },
    nl2p: function(str) {
      return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },
    async fetchData() {
      try {
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axiosBase.get(`/users/${this.username}`);
        // console.log(response.data.user);
        this.user = response.data.user;
        this.is_loading = false;
      } catch (e) {
        this.is_loading = false;
        this.is_error = true;
        if (e.response.status === 404) {
          this.errorMessage = "USER NOT FOUND";
        } else {
          // Most probably a 500
          this.errorMessage = "SERVER ERROR";
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
    ICannotSendMessage: function() {
      return (
        this.authenticatedUser &&
        this.user &&
        !this.authenticatedUser.email_confirmed &&
        this.user._key != this.authenticatedUser._key
      );
    },
    userCannotReceiveMessage: function() {
      return (
        this.authenticatedUser &&
        this.user &&
        !this.user.email_confirmed &&
        this.user._key != this.authenticatedUser._key
      );
    },
    username: function() {
      return this.$route.params.username;
    },
    showEditButton: function() {
      return (
        // this.$store.getters.isAuthenticated &&
        // this.user._key === this.$store.getters.authenticatedUser._key
        this.isAuthenticated && this.user._key === this.authenticatedUser._key
      );
    },
    showMessageButton: function() {
      return (
        // this.$store.getters.isAuthenticated &&
        // this.user._key === this.$store.getters.authenticatedUser._key
        this.isAuthenticated && this.user._key != this.authenticatedUser._key
      );
    },
    profileIsEmpty() {
      // yucky
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
    }
  },
  /*
    https://forum.vuejs.org/t/cant-get-created-hook-to-work-when-its-async/28604/4
    Yes, created is exectued synchonously, but it can still contain asynchonous code
    Vue just won’t wait for it to finish, wether or not w use async-await, Promises or something else.
    But if you want to use await inside of created, then adding the async keyword is required and will work fine.
  */
  // tested with timeout ok but ugly - refacor
  created() {
    this.fetchData();
  },
  ////////////////////////////////////////////////////////////
  // Almost idem below but fucks up on 404
  // Watch updates url in nav bar, beforeRouteUpdate doesn't
  ////////////////////////////////////////////////////////////
  // async beforeRouteUpdate(to, from, next) {
  //   // react to route changes...
  //   // don't forget to call next()
  //   // because it is same component lifecycle events are not called
  //   console.log("#--- BEFORE ROUTE UPDATE --#");
  //   console.log(to.params.username);
  //   try {
  //     const response = await axiosBase.get(`/users/${to.params.username}`);
  //     // console.log(response);
  //     this.user = response.data.user;
  //     this.is_loading = false;
  //     this.is_error = false;
  //     next();
  //   } catch (e) {
  //     this.is_loading = false;
  //     this.is_error = true;
  //     this.user = null;
  //     if (e.response.status === 404) {
  //       this.errorMessage = "USER NOT FOUND";
  //     } else {
  //       // Most probably a 500
  //       this.errorMessage = "SERVER ERROR";
  //     }
  //   }
  // }
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      // react to route changes...
      console.log("#--- BEFORE ROUTE UPDATE --#");
      console.log(to.params.username);
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
          if (e.response.status === 404) {
            this.errorMessage = "USER NOT FOUND";
          } else {
            // Most probably a 500
            this.errorMessage = "SERVER ERROR";
          }
        });
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
.content h5 {
  margin-bottom: 0.5rem;
}

/*************** errors  *************/
.isError {
  color: red;
}
/************** spinner **************/
.loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/***************** warnings **************/

/****************** v-html ***********/
div.ta-html br {
  display: block;
  margin-top: 2px;
  content: " ";
}
</style>