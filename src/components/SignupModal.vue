<template>
  <!-- SIGNUP MODAL -->
  <div class="modal" id="signup-modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="message" @submit.prevent="onSubmit" novalidate>
        <div class="message-header">
          <p class="is-1">Sign up</p>
          <button class="delete is-medium" id="signup-close" @click.prevent="closeSignupModal"></button>
        </div>
        <div class="message-body" style="padding-top:0;">
          <div
            style="color:red;font-size:93%;text-align:center;padding:.5rem 0 0 0;line-height:90%;"
          >
            <span v-if="apiErrors && apiErrors === 'SERVER ERROR'">SERVER ERROR</span>
            <span v-else>
              &nbsp;
              <br />
            </span>
          </div>

          <div class="field">
            <label class="label" :class="{ isError: $v.user.username.$error }">
              Username:
              <span
                class="content is-small"
                style="color:red;"
                v-if="$v.user.username.$error"
              >Username should be 5 to 16 characters letters, numbers, _ or -</span>
              <span
                class="content is-small"
                style="color:red;"
                v-else-if="apiErrors && apiErrors.hasOwnProperty('username')"
              >{{ apiErrors.username }}</span>
            </label>
            <div class="control">
              <input
                class="input"
                :class="{ 'is-danger': $v.user.username.$error }"
                type="text"
                placeholder="Enter your username"
                v-model="user.username"
                @blur="$v.user.username.$touch()"
                @input="resetApiError('username')"
                @keydown.enter.prevent
              />
            </div>
          </div>
          <div class="field">
            <label class="label" :class="{ isError: $v.user.email.$error }">
              Email:
              <span
                class="content is-small"
                style="color:red;"
                v-if="$v.user.email.$error"
              >Please provide a valid email address</span>
              <span
                class="content is-small"
                style="color:red;"
                v-else-if="apiErrors && apiErrors.hasOwnProperty('email')"
              >{{ apiErrors.email }}</span>
            </label>
            <div class="control">
              <input
                class="input"
                :class="{ 'is-danger': $v.user.email.$error }"
                type="email"
                placeholder="Enter your email address"
                v-model="user.email"
                @blur="$v.user.email.$touch()"
                @input="resetApiError('email')"
                @keydown.enter.prevent
              />
            </div>
          </div>
          <div class="field">
            <label class="label" :class="{ isError: $v.user.password.$error }">
              Password:
              <span
                class="content is-small"
                style="color:red;"
                v-if="$v.user.password.$error"
              >Password should be 5 to 16 characters</span>
              <span
                class="content is-small"
                style="color:red;"
                v-else-if="apiErrors && apiErrors.hasOwnProperty('password')"
              >{{ apiErrors.password }}</span>
            </label>
            <div class="control">
              <input
                class="input"
                :class="{ 'is-danger': $v.user.password.$error }"
                type="password"
                placeholder="Enter your password"
                v-model="user.password"
                @blur="$v.user.password.$touch()"
                @input="resetApiError('password')"
                @keydown.enter.prevent
              />
            </div>
          </div>
          <div class="field">
            <label class="label" :class="{ isError: $v.user.repeatPassword.$error }">
              Confirm password:
              <span
                class="content is-small"
                style="color:red;"
                v-if="$v.user.repeatPassword.$error"
              >Password and password confirm don't match</span>
              <span
                class="content is-small"
                style="color:red;"
                v-else-if="apiErrors && apiErrors.hasOwnProperty('repeat_password')"
              >Password and password confirm don't match</span>
            </label>
            <div class="control">
              <input
                class="input"
                :class="{ 'is-danger': $v.user.repeatPassword.$error }"
                type="password"
                placeholder="Confirm your password"
                v-model="user.repeatPassword"
                @blur="$v.user.repeatPassword.$touch()"
                @keyup.22="$v.user.repeatPassword.$touch()"
                @input="resetApiError('repeat_password')"
                @keydown.enter.prevent
              />
            </div>
          </div>
          <div class="field is-grouped submit-buttons">
            <div class="control">
              <button type="submit" class="button is-primary">Submit</button>
            </div>
            <div class="control">
              <button class="button is-light" @click.prevent="closeSignupModal">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- END SIGNUP MODAL -->
</template>

<script>
import * as Sentry from "@sentry/browser";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
  sameAs
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
      },
      apiErrors: null,
      // responseStatus: null,
      loading: false
    };
  },
  props: ["isActive"],
  methods: {
    closeSignupModal() {
      this.resetForm();
      // emit close to parent (HeaderComponent)
      this.$emit("signupModalClosed", this.isActive);
    },
    async onSubmit() {
      const userData = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        repeat_password: this.user.repeatPassword
      };
      try {
        await this.$store.dispatch("signup", userData);
        this.$emit("toastPostSignupSuccess");
        this.closeSignupModal();
      } catch (e) {
        if (e.response) {
          if (e.response.data.error_type === "INVALID_USER_ERROR") {
            this.apiErrors = e.response.data.errors;
          } else if (e.response.data.error_type === "INTEGRITY_ERROR") {
            this.apiErrors = e.response.data.errors;
          } else {
            // most probably 500
            this.apiErrors = e.response.data.errors;
          }
        } else {
          console.log(e);
          Sentry.captureException(e);
        }
      }
      this.loading = false;
    },
    resetApiError(field) {
      if (
        this.apiErrors !== null &&
        Object.prototype.hasOwnProperty.call(this.apiErrors, field) &&
        // this.apiErrors.hasOwnProperty(field) &&
        this.apiErrors[field] !== null
      ) {
        this.apiErrors[field] = null;
      }
    },
    resetForm() {
      this.apiErrors = null;
      this.loading = false;
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.user.repeatPassword = "";
      this.$v.user.$reset();
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      username: {
        required,
        minLen: minLength(5),
        maxLen: maxLength(16),
        alphaplus: helpers.regex("alpha", /^[a-zA-Z1-9_-]*$/)
      },
      password: {
        required,
        minLen: minLength(5),
        maxLen: maxLength(16)
      },
      repeatPassword: {
        sameAs: sameAs(vm => {
          return vm.password;
        })
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
.submit-buttons {
  margin-top: 25px;
}
.button.is-light {
  background-color: #cccccc;
  font-weight: bold;
}
</style>
