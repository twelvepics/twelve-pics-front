<template>
  <main>
    <div class="columns is-centered">
      <!-- CENTER COLUMNN -->
      <div class="column is-four-fifths-desktop">
        <!-- START STORY -->
        <div class="card">
          <!-- START CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquam eaque esse! Sint sit officia
              nulla iste minus.
            </p>
            <p class="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolorum repellendus fugiat velit esse
              culpa sint quis cum optio minus consequatur laboriosam eveniet rem iure illum eos omnis, nulla
              assumenda dignissimos? Odit et dolores eveniet, quos iure saepe commodi? Suscipit vel expedita
              iusto perspiciatis amet ducimus omnis similique fuga nulla numquam, consectetur mollitia
              perferendis assumenda reiciendis odit! Excepturi, distinctio.
            </p>
            <component :is="storyLayout"></component>
            <p class="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sint molestiae reiciendis dolor
              maiores blanditiis fuga vero dolorem officia quibusdam. Dicta sapiente iure ab odio ut libero,
              a minima ipsum vitae, consequuntur recusandae, ea officia. Iusto fugiat officia veritatis odit
              tenetur voluptatem tempore nesciunt omnis ducimus aliquid, adipisci harum accusamus.
            </p>
          </div>
          <!-- END CONTENT -->
        </div>
        <!-- END STORY -->
        <!-- START COMMENTS -->
        <div class="card comments" style="margin-top:50px;">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-4">Comments</p>
            <p class="content">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis
              praesentium esse veritatis nemo!
            </p>
            <!-- ADD COMMENT FORM -->
            <div>
              <label class="label is-marginless">Add a comment</label>
              <p
                class="content is-small is-marginless pb-05"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, accusamus!</p>
              <div class="control">
                <textarea class="textarea" placeholder="Your comment"></textarea>
              </div>
            </div>
            <div class="control mt10p20">
              <button class="button is-primary">Add comment</button>
            </div>
            <!-- ADD COMMENT FORM -->
            <!-- START COMMENT ITEMS -->
            <div class="is-divider is-comment-divider"></div>
            <p class="content comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, tempora odio. Nulla eligendi
              aperiam facere aliquam, debitis nemo soluta ut sapiente. Possimus eaque distinctio natus.
            </p>
            <p class="is-divider is-comment-divider"></p>
            <p class="content comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo esse perspiciatis iure quod
              doloribus maxime laboriosam ullam alias veritatis sunt optio, incidunt hic vero earum atque
              laborum consequatur sequi numquam recusandae accusamus, animi sed ratione vel. Ratione
              veritatis
              accusantium eum!
            </p>
            <p class="is-divider is-comment-divider"></p>
            <p class="content comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, tempora odio. Nulla eligendi
              aperiam facere aliquam, debitis nemo soluta ut sapiente. Possimus eaque distinctio natus.
            </p>
            <div class="is-divider is-comment-divider"></div>
            <p class="content comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, tempora odio. Nulla eligendi
              aperiam facere aliquam, debitis nemo soluta ut sapiente. Possimus eaque distinctio natus.
            </p>
            <div class="is-divider is-comment-divider"></div>
            <!-- END COMMENT ITEMS -->
          </div>
        </div>
        <!-- END COMMENTS -->
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    picsLayout: {
      default: "layout-tiles",
      type: String
    }
    // required: true } // TODO ADD ME LATA
  },
  computed: {
    storyLayout() {
      if (this.picsLayout === "layout-horizontal") {
        return () => import("../components/StoryLayoutHorizontal.vue");
      } else if (this.picsLayout === "layout-vertical") {
        return () => import("../components/StoryLayoutVertical.vue");
      } else if (this.picsLayout === "layout-tiles") {
        return () => import("../components/StoryLayoutTiles.vue");
      }
      return () => import("../components/StoryLayoutCarousel.vue");
    }
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
.mt10p20 {
  margin-top: 10px;
  padding-bottom: 20px;
}

/*** comments ****/
.card.comments {
  margin-top: 25px;
}

.is-divider.is-comment-divider {
  margin: 12px 0 12px 0;
}
</style>