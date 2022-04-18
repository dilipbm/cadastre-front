import httpClient from ".";

const uploadFile = (formData) =>
  httpClient.post(`parcelle/uploadfile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const getParcelles = (filename, latColName, lgtColName, seperator) =>
  httpClient.get(`parcelle/getParcelles`, {
    params: {
      filename: filename,
      latcolname: latColName,
      lgtcolname: lgtColName,
      seperator: seperator,
    },
  });

const downloadResult = (taskId) =>
  httpClient.get(`parcelle/downloadResult/${taskId}`);

export { downloadResult, getParcelles, uploadFile };
