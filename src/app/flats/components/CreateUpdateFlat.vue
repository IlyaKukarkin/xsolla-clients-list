<template>
  <div id="flats-create-edit-view">

    <h3 v-if="!editing" class="title is-3" style="margin-bottom: 20pt">Add flat</h3>
    <h3 v-else class="title is-3" style="margin-bottom: 20pt">Update flat</h3>

    <form class="columns" @submit.prevent="processSave">
      <div class="column"></div>
      <div class="column is-half">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="address" class="label">Address</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" v-bind:class="{ 'is-danger': addressDanger }" name="address" placeholder="Input flat's address" v-model="selectedFlat.address">
                <span class="has-text-danger" v-if="customErrors.address.length" v-bind:key="error" v-for="error in customErrors.address">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="rooms" class="label">Number of rooms</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" v-bind:class="{ 'is-danger': roomsDanger }" name="rooms" placeholder="Input flat's number of rooms" v-model="selectedFlat.rooms">
                <span class="has-text-danger" v-if="customErrors.rooms.length" v-bind:key="error" v-for="error in customErrors.rooms">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="area" class="label">Flat area</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" v-bind:class="{ 'is-danger': areaDanger }" name="area" placeholder="Input flat's area" v-model="selectedFlat.area">
                <span class="has-text-danger" v-if="customErrors.area.length" v-bind:key="error" v-for="error in customErrors.area">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="floor" class="label">Floor</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="number" class="input" v-bind:class="{ 'is-danger': floorDanger }" name="flor" placeholder="Input flat's floor" v-model="selectedFlat.floor">
                <span class="has-text-danger" v-if="customErrors.floor.length" v-bind:key="error" v-for="error in customErrors.floor">{{error}}</span>
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
                <router-link :to="{ name: 'flatsListView' }"><button class="button is-link">Cancel</button></router-link>
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
  name: 'flats-create-edit-view',

  components: { AlreadyExistsWindow },

  data: () => {
    return {
      config: {
        dateFormat: 'd-M-Y',
        maxDate: 'today'
      },
      customErrors: {
        address: [],
        rooms: [],
        area: [],
        floor: []
      },
      addressDanger: false,
      roomsDanger: false,
      areaDanger: false,
      floorDanger: false,
      selectedFlat: {},
      editing: false,
      showExistWindow: false,
      entityType: 'flat'
    };
  },

  mounted () {
    if ('flatId' in this.$route.params) {
      this.loadFlats().then(() => {
        let selectedFlat = this.getFlatById(this.$route.params.flatId);
        if (selectedFlat) {
          this.editing = true;
          this.selectedFlat = Object.assign({}, selectedFlat);
        }
      });
    }
  },

  methods: {
    ...mapActions([
      'createFlat',
      'updateFlat',
      'loadFlats'
    ]),

    resetAndGo () {
      this.selectedFlat = {};
      this.$router.push({ name: 'flatsListView' });
    },

    saveNewFlat () {
      this.createFlat(this.selectedFlat).then(() => {
        this.resetAndGo();
      }).catch(() => {
        this.showExistWindow = true;
      });
    },

    saveFlat () {
      this.updateFlat(this.selectedFlat).then(() => {
        this.resetAndGo();
      }).catch(() => {
        this.showExistWindow = true;
      });
    },

    checkForm () {
      this.customErrors.address = [];
      this.customErrors.rooms = [];
      this.customErrors.area = [];
      this.customErrors.floor = [];
      this.addressDanger = false;
      this.roomsDanger = false;
      this.areaDanger = false;
      this.floorDanger = false;

      let hasErrors = false;

      if (!this.selectedFlat.address) {
        this.customErrors.address.push('Address of flat is required!');
        this.addressDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedFlat.address.length > 30) {
          this.customErrors.address.push('Address of flat is too long!');
          this.addressDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedFlat.rooms) {
        this.customErrors.rooms.push('Number of rooms is required!');
        this.roomsDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedFlat.rooms < 1 || this.selectedFlat.rooms > 25) {
          this.customErrors.rooms.push('Number of rooms must be positive and less than 25!');
          this.roomsDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedFlat.area) {
        this.customErrors.area.push('Area of flat is required!');
        this.areaDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedFlat.area < 1 || this.selectedFlat.rooms > 2500) {
          this.customErrors.area.push('Area value must be positive and less than 2500!');
          this.areaDanger = true;
          hasErrors = true;
        }
      }

      if (!this.selectedFlat.floor) {
        this.customErrors.floor.push('Floor of flat is required!');
        this.floorDanger = true;
        hasErrors = true;
      } else {
        if (this.selectedFlat.floor < 1 || this.selectedFlat.rooms > 250) {
          this.customErrors.floor.push('Floor of flat must be positive and less than 250!');
          this.floorDanger = true;
          hasErrors = true;
        }
      }

      return !hasErrors;
    },

    processSave () {
      if (this.checkForm()) {
        this.editing ? this.saveFlat() : this.saveNewFlat();
      }
    }
  },

  computed: {
    ...mapGetters([
      'getFlatById'
    ])
  }
};
</script>

<style scoped lang='scss'>
  #flats-create-edit-view {
  }
</style>
