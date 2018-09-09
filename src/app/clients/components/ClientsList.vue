<template>
  <div id="clients-list-view">
    <div class="container">

      <h3 class="title is-3">Xsolla clients list</h3>

      <div class="tabs is-centered is-large is-hidden-touch">
        <ul>
          <li><router-link :to="{ name: 'contractsListView' }">Contracts</router-link></li>
          <li class="is-active"><a>Clients</a></li>
          <li><router-link :to="{ name: 'carsListView' }">Cars</router-link></li>
          <li><router-link :to="{ name: 'flatsListView' }">Flats</router-link></li>
        </ul>
      </div>

      <div class="menu is-hidden-desktop" style="margin-bottom: 20px">
        <ul class="menu-list">
          <li><router-link :to="{ name: 'contractsListView' }">Contracts</router-link></li>
          <li><a class="is-active">Clients</a></li>
          <li><router-link :to="{ name: 'carsListView' }">Cars</router-link></li>
          <li><router-link :to="{ name: 'flatsListView' }">Flats</router-link></li>
        </ul>
      </div>

      <div class="hero">
        <table class="table is-bordered is-hidden-desktop">
          <thead>
          <td colspan="2" style="border-width: 0 0 4px 0;">
            <router-link class="button is-link is-center" :to="{ name: 'createClient' }">Add client</router-link>
          </td>
          </thead>
          <tbody v-for="client in sortedClients" v-bind:key="client.id">
          <tr>
            <td>{{ clientKeyNames[0] }}</td>
            <td>{{ client.surname }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[1] }}</td>
            <td>{{ client.name }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[2] }}</td>
            <td>{{ client.patronymic }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[3] }}</td>
            <td>{{ client.email }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[4] }}</td>
            <td>{{ client.phone }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[5] }}</td>
            <td>{{ client.address }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[6] }}</td>
            <td>{{ client.series }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[7] }}</td>
            <td>{{ client.number }}</td>
          </tr>
          <tr>
            <td>{{ clientKeyNames[8] }}</td>
            <td>{{ client.birthDate }}</td>
          </tr>
          <tr>
            <td colspan="2"><router-link class="button is-primary" :to="{ name: 'updateClient', params: { clientId: client.id } }">Edit</router-link>
              <a class="button is-danger" @click="askDeleteClient(client)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>

      <table class="table is-bordered is-hidden-touch">
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

        <back-to-top bottom="50px" right="50px" visibleoffset="200">
          <button class="button btn-to-top">Top</button>
        </back-to-top>
        <in-contract-window v-bind:class="{ 'is-active': showInContractWindow }" v-bind:entity-type='entityType' v-on:ok="showInContractWindow = false"></in-contract-window>
        <DeleteWindow v-bind:class="{ 'is-active': showDeleteWindow }" v-bind:entity-name="clientFIODelete" v-bind:entity-type='entityType' v-on:cancel="showDeleteWindow = false" v-on:yes="deleteClientFunc"></DeleteWindow>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DeleteWindow from '../../components/deleteWindow';
import inContractWindow from '../../components/inContractWindow';
import BackToTop from 'vue-backtotop';

export default {
  name: 'clients-list-view',

  components: { DeleteWindow, inContractWindow, BackToTop },

  data: () => {
    return {
      showDeleteWindow: false,
      showInContractWindow: false,
      entityType: 'client',
      clientFIODelete: '',
      clientToDelete: {},
      clientKeyNames: ['Surname', 'Name', 'Patronymic', 'E-mail', 'Phone', 'Address', 'Passport series', 'Passport number', 'Birth Date']
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
      if (client.contractId) {
        this.showInContractWindow = true;
      } else {
        this.clientFIODelete = client.surname + ' ' + client.name.substring(0, 1).toUpperCase() + '. ' + client.patronymic.substring(0, 1).toUpperCase() + '.';
        this.clientToDelete = client;
        this.showDeleteWindow = true;
      }
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
  tbody:nth-child(odd) {
    background-color: rgba(187, 93, 79, 0.27);
  }
  tbody:nth-child(even) {
    background-color: rgba(34, 109, 59, 0.2);
  }
  .navbar-item.navbar-center {
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
  }
  .btn-to-top {
    width: 60px;
    height: 60px;
    padding: 10px 10px;
    border-radius: 50%;
    border-color: rgb(7,103,242);
    font-size: 24px;
    line-height: 22px;
    opacity: .6;
  }
</style>
