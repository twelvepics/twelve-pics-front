<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-three-quarters-desktop">
        <!-- START PROFILE -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <div class="columns" style="margin-bottom:0;">
              <div class="column is-10">
                <p class="title is-size-4">Alain's profile</p>
              </div>
              <div class="column" style="margin-bottom:0;">
                <p class="has-text-right" style="padding-right:10px;">
                  <router-link
                    class="button is-primary"
                    id="profile-edit-btn"
                    to="/user/alain/edit"
                  >
                    <strong>Edit</strong>
                  </router-link>
                </p>
              </div>
            </div>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
              praesentium esse veritatis nemo!
            </p>

            <!-- PIC -->
            <figure class="image is-128x128" style="margin:30px 0 15px 0;">
              <img src="/img/128x128.png" />
            </figure>
            <!-- PIC -->

            <!-- ABOUT ME -->
            <div class="field m-30-0-15-0">
              <h5 class="has-text-weight-semibold is-2">A few worlds about me.</h5>
              <p class="is-size-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident id
                corrupti vel aliquid omnis, accusantium iste nam nisi praesentium ab
                repellendus aliquam optio ad. Recusandae dolore distinctio explicabo ratione
                similique voluptate aspernatur excepturi, perspiciatis quia, ipsam iste,
                cupiditate repellendus officia nisi architecto maxime ullam quisquam sunt
                accusamus atque sit. Sed eaque placeat expedita fugit at a quibusdam aliquid
                iure! Odit, libero magni. Quae magni sit totam dolorum fuga! Hic, ullam.
                Vitae quidem veniam adipisci aliquam est iusto eligendi, dignissimos non
                ipsam maxime hic repudiandae corrupti fuga, consequatur natus magnam, rem
                officiis. Harum, ducimus vel. Architecto perferendis porro officiis
                excepturi reprehenderit!
              </p>
            </div>
            <!-- ABOUT ME -->

            <!-- TECH STUFF -->
            <div class="field m-30-0-15-0">
              <h5 class="has-text-weight-semibold is-2">Gear, technique, inspiration... (Optional)</h5>
              <p class="is-size-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deserunt
                eum sapiente, deleniti pariatur illo. Animi maxime tenetur, laudantium
                maiores harum expedita? Aspernatur optio aperiam dicta provident minima
                alias est rem cupiditate impedit repellendus tempora possimus, veritatis
                esse repudiandae explicabo tenetur qui perferendis. Repudiandae qui cum
                error quas quia nostrum.
              </p>
            </div>
            <!-- TECH STUFF -->

            <!-- LOCATION -->
            <div class="field m-30-0-15-0">
              <h5 class="has-text-weight-semibold is-2">
                My location:
                <span class="is-size-6 has-text-weight-normal">Paris, France</span>
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
        <div class="card">
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