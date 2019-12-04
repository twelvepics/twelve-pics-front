<template>
  <main>
    <!-- STORIES COLUMN -->
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START LOADER / SERVER ERRORS-->
        <div
          class="card"
          v-if="is_loading || is_error"
          style="text-align:center;height:60px;padding-top:10px;margin-bottom:10px"
        >
          <div
            v-if="!is_loading &&  is_error"
            class="isError"
            style="margin-top:7px;"
          >{{ errorMessage }}</div>
          <div v-if="is_loading" class="loader" style="margin:auto;"></div>
        </div>
        <!-- ENDS LOADER / SERVER ERRORS-->

        <!-- START STORIES -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Alain's stories</p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis praesentium
              esse veritatis nemo!
            </p>

            <!-- ONE STORY -->
            <div class="notification is-warning" style="padding-right:1.5rem;">
              <div class="columns" style="margin-bottom:0;">
                <div class="column is-11">
                  <p class="title is-5">
                    [DRAFT] Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
                    consequatur. Quae modi culpa enim tenetur.
                  </p>
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio saepe error quidem facere
                rerum numquam laborum nesciunt est quod autem, tempore modi aliquid sed. Molestias
                reiciendis dolorum laboriosam earum quis facere libero! Consectetur, enim. Deleniti ab
                doloremque velit consequuntur quia tenetur vel eaque. Dolor harum libero eligendi
                consectetur voluptatem aut?
              </p>
            </div>
            <!-- ONE STORY -->

            <!-- ONE STORY -->
            <div class="notification is-info" style="padding-right:1.5rem;">
              <div class="columns" style="margin-bottom:0;">
                <div class="column is-11">
                  <p class="title is-5">
                    [PUBLISHED] Lorem ipsum dolor sit amet consectetur adipisicing elit. In nobis
                    tempore aliquam.
                  </p>
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
                consequatur eveniet, itaque magni debitis ipsam ad minima! Doloribus veniam cum, enim
                sit repellendus ea molestiae doloremque? Placeat ea aliquid sunt. Nulla, quod beatae
                sapiente consequatur dignissimos labore nisi eos amet facilis, odio nesciunt explicabo
                voluptatem minima voluptatum.
              </p>
            </div>
          </div>
        </div>
        <!-- ENDS STORIES -->
      </div>
    </div>
    <!-- ENDS STORIES COLUMN -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      is_debug: true,
      is_loading: false,
      // fetch errors
      is_error: false
    };
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

