<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START PROFILE -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">About twelvepics</p>
            <p
              class="subtitle is-size-5"
              style="margin-top:1rem;color:#0960c4;"
            >Be creative, touching, powerful, real... Tell your story, with images.</p>
            <!-- ABOUT ONE -->
            <div class="field m-30-0-15-0">
              <h5
                class="has-text-weight-semibold is-2"
                style="color:#0960c4;"
              >Photo stories are amazing</h5>
              <p class="is-size-6">
                Hi. I'm a photographer, and a web developer. Twelvepics.com is dedicated to photo stories/essays.
                Everyone is welcome to post and share their stories. For now I'm just launching the site, it will of course evolve and mature,
                little by little, depending on the feedback I get from users. No rush.
              </p>
              <p class="is-size-6">
                In the upcoming months, I am willing to experiment and find new ways for photographers to finance and be rewarded for their work.
                Hey guys, it's already 2020 :)
                The photography industry is still stuck to its 90's models. Magazines suffer severe budgetary restrictions,
                the awards and grants system make one happy winner and the remaining thousand depressive, including me, let's not talk about the pay for exposure trend.
                To me it looks like a total disaster.
                The music industry evolved, changed its models, nowadays many musicians earn a living, isn't it time for photography to do the same?
                More about this later, stay tuned.
              </p>
            </div>
            <!-- ABOUT ONE -->

            <!-- ABOUT THREE -->
            <div class="field m-30-0-15-0">
              <h5
                class="has-text-weight-semibold is-2"
                style="color:#0960c4;"
              >Copyright and other stuff</h5>
              <p
                class="is-size-6"
              >Twelvepics is and will remain completely free to use, for visitors as well as for creators.</p>
              <p class="is-size-6">
                I believe that copyright empowers creativity, no further use of the photos you have decided to publish
                on the site will ever be made. When you create an image it is automatically protected by copyright.
                You should never give up this right. If you are willing to share for free your creations there are plenty
                of solutions that allow you to do it without giving up all your rights.
              </p>
              <p
                class="is-size-6"
              >I hope you will enjoy the site, everyone and every type of photography is welcome.</p>
            </div>
            <!-- ABOUT THREE -->

            <!-- LOCATION -->
            <div class="field m-30-0-15-0">
              <h5 class="has-text-weight-semibold" style="font-size:120%;color:#0960c4;">
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
  </main>
</template>
<script>
export default {
  // components: {}
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
</style>
