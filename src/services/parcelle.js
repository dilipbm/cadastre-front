import httpClient from ".";

const uploadFile = (formData) =>
  httpClient.post(`/uploadfile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const getParcelles = (filename, latColName, lgtColName, seperator) =>
  httpClient.get(`/getParcelles`, {
    params: {
      filename: filename,
      latcolname: latColName,
      lgtcolname: lgtColName,
      seperator: seperator,
    },
  });

const downloadResult = (taskId) => httpClient.get(`/downloadResult/${taskId}`);

export { downloadResult, getParcelles, uploadFile };
