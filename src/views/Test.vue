<template>
  <main>
    <!-- <toast
      v-bind="{type:toast_type, duration:toast_duration, show: show_toast}"
    >Here comes my message</toast>-->
    <transition name="fade">
      <toast
        v-show="show_toast"
        :duration="toast_duration"
        :type="toast_type"
        :show="show_toast"
        :closeToast="closeToast"
      >{{ toast_message }}</toast>
    </transition>
    <div class="container is-fluid" ref="stories-container">
      <button @click="toastSuccess">Toast Success</button>
      <br />
      <button @click="toastFailure">Toast Failure</button>
      <br />
      <button @click="toastWarning">Toast Warning</button>
    </div>
  </main>
</template>
<script>
import Toast from "../components/Toast.vue";

export default {
  name: "test",
  components: {
    Toast
  },
  data: function() {
    return {
      // top toast
      toast_message: "",
      toast_type: "",
      toast_duration: 3000,
      show_toast: false
    };
  },
  methods: {
    //////////////////////////////////
    // Toaster
    //////////////////////////////////
    closeToast() {
      console.log("F I was called");
      this.show_toast = false;
      this.toast_message = "";
      this.toast_type = "";
    },
    toastSuccess() {
      this.show_toast = true;
      this.toast_message = "This is my message, success";
      this.toast_type = "is-success";
    },
    toastFailure() {
      this.show_toast = true;
      this.toast_message = "This is my message, failure";
      this.toast_type = "is-danger";
    },
    toastWarning() {
      this.show_toast = true;
      this.toast_message = "This is my message, warning";
      this.toast_type = "is-warning";
    }
    ///////////////////////////
  }
};
</script>
<style scoped>
</style>