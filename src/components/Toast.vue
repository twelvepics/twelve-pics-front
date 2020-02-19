<template>
    <div class="notification toast" :class="notif_type">
        <button class="delete" @click="closeToast">Toast it</button>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ["type", "duration", "show", "closeToast"],
    data: function() {
        return {
            message: "",
            tmout: null
        };
    },
    computed: {
        notif_type() {
            return this.type;
        }
    },
    methods: {
        removeToast() {
            if (this.tmout) {
                clearTimeout(this.tmout);
            }
            this.closeToast();
        }
    },
    watch: {
        show: function(val) {
            if (val === true) {
                this.tmout = setTimeout(() => {
                    this.removeToast();
                }, +this.duration);
            }
        }
    }
};
</script>
<style scoped>
.toast {
    position: fixed; /* Sit on top of the screen */
    z-index: 100; /* Add a z-index if needed */
    width: 65%;
    top: 75px;
    left: 50%;
    transform: translate(-50%, 0);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}
@media only screen and (max-width: 1024px) {
    .toast {
        width: 100%;
    }
}
</style>
