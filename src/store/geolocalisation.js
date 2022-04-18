import { getParcelle as apiGetParcelle } from "../services/apicartoCadastre";
import { searchAddress as apiSearchAddress } from "../services/address";

const geolocalisation = {
  namespaced: true,
  state: {
    latitude: null,
    longtitude: null,
    showMarker: false,
    markerLatLng: [],
    cadastreData: null,
    polygon: {
      latlngs: [],
    },
    searchAddress: null,
    searchAddressResult: null,
    selectedAddress: null,
  },
  getters: {
    latitude: (state) => {
      return state.latitude;
    },
    longtitude: (state) => {
      return state.longtitude;
    },
    showMarker: (state) => {
      return state.showMarker;
    },
    cadastreData: (state) => {
      return state.cadastreData;
    },
    polygon: (state) => {
      return state.polygon;
    },
    addresseLabels: (state) => {
      if (state.searchAddressResult) {
        return state.searchAddressResult.features.map(
          (x) => x.properties.label
        );
      } else {
        return [];
      }
    },
    selectedAddressGeometry: (state) => {
      if (
        state.searchAddressResult &&
        state.searchAddressResult.features &&
        state.searchAddressResult.features.length > 0
      ) {
        return state.searchAddressResult.features[0].geometry.coordinates.reverse();
      }
    },
  },
  mutations: {
    updateLatitude(state, value) {
      state.latitude = value;
    },
    updateLongtitude(state, value) {
      state.longtitude = value;
    },
    toggleShowMarker(state) {
      state.showMarker = !state.showMarker;
    },
    updateShowMarker(state, value) {
      state.showMarker = value;
    },
    updateMarker(state, value) {
      state.markerLatLng = value;
      this.commit("geolocalisation/updateShowMarker", true);
    },
    updateCadastreData(state, data) {
      state.cadastreData = data;
    },
    updatePolygonData(state, { latlngs }) {
      if (latlngs && latlngs.length > 0) {
        state.polygon.latlngs = latlngs[0].map((x) => x.reverse());
      }
    },
    updateSearchAddress(state, value) {
      state.searchAddress = value;
    },
    updateSearchAddressResult(state, value) {
      state.searchAddressResult = value;
    },
    updateSelectedAddress(state, value) {
      state.selectedAddress = value;
    },
  },
  actions: {
    getParcell: (context, { vm, latitude, longtitude }) => {
      context.commit("updatePolygonData", { latlngs: [] });
      apiGetParcelle({ latitude, longtitude })
        .then((response) => {
          console.log(response);
          context.commit("updateCadastreData", response.data);
          if (response.data && response.data.totalFeatures > 0) {
            context.commit("updatePolygonData", {
              latlngs: response.data.features[0].geometry.coordinates[0],
            });
          } else {
            console.log("Aucune données parcelle trouvé");
            vm.$bvToast.toast("Les données cadastres absent", {
              title: "Error de récupération",
              toaster: "b-toaster-bottom-center",
              variant: "warning",
              solid: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchAddress: (context, searchValue) => {
      apiSearchAddress({ query: searchValue })
        .then((response) => {
          console.log(response.data);
          context.commit("updateSearchAddressResult", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default geolocalisation;
