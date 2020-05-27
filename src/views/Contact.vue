<template>
  <main>
    <div class="container is-fluid narrow-container">
      <div class="columns is-centered" style="margin:0;padding:0;">
        <!-- CENTER COLUMNN -->
        <div class="column">
          <toast v-show="showToast" :closeToast="closeToast" :toastType="toastType">
            <template v-slot:default>
              <div v-html="toastMessageJoined"></div>
            </template>
          </toast>
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
                  <p class="content">
                    Any question, suggestion? You want to give us your feedback about the site? Do not
                    hesitate to contact us.
                  </p>
                  <!-- EMAIL -->
                  <div class="field form-item">
                    <label class="label is-marginless">Your Email</label>
                    <p class="content is-small is-marginless pb-05">
                      <span
                        style="color:red;"
                        v-if="$v.message.from_user_email.$error"
                      >Enter a valid email address</span>
                      <span v-else>(Required) - Please enter your email address</span>
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
                  <div class="field form-item">
                    <label class="label is-marginless">Subject</label>
                    <p class="content is-small is-marginless pb-05">
                      <span
                        style="color:red;"
                        v-if="$v.message.subject.$error"
                      >Subject is required and must be max 128 characters</span>
                      <span v-else>(Required) The subject of your message - Max 128 characters</span>
                    </p>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        :class="{ 'is-danger': $v.message.subject.$error }"
                        placeholder="Subject"
                        v-model="message.subject"
                        @blur="$v.message.subject.$touch()"
                        @keydown.enter.prevent
                      />
                    </div>
                  </div>
                  <!-- SUBJECT -->

                  <!-- MSG BODY -->
                  <div class="field form-item">
                    <label class="label is-marginless">Your message</label>
                    <p class="content is-small is-marginless pb-05">
                      <span
                        style="color:red;"
                        v-if="$v.message.body.$error"
                      >Message text is required and must be max 4096 Characters</span>
                      <span v-else>(Required) The body of your message - Max 4096 characters</span>
                    </p>
                    <div class="control">
                      <textarea
                        class="textarea"
                        placeholder="Your message"
                        v-model="message.body"
                        :class="{ 'is-danger': $v.message.body.$error }"
                        @blur="$v.message.body.$touch()"
                      ></textarea>
                    </div>
                  </div>
                  <!-- ABOUT ME -->
                </fieldset>
                <!-- SUBMIT -->
                <div class="is-divider submit-divider"></div>
                <div class="field is-grouped submit-buttons">
                  <div class="control">
                    <button
                      class="button is-primary"
                      :disabled="done || is_sending || $v.$invalid"
                    >Send</button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-light"
                      @click.prevent="goBack"
                    >{{ done ? "Back" : "Cancel" }}</button>
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
      showToast: false,
      showToastTimeout: null,
      toastMessage: [],
      toastType: ""
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
        this.toastIt({
          message: [
            "Your message has been successfully sent. We will contact you very soon!"
          ],
          messageType: "toast-top-centered is-success"
        });
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
    toastIt(messageObj, duration = 3000) {
      // console.log("toastIt I was called");
      // console.log(messageObj.message.join('<br />'));
      this.showToast = true;
      this.toastMessage = messageObj.message;
      this.toastType = messageObj.messageType;
      this.showToastTimeout = setTimeout(() => {
        this.closeToast();
      }, duration);
    },
    closeToast() {
      if (this.showToastTimeout) {
        clearTimeout(this.showToastTimeout);
      }
      this.showToast = false;
      this.toastMessageType = "";
      this.toastMessage = [];
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),
    toastMessageJoined() {
      return this.toastMessage.join("<br />");
    }
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

<style scoped>
/************** layout ***********/
.form-item {
  margin: 30px 0 15px 0;
}
/************** spacing ***********/
.content h5 {
  margin-bottom: 0.5rem;
}

.title:not(:last-child) {
  margin-bottom: 0.5rem;
}
.submit-divider {
  margin-top: 35px;
}
.column {
  padding: 0;
}
.card {
  margin-bottom: 2rem;
}
@media only screen and (max-width: 600px) {
  .is-size-4 {
    font-size: 1.1rem !important;
    line-height: 1.4rem;
    margin: 0 0 0.3rem 0 !important;
  }
  .title:not(:last-child) {
    margin-bottom: 0.4rem;
  }
  .content {
    font-size: 90%;
  }

  .content:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .card-content {
    padding: 0.75rem;
  }
  input,
  textarea {
    font-size: 90%;
    padding: 0.3rem;
  }
  .form-item {
    margin: 15px 0 15px 0;
  }
  .label {
    color: #888;
    font-size: 0.9rem;
  }
  .content.is-small {
    font-size: 0.7rem;
  }
  .submit-divider {
    margin-top: 10px;
  }
  .column {
    padding: 0;
  }
}
</style>
