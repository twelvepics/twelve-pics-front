<template>
  <div>
    <!-- VIEW STORY TOP -->
    <div>
      <div>
        <p class="title is-size-4 username">
          {{
          user.profile.display_name || user.username
          }}
        </p>
      </div>
    </div>
    <!-- ENDS COLUMNS IS-MOBILE -->
    <!-- START SUBTITLE/LINK -->
    <div v-if="user.stories && user.stories.length">
      <p class="subtitle is-size-6">
        <router-link :to="{ name: 'user-stories', params: { username: user.username } }">
          Stories posted by {{
          user.profile.display_name || user.username
          }}
        </router-link>
      </p>
    </div>
    <div v-if="showEditButton">
      <p class="profile-button">
        <router-link
          class="button is-small is-warning"
          id="profile-edit-btn"
          :to="`/user/${authenticatedUser._key}/edit`"
        >
          <strong>Edit profile</strong>
        </router-link>
      </p>
    </div>
    <div v-if="showMessageButton">
      <p class="profile-button">
        <button
          class="button is-small is-primary"
          @click.prevent="openMessageModal"
          :disabled="!messagingEnabled"
        >
          Message {{
          user.profile.display_name || user.username
          }}
        </button>
      </p>
    </div>
    <!-- ENDS SUBTITLE/LINK -->
    <!-- ENDS VIEW STORY TOP -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["user", "showMessageButton", "showEditButton", "messagingEnabled"],
  methods: {
    openMessageModal() {
      this.$emit("openMessageModal");
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"])
  }
};
</script>
<style scoped>
.button.is-small {
  font-size: 0.85rem;
  border-radius: 4px;
}
.title.username {
  padding: 0.7rem 0 0.6rem 0;
  font-weight: 400;
  font-size: 1.3rem !important;
  border-bottom: 1px solid #bbb;
}
.profile-button {
  padding: 0.6rem 0 0.6em 0;
  border-bottom: 1px solid #bbb;
}
.is-size-6 {
  font-size: 1rem !important;
  padding: 0.5rem 0 0.5rem 0;
  border-bottom: 1px solid #bbb;
}
</style>