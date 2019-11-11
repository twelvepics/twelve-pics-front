<template>
  <!-- RECOVER MODAL -->
  <div class="modal" id="message-user-modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="message" @submit.prevent="onSubmit" novalidate>
        <div class="message-header">
          <p>Send a message to {{username}}</p>
          <button class="delete is-medium" id="message-close" @click.prevent="closeMessageModal"></button>
        </div>
        <div class="message-body">
          <p
            style="font-size:85%"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, vitae.</p>
          <div class="field">
            <label class="label is-size-6 mt10">Subject</label>
            <div class="control">
              <input class="input" type="text" v-model="messageSubject" @keydown.enter.prevent />
            </div>
          </div>

          <div class="field">
            <label class="label is-size-6 mt10">Your message</label>
            <div class="control">
              <textarea class="textarea" v-model="messageBody"></textarea>
            </div>
          </div>

          <div class="field is-grouped submit-buttons">
            <div class="control">
              <button class="button is-primary">Submit</button>
            </div>
            <div class="control">
              <button class="button is-dark" @click.prevent="closeMessageModal">Cancel</button>
            </div>
          </div>
          <!-- <div>{{ $v }}</div> -->
          <div>{{ user_key }}</div>
        </div>
      </form>
    </div>
  </div>
  <!-- END RECOVER MODAL -->
</template>

<script>
export default {
  props: ["isActive", "username", "user_key"],
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
      this.$emit("messageModalClosed");
    },
    async onSubmit() {
      this.apiError = null;
      this.sending = true;
      // const userData = {
      //   login: this.user.usernameOrEmail,
      //   password: this.user.password,
      //   rememberMe: this.user.rememberMe
      // };
      try {
        console.log("sending");
        // const response = await axiosBase.post("/auth/reset-password", {
        //   emailOrUsername: this.emailOrUsername
        // });
        // const data = response.data;
        // console.log(data);
        // console.log(status);
        // if (response.status === 200) {
        //   // this.initMessage = false;
        //   this.done = true;
        // }
      } catch (e) {
        // this.apiError = e;
        console.log(e.response.status);
        console.log(e.response.data);
        this.apiError = e.response.data.error;
        this.sending = false;
      }
    }
  }
};
</script>

<style scoped>
</style>