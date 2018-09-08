<template>
  <div class="modal">
    <div class="modal-background" v-on:click="$emit('ok')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Error</p>
        <button class="delete" aria-label="close" v-on:click="$emit('ok')"></button>
      </header>
      <section class="modal-card-body" style="font-size: 16pt">
        This {{this.entityType}} {{ this.text }} {{this.entityType}} first.
      </section>
      <footer class="modal-card-foot">
        <div class="container">
          <button class="button is-primary" v-on:click="$emit('ok')">OK</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inContractWindow',

  props: {
    entityType: ''
  },

  data: () => {
    return {
      text: 'connected to a contract. Delete contract with that'
    };
  }
};
</script>

<style scoped>

</style>
