<template>
  <div id="clients-list-view">
    I'm a list of clients!

    <router-link :to="{ name: 'createEditClient' }">Add an client</router-link>

    <ul>
      <li v-for="client, key in clients">
        {{ client.surname }}
        {{ client.name }}
        {{ client.patronymic }}
        {{ client.email }}
        {{ client.phone }}
        {{ client.address }}
        {{ client.series }}
        {{ client.number }}
        {{ client.birthDate }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'clients-list-view',

  computed: {
    ...mapState({
      'clients': state => state.clients.clients
    })
  }
};
</script>

<style scoped lang='scss'>
  #clients-list-view {
  }
</style>
