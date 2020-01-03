<template>
    <main>
        <div class="columns is-centered">
            <div class="column is-three-quarters-desktop">
                <div class="card">
                    <!-- CARD CONTENT OK-->
                    <div class="card-content" v-if="emailConfirmed" style="text-align: center;">
                        <p class="title is-size-5 isSuccess">Your email is now confirmed. Thank you!</p>
                    </div>
                    <!-- END CARD CONTENT OK -->
                    <!-- CARD CONTENT NOK-->
                    <div class="card-content" v-if="isError">
                        <p class="title is-size-5 isError">We couldn't confirm this email address. Please try again</p>
                        <p class="subtitle is-size-6 isError">
                            {{ errorMessage }}
                            <br />
                            <span v-if="isAuthenticated && errorStatus === 404 && !confirmEmailSent">
                                <u>
                                    <a @click.prevent="sendConfirmEmail">Resend confirmation email</a>
                                </u>
                            </span>
                            <span v-if="isAuthenticated && errorStatus === 404 && confirmEmailSent"
                                >Email sent. Please check your mail box</span
                            >
                        </p>
                    </div>
                    <!-- END CARD CONTENT NOK -->
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axiosBase from "../services/axiosBase";
import { mapGetters } from "vuex";
import * as Sentry from "@sentry/browser";

export default {
    name: "validateEmail",
    data() {
        return {
            emailConfirmed: false,
            isError: false,
            errorMessage: "My error message",
            errorStatus: null,
            isLoading: true,
            confirmEmailSent: false
        };
    },
    methods: {
        async checkRequest() {
            this.isLoading = true;
            try {
                await axiosBase.post(`/users/validate-email/${this.validate_id}`);
                this.isLoading = false;
                this.emailConfirmed = true;
                this.isError = false;
                // If auth user update store
                if (this.isAuthenticated) {
                    this.$store.commit("setEmailConfirmed");
                }
            } catch (e) {
                this.isLoading = false;
                this.emailConfirmed = false;
                this.isError = true;
                if (e.response) {
                    this.errorStatus = e.response.status;
                    if (this.errorStatus === 404) {
                        this.errorMessage = "Could not find this email confirmation request";
                    } else {
                        this.errorMessage = "Server error, working on it. Please try again later";
                    }
                } else {
                    console.log(e);
                    Sentry.captureException(e);
                }
            }
        },
        async sendConfirmEmail() {
            const response = await axiosBase.post(`/users/${this.authenticatedUser._key}/send-confirm-email`);
            this.confirmEmailSent = true;
            console.log(response);
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "authenticatedUser"]),
        validate_id: function() {
            return this.$route.params.validate_id;
        }
    },
    /*
    https://forum.vuejs.org/t/cant-get-created-hook-to-work-when-its-async/28604/4
    Yes, created is exectued synchonously, but it can still contain asynchonous code
    Vue just won’t wait for it to finish, wether or not w use async-await, Promises or something else.
    But if you want to use await inside of created, then adding the async keyword is required and will work fine.
  */
    created() {
        this.checkRequest();
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
.isError,
.isError a {
    color: red;
}
.isSuccess {
    color: rgb(18, 197, 33);
}
</style>
