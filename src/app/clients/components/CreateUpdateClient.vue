<template>
  <div id="clients-create-edit-view">

    <h3 class="title is-3" style="margin-bottom: 20pt">Add client</h3>

    <form class="columns" @submit.prevent="processSave">
      <div class="column"></div>
      <div class="column is-half">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="surname" class="label">Surname</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" name="surname" v-model="selectedClient.surname">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="name" class="label">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" name="name" v-model="selectedClient.name">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="patronymic" class="label">Patronymic</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" name="patronymic" v-model="selectedClient.patronymic">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="email" class="label">E-mail</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" name="email" v-model="selectedClient.email">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="phone" class="label">Phone number</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" name="phone" v-model="selectedClient.phone">
              </div>
            </div>
          </div>
        </div><div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="address" class="label">Address</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" name="address" v-model="selectedClient.address">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="series" class="label">Passport series</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" name="series" v-model="selectedClient.series">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="number" class="label">Passport number</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" name="number" v-model="selectedClient.number">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="birthDate" class="label">Birth date</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <flat-pickr class="input" v-model="selectedClient.birthDate" :config="config" name="birthDate" placeholder="Select a date"></flat-pickr>
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
                <router-link :to="{ name: 'clientsListView' }"><button class="button is-link">Cancel</button></router-link>
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
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import AlreadyExistsWindow from '../../components/alreadyExistsWindow';

export default {
  name: 'clients-create-edit-view',

  components: {
    flatPickr,
    AlreadyExistsWindow
  },

  data: () => {
    return {
      config: {
        dateFormat: 'd-M-Y',
        maxDate: 'today'
      },
      selectedClient: {},
      editing: false,
      showExistWindow: false,
      entityType: 'client'
    };
  },

  mounted () {
    if ('clientId' in this.$route.params) {
      this.loadClients().then(() => {
        let selectedClient = this.getClientById(this.$route.params.clientId);
        if (selectedClient) {
          this.editing = true;
          this.selectedClient = Object.assign({}, selectedClient);
        }
      });
    }
  },

  methods: {
    ...mapActions([
      'createClient',
      'updateClient',
      'loadClients'
    ]),

    resetAndGo () {
      this.selectedClient = {};
      this.$router.push({ name: 'clientsListView' });
    },

    saveNewClient () {
      this.createClient(this.selectedClient).then(() => {
        this.resetAndGo();
      }).catch(() => {
        this.showExistWindow = true;
      });
    },

    saveClient () {
      this.updateClient(this.selectedClient).then(() => {
        this.resetAndGo();
      }).catch(() => {
        this.showExistWindow = true;
      });
    },

    processSave () {
      this.editing ? this.saveClient() : this.saveNewClient();
    }
  },

  computed: {
    ...mapGetters([
      'getClientById'
    ])
  }
};
</script>

<style scoped lang='scss'>
  #clients-create-edit-view {
  }
</style>
