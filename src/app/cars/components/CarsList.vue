<template>
  <div id="cars-list-view">
    <div class="container">

      <h3 class="title is-3">List of clients</h3>

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
              <a class="button is-danger" @click="confirmDeleteCar(car)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'cars-list-view',

  mounted () {
    this.loadCars();
  },

  methods: {
    ...mapActions([
      'deleteCar',
      'loadCars'
    ]),
    confirmDeleteCar (car) {
      if (confirm(`Are you sure you want to delete ${car.mark}?`)) {
        this.deleteCar(car);
      }
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

<style lang="scss">
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
