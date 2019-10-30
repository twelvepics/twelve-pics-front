<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START FORM -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Alain's profile</p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
              praesentium esse veritatis nemo!
            </p>

            <!-- PIC -->
            <figure class="image is-128x128" style="margin:30px 0 15px 0;">
              <img src="/img/128x128.png" />
            </figure>
            <!-- PIC -->
            <!-- UPLOAD BUTTON -->
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Your picture (Optional)</span>
                </span>
              </label>
            </div>
            <!-- UPLOAD BUTTON -->

            <!-- DISPLAY NAME -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">Display name (Optional)</label>
              <p
                class="content is-small is-marginless pb-05"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
              <div class="control" style="max-width: 500px;">
                <input class="input" type="text" placeholder="Display name (Optional)" />
              </div>
            </div>
            <!-- DISPLAY NAME -->

            <!-- ABOUT ME -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">A few worlds about you. (Optional)</label>
              <p
                class="content is-small is-marginless pb-05"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
              <div class="control">
                <textarea class="textarea" placeholder="A few worlds about you..."></textarea>
              </div>
            </div>
            <!-- ABOUT ME -->

            <!-- TECH STUFF -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">Gear, technique, inspiration... (Optional)</label>
              <p class="content is-small is-marginless pb-05">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                accusamus!
              </p>
              <div class="control">
                <textarea class="textarea" placeholder="A few worlds about you..."></textarea>
              </div>
            </div>
            <!-- TECH STUFF -->

            <!-- LOCATION -->
            <div class="field m-30-0-15-0">
              <label class="label is-marginless">My location (Optional)</label>
              <p
                class="content is-small is-marginless pb-05"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
              <div class="control" style="max-width: 500px;">
                <input class="input" type="text" placeholder="My location (Optional)" />
              </div>
            </div>
            <!-- LOCATION -->

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
  margin-top: 80px;
}

footer {
  margin-top: 30px;
}

/************** spacing ***********/
</style>