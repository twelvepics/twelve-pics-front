<template>
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
</template>
<script>
export default {
  props: ["comments"]
};
</script>

<style scoped>
/*** comments ****/
.card.comments {
  margin-top: 25px;
}
.is-divider.is-comment-divider {
  margin: 12px 0 12px 0;
}
</style>