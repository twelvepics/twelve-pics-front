<template>
  <div class="card comments" style="margin-top:25px;">
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
      <div class="content comment">
        <p class="comment-info">
          <a>Author from comment</a> - 124 Days ago
        </p>
        <p class="comment">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, tempora odio. Nulla eligendi
          aperiam facere aliquam, debitis nemo soluta ut sapiente. Possimus eaque distinctio natus.
        </p>
      </div>
      <p class="is-divider is-comment-divider"></p>
      <div class="content">
        <p class="comment-info">
          <a>Author from comment</a> - 124 Days ago
        </p>
        <p class="comment">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, tempora odio. Nulla eligendi
          aperiam facere aliquam, debitis nemo soluta ut sapiente. Possimus eaque distinctio natus.
        </p>
      </div>
      <p class="is-divider is-comment-divider"></p>
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
  border-top: 1px solid #dbdbdb;
}
.comment-info {
  color: #aaa;
  font-size: 90%;
  margin-bottom: 0.2rem !important;
}
</style>