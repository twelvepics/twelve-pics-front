<template>
  <div>
    <!-- VIEW STORY TOP -->
    <div class="columns top is-mobile">
      <div class="column is-half" style="margin:0;padding:0;">
        <p class="title is-size-4 username">
          {{
          user.profile.display_name || user.username
          }}
        </p>
      </div>
      <div v-if="showEditButton" class="column is-half" style="margin:0;padding:0;">
        <p class="has-text-right top-button">
          <router-link
            class="button is-small is-warning"
            id="profile-edit-btn"
            :to="`/user/${authenticatedUser._key}/edit`"
          >
            <strong>Edit profile</strong>
          </router-link>
        </p>
      </div>
      <div v-if="showMessageButton" class="column is-half" style="margin:0;padding:0;">
        <p class="has-text-right top-button">
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
.columns.top {
  border-bottom: 1px solid #bbb;
  margin: 0 0 0.5rem 0;
  padding: 0 0 0.3rem 0;
}
.button.is-small {
  font-size: 0.85rem;
  border-radius: 4px;
}
.title.username {
  padding: 0.4rem 0 0 0;
}
.top-button {
  padding: 0 0 0.3rem 0;
}
</style>