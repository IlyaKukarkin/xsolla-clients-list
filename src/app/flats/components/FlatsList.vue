<template>
  <div id="flats-list-view">
    <div class="container">

      <h3 class="title is-3">Xsolla clients list</h3>

      <div class="tabs is-centered is-large">
        <ul>
          <li><router-link :to="{ name: 'contractsListView' }">Contracts</router-link></li>
          <li><router-link :to="{ name: 'clientsListView' }">Clients</router-link></li>
          <li><router-link :to="{ name: 'carsListView' }">Cars</router-link></li>
          <li class="is-active"><a>Flats</a></li>
        </ul>
      </div>

      <div class="hero">
        <table class="table is-bordered">
          <thead>
          <tr>
            <th>Address</th>
            <th>Number of rooms</th>
            <th>Area</th>
            <th>Floor</th>
            <th> <router-link class="button is-link" :to="{ name: 'createFlat' }">Add flat</router-link> </th>
          </tr>
          </thead>
          <tbody>
          <tr v-bind:key="flat.flatId" v-for="flat in sortedFlats" >
            <td>
              <span class="subtitle is-5">{{ flat.address }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ flat.rooms }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ flat.area }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ flat.floor }}</span>
            </td>
            <td>
              <router-link class="button is-primary" :to="{ name: 'updateFlat', params: { flatId: flat.id } }">Edit</router-link>
              <a class="button is-danger" @click="askDeleteFlat(flat)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
        <in-contract-window v-bind:class="{ 'is-active': showInContractWindow }" v-bind:entity-type='entityType' v-on:ok="showInContractWindow = false"></in-contract-window>
        <DeleteWindow v-bind:class="{ 'is-active': showDeleteWindow }" v-bind:entity-name="flatAddressDelete" v-bind:entity-type='entityType' v-on:cancel="showDeleteWindow = false" v-on:yes="deleteFlatFunc"></DeleteWindow>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DeleteWindow from '../../components/deleteWindow';
import inContractWindow from '../../components/inContractWindow';

export default {
  name: 'flats-list-view',

  components: { DeleteWindow, inContractWindow },

  data: () => {
    return {
      showDeleteWindow: false,
      showInContractWindow: false,
      entityType: 'flat',
      flatAddressDelete: '',
      flatToDelete: {}
    };
  },

  mounted () {
    this.loadFlats();
  },

  methods: {
    ...mapActions([
      'deleteFlat',
      'loadFlats'
    ]),

    askDeleteFlat (flat) {
      if (flat.contractId) {
        this.showInContractWindow = true;
      } else {
        this.flatAddressDelete = flat.address;
        this.flatToDelete = flat;
        this.showDeleteWindow = true;
      }
    },

    deleteFlatFunc () {
      this.deleteFlat(this.flatToDelete);
      this.showDeleteWindow = false;
    }
  },

  computed: {
    ...mapState({
      'flats': state => state.flats.flats
    }),

    sortedFlats () {
      let sortedKeys = Object.keys(this.flats).sort((a, b) => {
        return this.flats[a].address.localeCompare(this.flats[b].address);
      });

      return sortedKeys.map((key) => {
        return this.flats[key];
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
