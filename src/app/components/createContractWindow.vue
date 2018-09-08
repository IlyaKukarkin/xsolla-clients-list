<template>
  <div class="modal">
    <div class="modal-background" v-on:click="$emit('ok')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Error</p>
        <button class="delete" aria-label="close" v-on:click="$emit('ok')"></button>
      </header>
      <section class="modal-card-body" style="font-size: 16pt">
        {{ this.text }}
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
  name: 'createContractWindow',

  data: () => {
    return {
      text: 'You don\'t have a client and object of evaluation to link with new contract! Create new one\'s or free from contract some old one\'s.'
    };
  }
};
</script>

<style scoped>

</style>
