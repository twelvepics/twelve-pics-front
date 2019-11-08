<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START PROFILE -->
        <div
          class="card"
          v-if="is_loading || is_error"
          style="text-align:center;height:60px;padding-top:10px;"
        >
          <div v-if="is_error" class="isError" style="margin-top:7px;">{{ errorMessage }}</div>
          <div v-if="is_loading" class="loader" style="margin:auto;"></div>
        </div>
        <div class="card" v-if="!!user">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <div class="columns" style="margin-bottom:0;">
              <div class="column is-10">
                <p class="title is-size-4">{{user.profile.display_name || user.username}}</p>
              </div>
              <div v-if="showEditButton" class="column" style="margin-bottom:0;">
                <p class="has-text-right" style="padding-right:10px;">
                  <router-link
                    class="button is-primary"
                    id="profile-edit-btn"
                    :to="`/user/${authenticatedUser._key}/edit`"
                  >
                    <strong>Edit</strong>
                  </router-link>
                </p>
              </div>
            </div>
            <p class="subtitle is-size-6">{{user.profile.intro}}</p>

            <!-- PIC -->
            <div style="margin:30px 0 15px 0;">
              <img
                :src="user.profile.avatar_path || '/img/128x128.png'"
                width="200px"
                height="200px"
              />
            </div>
            <!-- PIC -->

            <!-- ABOUT ME -->
            <div class="field m-30-0-15-0">
              <h5 class="has-text-weight-semibold is-2">A few worlds about me</h5>
              <p class="is-size-6">{{user.profile.about_me}}</p>
            </div>
            <!-- ABOUT ME -->

            <!-- TECH STUFF -->
            <div class="field m-30-0-15-0">
              <h5 class="has-text-weight-semibold is-2">Gear, technique, inspiration</h5>
              <p class="is-size-6">{{user.profile.inspiration}}</p>
            </div>
            <!-- TECH STUFF -->

            <!-- LOCATION -->
            <div class="field m-30-0-15-0">
              <h5 class="has-text-weight-semibold is-2">
                My location:
                <span class="is-size-6 has-text-weight-normal">TODO</span>
              </h5>
            </div>
            <!-- LOCATION -->
            <div style="margin-top:20px;"></div>
          </div>
        </div>
        <!-- END PROFILE -->
      </div>
    </div>

    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START PROFILE -->
        <div class="card" v-if="!!user && !is_error">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Alain's stories</p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
              praesentium esse veritatis nemo!
            </p>

            <!-- ONE STORY -->
            <div class="notification is-warning" style="padding-right:1.5rem;">
              <div class="columns" style="margin-bottom:0;">
                <div class="column is-11">
                  <p
                    class="title is-5"
                  >[DRAFT] Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus, consequatur. Quae modi culpa enim tenetur.</p>
                </div>
                <div class="column" style="margin-bottom:0;">
                  <p class="has-text-right">
                    <router-link
                      class="button is-primary"
                      id="profile-edit-btn"
                      to="/story/xoxoxixi/edit"
                    >
                      <strong>Edit</strong>
                    </router-link>
                  </p>
                </div>
              </div>

              <p class="content">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio saepe error quidem
                facere rerum numquam laborum nesciunt est quod autem, tempore modi aliquid sed.
                Molestias reiciendis dolorum laboriosam earum quis facere libero! Consectetur, enim.
                Deleniti ab doloremque velit consequuntur quia tenetur vel eaque. Dolor harum libero
                eligendi consectetur voluptatem aut?
              </p>
            </div>
            <!-- ONE STORY -->

            <!-- ONE STORY -->
            <div class="notification is-info" style="padding-right:1.5rem;">
              <div class="columns" style="margin-bottom:0;">
                <div class="column is-11">
                  <p
                    class="title is-5"
                  >[PUBLISHED] Lorem ipsum dolor sit amet consectetur adipisicing elit. In nobis tempore aliquam.</p>
                </div>
                <div class="column" style="margin-bottom:0;">
                  <p class="has-text-right">
                    <router-link
                      class="button is-primary"
                      id="profile-edit-btn"
                      to="/story/xoxoxixi/edit"
                    >
                      <strong>Edit</strong>
                    </router-link>
                  </p>
                </div>
              </div>
              <p class="content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ab non vitae
                consequatur eveniet, itaque magni debitis ipsam ad minima! Doloribus veniam cum,
                enim sit repellendus ea molestiae doloremque? Placeat ea aliquid sunt. Nulla, quod
                beatae sapiente consequatur dignissimos labore nisi eos amet facilis, odio nesciunt
                explicabo voluptatem minima voluptatum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axiosBase from "../services/axiosBase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: null,
      is_loading: true,
      is_error: false,
      errorMessage: ""
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authenticatedUser"]),

    username: function() {
      return this.$route.params.username;
    },
    showEditButton: function() {
      return (
        // this.$store.getters.isAuthenticated &&
        // this.user._key === this.$store.getters.authenticatedUser._key
        this.isAuthenticated && this.user._key === this.authenticatedUser._key
      );
    }
  },
  async created() {
    try {
      const response = await axiosBase.get(`/users/${this.username}`);
      // console.log(response);
      this.user = response.data.user;
      this.is_loading = false;
    } catch (e) {
      this.is_loading = false;
      this.is_error = true;
      if (e.response.status === 404) {
        this.errorMessage = "USER NOT FOUND";
      } else {
        // Most probably a 500
        this.errorMessage = "SERVER ERROR";
      }
    }

    ///////////////////////////////////////////////////////////////////
    // test networked conds
    ///////////////////////////////////////////////////////////////////
    // setTimeout(async () => {
    //   try {
    //     const response = await axiosBase.get(`/users/${this.username}`);
    //     console.log(response);
    //     this.user = response.data.user;
    //     this.is_loading = false;
    //   } catch (e) {
    //     console.log(e.response);
    //     console.log(e.response.status);
    //     console.log(e.response.data.error);
    //     this.is_loading = false;
    //     this.is_error = true;
    //     if (e.response.status === 404) {
    //       this.errorMessage = "USER NOT FOUND";
    //     } else {
    //       // Most probably a 500
    //       this.errorMessage = "SERVER ERROR";
    //     }
    //   }
    // }, 500);
  }
};
</script>


<style>
/************** layout ***********/
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

main {
  flex-grow: 1;
}

navbar,
main,
footer {
  flex-shrink: 0;
}

main {
  margin-top: 90px;
}

footer {
  margin-top: 30px;
}

/************** spacing ***********/
.content h5 {
  margin-bottom: 0.5rem;
}

/*************** errors  *************/
.isError {
  color: red;
}
/************** spinner **************/
.loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>