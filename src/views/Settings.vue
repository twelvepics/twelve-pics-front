<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START FORM -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Alain's settings</p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
              praesentium esse veritatis nemo!
            </p>

            <!-- SEP -->
            <div class="is-divider update-divider"></div>

            <!-- UPDATE EMAIL -->
            <div class="update-field-container">
              <div>
                <label class="label is-marginless">Email address</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
                <div class="control" style="max-width: 500px;">
                  <input
                    class="input is-static"
                    type="email"
                    name="email"
                    id="update-email-input"
                    value="alman1@free.fr"
                  />
                </div>
              </div>
              <div></div>
              <div class="control update-btn-align">
                <button class="button is-primary" id="update-email-btn">Change</button>
              </div>
            </div>
            <!-- UPDATE EMAIL -->

            <!-- SEP -->
            <div class="is-divider update-divider"></div>

            <!-- UPDATE PASSWORD -->
            <div class="update-field-container">
              <div>
                <label class="label is-marginless">Password</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
              </div>
              <div></div>
              <div class="control update-btn-align">
                <button class="button is-primary" id="update-password-btn">Change</button>
              </div>
            </div>
            <!-- UPDATE PASSWORD -->

            <!-- SEP -->
            <div class="is-divider update-divider"></div>

            <!-- ALLOWS USERS TO MESSAGE ME -->
            <div class="update-field-container">
              <div>
                <label class="label is-marginless">Allows others users to contact me</label>
                <p class="content is-small is-marginless pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>
              </div>
              <div></div>
              <div class="field switch-btn-align">
                <input
                  id="switch-contact"
                  type="checkbox"
                  name="witch-contact"
                  class="switch is-success"
                  checked="checked"
                />
                <label for="switch-contact">Allow</label>
              </div>
            </div>
            <!-- ALLOWS USERS TO MESSAGE ME -->

            <!-- SEP -->
            <div class="is-divider update-divider"></div>

            <!-- CATEGORIES IM INTERESTED IN -->
            <div class="categories-container">
              <div>
                <label class="label is-marginless">Themes I'm interested in</label>
                <p class="content is-small pb-05">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
                  accusamus!
                </p>

                <!-- START LIST -->
                <div class="content">
                  <ul class="categories-update-grid is-unstyled">
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-documentary"
                        type="checkbox"
                        name="cat-documentary"
                        checked="checked"
                      />
                      <label for="cat-documentary">Documentary</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-still-life"
                        type="checkbox"
                        name="cat-still-life"
                        checked="checked"
                      />
                      <label for="cat-still-life">Still life</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-street-photography"
                        type="checkbox"
                        name="cat-street-photography"
                        checked="checked"
                      />
                      <label for="cat-street-photography">Street photography</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-wild-life"
                        type="checkbox"
                        name="cat-wild-life"
                        checked="checked"
                      />
                      <label for="cat-wild-life">Nature and Wildlife</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-wedding"
                        type="checkbox"
                        name="cat-wedding"
                        checked="checked"
                      />
                      <label for="cat-wedding">Wedding</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-travel"
                        type="checkbox"
                        name="cat-travrl"
                        checked="checked"
                      />
                      <label for="cat-travel">Travel</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-Daily-life"
                        type="checkbox"
                        name="cat-daily-life"
                        checked="checked"
                      />
                      <label for="cat-daily-life">Daily life</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-fine-art"
                        type="checkbox"
                        name="cat-fine-art"
                        checked="checked"
                      />
                      <label for="cat-fine-art">Fine art</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-portrait"
                        type="checkbox"
                        name="cat-portrait"
                        checked="checked"
                      />
                      <label for="cat-portrait">Portrait</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-sport"
                        type="checkbox"
                        name="cat-sport"
                        checked="checked"
                      />
                      <label for="cat-sport">Sport</label>
                    </li>
                    <li class="field">
                      <input
                        class="is-checkradio"
                        id="cat-architecture"
                        type="checkbox"
                        name="cat-architecture"
                        checked="checked"
                      />
                      <label for="cat-architecture">Architecture</label>
                    </li>
                  </ul>
                </div>
                <!-- END LIST -->
              </div>
            </div>
            <!-- CATEGORIES IM INTERESTED IN -->

            <!-- SEP -->
            <div class="is-divider update-divider"></div>

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
.pb-05 {
  padding-bottom: 0.5rem;
}

/************* specifics *********/
ul.is-unstyled {
  list-style: none;
  margin: 0;
  padding: 0;
}

.is-divider.update-divider {
  margin: 25px 0 25px 0;
}

/* grids */
.update-field-container {
  display: grid;
  grid-template-columns: 2fr 25px 1fr;
}

.categories-update-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.update-btn-align {
  align-self: end;
  justify-self: left;
}

.switch-btn-align {
  align-self: center;
  justify-self: left;
}

@media only screen and (max-width: 1024px) {
  .categories-update-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .update-btn-align {
    align-self: end;
    justify-self: right;
  }

  .switch-btn-align {
    align-self: center;
    justify-self: right;
  }
}

/* end grids */
</style>