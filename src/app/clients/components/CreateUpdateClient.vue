<template>
  <div id="clients-create-edit-view">
    You can create and edit clients with me, yippee!

    <router-link :to="{ name: 'clientsListView' }">View all clients</router-link>

    <form class="form" @submit.prevent="processSave">
      <label for="surname" class="label">Surname</label>
      <p class="control">
        <input type="text" class="input" name="surname" v-model="selectedClient.surname">
      </p>
      <label for="name" class="label">Name</label>
      <p class="control">
        <input type="text" class="input" name="name" v-model="selectedClient.name">
      </p>
      <label for="patronymic" class="label">Patronymic</label>
      <p class="control">
        <input type="text" class="input" name="patronymic" v-model="selectedClient.patronymic">
      </p>
      <label for="email" class="label">E-mail</label>
      <p class="control">
        <input type="text" class="input" name="email" v-model="selectedClient.email">
      </p>
      <label for="phone" class="label">Phone number</label>
      <p class="control">
        <input type="text" class="input" name="phone" v-model="selectedClient.phone">
      </p>
      <label for="address" class="label">Address</label>
      <p class="control">
        <input type="text" class="input" name="address" v-model="selectedClient.address">
      </p>
      <label for="series" class="label">Passport series</label>
      <p class="control">
        <input type="number" class="input" name="series" v-model="selectedClient.series">
      </p>
      <label for="number" class="label">Passport number</label>
      <p class="control">
        <input type="number" class="input" name="number" v-model="selectedClient.number">
      </p>
      <label for="birthDate" class="label">Date of birth</label>
      <p class="control">
        <flat-pickr v-model="selectedClient.birthDate" :config="config" name="birthDate" placeholder="Select a date"></flat-pickr>
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'clientsListView' }"><button class="button is-link">Cancel</button></router-link>
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
  name: 'clients-create-edit-view',

  components: {
    flatPickr
  },

  data: () => {
    return {
      config: {
        dateFormat: 'd-M-Y',
        maxDate: 'today'
      },
      selectedClient: {},
      editing: false
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
      }).catch((err) => {
        alert(err);
      });
    },

    saveClient () {
      this.updateClient(this.selectedClient).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
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
