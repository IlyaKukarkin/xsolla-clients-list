<template>
  <div id="contracts-list-view">
    <h1 class="title is-1">List of contracts</h1>

    <router-link :to="{ name: 'createContract' }">Add a contract</router-link>

    <router-link :to="{ name: 'clientsListView' }">Clients</router-link>

    <router-link :to="{ name: 'carsListView' }">Cars</router-link>

    <ul>
      <li v-for="contract, key in sortedContracts">
        {{ contract.summ }}
        {{ contract.prePaid }}
        {{ contract.startDate }}
        {{ contract.finishDate }}
        {{ getClientFIO(contract.clientId) }}
        <a @click="confirmDeleteContract(contract)">Delete</a>
        <router-link :to="{ name: 'updateContract', params: { contractId: contract.id } }">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'contracts-list-view',

  created () {
    this.loadClients();
  },

  mounted () {
    this.loadContracts();
  },

  methods: {
    ...mapActions([
      'deleteContract',
      'loadContracts',
      'loadClients'
    ]),

    confirmDeleteContract (contract) {
      if (confirm(`Are you sure you want to delete this contract?`)) {
        this.deleteContract(contract);
      }
    },

    getClientFIO (clientId) {
      let client = this.getClientFromId(clientId);
      return client.surname + ' ' + client.name.substring(0, 1).toUpperCase() + ' ' + client.patronymic.substring(0, 1).toUpperCase();
    }
  },

  computed: {
    ...mapGetters([
      'getClientFromId'
    ]),

    ...mapState({
      'contracts': state => state.contracts.contracts,
      'clients': state => state.clients.clients
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
  #contracts-list-view {
  }
</style>
