<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START FORM -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Contact us</p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
              praesentium esse veritatis nemo!
            </p>
            <!-- EMAIL -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">Your email</label>
              <p
                class="content is-small is-marginless pb-05"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
              <div class="control" style="max-width: 500px;">
                <input class="input" type="email" placeholder="Your email address" />
              </div>
            </div>
            <!-- EMAIL -->

            <!-- SUBJECT -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">Subject</label>
              <p
                class="content is-small is-marginless pb-05"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
              <div class="control">
                <input class="input" type="textt" placeholder="Subject" />
              </div>
            </div>
            <!-- SUBJECT -->

            <!-- MSG BODY -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">Your message</label>
              <p
                class="content is-small is-marginless pb-05"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
              <div class="control">
                <textarea class="textarea" placeholder="Your message"></textarea>
              </div>
            </div>
            <!-- ABOUT ME -->
            <!-- SUBMIT -->
            <div class="is-divider" style="margin-top:35px;"></div>
            <div class="field is-grouped submit-buttons">
              <div class="control">
                <button class="button is-primary">Save</button>
              </div>
              <div class="control">
                <button class="button is-dark">Cancel</button>
              </div>
            </div>
            <!-- SUBMIT -->
            <div style="margin-top:25px;"></div>
          </div>
          <!-- END CARD CONTENT -->
        </div>
      </div>
    </div>
  </main>
</template>

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