<template>
  <div id="clients-create-edit-view">

    <h3 v-if="!editing" class="title is-3" style="margin-bottom: 20pt">Add client</h3>
    <h3 v-else class="title is-3" style="margin-bottom: 20pt">Update client</h3>

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
                <input type="text" class="input" v-bind:class="{ 'is-danger': surnameDanger }" name="surname" placeholder="Input client's surname" v-model="selectedClient.surname">
                <span class="has-text-danger" v-if="customErrors.surname.length" v-bind:key="error" v-for="error in customErrors.surname">{{error}}</span>
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
                <input type="text" class="input" v-bind:class="{ 'is-danger': nameDanger }" name="name" placeholder="Input client's name" v-model="selectedClient.name">
                <span class="has-text-danger" v-if="customErrors.name.length" v-bind:key="error" v-for="error in customErrors.name">{{error}}</span>
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
                <input type="text" class="input" v-bind:class="{ 'is-danger': patronymicDanger }" name="patronymic" placeholder="Input client's patronymic" v-model="selectedClient.patronymic">
                <span class="has-text-danger" v-if="customErrors.patronymic.length" v-bind:key="error" v-for="error in customErrors.patronymic">{{error}}</span>
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
                <input type="email" class="input" v-bind:class="{ 'is-danger': emailDanger }" name="email" placeholder="Input client's e-mail" v-model="selectedClient.email">
                <span class="has-text-danger" v-if="customErrors.email.length" v-bind:key="error" v-for="error in customErrors.email">{{error}}</span>
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
                <input type="number" class="input" v-bind:class="{ 'is-danger': phoneDanger }" name="phone" placeholder="Input client's phone" v-model="selectedClient.phone">
                <span class="has-text-danger" v-if="customErrors.phone.length" v-bind:key="error" v-for="error in customErrors.phone">{{error}}</span>
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
                <input type="text" class="input" v-bind:class="{ 'is-danger': addressDanger }" name="address" placeholder="Input address of client" v-model="selectedClient.address">
                <span class="has-text-danger" v-if="customErrors.address.length" v-bind:key="error" v-for="error in customErrors.address">{{error}}</span>
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
                <input type="number" class="input" v-bind:class="{ 'is-danger': seriesDanger }" name="series" placeholder="Input passport series" v-model="selectedClient.series">
                <span class="has-text-danger" v-if="customErrors.series.length" v-bind:key="error" v-for="error in customErrors.series">{{error}}</span>
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
                <input type="number" class="input" v-bind:class="{ 'is-danger': numberDanger }" name="number" placeholder="Input passport number" v-model="selectedClient.number">
                <span class="has-text-danger" v-if="customErrors.number.length" v-bind:key="error" v-for="error in customErrors.number">{{error}}</span>
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
                <flat-pickr class="input" v-bind:class="{ 'is-danger': birthDateDanger }" v-model="selectedClient.birthDate" :config="config" name="birthDate" placeholder="Select a birth date"></flat-pickr>
                <span class="has-text-danger" v-if="customErrors.birthDate.length" v-bind:key="error" v-for="error in customErrors.birthDate">{{error}}</span>
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
      customErrors: {
        surname: [],
        name: [],
        patronymic: [],
        email: [],
        phone: [],
        address: [],
        series: [],
        number: [],
        birthDate: []
      },
      surnameDanger: false,
      nameDanger: false,
      patronymicDanger: false,
      emailDanger: false,
      phoneDanger: false,
      addressDanger: false,
      seriesDanger: false,
      birthDateDanger: false,
      numberDanger: false,
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

    checkForm () {
      this.customErrors.surname = [];
      this.customErrors.name = [];
      this.customErrors.patronymic = [];
      this.customErrors.email = [];
      this.customErrors.phone = [];
      this.customErrors.address = [];
      this.customErrors.series = [];
      this.customErrors.number = [];
      this.customErrors.birthDate = [];
      this.surnameDanger = false;
      this.nameDanger = false;
      this.patronymicDanger = false;
      this.emailDanger = false;
      this.phoneDanger = false;
      this.addressDanger = false;
      this.seriesDanger = false;
      this.birthDateDanger = false;
      this.numberDanger = false;

      let hasErrors = false;

      if (!this.selectedClient.surname) {
        this.customErrors.surname.push('Surname is required!');
        this.surnameDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.surname.length > 30) {
          this.customErrors.surname.push('Surname is too long!');
          this.surnameDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.name) {
        this.customErrors.name.push('Name is required!');
        this.nameDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.name.length > 30) {
          this.customErrors.name.push('Name is too long!');
          this.nameDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.patronymic) {
        this.customErrors.patronymic.push('Patronymic is required!');
        this.patronymicDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.patronymic.length > 30) {
          this.customErrors.patronymic.push('Patronymic is too long');
          this.patronymicDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.email) {
        this.customErrors.email.push('E-mail is required!');
        this.emailDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.email.length > 30) {
          this.customErrors.email.push('E-mail is too long');
          this.emailDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.phone) {
        this.customErrors.phone.push('Phone number is required!');
        this.phoneDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.phone.length > 30) {
          this.customErrors.phone.push('Phone number is too long');
          this.phoneDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.address) {
        this.customErrors.address.push('Address is required!');
        this.addressDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.address.length > 30) {
          this.customErrors.address.push('Address is too long!');
          this.addressDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.series) {
        this.customErrors.series.push('Passport series is required!');
        this.seriesDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.series.length !== 4) {
          this.customErrors.series.push('Passport series isn\'t 4 digits!');
          this.seriesDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.number) {
        this.customErrors.number.push('Passport number is required!');
        this.numberDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedClient.number.length !== 6) {
          this.customErrors.number.push('Passport number isn\'t 6 digits!');
          this.numberDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedClient.birthDate) {
        this.customErrors.birthDate.push('Date of birth is required!');
        this.birthDateDanger = true;
        hasErrors = true;
      }

      return !hasErrors;
    },

    processSave () {
      if (this.checkForm()) {
        this.editing ? this.saveClient() : this.saveNewClient();
      }
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
