import httpClient from ".";

const searchAddress = ({ query }) => {
  delete httpClient.defaults.headers["Access-Control-Allow-Origin"];
  return httpClient.get(`https://api-adresse.data.gouv.fr/search/`, {
    params: {
      q: query,
      limit: 10,
    },
  });
};

export { searchAddress };
