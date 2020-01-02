<template>
    <!-- DESKTOP NAVBAR -->

    <!--  -->
    <nav
        class="navbar is-dark is-fixed-top box-shadow"
        :style="[isStoryComponentMounted ? { paddingRight: '15px' } : { paddingRight: '0' }]"
    >
        <transition name="fade">
            <toast
                v-show="show_toast"
                :duration="toast_duration"
                :type="toast_type"
                :show="show_toast"
                :closeToast="closeToast"
            >
                {{ toast_message_l1 }}
                <br />
                {{ toast_message_l2 }}
            </toast>
        </transition>
        <div class="navbar-brand">
            <div class="navbar-item" style="padding-bottom:0">
                <router-link to="/">
                    <img src="/img/logo.png" alt="12 pics logo" />
                </router-link>
            </div>
            <a
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="12PicsHomeNavBarDesktop"
                is-active
                @click="toggleBurgerDropdown"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="12PicsHomeNavBarDesktop" class="navbar-menu" :class="{ 'is-active': showBurgerDropdown }">
            <div class="navbar-start" style="flex-grow:1; justify-content: center;">
                <div class="navbar-item" style="flex-grow: 1;justify-content: flex-end;margin-right:18px;">
                    <div id="filter-categories-lnk" class="nav-lnk" @click="openModal('categories')">
                        <a>
                            <span class="fa-icon-pr4">
                                <font-awesome-icon icon="list"></font-awesome-icon>
                            </span>
                            Filter categories
                        </a>
                    </div>
                </div>
                <div class="navbar-item" style="flex-grow:2;">
                    <!-- <div class="field-body">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="Search"
                  style="flex-grow: 1;max-width:350px;"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="search" color="#666"></font-awesome-icon>
                </span>
              </p>
            </div>
          </div>-->
                    <!-- -->
                    <div class="field has-addons">
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="Search stories"
                                style="flex-grow: 1;min-width:300px;max-width:350px;"
                                @keydown.enter.prevent="searchSubmit"
                                v-model="searchStories"
                            />
                        </div>
                        <div class="control">
                            <a class="button is-primary" @click="searchSubmit">
                                <span class="icon is-small is-left">
                                    <font-awesome-icon icon="search"></font-awesome-icon>
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- -->
                </div>
            </div>
            <div class="navbar-end">
                <!-- BUTTONS-->
                <div class="navbar-item">
                    <div class="buttons">
                        <!-- <router-link
              class="button is-primary"
              id="post-story-btn"
              to="/story/create"
              v-if="isAuthenticated"
              @click.native="resetCreateForm"
            ></router-link>-->
                        <button
                            class="button is-primary"
                            id="post-story-btn"
                            @click="goToCreateStory"
                            v-if="isAuthenticated"
                            :disabled="isCreateStoryForm || isEditStoryForm"
                        >
                            <strong>Post a story</strong>
                        </button>
                        <!-- <a
              class="button is-primary"
              id="post-story-btn"
              @click="goToCreateStory"
              v-if="isAuthenticated"
              :disabled="isCreateStoryForm || isEditStoryForm"
            >
              <strong>Post a story</strong>
            </a>-->
                        <a
                            class="button is-primary"
                            id="signup-btn"
                            @click="openModal('signup')"
                            v-if="!isAuthenticated"
                        >
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light" id="login-btn" @click="openModal('login')" v-if="!isAuthenticated"
                            >Sign in</a
                        >
                    </div>
                </div>
                <!-- END BUTTONS-->
                <!-- DROP DOWN-->
                <div
                    class="navbar-item has-dropdown mr15 ml10"
                    :class="{ 'is-active': dropdownVisible }"
                    id="navbar-dropdown"
                >
                    <a class="navbar-link" id="navbar-link" @click="toggleDropdown">
                        <span v-if="isAuthenticated">Hi {{ authenticatedUser.username }}</span>
                        <span v-else>Hi there</span>
                    </a>
                    <div class="navbar-dropdown is-right is-boxed" @mouseleave="hideDropdown()">
                        <router-link
                            v-if="isAuthenticated"
                            class="navbar-item"
                            :to="{ name: 'user', params: { username: authenticatedUser.username } }"
                            exact
                            exact-active-class="is-active"
                            @click.native="hideDropdown()"
                        >
                            <span class="fa-icon-pr7">
                                <font-awesome-icon icon="user"></font-awesome-icon>
                            </span>
                            <span>My profile</span>
                        </router-link>

                        <router-link
                            v-if="isAuthenticated"
                            class="navbar-item"
                            :to="{ name: 'user-stories', params: { username: authenticatedUser.username } }"
                            exact
                            exact-active-class="is-active"
                            @click.native="hideDropdown()"
                        >
                            <span class="fa-icon-pr7">
                                <font-awesome-icon icon="user"></font-awesome-icon>
                            </span>
                            <span>My stories</span>
                        </router-link>
                        <!-- SETTINGS LATER -->
                        <!-- <router-link
                v-if="isAuthenticated"
                class="navbar-item"
                :to="`/user/${authenticatedUser.username}/settings`"
                active-class="is-active"
                exact
                @click.native="hideDropdown()"
                >
                <span class="fa-icon-pr7">
                    <font-awesome-icon icon="cog"></font-awesome-icon>
                </span>
                <span>Settings</span>
            </router-link>-->
                        <!-- SETTINGS LATER -->
                        <a v-if="isAuthenticated" class="navbar-item" @click.prevent="logout()">
                            <span class="fa-icon-pr7">
                                <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
                            </span>
                            <span>Logout</span>
                        </a>
                        <hr class="navbar-divider" v-if="isAuthenticated" />
                        <router-link
                            class="navbar-item"
                            to="/contact"
                            active-class="is-active"
                            @click.native="hideDropdown()"
                        >
                            <span class="fa-icon-pr7">
                                <font-awesome-icon icon="envelope"></font-awesome-icon>
                            </span>
                            <span>Contact us</span>
                        </router-link>
                        <router-link
                            class="navbar-item"
                            to="/about"
                            active-class="is-active"
                            @click.native="hideDropdown()"
                        >
                            <span class="fa-icon-pr7">
                                <font-awesome-icon icon="question"></font-awesome-icon>
                            </span>
                            <span>About 12 pics</span>
                        </router-link>
                        <hr class="navbar-divider" />
                        <div class="navbar-item">Version 0.0.1</div>
                    </div>
                </div>
                <!-- END DROP DOWN-->
            </div>
        </div>
        <login-modal
            :isActive="currentModal === 'login'"
            @loginModalClosed="closeModal"
            @openRecoverPasswordModal="closeLoginModalAndOpenRecoverModal"
        ></login-modal>
        <signup-modal
            :isActive="currentModal === 'signup'"
            @signupModalClosed="closeModal"
            @toastPostSignupSuccess="toastPostSignupSuccess"
        ></signup-modal>
        <categories-modal
            :isActive="currentModal === 'categories'"
            @categoriesModalClosed="closeModal"
        ></categories-modal>
        <recover-modal :isActive="currentModal === 'recover'" @recoverModalClosed="closeModal"></recover-modal>
    </nav>
    <!-- END DESKTOP NAVBAR -->
