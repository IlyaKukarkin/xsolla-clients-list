<template>
  <div id="flats-create-edit-view">

    <h3 class="title is-3" style="margin-bottom: 20pt">Add flat</h3>

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
                <input type="text" class="input" name="address" v-model="selectedFlat.address">
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
                <input type="text" class="input" name="rooms" v-model="selectedFlat.rooms">
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
                <input type="text" class="input" name="area" v-model="selectedFlat.area">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="flor" class="label">Floor</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" name="flor" v-model="selectedFlat.flor">
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
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'flats-create-edit-view',

  data: () => {
    return {
      config: {
        dateFormat: 'd-M-Y',
        maxDate: 'today'
      },
      selectedFlat: {},
      editing: false
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
      }).catch((err) => {
        alert(err);
      });
    },

    saveFlat () {
      this.updateFlat(this.selectedFlat).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
      });
    },

    processSave () {
      this.editing ? this.saveFlat() : this.saveNewFlat();
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
