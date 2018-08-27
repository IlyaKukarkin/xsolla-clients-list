<template>
  <div id="cars-list-view">
    <h1 class="title is-1">List of cars</h1>

    <router-link :to="{ name: 'createCar' }">Add a car</router-link>

    <router-link :to="{ name: 'contractsListView' }">Back to contracts</router-link>

    <ul>
      <li v-for="car, key in sortedCars">
        {{ car.mark }}
        {{ car.model }}
        {{ car.year }}
        {{ car.number }}
        <a @click="confirmDeleteCar(car)">Delete</a>
        <router-link :to="{ name: 'updateCar', params: { carId: car.id } }">Edit</router-link>
      </li>
    </ul>
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

<style scoped lang='scss'>
  #cars-list-view {
  }
</style>
