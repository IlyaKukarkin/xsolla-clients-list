<template>
  <div id="contracts-create-edit-view">
    You can create and edit contracts with me, yippee!

    <router-link :to="{ name: 'contractsListView' }">View all contracts</router-link>

    <form class="form" @submit.prevent="processSave">
      <label for="summ" class="label">Contract summ</label>
      <p class="control">
        <input type="text" class="input" name="summ" v-model="selectedContract.summ">
      </p>
      <label for="prePaid" class="label">Prepaid</label>
      <p class="control">
        <input type="text" class="input" name="prePaid" v-model="selectedContract.prePaid">
      </p>
      <label for="startDate" class="label">Start Date</label>
      <p class="control">
        <flat-pickr v-model="selectedContract.startDate" :config="configStartDate" name="startDate" placeholder="Select a date"></flat-pickr>
      </p>
      <label for="finishDate" class="label">Finish Date</label>
      <p class="control">
        <flat-pickr v-model="selectedContract.finishDate" :config="configFinishDate" name="finishDate" placeholder="Select a date"></flat-pickr>
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'contractsListView' }"><button class="button is-link">Cancel</button></router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  },

  methods: {
    ...mapActions([
      'createContract',
      'updateContract',
      'loadContracts'
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
    ])
  }
};
</script>

<style scoped lang='scss'>
  #contracts-create-edit-view {
  }
</style>
