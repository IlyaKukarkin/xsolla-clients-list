<template>
  <div class="modal">
    <div class="modal-background" v-on:click="$emit('ok')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Client info</p>
        <button class="delete" aria-label="close" v-on:click="$emit('ok')"></button>
      </header>
      <section class="modal-card-body" style="font-size: 16pt">
        <div class="columns is-hidden-touch">
          <div class="column is-half has-text-right">
            <p>Surname: </p>
            <p>Name: </p>
            <p>Patronymic: </p>
            <p>E-mail: </p>
            <p>Phone: </p>
            <p>Address: </p>
            <p>Passport series: </p>
            <p>Passport number: </p>
            <p>Date of birth: </p>
          </div>
          <div class="column is-half has-text-left">
            <p>{{this.client.surname}} </p>
            <p>{{this.client.name}} </p>
            <p>{{this.client.patronymic}} </p>
            <p>{{this.client.email}} </p>
            <p>{{this.client.phone}} </p>
            <p>{{this.client.address}} </p>
            <p>{{this.client.series}} </p>
            <p>{{this.client.number}} </p>
            <p>{{this.client.birthDate}} </p>
          </div>
        </div>
        <div class="is-hidden-desktop">
          <p>Surname: {{this.client.surname}}</p>
          <p>Name: {{this.client.name}}</p>
          <p>Patronymic: {{this.client.patronymic}}</p>
          <p>E-mail: {{this.client.email}}</p>
          <p>Phone: {{this.client.phone}}</p>
          <p>Address: {{this.client.address}}</p>
          <p>Passport series: {{this.client.series}}</p>
          <p>Passport number: {{this.client.number}}</p>
          <p>Date of birth: {{this.client.birthDate}}</p>
        </div>
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
  name: 'clientInfoWindow',

  props: {
    client: {}
  }
};
</script>

<style scoped>

</style>
