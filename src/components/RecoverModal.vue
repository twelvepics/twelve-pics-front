<template>
    <!-- RECOVER MODAL -->
    <div class="modal" id="recover-modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <form class="message" @submit.prevent="onSubmit" novalidate>
                <div class="message-header">
                    <p>Recover My password</p>
                    <button class="delete is-medium" id="recover-close" @click.prevent="closeRecoverModal"></button>
                </div>
                <div class="message-body">
                    <p v-if="initMessage && !$v.emailOrUsername.$error" style="font-size:85%">
                        Please enter your username down below in order to be able to get a new password.
                    </p>
                    <p v-if="found" style="font-size:85%">
                        An email has been sent to the email address you provided during registration.
                    </p>
                    <p v-if="apiError" class="isError" style="font-size:85%">{{ errorMessage }}</p>
                    <p v-if="$v.emailOrUsername.$error" class="isError" style="font-size:85%">
                        Enter your username or email address
                    </p>
                    <div class="field">
                        <label class="label is-size-6 mt10">Your username or email address</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                v-model="emailOrUsername"
                                :readonly="found"
                                @blur="$v.emailOrUsername.$touch()"
                                @input="resetApiError()"
                                @keydown.enter.prevent
                            />
                        </div>
                    </div>
                    <div v-if="found" class="field is-grouped submit-buttons">
                        <div class="control">
                            <button class="button is-primary" @click.prevent="closeRecoverModal">Dismiss</button>
                        </div>
                    </div>
                    <div v-else class="field is-grouped submit-buttons">
                        <div class="control">
                            <button class="button is-primary" :disabled="$v.$invalid">Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-dark" @click.prevent="closeRecoverModal">Cancel</button>
                        </div>
                    </div>
                    <!-- <div>{{ $v }}</div> -->
                </div>
            </form>
        </div>
    </div>
    <!-- END RECOVER MODAL -->
</template>

<script>
import axiosBase from "../services/axiosBase";
import { required } from "vuelidate/lib/validators";
import * as Sentry from "@sentry/browser";

export default {
    data() {
        return {
            emailOrUsername: "",
            apiError: null,
            found: false,
            initMessage: true,
            errorMessage: ""
        };
    },
    props: ["isActive"],
    methods: {
        closeRecoverModal() {
            this.resetForm();
            this.$emit("recoverModalClosed", this.isActive);
        },
        resetForm() {
            this.emailOrUsername = "";
            this.initMessage = true;
            this.apiError = false;
            this.found = false;
            this.$v.emailOrUsername.$reset();
        },
        resetApiError() {
            if (this.apiError !== null) {
                this.apiError = null;
                this.initMessage = true;
            }
        },
        async onSubmit() {
            this.loading = true;
            this.initMessage = true;
            this.apiError = false;
            this.found = false;
            try {
                const response = await axiosBase.post("/auth/reset-password", {
                    emailOrUsername: this.emailOrUsername
                });
                if (response.status === 200) {
                    this.initMessage = false;
                    this.found = true;
                }
                // this.closeRecoverModal();
            } catch (e) {
                this.initMessage = false;
                this.apiError = true;
                if (e.response) {
                    if (e.response.status === 404) {
                        this.errorMessage = "Sorry could not find you in our database.";
                    } else if (e.response.status === 500) {
                        this.errorMessage = "A server error happened. Please try again later";
                    }
                } else {
                    console.log(e);
                    Sentry.captureException(e);
                }
            }
        }
    },
    validations: {
        emailOrUsername: {
            required
        }
    }
};
</script>
<style scoped>
.mt10 {
    margin-top: 10px;
}
.submit-buttons {
    margin-top: 25px;
}
.isError {
    color: red;
}
</style>
