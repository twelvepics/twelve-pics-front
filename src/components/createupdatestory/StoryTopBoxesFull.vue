<template>
  <div
    class="columns is-variable is-2-mobile is-3-tablet is-8-desktop is-8-widescreen is-8-fullhd"
    style="margin-top:40px;"
  >
    <!-- LAYOUT BOX -->
    <div class="column is-two-fifths">
      <article class="message is-small box-has-shadow">
        <div class="message-header">
          <p>LAYOUT</p>
        </div>
        <div class="message-body add-story-layout-icons-box p8" style="background-color:#999;">
          <p class="content" style="margin-bottom:0;">
            <img
              class="icon-hover"
              style="width:48px; height:auto;"
              :src="story.layout === 'horizontal' ? '/img/layout-horizontal-on.png' : '/img/layout-horizontal-off.png'"
              @click="selectLayout('horizontal')"
            />
          </p>
          <p class="content" style="margin-bottom:0;">
            <img
              class="icon-hover"
              style="width:48px; height:auto;"
              :src="story.layout === 'tiles' ? '/img/layout-tiles-on.png' : '/img/layout-tiles-off.png'"
              @click="selectLayout('tiles')"
            />
          </p>

          <p class="content" style="margin-bottom:0;">
            <img
              class="icon-hover"
              style="width:48px; height:auto;"
              :src="story.layout === 'vertical' ? '/img/layout-vertical-on.png' : '/img/layout-vertical-off.png'"
              @click="selectLayout('vertical')"
            />
          </p>
          <p class="content" style="margin-bottom:0;">
            <img
              class="icon-hover"
              style="width:48px; height:auto;"
              :src="story.layout === 'carousel' ? '/img/layout-carousel-on.png' : '/img/layout-carousel-off.png'"
              @click="selectLayout('carousel')"
            />
          </p>
          <p
            class="content selected-layout"
            style="padding-top: .2rem"
          >{{ story.layout.toUpperCase() }}</p>
        </div>
      </article>
    </div>
    <!-- ENDS LAYOUT BOX -->
    <!-- STATUS BOX -->
    <!-- STATUS PUBLISHED -->
    <div v-if="story.status === 'published'" class="column is-two-fifths">
      <article class="message is-success is-small box-has-shadow">
        <div class="message-header">
          <p>STATUS</p>
        </div>
        <div class="message-body pub-unpub-story-layout-box" style="padding:.75rem 1rem 1rem 1rem">
          <p class="icon icon-hover has-text-success is-large" style="padding:0;margin:0;">
            <span class="icon is-left">
              <font-awesome-icon class="fas fa-2x" icon="check-circle"></font-awesome-icon>
            </span>

            <span
              class="content has-text-success pub-unpub-story-txt"
              style="padding-left:.3rem; font-size: 140%;"
            >PUBLISHED</span>
          </p>
          <p>
            <button
              class="button is-success"
              style="font-size:.85rem"
              @click.prevent="setStatus('draft')"
            >UNPUBLISH</button>
          </p>
        </div>
      </article>
    </div>
    <!-- STATUS DRAFT -->
    <div v-if="story.status === 'draft'" class="column is-two-fifths">
      <article class="message is-warning is-small box-has-shadow">
        <div class="message-header">
          <p>STATUS</p>
        </div>
        <div class="message-body pub-unpub-story-layout-box" style="padding:.75rem 1rem 1rem 1rem">
          <p class="icon icon-hover has-text-warning is-large" style="padding:0;margin:0;">
            <span class="icon is-left">
              <font-awesome-icon class="fas fa-2x" icon="ban"></font-awesome-icon>
            </span>

            <span
              class="content has-text-warning pub-unpub-story-txt"
              style="padding-left:.3rem; font-size:130%;"
            >DRAFT</span>
          </p>
          <p>
            <button
              class="button is-warning"
              style="font-size:.85rem;"
              @click.prevent="setStatus('published')"
            >PUBLISH</button>
          </p>
        </div>
      </article>
    </div>
    <!-- ENDS STATUS BOX -->
    <!-- DELETE BOX -->
    <div class="column">
      <article class="message is-danger is-small box-has-shadow">
        <div class="message-header">
          <p>DELETE</p>
        </div>
        <div class="message-body delete-story">
          <p class="icon icon-hover has-text-danger is-large" @click="deleteStory()">
            <font-awesome-icon class="fas fa-3x" icon="trash-alt"></font-awesome-icon>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: "StoryLayoutFullFull",
  props: { story: Object },
  methods: {
    selectLayout(layoutType) {
      this.$emit("selectLayout", layoutType);
    },
    deleteStory() {
      this.$emit("deleteStory");
    },
    setStatus(status) {
      this.$emit("setStatus", status);
    }
  }
};
</script>
<style scoped>
.icon-hover {
  cursor: pointer;
}
/************** grids ***********/
.add-story-layout-icons-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  align-items: start;
}
.selected-layout {
  grid-column: 1 / span 4;
  justify-self: center;
  color: yellow;
  font-weight: bold;
}
.pub-unpub-story-layout-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
}
.pub-unpub-story-txt {
  /* grid-column: 2 / span 4; */
  /* justify-self: start; */
  font-weight: bold;
}
.delete-story {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
.box-has-shadow {
  box-shadow: 2px 2px 8px #aaa;
}
.p8 {
  padding: 8px;
}
</style>
                  
                