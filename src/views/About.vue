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
              >A very selfish project</h5>
              <p class="is-size-6">
                Hi. I'm a photographer, and a web developer. There are many options to showcase and
                share photographic work on the web. Some are nice and cool but never what I really would
                like, maybe i'm a bit picky. So I decided to give it a try and build my "ideal" photo
                sharing website. It is a personnal project, I love viewing other photographers work, and
                wish I had a cool place to land and share mine, just this&nbsp;:)
              </p>
            </div>
            <!-- ABOUT ONE -->

            <!-- ABOUT TWO -->
            <div class="field m-30-0-15-0">
              <h5
                class="has-text-weight-semibold is-2"
                style="color:#0960c4;"
              >Current status and what's next</h5>
              <p class="is-size-6">
                Right now Twelvepics is in beta stage. You can try the site, your feedback and suggestions are welcome, bug reports too, use the contact form.
                The site is just starting and will of course evolve and mature, little by little, no rush.
              </p>
              <p class="is-size-6">
                The general and acknowledged trend in web site building is mobile first. To be honnest I really prefer to watch photos on a real big nice display,
                never enjoyed so much watching pics on a mobile phone screen. So for now twelvepics is desktop first, who cares about trends.
                An improved mobile version is in the works though.
              </p>
              <p class="is-size-6">
                In a near future, I am willing to experiment on new ways for photographers to finance and be rewarded for their work.
                Documentary or street photographers for exemple produce incredible work, and at the same time have a hard time making any money of it.
                Well, more about this later, stay tuned.
              </p>
            </div>
            <!-- ABOUT TWO -->

            <!-- ABOUT THREE -->
            <div class="field m-30-0-15-0">
              <h5
                class="has-text-weight-semibold is-2"
                style="color:#0960c4;"
              >Copyright and other stuff</h5>
              <p class="is-size-6">
                Twelvepics is and will remain completely free to use. If the projects grows up, it may need financial baking, based on business sponsoring and users donations.
                Time will tell.
              </p>
              <p class="is-size-6">
                We believe that copyright empowers creativity, no further use of the photos you have decided to publish on the site will ever be made by us. When you create an image it is automatically protected by copyright. You should never give up this right. If you are willing to share your creations there are plenty of solutions that allow you to do it without giving up all your rights.
                See who i'm thinking about?
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
