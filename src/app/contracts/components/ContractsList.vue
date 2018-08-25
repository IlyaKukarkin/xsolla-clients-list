<template>
  <div id="contracts-list-view">
    I'm a list of contracts!

    <router-link :to="{ name: 'createContract' }">Add a contract</router-link>

    <ul>
      <li v-for="contract, key in sortedContracts">
        {{ contract.summ }}
        {{ contract.prePaid }}
        {{ contract.startDate }}
        {{ contract.finishDate }}
        <a @click="confirmDeleteContract(contract)">Delete</a>
        <router-link :to="{ name: 'updateContract', params: { contractId: contract.id } }">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'contracts-list-view',

  mounted () {
    this.loadContracts();
  },

  methods: {
    ...mapActions([
      'deleteContract',
      'loadContracts'
    ]),
    confirmDeleteContract (contract) {
      if (confirm(`Are you sure you want to delete ${contract.surname}?`)) {
        this.deleteContract(contract);
      }
    }
  },

  computed: {
    ...mapState({
      'contracts': state => state.contracts.contracts
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
