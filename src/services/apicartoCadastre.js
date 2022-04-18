import httpClient from ".";

const getParcelle = ({ latitude, longtitude }) => {
  const geometry = {
    type: "Point",
    coordinates: [Number(longtitude), Number(latitude)],
  };
  return httpClient.get(`https://apicarto.ign.fr/api/cadastre/parcelle`, {
    params: {
      geom: JSON.stringify(geometry),
    },
  });
};

export { getParcelle };
