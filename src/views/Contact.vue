<template>
    <main>
        <div class="columns is-centered">
            <!-- CENTER COLUMNN -->
            <div class="column is-three-quarters-desktop">
                <!-- TOAST USED FOR form errors and deleted -->
                <transition name="fade">
                    <toast
                        v-show="show_toast"
                        :duration="toast_duration"
                        :type="toast_type"
                        :show="show_toast"
                        :closeToast="closeToast"
                        >{{ toast_message }}</toast
                    >
                </transition>
                <!-- LOADER -->
                <page-loader v-if="is_loading"></page-loader>
                <!-- ERRORS  -->
                <page-error v-if="is_api_error" :errorMessage="apiErrorMessage"></page-error>

                <!-- START FORM -->
                <div class="card">
                    <!-- CARD CONTENT -->
                    <div class="card-content">
                        <form @submit.prevent="onSubmit">
                            <fieldset :disabled="done">
                                <p class="title is-size-4">Contact us</p>
                                <p class="subtitle is-size-6">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
                                    praesentium esse veritatis nemo!
                                </p>
                                <!-- EMAIL -->
                                <div class="field m-30-0-15-0">
                                    <label class="label is-marginless">Your Email</label>
                                    <p class="content is-small is-marginless pb-05">
                                        <span style="color:red;" v-if="$v.message.from_user_email.$error"
                                            >Enter a valid email address</span
                                        >
                                        <span v-else
                                            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                                            accusamus!</span
                                        >
                                    </p>
                                    <div class="control" style="max-width: 500px;">
                                        <input
                                            class="input"
                                            type="email"
                                            :class="{ 'is-danger': $v.message.from_user_email.$error }"
                                            placeholder="Your email address"
                                            v-model="message.from_user_email"
                                            @blur="$v.message.from_user_email.$touch()"
                                            @keydown.enter.prevent
                                        />
                                    </div>
                                </div>
                                <!-- EMAIL -->

                                <!-- SUBJECT -->
                                <div class="field m-30-0-15-0">
                                    <label class="label is-marginless">Subject</label>
                                    <p class="content is-small is-marginless pb-05">
                                        <span style="color:red;" v-if="$v.message.subject.$error"
                                            >Subject is required and must be max 128 Characters</span
                                        >
                                        <span v-else
                                            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                                            accusamus!</span
                                        >
                                    </p>
                                    <div class="control">
                                        <input
                                            class="input"
                                            type="textt"
                                            placeholder="Subject"
                                            v-model="message.subject"
                                            @blur="$v.message.subject.$touch()"
                                            @keydown.enter.prevent
                                        />
                                    </div>
                                </div>
                                <!-- SUBJECT -->

                                <!-- MSG BODY -->
                                <div class="field m-30-0-15-0">
                                    <label class="label is-marginless">Your message</label>
                                    <p class="content is-small is-marginless pb-05">
                                        <span style="color:red;" v-if="$v.message.body.$error"
                                            >Message text is required and must be max 4096 Characters</span
                                        >
                                        <span v-else
                                            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                                            accusamus!</span
                                        >
                                    </p>
                                    <div class="control">
                                        <textarea
                                            class="textarea"
                                            placeholder="Your message"
                                            v-model="message.body"
                                            @blur="$v.message.body.$touch()"
                                        ></textarea>
                                    </div>
                                </div>
                                <!-- ABOUT ME -->
                            </fieldset>
                            <!-- SUBMIT -->
                            <div class="is-divider" style="margin-top:35px;"></div>
                            <div class="field is-grouped submit-buttons">
                                <div class="control">
                                    <button class="button is-primary" :disabled="done || is_sending || $v.$invalid">
                                        Send
                                    </button>
                                </div>
                                <div class="control">
                                    <button class="button is-dark" @click.prevent="goBack">
                                        {{ done ? "Back" : "Cancel" }}
                                    </button>
                                </div>
                            </div>
                            <!-- SUBMIT -->
                            <div style="margin-top:25px;"></div>
                        </form>
                    </div>
                    <!-- END CARD CONTENT -->
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import axiosBase from "../services/axiosBase";
import { required, email, maxLength } from "vuelidate/lib/validators";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import Toast from "../components/Toast.vue";
import * as Sentry from "@sentry/browser";

export default {
    components: {
        PageError,
        PageLoader,
        Toast
    },
    data() {
        return {
            is_debug: true,
            done: false,
            is_loading: false,
            // api submit errors
            is_api_error: false,
            apiErrorMessage: "",
            // send
            is_sending: false,
            // message
            message: {
                type: "contact",
                from_user_email: "",
                subject: "",
                body: "",
                user_key: (this.isAuthenticated && this.authenticatedUser._key) || ""
            },
            // toast
            toast_message: "",
            toast_type: "",
            toast_duration: 4000,
            show_toast: false
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async onSubmit() {
            // this.is_api_error = false;
            // this.apiErrorMessage = "";
            this.is_sending = true;

            // console.log(message);
            try {
                // console.log(this.message);
                await axiosBase.post(`/users/send-contact-message`, {
                    message: this.message
                });
                this.done = true;
                this.is_sending = false;
                this.is_api_error = false;
                this.apiErrorMessage = "";
                this.toastSuccess();
                console.log("DONE");
            } catch (e) {
                this.sending = false;
                if (e.response) {
                    // console.log(e.response);
                    this.is_api_error = true;
                    if (e.response.status === 400) {
                        this.apiErrorMessage = "INVALID FORM";
                    } else {
                        // 500
                        this.apiErrorMessage = "SERVER ERROR";
                    }
                    this.is_sending = false;
                } else {
                    console.log(e);
                    Sentry.captureException(e);
                }
            }
        },
        resetApiError() {
            this.is_api_error = false;
            this.apiErrorMessage = "";
        },
        resetForm() {
            this.message.subject = "";
            this.message.body = "";
            this.message.from_user_email = "";
            this.$v.$reset();
            this.is_sending = false;
            this.done = false;
            this.is_api_error = null;
            this.apiErrorMessage = "";
        },
        //////////////////////////////////
        // Toaster
        //////////////////////////////////
        closeToast() {
            // console.log("F I was called");
            this.show_toast = false;
            this.toast_message = "";
            this.toast_type = "";
        },
        toastSuccess() {
            this.show_toast = true;
            this.toast_message = "Your message has been successfully sent. We will contact you very soon!";
            this.toast_type = "is-success";
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "authenticatedUser", "getCreateFormCache"])
    },
    created() {
        // I don't store user email in vuex, fetch user and get his email
        // if (this.isAuthenticated) {
        //   this.fetchUser();
        // }
    },
    validations: {
        message: {
            from_user_email: {
                required,
                email
            },
            subject: {
                required,
                maxLen: maxLength(128)
            },
            body: {
                required,
                maxLen: maxLength(4096)
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
    margin-top: 90px;
}

footer {
    margin-top: 30px;
}

/************** spacing ***********/
.content h5 {
    margin-bottom: 0.5rem;
}
</style>
