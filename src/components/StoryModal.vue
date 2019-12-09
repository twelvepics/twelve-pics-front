<template>
  <!-- The Modal -->
  <div
    id="story-modal"
    class="story-modal"
    :style="[isStoryComponentMounted ? {display: 'block'} : {dislay: 'none'}]"
  >
    <!-- STICKY HEADER -->
    <div class="heady">
      <div class="columns">
        <div
          class="column is-two-thirds"
          style="padding-left:35px;"
        >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, ab.</div>
        <div class="column has-text-right" style="padding-right:35px;">
          <span style="font-weight:medium;padding-right:3px;">
            <a href="#" @click.prevent="closeStory()">CLOSE</a>
          </span>
          <button class="delete" style="margin-top:2px;" @click="closeStory()"></button>
        </div>
      </div>
    </div>
    <!-- END STICKY -->
    <!-- Modal content -->
    <div class="story-modal-content">
      <div class="content">
        <!-- START STORY -->
        <div class="card">
          <!-- CARD CONTENT -->
          <div class="card-content">
            <p class="title is-size-5 pb5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque earum ad labore fugit aspernatur
              aut.
            </p>
            <p class="subtitle is-size-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolorum repellendus fugiat velit esse
              culpa sint quis cum optio minus consequatur laboriosam eveniet rem iure illum eos omnis, nulla
              assumenda dignissimos? Odit et dolores eveniet, quos iure saepe commodi? Suscipit vel expedita
              iusto perspiciatis amet ducimus omnis similique fuga nulla numquam, consectetur mollitia
              perferendis assumenda reiciendis odit! Excepturi, distinctio.
            </p>

            <component :is="storyLayout"></component>

            <p class="content" style="margin-top:30px;">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolorum repellendus fugiat velit esse
              culpa sint quis cum optio minus consequatur laboriosam eveniet rem iure illum eos omnis, nulla
              assumenda dignissimos? Odit et dolores eveniet, quos iure saepe commodi? Suscipit vel expedita
              iusto perspiciatis amet ducimus omnis similique fuga nulla numquam, consectetur mollitia
              perferendis assumenda reiciendis odit! Excepturi, distinctio.
            </p>
            <div style="margin-top:100px;"></div>
          </div>
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
      <div style="margin-top:50px"></div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from "vuex";
import { mapGetters, mapActions } from "vuex";

export default {
  // beforeCreate() {
  //   console.log("BeforeCreate");
  //   console.log(
  //     `in beforeCreate story-modal mounted -> ${this.isStoryComponentMounted}`
  //   );
  // },
  // created() {
  //   console.log("created");
  //   console.log(
  //     `in created story-modal mounted -> ${this.isStoryComponentMounted}`
  //   );
  // },
  // beforeMount() {
  //   console.log("beforeMount");
  //   console.log(
  //     `in beforeMount story-modal mounted -> ${this.isStoryComponentMounted}`
  //   );
  // },
  mounted() {
    console.log("mounted");
    // this.$store.state.storyMounted = true;
    // can pass only one arg to state, so make it an object
    this.setStoryComponentMounted({ storyId: this.storyId, other: "whatever" });
    console.log(`in story-modal mount -> ${this.isStoryComponentMounted}`);
    console.log(`--------- ${this.storyId} ------------`);
  },
  // beforeUpdate() {
  //   console.log("beforeUpdate");
  // },
  // updated() {
  //   console.log("updated");
  // },
  // beforeDestroy() {
  //   console.log("BeforeDestroy");
  // },
  // destroyed() {
  //   console.log("destroyed");
  // },
  props: {
    picsLayout: {
      default: "layout-tiles",
      type: String
    },
    storyId: { type: String }
    // required: true } // TODO ADD ME LATA
  },
  methods: {
    // ...mapMutations(["setStoryComponentMounted", "resetStoryComponentMounted"]),
    ...mapActions(["setStoryComponentMounted", "resetStoryComponentMounted"]),
    // showStory() {
    //   this.$store.commit("showStory");
    // }
    closeStory() {
      console.log("Closing story");
      this.resetStoryComponentMounted();
      // destroy the vue listeners, etc
      this.$destroy();
      // remove the element from the DOM
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  computed: {
    ...mapGetters(["isStoryComponentMounted"]),
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
    // isStoryMounted() {
    //   return this.$store.getters.isStoryMounted;
    // }
  }
};
</script>

<style>
/***** SCROLL BAR WEBKIT & GECKO *****/
.story-modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 100;
  /* Sit on top */
  left: 0;
  top: 56px;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.8);
  /* Black w/ opacity */
  padding: 0 5rem 0 5rem;
}

/* Modal Content/Box */
.story-modal-content {
  background-color: #eff0eb;
  /* 15% from the top and centered */
  padding: 20px;
  /* border: 1px solid #222; */
  width: 100%;
}

/* Modal / hide scrollbar chrome applekit */
body.no-scrollbar-webkit::-webkit-scrollbar {
  display: none;
}

/* Modal / hide scrollbar firefox */
html.frf-hide-sb {
  scrollbar-width: none;
}

/*** sticky header ***/
.heady {
  position: -webkit-sticky;
  /* Safari */
  position: sticky;
  top: 0px;
  left: 0px;
  background: rgb(38, 96, 161);
  z-index: 1000;
  height: 45px;
  color: white;
}

.heady a,
.heady a:hover {
  color: white;
}

/*** content takes all width if <= 1024 ***/
@media only screen and (max-width: 1024px) {
  .story-modal {
    padding: 0;
  }
}

/*** spacing ***/
.mt10p20 {
  margin-top: 10px;
  padding-bottom: 20px;
}

*** comments ****/ .card.comments {
  margin-top: 25px;
}

.is-divider.is-comment-divider {
  margin: 12px 0 12px 0;
}
</style>