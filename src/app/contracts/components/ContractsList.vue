<template>
  <div id="contracts-list-view">
    <div class="container">

    <h3 class="title is-3">Xsolla clients list</h3>

      <div class="tabs is-centered is-large">
        <ul>
          <li class="is-active"><a>Contracts</a></li>
          <li><router-link :to="{ name: 'clientsListView' }">Clients</router-link></li>
          <li><router-link :to="{ name: 'carsListView' }">Cars</router-link></li>
          <li><router-link :to="{ name: 'flatsListView' }">Flats</router-link></li>
        </ul>
      </div>

      <div class="hero">
        <table class="table is-bordered">
          <thead>
          <tr>
            <th>Summ</th>
            <th>Prepaid</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Client</th>
            <th>Object Type</th>
            <th> <router-link class="button is-link" :to="{ name: 'createContract' }">Add contract</router-link> </th>
          </tr>
          </thead>
          <tbody>
          <tr v-bind:key="contract.contractId" v-for="contract in sortedContracts" >
            <td>
              <span class="subtitle is-5">{{ contract.summ }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ contract.prePaid }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ contract.startDate }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ contract.finishDate }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ getClientFIO(contract.clientId) }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ getObjectType(contract.objectId) }}</span>
            </td>
            <td>
              <router-link class="button is-primary" :to="{ name: 'updateContract', params: { contractId: contract.id } }">Edit</router-link>
              <a class="button is-danger" @click="askDeleteContract(contract)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
        <DeleteWindow v-bind:class="{ 'is-active': showDeleteWindow }" v-bind:entity-name="contractSummDelete" v-bind:entity-type='entityType' v-on:cancel="showDeleteWindow = false" v-on:yes="deleteContractFunc"></DeleteWindow>
      </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import DeleteWindow from '../../components/deleteWindow';

export default {
  name: 'contracts-list-view',

  components: { DeleteWindow },

  data: () => {
    return {
      showDeleteWindow: false,
      entityType: 'contract',
      contractSummDelete: '',
      contractToDelete: {}
    };
  },

  created () {
    this.loadClients();
    this.loadContracts();
    this.loadFlats();
    this.loadCars();
  },

  methods: {
    ...mapActions([
      'deleteContract',
      'loadContracts',
      'loadClients',
      'loadFlats',
      'loadCars'
    ]),

    askDeleteContract (contract) {
      this.contractSummDelete = contract.summ;
      this.contractToDelete = contract;
      this.showDeleteWindow = true;
    },

    deleteContractFunc () {
      this.deleteContract(this.contractToDelete);
      this.showDeleteWindow = false;
    },

    getClientFIO (clientId) {
      let client = this.getClientFromId(clientId);
      return client.surname + ' ' + client.name.substring(0, 1).toUpperCase() + '. ' + client.patronymic.substring(0, 1).toUpperCase() + '.';
    },

    getObjectType (objectId) {
      let selectedObject = this.getFlatFromId(objectId);
      if (typeof selectedObject === 'object') {
        return 'Flat';
      } else {
        // selectedObject = this.getCarFromId(objectId);
        return 'Car';
      }
    }
  },

  computed: {
    ...mapGetters([
      'getClientFromId',
      'getCarFromId',
      'getFlatFromId'
    ]),

    ...mapState({
      'contracts': state => state.contracts.contracts,
      'clients': state => state.clients.clients,
      'cars': state => state.cars.cars,
      'flats': state => state.flats.flats
    }),

    sortedContracts () {
      let sortedKeys = Object.keys(this.contracts).sort((a, b) => {
        let dateA = Date.parse(this.contracts[a].startDate);
        let dateB = Date.parse(this.contracts[b].startDate);
        return dateA - dateB;
      });

      return sortedKeys.map((key) => {
        return this.contracts[key];
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