</template>

<script>
//////////////////////////////////////////////////////////////////////////
// A lot happens in this navbar
// * Modals:
//     - login modal X
//        - recover password modal
//     - signup modal X
//     - categories modal
// * Search
// * Buttons
//     - login button X
//     - signup button X
//     - post story button X
// * Menu
//     - View profile X
//     - Settings view/edit X
//     - logout X
//     - contact us X
//     - About page X
////////////////////////////////////////////////////////////////////////////

// import { CommonBands } from "vue-media-queries";
// const bulmaBands = CommonBands.Bulma;
import { mapGetters } from "vuex";
import { EventBus } from "../event-bus.js";

import Toast from "../components/Toast.vue";

import LoginModal from "./LoginModal.vue";
import SignupModal from "./SignupModal.vue";
import RecoverModal from "./RecoverModal.vue";
import CategoriesModal from "./CategoriesModal.vue";

import { lockBgScroll, unlockBgScroll } from "../utils/utils";

const SIGNUP_MESSAGE_L1 = "Thank you for registering! Please confirm your email address. ";
const SIGNUP_MESSAGE_L2 = "We have sent you a confirmation request email. Check your inbox.";
export default {
    name: "Header",
    // mixins: [bulmaBands.mixin]
    components: {
        LoginModal,
        SignupModal,
        RecoverModal,
        CategoriesModal,
        Toast
    },
    data: function() {
        return {
            searchStories: "",
            dropdownVisible: false,
            showBurgerDropdown: false,
            currentModal: null,
            // top toast
            toast_message_l1: "",
            toast_message_l2: "",
            toast_type: "",
            toast_duration: 6000,
            show_toast: false
        };
    },
    methods: {
        // dropdown
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        hideDropdown() {
            if (this.dropdownVisible === true) {
                this.dropdownVisible = false;
            }
        },
        // burger - mobile
        toggleBurgerDropdown() {
            this.showBurgerDropdown = !this.showBurgerDropdown;
        },
        openModal(modal) {
            lockBgScroll();
            this.currentModal = modal;
        },
        closeModal() {
            unlockBgScroll();
            this.currentModal = null;
        },
        closeLoginModalAndOpenRecoverModal() {
            this.currentModal = null;
            this.currentModal = "recover";
        },
        // logout - call store logout
        async logout() {
            await this.$store.dispatch("logout");
            this.hideDropdown();
            this.$router
                .push({
                    name: "home"
                })
                .catch(err => {
                    if (err.name != "NavigationDuplicated") {
                        throw err;
                    }
                });
        },

        // if button not disabled
        // clear create form cache
        async goToCreateStory() {
            await this.$store.dispatch("clearCreateFormCache");
            this.$router.push({
                name: "create-story"
            });
        },
        async searchSubmit() {
            // this.searchStories = "";
            if (this.searchStories.trim().length) {
                // console.log("searchSubmit");
                // console.log(this.searchStories);
                EventBus.$emit("searchTriggered", this.searchStories);
                // this.searchStories = this.$route.query.q;
                // this.searchStories = "";
            }
        },
        //////////////////////////////////
        // Toaster
        //////////////////////////////////
        closeToast() {
            console.log("F I was called");
            this.show_toast = false;
            this.toast_message_l1 = "";
            this.toast_message_l2 = "";
            this.toast_type = "";
        },
        toastPostSignupSuccess() {
            this.show_toast = true;
            this.toast_message_l1 = SIGNUP_MESSAGE_L1;
            this.toast_message_l2 = SIGNUP_MESSAGE_L2;
            this.toast_type = "is-success";
        }
        ///////////////////////////
    },
    computed: {
        // style scrollbar hidden when story is mounted
        ...mapGetters(["isStoryComponentMounted", "isAuthenticated", "authenticatedUser"]),
        isCreateStoryForm: function() {
            return this.$route.name === "create-story";
        },
        isEditStoryForm: function() {
            return this.$route.name === "edit-story";
        }
    },
    watch: {
        // eslint-disable-next-line
        $route(to, from) {
            console.log("HEADER XOXO");
            console.log(to);
            if (to.name === "home") {
                this.searchStories = "";
            }
        }
    }
};
</script>

<style scoped>
/** NAVBAR **/
.navbar-item img {
    max-height: none;
}

.nav-lnk a {
    color: #ddd;
}

.nav-lnk a:hover {
    color: #fff;
}

.box-shadow {
    box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.5);
    width: 100%;
}

.navbar.is-dark .navbar-dropdown a.navbar-item.is-active {
    background-color: #bbb;
}

.navbar .button[disabled] {
    opacity: 0.7;
    cursor: default;
}
/** END NAVBAR **/
</style>
