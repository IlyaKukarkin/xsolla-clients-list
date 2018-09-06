<template>
  <div id="clients-list-view">
    <div class="container">

      <h3 class="title is-3">List of clients</h3>

      <div class="tabs is-centered is-large">
        <ul>
          <li><router-link :to="{ name: 'contractsListView' }">Contracts</router-link></li>
          <li class="is-active"><a>Clients</a></li>
          <li><router-link :to="{ name: 'carsListView' }">Cars</router-link></li>
          <li><router-link :to="{ name: 'flatsListView' }">Flats</router-link></li>
        </ul>
      </div>

      <div class="hero">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>Surname</th>
            <th>Name</th>
            <th>Patronymic</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Passport series</th>
            <th>Passport number</th>
            <th>Birth Date</th>
            <th> <router-link class="button is-link" :to="{ name: 'createClient' }">Add client</router-link> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="client.clientId" v-for="client in sortedClients" >
            <td>
              <span class="subtitle is-5">{{ client.surname }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.name }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.patronymic }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.email }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.phone }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.address }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.series }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.number }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ client.birthDate }}</span>
            </td>
            <td>
              <router-link class="button is-primary" :to="{ name: 'updateClient', params: { clientId: client.id } }">Edit</router-link>
              <a class="button is-danger" @click="askDeleteClient(client)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
        <DeleteWindow v-bind:class="{ 'is-active': showDeleteWindow }" v-bind:entity-name="clientFIODelete" v-bind:entity-type='entityType' v-on:cancel="showDeleteWindow = false" v-on:yes="deleteClientFunc"></DeleteWindow>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DeleteWindow from '../../components/deleteWindow';

export default {
  name: 'clients-list-view',

  components: { DeleteWindow },

  data: () => {
    return {
      showDeleteWindow: false,
      entityType: 'client',
      clientFIODelete: '',
      clientToDelete: {}
    };
  },

  mounted () {
    this.loadClients();
  },

  methods: {
    ...mapActions([
      'deleteClient',
      'loadClients'
    ]),

    askDeleteClient (client) {
      this.clientFIODelete = client.surname + ' ' + client.name.substring(0, 1).toUpperCase() + '. ' + client.patronymic.substring(0, 1).toUpperCase() + '.';
      this.clientToDelete = client;
      this.showDeleteWindow = true;
    },

    deleteClientFunc () {
      this.deleteClient(this.clientToDelete);
      this.showDeleteWindow = false;
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
  .table td, .table th {
    border-color: #bbbbbb;
    text-align: center;
    vertical-align: middle;
  }
  thead tr {
    background-color: rgba(187, 93, 79, 0.27);
    font-size: 14pt;
  }
  tbody tr {
    background-color: rgba(34, 109, 59, 0.2);
  }
</style>
