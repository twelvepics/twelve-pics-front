<template>
    <main>
        <div class="columns is-centered">
            <!-- CENTER COLUMNN -->
            <div class="column is-half-desktop">
                <!-- START FORM -->
                <div class="card" style="margin-top:50px;">
                    <!-- CARD CONTENT -->
                    <div class="card-content" v-if="preCheckRunning || !requestCheckedValid">
                        <p :class="{ isError: !requestCheckedValid }">{{ topMessage }}</p>
                    </div>
                    <div class="card-content" v-else>
                        <form @submit.prevent="onSubmit" novalidate>
                            <p class="title is-size-5">Reset your password</p>
                            <p
                                class="subtitle is-size-6 isError"
                                style="margin-bottom:0 !important"
                                v-if="apiErrors && apiErrors === 'SERVER ERROR'"
                            >
                                SERVER ERROR - SORRY
                            </p>
                            <p
                                class="subtitle is-size-6 isError"
                                style="margin-bottom:0 !important"
                                v-if="apiErrors && apiErrors === 'NOT FOUND'"
                            >
                                COULDN'T FIND THIS REQUEST - SORRY
                            </p>
                            <p
                                class="subtitle is-size-6 isError"
                                style="margin-bottom:0 !important"
                                v-else-if="apiErrors && apiErrors === 'GONE'"
                            >
                                RESET REQUEST EXPIRED - SORRY
                            </p>
                            <p class="subtitle is-size-6 isDone" style="margin-bottom:0 !important" v-else-if="done">
                                YOUR PASSWORD HAS BEEN SUCCESSFULLY UPDATED
                            </p>
                            <p v-else class="subtitle is-size-6" style="margin-bottom:0 !important">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis!
                            </p>
                            <!-- PASSWORD -->
                            <div class="field" style="margin-top:20px;">
                                <label class="label is-marginless">
                                    New password
                                    <span class="content is-small" style="color:red;" v-if="$v.password.$error"
                                        >Password should be 5 to 16 character</span
                                    >
                                    <span
                                        class="content is-small"
                                        style="color:red;"
                                        v-else-if="
                                            apiErrors &&
                                                apiErrors.hasOwnProperty('password') &&
                                                apiErrors.password !== null
                                        "
                                        >{{ apiErrors.password }}</span
                                    >
                                </label>
                                <div class="control" style="max-width: 500px;">
                                    <input
                                        class="input"
                                        :class="{ 'is-danger': $v.password.$error }"
                                        type="password"
                                        placeholder="New password"
                                        v-model="password"
                                        :readonly="done"
                                        @blur="$v.password.$touch()"
                                        @keydown.enter.prevent
                                        @input="resetApiError('password')"
                                    />
                                </div>
                            </div>
                            <!-- PASSWORD -->

                            <!-- CONFIRM PASSWORD -->
                            <div class="field" style="margin-top:20px;">
                                <label class="label is-marginless">
                                    Confirm password
                                    <span class="content is-small" style="color:red;" v-if="$v.repeat_password.$error"
                                        >Password and password confirm don't match</span
                                    >
                                    <span
                                        class="content is-small"
                                        style="color:red;"
                                        v-else-if="
                                            apiErrors &&
                                                apiErrors.hasOwnProperty('repeat_password') &&
                                                apiErrors.repeat_password !== null
                                        "
                                        >Password and password confirm don't match</span
                                    >
                                </label>
                                <div class="control" style="max-width: 500px;">
                                    <input
                                        class="input"
                                        :class="{ 'is-danger': $v.repeat_password.$error }"
                                        type="password"
                                        placeholder="Confirm your password"
                                        v-model="repeat_password"
                                        :readonly="done"
                                        @blur="$v.repeat_password.$touch()"
                                        @keydown.enter.prevent
                                        @input="resetApiError('repeat_password')"
                                    />
                                </div>
                            </div>
                            <!-- CONFIRM PASSWORD -->

                            <!-- SUBMIT -->
                            <div class="is-divider" style="margin-top:35px;"></div>
                            <div class="field is-grouped submit-buttons">
                                <div class="control">
                                    <button class="button is-primary" :disabled="$v.$invalid || done">Save</button>
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
import axiosBase from "../services/axiosBase";
import { required, minLength, maxLength, sameAs } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            password: "",
            repeat_password: "",
            apiErrors: null,
            done: false,
            errorMessage: "",
            preCheckRunning: true,
            requestCheckedValid: true,
            topMessage: "Verifying request..."
        };
    },
    created() {
        console.log("CREATED");
        this.checkRequestValid();
    },
    computed: {
        reset_id: function() {
            return this.$route.params.reset_id;
        }
    },
    methods: {
        async checkRequestValid() {
            console.log("CHECK REQUEST IS VALID");
            try {
                const response = await axiosBase.get(`/auth/reset-password/${this.reset_id}`);
                this.preCheckRunning = false;
                return response;
            } catch (e) {
                this.preCheckRunning = false;
                this.requestCheckedValid = false;
                this.topMessage = "RESET REQUEST IS EXPIRED OR INVALID - SORRY";
                console.log(e.response);
            }
        },
        async onSubmit() {
            this.apiErrors = null;
            this.errors;
            try {
                const response = await axiosBase.post(`/auth/reset-password/${this.reset_id}`, {
                    password: this.password,
                    repeat_password: this.repeat_password
                });
                // const data = response.data;
                // console.log(data);
                // console.log(status);
                if (response.status === 200) {
                    this.done = true;
                    console.log("OK DONE");
                }
            } catch (e) {
                // console.log(e.response.status);
                // console.log(e.response.data);
                if (e.response.data.error_type === "INVALID_PASSWORDS_ERROR") {
                    // validation error
                    this.apiErrors = e.response.data.errors;
                    // console.log("------------------------------------");
                    // console.log("VALIDATION ERROR");
                    // console.log(this.apiErrors);
                    // console.log("------------------------------------");
                } else {
                    // request error
                    this.apiErrors = e.response.data.error;
                }
                // this.loading = false;
            }
        },
        resetApiError(field) {
            // console.log("===============");
            // console.log(field);
            // console.log("===============");
            if (this.apiErrors !== null && this.apiErrors.hasOwnProperty(field) && this.apiErrors[field] !== null) {
                this.apiErrors[field] = null;
            }
        }
    },
    validations: {
        password: {
            required,
            minLen: minLength(5),
            maxLen: maxLength(16)
        },
        repeat_password: {
            sameAs: sameAs(vm => {
                return vm.password;
            })
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

/************ form  *************/
.isError,
.label.isError {
    color: red;
}
.isDone {
    color: rgb(9, 122, 37);
}
</style>
