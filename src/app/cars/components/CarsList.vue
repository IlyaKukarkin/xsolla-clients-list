<template>
  <div id="cars-list-view">
    <div class="container">

      <h3 class="title is-3">Xsolla clients list</h3>

      <div class="tabs is-centered is-large">
        <ul>
          <li><router-link :to="{ name: 'contractsListView' }">Contracts</router-link></li>
          <li><router-link :to="{ name: 'clientsListView' }">Clients</router-link></li>
          <li class="is-active"><a>Cars</a></li>
          <li><router-link :to="{ name: 'flatsListView' }">Flats</router-link></li>
        </ul>
      </div>

      <div class="hero">
        <table class="table is-bordered">
          <thead>
          <tr>
            <th>Mark</th>
            <th>Model</th>
            <th>Year</th>
            <th>Number</th>
            <th> <router-link class="button is-link" :to="{ name: 'createCar' }">Add car</router-link> </th>
          </tr>
          </thead>
          <tbody>
          <tr v-bind:key="car.carId" v-for="car in sortedCars" >
            <td>
              <span class="subtitle is-5">{{ car.mark }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ car.model }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ car.year }}</span>
            </td>
            <td>
              <span class="subtitle is-5">{{ car.number }}</span>
            </td>
            <td>
              <router-link class="button is-primary" :to="{ name: 'updateCar', params: { carId: car.id } }">Edit</router-link>
              <a class="button is-danger" @click="askDeleteCar(car)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
        <in-contract-window v-bind:class="{ 'is-active': showInContractWindow }" v-bind:entity-type='entityType' v-on:ok="showInContractWindow = false"></in-contract-window>
        <DeleteWindow v-bind:class="{ 'is-active': showDeleteWindow }" v-bind:entity-name="carNameDelete" v-bind:entity-type='entityType' v-on:cancel="showDeleteWindow = false" v-on:yes="deleteCarFunc"></DeleteWindow>
      </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DeleteWindow from '../../components/deleteWindow';
import inContractWindow from '../../components/inContractWindow';

export default {
  name: 'cars-list-view',

  components: { DeleteWindow, inContractWindow },

  data: () => {
    return {
      showDeleteWindow: false,
      showInContractWindow: false,
      entityType: 'car',
      carNameDelete: '',
      carToDelete: {}
    };
  },

  mounted () {
    this.loadCars();
  },

  methods: {
    ...mapActions([
      'deleteCar',
      'loadCars'
    ]),

    askDeleteCar (car) {
      if (car.contractId) {
        this.showInContractWindow = true;
      } else {
        this.carNameDelete = car.mark + ' ' + car.model;
        this.carToDelete = car;
        this.showDeleteWindow = true;
      }
    },

    deleteCarFunc () {
      this.deleteCar(this.carToDelete);
      this.showDeleteWindow = false;
    }
  },

  computed: {
    ...mapState({
      'cars': state => state.cars.cars
    }),

    sortedCars () {
      let sortedKeys = Object.keys(this.cars).sort((a, b) => {
        return this.cars[a].mark.localeCompare(this.cars[b].mark);
      });

      return sortedKeys.map((key) => {
        return this.cars[key];
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
