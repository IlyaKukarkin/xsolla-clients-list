<template>
  <div id="contracts-create-edit-view">

    <h3 class="title is-3" style="margin-bottom: 20pt">Add contract</h3>

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
                <input type="number" class="input" name="summ" v-model="selectedContract.summ">
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
                <input type="number" class="input" name="prePaid" v-model="selectedContract.prePaid">
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
                <flat-pickr class="input" v-model="selectedContract.startDate" :config="configStartDate" name="startDate" placeholder="Select a date"></flat-pickr>
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
                <flat-pickr class="input" v-model="selectedContract.finishDate" :config="configFinishDate" name="finishDate" placeholder="Select a date"></flat-pickr>
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
                <select class="select input" v-model="selectedContract.clientId">
                  <option v-for="client in clients" v-bind:value="client.id" v-bind:key="client.id">
                    {{ client.surname }}
                  </option>
                </select>
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
                <select v-if="chosenObject === 'Flat'" class="select input" v-model="selectedContract.objectId">
                  <option v-for="flat in flats" v-bind:value="flat.id" v-bind:key="flat.id">
                    {{ flat.address }}
                  </option>
                </select>
                <select v-if="chosenObject === 'Car'" class="select input" v-model="selectedContract.objectId">
                  <option v-for="car in cars" v-bind:value="car.id" v-bind:key="car.id">
                    {{ car.mark }} {{ car.model }}
                  </option>
                </select>
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
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import AlreadyExistsWindow from '../../components/alreadyExistsWindow';

export default {
  name: 'contracts-create-edit-view',

  components: {
    flatPickr,
    AlreadyExistsWindow
  },

  data: () => {
    return {
      configStartDate: {
        dateFormat: 'd-M-Y',
        minDate: 'today'
      },
      configFinishDate: {
        dateFormat: 'd-M-Y',
        minDate: 'today'
      },
      selectedContract: {},
      editing: false,
      chosenObject: '',
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
          if (selectedObject) {
            this.chosenObject = 'Car';
          } else {
            this.chosenObject = 'Flat';
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

    processSave () {
      this.editing ? this.saveContract() : this.saveNewContract();
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
      'cars': state => state.cars.cars,
      'flats': state => state.flats.flats
    })
  }
};
</script>

<style scoped lang='scss'>
  #contracts-create-edit-view {
  }
</style>
