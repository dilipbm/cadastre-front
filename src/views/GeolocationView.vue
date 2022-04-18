<template>
  <div>
    <b-row>
      <b-col cols="12" class="mb-2">
        <h1>Géolocalisation</h1>
      </b-col>
      <b-col md="6" sm="12">
        <h4>Rechercher par adresse</h4>
        <b-form-group label="Adresse" label-for="address">
          <b-form-input
            id="address"
            list="input-list"
            v-model="selectedAddress"
            placeholder="Adresse"
            @input="debounceSearchInput"
          ></b-form-input>
          <b-form-datalist
            id="input-list"
            :options="addresseLabels"
          ></b-form-datalist>
        </b-form-group>
      </b-col>
      <b-col md="6"></b-col>
      <b-col cols="12">
        <h4>Rechercher par coordonnées GPS</h4>
      </b-col>
      <b-col md="4" sm="12">
        <b-form-group label="Latitude" label-for="latitude">
          <b-form-input
            id="latitude"
            v-model="latitude"
            placeholder="Latitude"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="4" sm="12">
        <b-form-group label="Longtitude" label-for="longtitude">
          <b-form-input
            id="longtitude"
            v-model="longtitude"
            placeholder="Longtitude"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="4" sm="12">
        <b-form-group label="Valider" label-for="valider">
          <b-button
            id="btn-valide"
            variant="outline-primary"
            v-on:click="validate()"
          >
            Envoyer
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <l-map style="height: 600px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker v-if="showMarker" :lat-lng="markerLatLng"></l-marker>
        <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color" />
      </l-map>
    </b-row>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolygon } from "vue2-leaflet";
import { latLng, Icon } from "leaflet";
import { mapMutations, mapGetters } from "vuex";
import _ from "lodash";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 20,
      center: [48.856614, 2.3522219],
    };
  },
  methods: {
    ...mapMutations("geolocalisation", [
      "updateLatitude",
      "updateLongtitude",
      "updateSearchAddress",
      "updateSelectedAddress",
      "toggleShowMarker",
      "updateShowMarker",
      "updateMarker",
    ]),
    refreshMap({ latitude, longtitude }) {
      this.markerLatLng = latLng(latitude, longtitude);
      this.center = latLng(latitude, longtitude);
    },
    validate() {
      this.selectedAddress = "";
      this.$store.dispatch("geolocalisation/getParcell", {
        latitude: this.latitude,
        longtitude: this.longtitude,
        vm: this,
      });
      this.refreshMap({ latitude: this.latitude, longtitude: this.longtitude });
    },
    debounceSearchInput: _.debounce(function (value) {
      this.searchAddress = value;
      this.$store.dispatch("geolocalisation/searchAddress", value);
    }, 1000),
  },
  computed: {
    ...mapGetters("geolocalisation", [
      "showMarker",
      "polygon",
      "addresseLabels",
      "selectedAddressGeometry",
    ]),
    latitude: {
      get() {
        return this.$store.state.geolocalisation.latitude;
      },
      set(value) {
        this.updateLatitude(value);
      },
    },
    longtitude: {
      get() {
        return this.$store.state.geolocalisation.longtitude;
      },
      set(value) {
        this.updateLongtitude(value);
      },
    },
    markerLatLng: {
      get() {
        console.log("getting marlerlatlng", this.$store.state.markerLatLng);
        return this.$store.state.geolocalisation.markerLatLng;
      },
      set(value) {
        this.updateMarker(value);
      },
    },
    searchAddress: {
      get() {
        return this.$store.state.geolocalisation.searchAddress;
      },
      set(value) {
        this.updateSearchAddress(value);
      },
    },
    selectedAddress: {
      get() {
        return this.$store.state.geolocalisation.selectedAddress;
      },
      set(value) {
        this.updateSelectedAddress(value);
      },
    },
  },
  watch: {
    selectedAddressGeometry() {
      this.latitude = "";
      this.longtitude = "";
      this.$store.dispatch("geolocalisation/getParcell", {
        latitude: this.selectedAddressGeometry[0],
        longtitude: this.selectedAddressGeometry[1],
        vm: this,
      });
      this.refreshMap({
        latitude: this.selectedAddressGeometry[0],
        longtitude: this.selectedAddressGeometry[1],
      });
    },
  },
};
</script>

<style></style>
