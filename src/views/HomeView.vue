<template>
  <div>
    <div>
      <b-jumbotron
        header="Les données cadastre"
        lead="Collecter vos données cadastrale en masse"
      >
      </b-jumbotron>
    </div>

    <div class="row">
      <b-modal id="modalIdTask">
        <template #modal-title>Votre ID</template>
        <h2>{{ taskId }}</h2>
      </b-modal>

      <b-modal
        :visible="activeModal"
        id="modal"
        @change="handleChange"
        @ok="handleOk"
      >
        <template #modal-title>Selectionner les colonnes</template>
        <template #modal-ok>Valider</template>
        <table>
          <tr>
            <td>Latitude</td>
            <td>
              <b-form-select
                v-model="latitudeColumnName"
                :options="csvColumns"
              ></b-form-select>
            </td>
          </tr>
          <tr>
            <td>Longtitude</td>
            <td>
              <b-form-select
                v-model="longtitudeColumnName"
                :options="csvColumns"
              ></b-form-select>
            </td>
          </tr>
        </table>
      </b-modal>

      <div class="col-12 mb-2">
        <h1>Nouveau dépôt</h1>
      </div>
      <div class="col-md-6 col-sm-12">
        <b-form-group
          id="new"
          description="Utilisez uniquement le format .csv avec l'encodate UTF-8"
          label="Fichier d'entré"
          label-for="input-file"
        >
          <b-form-file
            id="input-file"
            ref="uploadFile"
            v-on:change="handleFileUpload($event)"
            :state="Boolean(uploadFile)"
            placeholder="Télécharger votre fichier ici..."
            drop-placeholder="Télécharger votre fichier ici..."
          ></b-form-file>
        </b-form-group>
      </div>

      <div class="col-md-3 col-sm-12">
        <b-form-group
          id="form-group-sep"
          description="Choisir le séparateur utilisé dans le fichier .csv"
          label="Séparateur"
          label-for="sel-separator"
        >
          <b-form-select
            id="sel-separator"
            v-model="csvSeperator"
            :options="options"
            placeholder="Choisir le sép"
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="col-md-3 col-sm-6">
        <b-form-group
          id="form-group-sep"
          label-for="btn-sent"
          description="Envoyer votre fichier"
          label="Envoyer"
        >
          <b-button
            id="btn-sent"
            variant="outline-primary"
            v-on:click="submitFile()"
          >
            Envoyer
          </b-button>
        </b-form-group>
      </div>

      <div class="col-12 mt-5 mb-2">
        <h1>Récupérer votre fichier de résultat</h1>
      </div>
      <div class="col-md-6 col-sm-12">
        <b-form-group
          id="from-group-task-id"
          description="Utilisez l'ID de votre travail"
          label="ID de tâche"
          label-for="task-id"
        >
          <b-form-input
            id="task-id"
            v-model="taskId"
            placeholder="Saisir votre ID de tâche"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-3 col-sm-12">
        <b-form-group
          id="form-group-btn-task-id"
          description="Envoyer l'ID"
          label="Envoyer"
          label-for="send-task-id"
        >
          <b-button
            id="send-task-id"
            variant="outline-success"
            @click="downloadResult"
            >Envoyer</b-button
          >
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  table-layout: fixed;
  width: 60%;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      uploadFile: null,
      options: [
        { value: ";", text: ";" },
        { value: ",", text: "," },
      ],
    };
  },
  methods: {
    downloadResult() {
      this.$store.dispatch("parcelle/downloadResult", {
        vm: this,
        taskId: this.taskId,
      });
    },
    handleFileUpload(event) {
      console.log(event);
      this.uploadFile = event.target.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.uploadFile);
      formData.append("seperator", this.csvSeperator);
      this.$store.dispatch("parcelle/uploadFile", {
        vm: this,
        formData: formData,
      });
    },
    togglModal() {
      this.$store.commit("parcelle/toggleModal");
    },
    handleOk() {
      this.$store.commit("parcelle/toggleModal");
      this.$store.dispatch("parcelle/getParcelles", { vm: this });
    },
    handleChange(isVisible) {
      if (isVisible != this.activeModal) {
        this.$store.commit("parcelle/toggleModal");
      }
    },
  },

  computed: {
    ...mapGetters("parcelle", ["activeModal", "csvColumns"]),
    csvColumns: {
      get() {
        return this.$store.state.parcelle.csvColumns.map((item) => {
          return { value: item, text: item };
        });
      },
    },
    csvSeperator: {
      get() {
        return this.$store.state.parcelle.csvSeperator;
      },
      set(value) {
        this.$store.commit("parcelle/updateSeperator", value);
      },
    },
    latitudeColumnName: {
      get() {
        return this.$store.state.parcelle.latitudeColumnName;
      },
      set(value) {
        this.$store.commit("parcelle/updateLatitudeColumnName", value);
      },
    },
    longtitudeColumnName: {
      get() {
        return this.$store.state.parcelle.longtitudeColumnName;
      },
      set(value) {
        this.$store.commit("parcelle/updateLongtitudeColumnName", value);
      },
    },
    taskId: {
      get() {
        return this.$store.state.parcelle.taskId;
      },
      set(value) {
        this.$store.commit("parcelle/updateTaskId", value);
      },
    },
  },
};
</script>
