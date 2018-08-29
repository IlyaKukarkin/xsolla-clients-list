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
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'contracts-create-edit-view',

  components: {
    flatPickr
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
      editing: false
    };
  },

  mounted () {
    if ('contractId' in this.$route.params) {
      this.loadContracts().then(() => {
        let selectedContract = this.getContractById(this.$route.params.contractId);
        if (selectedContract) {
          this.editing = true;
          this.selectedContract = Object.assign({}, selectedContract);
        }
      });
    }
    this.loadClients();
  },

  methods: {
    ...mapActions([
      'createContract',
      'updateContract',
      'loadContracts',
      'loadClients'
    ]),

    resetAndGo () {
      this.selectedContract = {};
      this.$router.push({ name: 'contractsListView' });
    },

    saveNewContract () {
      this.createContract(this.selectedContract).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
      });
    },

    saveContract () {
      this.updateContract(this.selectedContract).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
      });
    },
    processSave () {
      this.editing ? this.saveContract() : this.saveNewContract();
    }
  },

  computed: {
    ...mapGetters([
      'getContractById'
    ]),

    ...mapState({
      'clients': state => state.clients.clients
    })
  }
};
</script>

<style scoped lang='scss'>
  #contracts-create-edit-view {
  }
</style>
