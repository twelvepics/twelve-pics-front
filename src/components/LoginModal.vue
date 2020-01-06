<template>
    <!-- LOGIN MODAL -->
    <div class="modal" id="login-modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <form class="message" @submit.prevent="onSubmit" novalidate>
                <div class="message-header">
                    <p class="is-1">Sign in</p>
                    <button class="delete is-medium" id="login-close" @click.prevent="closeLoginModal"></button>
                </div>
                <div style="color:red;font-size:93%;text-align:center;padding:.5rem 0 0 0;line-height:90%;">
                    <span v-if="apiError && apiError === 'WRONG CREDENTIALS'">INVALID CREDENTIALS</span>
                    <span v-else-if="apiError && apiError === 'SERVER ERROR'">SERVER ERROR</span>
                    <span v-else>&nbsp;</span>
                </div>
                <div class="message-body" style="padding-top:0;">
                    <div class="field">
                        <label class="label" :class="{ isError: $v.user.usernameOrEmail.$error }">
                            Username or email:
                            <span class="content is-small" style="color:red;" v-if="$v.user.usernameOrEmail.$error"
                                >Enter your username or email address</span
                            >
                        </label>

                        <div class="control">
                            <input
                                class="input"
                                :class="{ 'is-danger': $v.user.usernameOrEmail.$error }"
                                type="text"
                                placeholder="Enter your username or Email address"
                                v-model="user.usernameOrEmail"
                                @blur="$v.user.usernameOrEmail.$touch()"
                                @input="resetApiError()"
                                @keydown.enter.prevent
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" :class="{ isError: $v.user.password.$error }">
                            Password:
                            <span class="content is-small" style="color:red;" v-if="$v.user.password.$error"
                                >Enter your password</span
                            >
                        </label>
                        <div class="control">
                            <input
                                class="input"
                                :class="{ 'is-danger': $v.user.password.$error }"
                                type="password"
                                placeholder="Enter your password"
                                v-model="user.password"
                                @blur="$v.user.password.$touch()"
                                @input="resetApiError()"
                                @keydown.enter.prevent
                            />
                        </div>
                    </div>
                    <div class="field rem-rec">
                        <div>
                            <label class="checkbox">
                                <input type="checkbox" v-model="user.rememberMe" @keydown.enter.prevent />
                                Remember me
                            </label>
                        </div>
                        <div>
                            <a @click.prevent="openRecoverPasswordModal">Recover my password</a>
                        </div>
                    </div>

                    <div class="field is-grouped submit-buttons">
                        <div class="control">
                            <button type="submit" class="button is-primary" :disabled="$v.$invalid">Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-light" @click.prevent="closeLoginModal">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!--
<button class="modal-close is-large" id="login-close"></button>
  -->
    <!-- END LOGIN MODAL -->
</template>
<script>
import { EventBus } from "../event-bus.js";
import { required } from "vuelidate/lib/validators";
import * as Sentry from "@sentry/browser";

export default {
    data() {
        return {
            user: {
                usernameOrEmail: "",
                password: "",
                rememberMe: true
            },
            apiError: null,
            loading: false
        };
    },
    props: ["isActive"],
    methods: {
        closeLoginModal() {
            // console.log(e);
            this.resetForm();
            this.$emit("loginModalClosed", this.isActive);
        },
        openRecoverPasswordModal(e) {
            console.log(e);
            this.resetForm();
            this.$emit("openRecoverPasswordModal", this.isActive);
        },
        resetForm() {
            this.apiError = null;
            this.loading = false;
            this.user.usernameOrEmail = "";
            this.user.password = "";
            this.$v.user.$reset();
        },
        resetApiError() {
            if (this.apiError !== null) {
                this.apiError = null;
            }
        },
        async onSubmit() {
            this.apiError = null;
            this.loading = true;
            const userData = {
                login: this.user.usernameOrEmail,
                password: this.user.password,
                rememberMe: this.user.rememberMe
            };
            try {
                await this.$store.dispatch("login", userData);
                this.closeLoginModal();
                if (this.$router.currentRoute.name === "home") {
                    EventBus.$emit("login");
                } else {
                    this.$router.push({ name: "home" });
                }
            } catch (e) {
                // this.apiError = e;
                if (e.response) {
                    console.log(e.response.status);
                    console.log(e.response.data);
                    this.apiError = e.response.data.error;
                } else {
                    console.log(e);
                    Sentry.captureException(e);
                }
                this.loading = false;
            }
        }
    },
    validations: {
        user: {
            usernameOrEmail: {
                required
            },
            password: {
                required
            }
        }
    }
};
</script>

<style scoped>
label.label {
    margin-bottom: 0.3rem !important;
}

.label.isError {
    color: red;
}
.field {
    margin-bottom: 1rem !important;
}
.rem-rec {
    display: flex;
    justify-content: space-between;
}
.submit-buttons {
    margin-top: 10px;
}
.button.is-light {
    background-color: #cccccc;
    font-weight: bold;
}
</style>
