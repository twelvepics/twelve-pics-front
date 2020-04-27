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
  position: fixed;
  z-index: 100;
  max-width: 65%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}
.toast-top-centered {
  top: 75px;
  left: 50%;
  transform: translate(-50%, 0);
}
.toast-bottom {
  /* bottom goes on the right for full screen */
  bottom: 10px;
  right: 25px;
}
.notification {
  padding: 0.8rem 2.3rem 0.5rem 1rem;
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
  .toast-bottom {
    /* bottom is centered for small screen / mobile */
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
