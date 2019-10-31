<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-half-desktop">
        <!-- START FORM -->
        <div class="card" style="margin-top:50px;">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <form @submit.prevent="onSubmit">
              <p class="title is-size-5">Reset your password</p>
              <p class="subtitle is-size-6" style="margin-bottom:0 !important">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
                praesentium esse veritatis nemo!
              </p>
              <!-- PASSWORD -->
              <div class="field" style="margin-top:20px;">
                <label class="label is-marginless">New password</label>
                <div class="control" style="max-width: 500px;">
                  <input class="input" type="password" placeholder="New password" />
                </div>
              </div>
              <!-- PASSWORD -->

              <!-- CONFIRM PASSWORD -->
              <div class="field" style="margin-top:20px;">
                <label class="label is-marginless">Confirm password</label>
                <div class="control" style="max-width: 500px;">
                  <input class="input" type="password" placeholder="Confirm your password" />
                </div>
              </div>
              <!-- CONFIRM PASSWORD -->

              <!-- SUBMIT -->
              <div class="is-divider" style="margin-top:35px;"></div>
              <div class="field is-grouped submit-buttons">
                <div class="control">
                  <button class="button is-primary">Save</button>
                </div>
              </div>
              <!-- SUBMIT -->
              <div style="margin-top:25px;"></div>
            </form>
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