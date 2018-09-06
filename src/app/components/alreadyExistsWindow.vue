<template>
  <div class="modal">
    <div class="modal-background" v-on:click="$emit('ok')"></div>
    <div class="modal-card" v-on:click="$emit('ok')">
      <header class="modal-card-head" v-on:click="$emit('ok')">
        <p class="modal-card-title">Error</p>
        <button class="delete" aria-label="close" v-on:click="$emit('ok')"></button>
      </header>
      <section class="modal-card-body" style="font-size: 16pt" v-on:click="$emit('ok')">
        {{ this.messageStart }} {{this.entityType}} {{this.messageEnd}}
      </section>
      <footer class="modal-card-foot" v-on:click="$emit('ok')">
        <div class="container">
          <button class="button is-primary" v-on:click="$emit('ok')">OK</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alreadyExistsWindow',

  props: {
    entityType: ''
  },

  data: () => {
    return {
      messageStart: 'This ',
      messageEnd: ' already exists!'
    };
  }
};
</script>

<style scoped>

</style>
