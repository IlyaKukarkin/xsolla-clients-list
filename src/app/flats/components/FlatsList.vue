<template>
  <div id="flats-list-view">
    <div class="container">

      <h3 class="title is-3">Xsolla clients list</h3>

      <div class="tabs is-centered is-large is-hidden-touch">
        <ul>
          <li><router-link :to="{ name: 'contractsListView' }">Contracts</router-link></li>
          <li><router-link :to="{ name: 'clientsListView' }">Clients</router-link></li>
          <li><router-link :to="{ name: 'carsListView' }">Cars</router-link></li>
          <li class="is-active"><a>Flats</a></li>
        </ul>
      </div>

      <div class="menu is-hidden-desktop" style="margin-bottom: 20px">
        <ul class="menu-list">
          <li><router-link :to="{ name: 'contractsListView' }">Contracts</router-link></li>
          <li><router-link :to="{ name: 'clientsListView' }">Clients</router-link></li>
          <li><router-link :to="{ name: 'carsListView' }">Cars</router-link></li>
          <li><a class="is-active">Flats</a></li>
        </ul>
      </div>

      <div class="hero">
        <table class="table is-bordered is-hidden-desktop">
          <thead>
          <td colspan="2" style="border-width: 0 0 4px 0;">
            <router-link class="button is-link is-center" :to="{ name: 'createFlat' }">Add flat</router-link>
          </td>
          </thead>
          <tbody v-for="flat in sortedFlats" v-bind:key="flat.id">
          <tr>
            <td>{{ flatKeyNames[0] }}</td>
            <td>{{ flat.address }}</td>
          </tr>
          <tr>
            <td>{{ flatKeyNames[1] }}</td>
            <td>{{ flat.rooms }}</td>
          </tr>
          <tr>
            <td>{{ flatKeyNames[2] }}</td>
            <td>{{ flat.area }}</td>
          </tr>
          <tr>
            <td>{{ flatKeyNames[3] }}</td>
            <td>{{ flat.floor }}</td>
          </tr>
          <tr>
            <td colspan="2"><router-link class="button is-primary" :to="{ name: 'updateFlat', params: { flatId: flat.id } }">Edit</router-link>
              <a class="button is-danger" @click="askDeleteFlat(flat)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>

        <table class="table is-bordered is-hidden-touch">
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

        <back-to-top bottom="50px" right="50px" visibleoffset="200">
          <button class="button is-link">To the top</button>
        </back-to-top>
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
import BackToTop from 'vue-backtotop';

export default {
  name: 'flats-list-view',

  components: { DeleteWindow, inContractWindow, BackToTop },

  data: () => {
    return {
      showDeleteWindow: false,
      showInContractWindow: false,
      entityType: 'flat',
      flatAddressDelete: '',
      flatToDelete: {},
      flatKeyNames: ['Address', 'Number of rooms', 'Area', 'Floor']
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
</style>
