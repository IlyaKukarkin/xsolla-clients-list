<template>
  <div id="cars-create-edit-view">

    <h3 class="title is-3" style="margin-bottom: 20pt">Add car</h3>

    <form class="columns" @submit.prevent="processSave">
    <div class="column"></div>
    <div class="column is-half">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label for="mark" class="label">Mark</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input type="text" class="input" name="mark" v-model="selectedCar.mark">
          </div>
        </div>
      </div>
    </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label for="model" class="label">Model</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="text" class="input" name="model" v-model="selectedCar.model">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label for="year" class="label">Year of issue</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="text" class="input" name="year" v-model="selectedCar.year">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label for="number" class="label">Plate number</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="text" class="input" name="number" v-model="selectedCar.number">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <button class="button is-primary">Submit</button>
              <router-link :to="{ name: 'carsListView' }"><button class="button is-link">Cancel</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column"></div>
      <AlreadyExistsWindow v-bind:class="{ 'is-active': showExistWindow }" v-bind:entity-type='entityType' v-on:ok="showExistWindow = false"></AlreadyExistsWindow>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlreadyExistsWindow from '../../components/alreadyExistsWindow';

export default {
  name: 'cars-create-edit-view',

  components: { AlreadyExistsWindow },

  data: () => {
    return {
      selectedCar: {},
      editing: false,
      showExistWindow: false,
      entityType: 'car'
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
      }).catch(() => {
        this.showExistWindow = true;
      });
    },

    saveCar () {
      this.updateCar(this.selectedCar).then(() => {
        this.resetAndGo();
      }).catch(() => {
        this.showExistWindow = true;
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
