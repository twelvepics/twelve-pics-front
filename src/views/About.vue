<template>
  <main>
    <div class="container is-fluid narrow-container">
      <div class="columns is-centered" style="margin:0;padding:0;">
        <!-- CENTER COLUMNN -->
        <div class="column">
          <!-- START PROFILE -->
          <div class="card">
            <!-- CARD CONTENT -->
            <div class="card-content">
              <p class="title is-size-4">About twelvepics</p>
              <p
                class="subtitle is-size-5"
              >Be creative, touching, powerful, real. Tell your story, with images.</p>
              <!-- ABOUT ONE -->
              <div class="field m-30-0-15-0">
                <h5
                  class="has-text-weight-semibold is-2"
                  style="color:#0960c4;"
                >Photo stories are amazing</h5>
                <p class="is-size-6">
                  Hi. We are a small group of photographers and a web developers, willing to create a space for photos stories 
                  tellers to showcase their works. Twelvepics.com is dedicated to photo stories/essays.
                  Everyone is welcome to post and share their stories. The service is in early stage, it will evolve and mature,
                  depending on the feedback and requests we may get from users.
                </p>
                <p class="is-size-6" style="margin-top:.5rem;">
                  In the upcoming months, We want to experiment and find new ways for photographers to finance and be rewarded for their work.
                  The photography industry is still stuck to its 90's models. Magazines suffer severe budgetary restrictions, grants and awards may help some but it is very limited. It becomes very hard
                  for photographers to finance their stories.<br />
                  We want to experiment with visitors support to photographers they like, cryptocurrencies, etc... Stay tuned 

                </p>
              </div>
              <!-- ABOUT ONE -->

              <!-- ABOUT THREE -->
              <div class="field">
                <h5
                  class="has-text-weight-semibold is-2"
                  style="color:#0960c4;"
                >Legal</h5>
                <p
                  class="is-size-6"
                >Twelvepics is and will remain completely free to use, for visitors as well as for creators.</p>
                <p class="is-size-6">
                   All photos posted on the site are property of their respective owners. No reproduction allowed.
                  No further use of the photos you have decided to publish on the site will ever be made by us.
                </p>
                <p
                  class="is-size-6"
                  style="margin-top:1rem;"
                >I hope you will enjoy the site, everyone and every type of photography is welcome.</p>
              </div>
              <!-- ABOUT THREE -->

              <!-- LOCATION -->
              <div class="field">
                <h5 class="has-text-weight-semibold bottom-quote">
                  "It is an illusion that photos are made with the camera... they are made with the eye, heart and head."
                  <br />Henri Cartier-Bresson
                </h5>
              </div>
              <!-- LOCATION -->
              <div style="margin-top:20px;"></div>
            </div>
          </div>
          <!-- END PROFILE -->
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  // components: {}
};
</script>
<style scoped>
/************** layout ***********/
.card {
  margin-bottom: 2rem;
}
/************** spacing ***********/
.content h5 {
  margin-bottom: 0.5rem;
}
.subtitle.is-size-5 {
  margin-top: 1.1rem;
  color: #0960c4;
}
.bottom-quote {
  font-size: 120%;
  color: #0960c4;
}
.field {
  margin: 30px 0 15px 0;
}
.column {
  padding: 0;
}
@media only screen and (max-width: 600px) {
  .is-size-4 {
    font-size: 1.1rem !important;
    line-height: 1.4rem;
    margin: 0 0 0.3rem 0 !important;
  }
  .is-size-5 {
    font-size: 1rem !important;
  }
  .subtitle.is-size-5 {
    margin-top: 0.7rem;
    color: #555;
  }
  .subtitle:not(:last-child) {
    margin-bottom: 1rem;
  }
  h5 {
    margin: 0 0 0.3rem 0;
    padding: 0;
  }
  .title:not(:last-child) {
    margin-bottom: 0.4rem;
  }
  .is-size-6 {
    font-size: 90% !important;
  }
  .content:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .card-content {
    padding: 0.75rem;
  }
  .bottom-quote {
    font-size: 100%;
  }
  .field {
    margin: 15px 0 15px 0;
  }
  .has-text-weight-semibold {
    font-weight: 400 !important;
  }
  .column {
    padding: 0;
  }
}
</style>
