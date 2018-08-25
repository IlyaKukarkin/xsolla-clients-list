<template>
  <div id="clients-list-view">
    I'm a list of clients!

    <router-link :to="{ name: 'createClient' }">Add a client</router-link>

    <router-link :to="{ name: 'contractsListView' }">Go to a contracts</router-link>

    <ul>
      <li v-for="client, key in sortedClients">
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
        <router-link :to="{ name: 'updateClient', params: { clientId: client.id } }">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'clients-list-view',

  mounted () {
    this.loadClients();
  },

  methods: {
    ...mapActions([
      'deleteClient',
      'loadClients'
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
    }),

    sortedClients () {
      let sortedKeys = Object.keys(this.clients).sort((a, b) => {
        return this.clients[a].surname.localeCompare(this.clients[b].surname);
      });

      return sortedKeys.map((key) => {
        return this.clients[key];
      });
    }
  }
};
</script>

<style scoped lang='scss'>
  #clients-list-view {
  }
</style>
