<template>
  <div id="clients-list-view">
    I'm a list of clients!

    <router-link :to="{ name: 'createClient' }">Add an client</router-link>

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
        <a @click="confirmDeleteClient(client)">Delete</a>
        <router-link :to="{ name: 'editClient', params: { clientId: client.id } }">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'clients-list-view',

  methods: {
    ...mapActions([
      'deleteClient'
    ]),
    confirmDeleteClient (client) {
      if (confirm(`Are you sure you want to delete ${client.surname}?`)) {
        this.deleteClient(client);
      }
    }
  },

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
