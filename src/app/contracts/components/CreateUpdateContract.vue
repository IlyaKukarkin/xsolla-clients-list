<template>
  <div id="contracts-create-edit-view">

    <h3 v-if="!editing" class="title is-3" style="margin-bottom: 20pt">Add contract</h3>
    <h3 v-else class="title is-3" style="margin-bottom: 20pt">Update contract</h3>

    <form class="columns" @submit.prevent="processSave">
      <div class="column"></div>
      <div class="column is-half">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="summ" class="label">Contract summ</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" v-bind:class="{ 'is-danger': summDanger }" name="summ" placeholder="Input contract summ" v-model="selectedContract.summ">
                <span class="has-text-danger" v-if="customErrors.summ.length" v-bind:key="error" v-for="error in customErrors.summ">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="prePaid" class="label">Prepaid</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" v-bind:class="{ 'is-danger': prePaidDanger }" name="prePaid" placeholder="Input prepaid for contract" v-model="selectedContract.prePaid">
                <span class="has-text-danger" v-if="customErrors.prePaid.length" v-bind:key="error" v-for="error in customErrors.prePaid">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="startDate" class="label">Start date</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <flat-pickr class="input" v-bind:class="{ 'is-danger': startDateDanger }" v-model="selectedContract.startDate" :config="config" name="startDate" placeholder="Select a date"></flat-pickr>
                <span class="has-text-danger" v-if="customErrors.startDate.length" v-bind:key="error" v-for="error in customErrors.startDate">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="finishDate" class="label">Finish date</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <flat-pickr class="input" v-bind:class="{ 'is-danger': finishDateDanger }" v-model="selectedContract.finishDate" :config="config" name="finishDate" placeholder="Select a date"></flat-pickr>
                <span class="has-text-danger" v-if="customErrors.finishDate.length" v-bind:key="error" v-for="error in customErrors.finishDate">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="selectedContract.clientId" class="label">Client</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <select class="select input" v-bind:class="{ 'is-danger': clientIdDanger }" v-model="selectedContract.clientId">
                  <option v-for="client in sortedClients" v-bind:value="client.id" v-bind:key="client.id">
                    {{ client.surname }}
                  </option>
                </select>
                <span class="has-text-danger" v-if="customErrors.clientId.length" v-bind:key="error" v-for="error in customErrors.clientId">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Choose object</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <select class="select input" v-model="chosenObject">
                  <option>Flat</option>
                  <option>Car</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="selectedContract.objectId" class="label">Object of evaluation</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <select v-if="chosenObject === 'Flat'" class="select input" v-bind:class="{ 'is-danger': objectIdDanger }" v-model="selectedContract.objectId">
                  <option v-for="flat in availableFlats" v-bind:value="flat.id" v-bind:key="flat.id">
                    {{ flat.address }}
                  </option>
                </select>
                <select v-if="chosenObject === 'Car'" class="select input" v-bind:class="{ 'is-danger': objectIdDanger }" v-model="selectedContract.objectId">
                  <option v-for="car in availableCars" v-bind:value="car.id" v-bind:key="car.id">
                    {{ car.mark }} {{ car.model }}
                  </option>
                </select>
                <span class="has-text-danger" v-if="customErrors.objectId.length" v-bind:key="error" v-for="error in customErrors.objectId">{{error}}</span>
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
                <router-link :to="{ name: 'contractsListView' }"><button class="button is-link">Cancel</button></router-link>
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
import { mapActions, mapGetters, mapState } from 'vuex';
import AlreadyExistsWindow from '../../components/alreadyExistsWindow';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'contracts-create-edit-view',

  components: {
    flatPickr,
    AlreadyExistsWindow
  },

  data: () => {
    return {
      config: {
        dateFormat: 'd-M-Y',
        minDate: 'today'
      },
      customErrors: {
        summ: [],
        prePaid: [],
        startDate: [],
        finishDate: [],
        clientId: [],
        objectId: []
      },
      summDanger: false,
      prePaidDanger: false,
      startDateDanger: false,
      finishDateDanger: false,
      clientIdDanger: false,
      objectIdDanger: false,
      selectedContract: {},
      editing: false,
      chosenObject: 'Flat',
      showExistWindow: false,
      entityType: 'contract'
    };
  },

  mounted () {
    if ('contractId' in this.$route.params) {
      this.loadContracts().then(() => {
        let selectedContract = this.getContractById(this.$route.params.contractId);
        if (selectedContract) {
          this.editing = true;
          this.selectedContract = Object.assign({}, selectedContract);

          let selectedObject = this.getFlatFromId(this.selectedContract.objectId);
          if (typeof selectedObject === 'object') {
            this.chosenObject = 'Flat';
          } else {
            this.chosenObject = 'Car';
          }
        }
      });
    }
    this.loadClients();
    this.loadFlats();
    this.loadCars();
  },

  methods: {
    ...mapActions([
      'createContract',
      'updateContract',
      'loadContracts',
      'loadClients',
      'loadFlats',
      'loadCars'
    ]),

    resetAndGo () {
      this.selectedContract = {};
      this.$router.push({ name: 'contractsListView' });
    },

    saveNewContract () {
      this.createContract(this.selectedContract).then(() => {
        this.resetAndGo();
      }).catch(() => {
        this.showExistWindow = true;
      });
    },

    saveContract () {
      this.updateContract(this.selectedContract).then(() => {
        this.resetAndGo();
      }).catch(() => {
        this.showExistWindow = true;
      });
    },

    checkForm () {
      this.customErrors.summ = [];
      this.customErrors.prePaid = [];
      this.customErrors.startDate = [];
      this.customErrors.finishDate = [];
      this.customErrors.clientId = [];
      this.customErrors.objectId = [];
      this.summDanger = false;
      this.prePaidDanger = false;
      this.startDateDanger = false;
      this.finishDateDanger = false;
      this.clientIdDanger = false;
      this.objectIdDanger = false;

      let hasErrors = false;

      if (!this.selectedContract.summ) {
        this.customErrors.summ.push('Contract summ is required!');
        this.summDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedContract.summ > 99999999 || this.selectedContract.summ < 1) {
          this.customErrors.summ.push('Contract summ must be positive and less than 99999999!');
          this.summDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedContract.prePaid) {
        this.customErrors.prePaid.push('Cars model is required!');
        this.prePaidDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedContract.prePaid < 0 || this.selectedContract.prePaid > this.selectedContract.summ) {
          this.customErrors.prePaid.push('Prepaid must be more than 0 and less or equal than contract summ!');
          this.prePaidDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedContract.startDate) {
        this.customErrors.startDate.push('Start date is required!');
        this.startDateDanger = true;
        hasErrors = true;
      }

      if (!this.selectedContract.finishDate) {
        this.customErrors.finishDate.push('Finish date is required!');
        this.finishDateDanger = true;
        hasErrors = true;
      } else {
        if (Date.parse(this.selectedContract.startDate) >= Date.parse(this.selectedContract.finishDate)) {
          this.customErrors.finishDate.push('Finish date must be later than start date!');
          this.finishDateDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedContract.clientId) {
        this.customErrors.clientId.push('Client is required!');
        this.clientIdDanger = true;
        hasErrors = true;
      }

      if (!this.selectedContract.objectId) {
        this.customErrors.objectId.push('Object of evaluation is required!');
        this.objectIdDanger = true;
        hasErrors = true;
      }

      return !hasErrors;
    },

    getObjectType () {
      let objectId = Object.keys(this.contracts).filter(contract => {
        return this.contracts[contract].id === this.selectedContract.id;
      });
      let selectedObject = this.getFlatFromId(this.contracts[objectId].objectId);
      if (typeof selectedObject === 'object') {
        return 'Flat';
      } else {
        return 'Car';
      }
    },

    processSave () {
      if (this.checkForm()) {
        this.editing ? this.saveContract() : this.saveNewContract();
      }
    }
  },

  computed: {
    ...mapGetters([
      'getContractById',
      'getCarFromId',
      'getFlatFromId'
    ]),

    ...mapState({
      'clients': state => state.clients.clients,
      'contracts': state => state.contracts.contracts,
      'cars': state => state.cars.cars,
      'flats': state => state.flats.flats
    }),

    availableClients () {
      let availableClients = {};
      if (this.editing) {
        availableClients = Object.keys(this.clients).filter(client => {
          return (this.clients[client].contractId === undefined || this.clients[client].contractId === this.selectedContract.id);
        });
      } else {
        availableClients = Object.keys(this.clients).filter(client => {
          return this.clients[client].contractId === undefined;
        });
      }

      return availableClients.map((key) => {
        return this.clients[key];
      });
    },

    availableCars () {
      let availableCars = {};

      if (this.editing && this.getObjectType() === 'Car') {
        availableCars = Object.keys(this.cars).filter(car => {
          return (this.cars[car].contractId === undefined || this.cars[car].contractId === this.selectedContract.id);
        });
      } else {
        availableCars = Object.keys(this.cars).filter(car => {
          return this.cars[car].contractId === undefined;
        });
      }

      return availableCars.map((key) => {
        return this.cars[key];
      });
    },

    availableFlats () {
      let availableFlats = {};

      if (this.editing && this.getObjectType() === 'Flat') {
        availableFlats = Object.keys(this.flats).filter(flat => {
          return (this.flats[flat].contractId === undefined || this.flats[flat].contractId === this.selectedContract.id);
        });
      } else {
        availableFlats = Object.keys(this.flats).filter(flat => {
          return this.flats[flat].contractId === undefined;
        });
      }

      return availableFlats.map((key) => {
        return this.flats[key];
      });
    },

    sortedClients () {
      let avlbClients = this.availableClients;

      let sortedKeys = Object.keys(avlbClients).sort((a, b) => {
        return avlbClients[a].surname.localeCompare(avlbClients[b].surname);
      });

      return sortedKeys.map((key) => {
        return avlbClients[key];
      });
    }
  }
};
</script>

<style scoped lang='scss'>
  #contracts-create-edit-view {
  }
</style>
