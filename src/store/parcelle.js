import { uploadFile as apiUploadFile } from "../services/parcelle";
import { downloadResult as apiDownloadResult } from "../services/parcelle";
import { getParcelles as apiGetParcelles } from "../services/parcelle";

const parcelle = {
  namespaced: true,
  state: {
    taskId: null,
    csvSeperator: ";",
    latitudeColumnName: null,
    longtitudeColumnName: null,
    uploadedFileName: null,
    csvColumns: [],
    activeModal: false,
  },
  getters: {
    activeModal: (state) => {
      return state.activeModal;
    },
  },
  mutations: {
    updateSeperator(state, csvSeperator) {
      state.csvSeperator = csvSeperator;
    },
    updateTaskId(state, taskId) {
      state.taskId = taskId;
    },
    updateColumnsNames(state, { latitudeColumnName, longtitudeColumnName }) {
      state.latitudeColumnName = latitudeColumnName;
      state.longtitudeColumnName = longtitudeColumnName;
    },
    updateCsvColumns(state, columns) {
      state.csvColumns = columns;
    },
    updateLatitudeColumnName(state, columnName) {
      state.latitudeColumnName = columnName;
    },
    updateLongtitudeColumnName(state, columnName) {
      state.longtitudeColumnName = columnName;
    },
    updateUploadedFileName(state, fileName) {
      state.uploadedFileName = fileName;
    },
    toggleModal(state) {
      state.activeModal = !state.activeModal;
    },
  },
  actions: {
    getParcelles(context, { vm }) {
      apiGetParcelles(
        context.state.uploadedFileName,
        context.state.latitudeColumnName,
        context.state.longtitudeColumnName,
        context.state.csvSeperator
      ).then((response) => {
        console.log(response);
        if (response.data.message == "task started") {
          console.log("task démarré correctement");
          console.log("ID: ", response.data.task_id);
          context.commit("updateTaskId", response.data.task_id);
          vm.$bvModal.show("modalIdTask");
        }
      });
    },
    downloadResult(context, { vm, taskId }) {
      console.log("taskID ", taskId);
      apiDownloadResult(taskId)
        .then((response) => {
          console.log(response);
          if (response.headers["content-type"].includes("text/csv")) {
            const blob = new Blob([response.data], { type: "application/csv" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
          } else if (response.data.message == "file not ready yet") {
            vm.$bvToast.toast("Votre fichier en cours de génération", {
              title: "Fichier prêt",
              toaster: "b-toaster-bottom-center",
              variant: "warning",
              solid: true,
            });
            return;
          } else if (response.data.message == "taskId not found") {
            vm.$bvToast.toast("Tâche introuvable, véfifier votre ID tâche", {
              title: "Erreur ID tâche",
              toaster: "b-toaster-bottom-center",
              variant: "warning",
              solid: true,
            });
            return;
          } else {
            vm.$bvToast.toast(response.data.message, {
              title: "Erreur de traitement",
              toaster: "b-toaster-bottom-center",
              variant: "danger",
              solid: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          vm.$bvToast.toast("Ereur inconnu. Vérifier votre fichier d'entré", {
            title: "Erreur",
            toaster: "b-toaster-bottom-center",
            variant: "error",
            solid: true,
          });
        });
    },

    uploadFile(context, { formData }) {
      console.log("formData", formData);
      apiUploadFile(formData)
        .then((response) => {
          console.log(response);
          context.commit("updateUploadedFileName", response.data.filename);
          context.commit("updateCsvColumns", response.data.columns);
          if (response.data.columns) {
            context.commit("toggleModal");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default parcelle;
