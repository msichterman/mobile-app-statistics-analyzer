import axios from "axios";

export const getApps = () => {
  return axios
    .get("http://localhost:5000/api/applications/price-ratings")
    .then((res) => {
      return res.data;
    })
    .catch((err) => alert("Error: Unable to fetch genres."));
};

export const getGenres = () => {
  const options = [];
  axios
    .get("http://localhost:5000/api/applications/genres")
    .then((res) => {
      res.data.forEach((element) => {
        options.push({ value: element, label: element });
      });
    })
    .catch((err) => alert("Error: Unable to fetch genres."));
  return options;
};
