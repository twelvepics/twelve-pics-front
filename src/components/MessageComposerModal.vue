<template>
  <!-- RECOVER MODAL -->
  <div class="modal" id="message-user-modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="message" @submit.prevent="onSubmit" novalidate>
        <div class="message-header">
          <p>Send a message to {{ username }}</p>
          <button class="delete is-medium" id="message-close" @click.prevent="closeMessageModal"></button>
        </div>
        <div class="message-body">
          <p style="font-size:85%; margin-bottom:1rem;">
            <span v-if="apiError" class="isError">
              <b>{{ apiError }}</b>
            </span>
            <span v-else-if="done" class="isSuccess">
              <b>YOUR MESSAGE WAS SUCCESFULLY SENT</b>
            </span>
            <span v-else-if="sending">
              <b>SENDING MESSAGE...</b>
            </span>
            <span v-else>Contact other users of the site through email</span>
          </p>
          <div class="field">
            <label class="label is-size-6 mt10">
              Subject
              <span
                class="content is-small"
                style="color:red;"
                v-if="$v.messageSubject.$error"
              >Required - Up to 1024 characters</span>
            </label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="messageSubject"
                :readonly="done"
                @blur="$v.messageSubject.$touch()"
                @input="resetApiError()"
                @keydown.enter.prevent
              />
            </div>
          </div>

          <div class="field">
            <label class="label is-size-6 mt10">
              Your message
              <span
                class="content is-small"
                style="color:red;"
                v-if="$v.messageBody.$error"
              >Required - Up to 4096 characters</span>
            </label>
            <div class="control">
              <textarea
                class="textarea"
                v-model="messageBody"
                :readonly="done"
                @blur="$v.messageBody.$touch()"
                @input="resetApiError()"
              ></textarea>
            </div>
          </div>

          <div class="field is-grouped submit-buttons">
            <div class="control">
              <button class="button is-primary" :disabled="$v.$invalid || sending || done">Send</button>
            </div>
            <div class="control">
              <button
                class="button is-light"
                @click.prevent="closeMessageModal"
                :disabled="done"
              >Cancel</button>
            </div>
          </div>
          <!-- <div>{{ $v }}</div> -->
          <!-- <div>-> {{ to_user_key }}</div>
          <div>{{$v}}</div>-->
        </div>
      </form>
    </div>
  </div>
  <!-- END RECOVER MODAL -->
</template>

<script>
import { mapGetters } from "vuex";
import axiosBase from "../services/axiosBase";
import { required, maxLength } from "vuelidate/lib/validators";
import * as Sentry from "@sentry/browser";

export default {
  props: ["isActive", "username", "to_user_key"],
  data() {
    return {
      messageSubject: "",
      messageBody: "",
      apiError: null,
      sending: false,
      done: false
    };
  },
  methods: {
    closeMessageModal() {
      this.resetForm();
      this.$emit("messageModalClosed");
    },
    async onSubmit() {
      this.apiError = null;
      this.sending = true;
      const message = {
        type: "pm",
        payload: {
          to_user_key: this.to_user_key,
          subject: this.messageSubject,
          body: this.messageBody
        }
      };
      // console.log(message);
      try {
        await axiosBase.post(
          `/users/${this.authenticatedUser._key}/send-private-message`,
          {
            type: message.type,
            payload: message.payload
          }
        );
        this.done = true;
        this.sending = false;
        setTimeout(() => {
          this.closeMessageModal();
        }, 1500);
        // console.log(data);
      } catch (e) {
        this.sending = false;
        if (e.response) {
          console.log(e.response.data);
          this.apiError = e.response.data.error;
        } else {
          console.log(e);
          Sentry.captureException(e);
        }
      }
    },
    resetApiError() {
      this.apiError = null;
    },
    resetForm() {
      this.apiError = null;
      this.messageSubject = "";
      this.messageBody = "";
      this.$v.$reset();
      this.sending = false;
      this.done = false;
      this.apiError = null;
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"])
  },
  validations: {
    messageBody: {
      required,
      maxLen: maxLength(1024)
    },
    messageSubject: {
      required,
      maxLen: maxLength(4096)
    }
  }
};
</script>

<style scoped>
.label.isError,
.isError {
  color: red;
}

.isSuccess {
  color: rgb(29, 190, 29);
}

@media only screen and (max-width: 999px) {
  .modal {
    justify-content: start;
  }
  .modal-content {
    max-height: 100%;
  }
}
</style>
