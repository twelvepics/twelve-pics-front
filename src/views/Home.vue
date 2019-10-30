<template>
  <!-- START MAIN CONTENT -->
  <main>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column auto">
          <!-- PIC LANDSCAPE BOX-->
          <div class="box story-item-pic-landscape">
            <p class="title is-5" style="margin-bottom:.6em;">
              <a href="#" @click.prevent="mountStoryModalComp" data-story-id="xoxo-xixi">
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Laborum, modi?
              </a>
            </p>
            <p class="pic">
              <img src="/img/thumb2.png" width="200" height="auto" />
            </p>
            <p class="pitch">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis modi
              numquam quibusdam! Delectus commodi vero nulla accusantium culpa veniam quis saepe
              labore nesciunt deleniti provident consequatur distinctio rerum, quibusdam officia
              molestias velit maxime temporibus neque eum porro placeat?
            </p>
            <div class="is-divider story-divider"></div>
            <p
              class="bottom-line"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis</p>
          </div>
          <!-- END PIC LANDSCAPE BOX-->
          <!-- PIC PORTRAIT BOX-->
          <div class="box story-item-pic-portrait">
            <div class="title-pitch">
              <p class="title is-5" style="margin-bottom:.3em;">
                <a href="#" @click="mountStoryModalComp" data-story-id="xaxa-xuxu">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Laborum, modi?
                </a>
              </p>
              <p class="pitch">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis modi
                numquam quibusdam! Delectus commodi vero nulla accusantium culpa veniam quis saepe
                labore nesciunt deleniti provident consequatur distinctio rerum, quibusdam officia
                molestias velit maxime temporibus neque eum porro placeat?
              </p>
            </div>
            <p class="pic">
              <img src="/img/thumb6.png" width="120" height="auto" />
            </p>
            <div class="is-divider story-divider"></div>
            <p
              class="bottom-line"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis</p>
          </div>
          <!-- END PIC PORTRAIT BOX-->

          <!-- PIC LANDSCAPE BOX-->
          <div class="box story-item-pic-landscape">
            <p class="title is-5" style="margin-bottom:.6em;">
              <a href="#" @click="mountStoryModalComp" data-story-id="xexe-xyxy">
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Laborum, modi?
              </a>
            </p>
            <p class="pic">
              <img src="/img/thumb2.png" width="200" height="auto" />
            </p>
            <p class="pitch">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis modi
              numquam quibusdam! Delectus commodi vero nulla accusantium culpa veniam quis saepe
              labore nesciunt deleniti provident consequatur distinctio rerum, quibusdam officia
              molestias velit maxime temporibus neque eum porro placeat?
            </p>
            <div class="is-divider story-divider"></div>
            <p
              class="bottom-line"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis</p>
          </div>
          <!-- END PIC LANDSCAPE BOX-->
          <!-- PIC PORTRAIT BOX-->
          <div class="box story-item-pic-portrait">
            <div class="title-pitch">
              <p class="title is-5" style="margin-bottom:.3em;">
                <a href="#" @click="mountStoryModalComp" data-story-id="xaxa-xoxo">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Laborum, modi?
                </a>
              </p>
              <p class="pitch">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis modi
                numquam quibusdam! Delectus commodi vero nulla accusantium culpa veniam quis saepe
                labore nesciunt deleniti provident consequatur distinctio rerum, quibusdam officia
                molestias velit maxime temporibus neque eum porro placeat?
              </p>
            </div>
            <p class="pic">
              <img src="/img/thumb6.png" width="120" height="auto" />
            </p>
            <div class="is-divider story-divider"></div>
            <p
              class="bottom-line"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur nobis</p>
          </div>
          <!-- END PIC PORTRAIT BOX-->
        </div>
        <div class="is-divider-vertical"></div>
        <div class="column is-narrow is-hidden-touch">
          <div class="notification is-danger" style="padding:1em;">
            <p class="title is-5">Fixed column</p>
            <p class="content">This column is fixed 300px wide.</p>
          </div>
        </div>
      </div>
    </div>
    <div ref="story-modal"></div>
  </main>
  <!-- END MAIN CONTENT -->
</template>

<script>
// eslint-disable-next-line
import Vue from "vue";
import StoryModal from "../components/StoryModal.vue";
///////////////////////////////////////
// @ is an alias to /src
///////////////////////////////////////
export default {
  name: "home",
  // data: function() {},
  methods: {
    mountStoryModalComp(event) {
      // console.log("--------------------");
      // console.log(event.target.dataset.storyId);
      // console.log("--------------------");
      var ComponentClass = Vue.extend(StoryModal);
      var instance = new ComponentClass({
        store: this.$store,
        parent: this,
        propsData: {
          storyId: event.target.dataset.storyId
        }
      });
      // console.log(this);
      instance.$mount(); // pass nothing
      this.$refs["story-modal"].appendChild(instance.$el);
    }
  },
  components: {
    // StoryModal
  }
};
</script>

<style scoped>
/**************** STORIES BOXES STYLES *****************/
.story-item-pic-landscape {
  display: grid;
  grid-template-columns: 200px 15px 1fr;
}

.story-item-pic-landscape .title {
  grid-column: 1 / -1;
}

/* .story-item-pic-landscape .pic {} */

.story-item-pic-landscape .pitch {
  grid-column: 3 / -1;
}

.story-item-pic-portrait {
  display: grid;
  grid-template-columns: 122px 15px 1fr;
  grid-auto-rows: min-content;
}

.story-item-pic-portrait .pic {
  grid-column: 1 / 2;
  grid-row: 1 / span 2;
}

.story-item-pic-portrait .title-pitch {
  grid-column: 3 / -1;
  grid-row: 1 / span 2;
}

.bottom-line {
  grid-column: 1 / -1;
}

.story-divider {
  grid-column: 1 / -1;
}
</style>
