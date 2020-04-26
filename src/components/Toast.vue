<template>
  <transition name="fade">
    <div class="notification toast" :class="toastType">
      <button class="delete" @click="closeToast">Toast it</button>
      <slot>Hello toasts world!</slot>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["toastType", "closeToast"],
  computed: {
    notif_type() {
      return this.type;
    }
  }
};
</script>
<style scoped>
.toast {
  position: fixed; /* Sit on top of the screen */
  z-index: 100; /* Add a z-index if needed */
  max-width: 65%;
  top: 75px;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

/*********** Transitiob  *********/
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}
.fade-leave-active {
  transition-duration: 0s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@media only screen and (max-width: 999px) {
  .toast {
    width: 95%;
    max-width: 95%;
  }
}
</style>
