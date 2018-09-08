<template>
  <div id="cars-create-edit-view">

    <h3 v-if="!editing" class="title is-3" style="margin-bottom: 20pt">Add car</h3>
    <h3 v-else class="title is-3" style="margin-bottom: 20pt">Update car</h3>

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
            <input type="text" class="input" v-bind:class="{ 'is-danger': markDanger }" name="mark" placeholder="Enter cars mark" v-model="selectedCar.mark">
            <span class="has-text-danger" v-if="customErrors.mark.length" v-bind:key="error" v-for="error in customErrors.mark">{{error}}</span>
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
              <input type="text" class="input" v-bind:class="{ 'is-danger': modelDanger }" name="model" placeholder="Enter cars model" v-model="selectedCar.model">
              <span class="has-text-danger" v-if="customErrors.model.length" v-bind:key="error" v-for="error in customErrors.model">{{error}}</span>
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
              <input type="number" class="input" v-bind:class="{ 'is-danger': yearDanger }" name="year" placeholder="Enter cars year of issue" v-model="selectedCar.year">
              <span class="has-text-danger" v-if="customErrors.year.length" v-bind:key="error" v-for="error in customErrors.year">{{error}}</span>
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
              <input type="text" class="input" v-bind:class="{ 'is-danger': numberDanger }" name="number" placeholder="Enter cars plate number" v-model="selectedCar.number">
              <span class="has-text-danger" v-if="customErrors.number.length" v-bind:key="error" v-for="error in customErrors.number">{{error}}</span>
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
      customErrors: {
        mark: [],
        model: [],
        number: [],
        year: []
      },
      markDanger: false,
      modelDanger: false,
      numberDanger: false,
      yearDanger: false,
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

    checkForm () {
      this.customErrors.mark = [];
      this.customErrors.model = [];
      this.customErrors.year = [];
      this.customErrors.number = [];
      this.markDanger = false;
      this.modelDanger = false;
      this.numberDanger = false;
      this.yearDanger = false;

      let hasErrors = false;

      if (!this.selectedCar.mark) {
        this.customErrors.mark.push('Cars mark is required!');
        this.markDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedCar.mark.length > 30) {
          this.customErrors.mark.push('Cars mark is too long!');
          this.markDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedCar.model) {
        this.customErrors.model.push('Cars model is required!');
        this.modelDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedCar.model.length > 30) {
          this.customErrors.model.push('Car model is too long!');
          this.modelDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedCar.number) {
        this.customErrors.number.push('Cars plate number is required!');
        this.numberDanger = true;
        hasErrors = true;
      } else {
        let reg = /[ABEKMHOPCTYX]{1}[0-9]{1}[0-9]{1}[0-9]{1}[ABEKMHOPCTYX]{1}[ABEKMHOPCTYX]{1}$/;
        if (!reg.test(this.selectedCar.number)) {
          this.customErrors.number.push('Use only letters "ABEKMHOPCTYX". Example: A188BC');
          this.numberDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedCar.year) {
        this.customErrors.year.push('Cars year number is required!');
        this.yearDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedCar.year > (new Date()).getFullYear() || this.selectedCar.year < 1945) {
          this.customErrors.year.push('Year between 1945 and ', (new Date()).getFullYear(), '!');
          this.yearDanger = true;
          hasErrors = true;
        }
      }

      return !hasErrors;
    },

    processSave () {
      if (this.checkForm()) {
        this.editing ? this.saveCar() : this.saveNewCar();
      }
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
