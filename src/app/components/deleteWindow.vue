<template>
  <div class="modal">
    <div class="modal-background" v-on:click="$emit('cancel')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete?</p>
        <button class="delete" aria-label="close" v-on:click="$emit('cancel')"></button>
      </header>
      <section class="modal-card-body" style="font-size: 16pt">
        {{ this.question }} {{this.entityType}} "{{this.entityName}}"?
      </section>
      <footer class="modal-card-foot">
        <div class="container">
          <button class="button is-primary" v-on:click="$emit('yes')">Yes</button>
          <button class="button is-link" v-on:click="$emit('cancel')">Cancel</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deleteWindow',

  props: {
    entityName: '',
    entityType: ''
  },

  data: () => {
    return {
      question: 'Are you sure you want to delete '
    };
  }
};
</script>

<style scoped>

</style>
