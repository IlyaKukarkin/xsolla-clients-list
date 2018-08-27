<template>
  <div id="cars-create-edit-view">
    You can create and edit cars with me, yippee!

    <router-link :to="{ name: 'carsListView' }">View all cars</router-link>

    <form class="form" @submit.prevent="processSave">
      <label for="mark" class="label">Mark</label>
      <p class="control">
        <input type="text" class="input" name="mark" v-model="selectedCar.mark">
      </p>
      <label for="model" class="label">Model</label>
      <p class="control">
        <input type="text" class="input" name="model" v-model="selectedCar.model">
      </p>
      <label for="year" class="label">Year of issue</label>
      <p class="control">
        <input type="number" class="input" name="year" v-model="selectedCar.year">
      </p>
      <label for="number" class="label">Number</label>
      <p class="control">
        <input type="text" class="input" name="number" v-model="selectedCar.number">
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'carsListView' }"><button class="button is-link">Cancel</button></router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'cars-create-edit-view',

  data: () => {
    return {
      selectedCar: {},
      editing: false
    };
  },

  mounted () {
    if ('carId' in this.$route.params) {
      this.loadCars().then(() => {
        let selectedCar = this.getCarById(this.$route.params.carId);
        if (selectedCar) {
          this.editing = true;
          this.selectedCar = Object.assign({}, selectedCar);
        }
      });
    }
  },

  methods: {
    ...mapActions([
      'createCar',
      'updateCar',
      'loadCars'
    ]),

    resetAndGo () {
      this.selectedCar = {};
      this.$router.push({ name: 'carsListView' });
    },

    saveNewCar () {
      this.createCar(this.selectedCar).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
      });
    },

    saveCar () {
      this.updateCar(this.selectedCar).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
      });
    },

    processSave () {
      this.editing ? this.saveCar() : this.saveNewCar();
    }
  },

  computed: {
    ...mapGetters([
      'getCarById'
    ])
  }
};
</script>

<style scoped lang='scss'>
  #cars-create-edit-view {
  }
</style>
