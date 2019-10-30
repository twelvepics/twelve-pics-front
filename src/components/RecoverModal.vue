<template>
  <!-- RECOVER MODAL -->
  <div class="modal" id="recover-modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message">
        <div class="message-header">
          <p is-1>Recover My password</p>
          <button class="delete is-medium" id="recover-close"></button>
        </div>
        <div class="message-body">
          <p>
            Recover my password Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Omnis, ipsam. Lorem ipsum dolor sit amet.
          </p>
          <div class="field">
            <label class="label">My email address</label>
            <div class="control">
              <input class="input" type="email" placeholder="Email address to send recovery link" />
            </div>
          </div>
          <div class="field is-grouped submit-buttons">
            <div class="control">
              <button class="button is-primary">Submit</button>
            </div>
            <div class="control">
              <button class="button is-dark">Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
  <!-- END RECOVER MODAL -->
</template>
<style scoped>
.submit-buttons {
  margin-top: 10px;
}
</style>