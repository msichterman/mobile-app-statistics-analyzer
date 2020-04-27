import axios from "axios";

const getAllApps = () => {};

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

export const getAppsByGenre = (genre) => {
  const apps = [];
  axios
    .get(`http://localhost:5000/api/applications/${genre}`)
    .then((res) => {
      res.data.forEach((app) => {
        apps.push([
          app.track_name,
          app.price,
          app.rating_count_tot,
          app.user_rating,
        ]);
      });
    })
    .catch((err) =>
      alert("Error: Unable to fetch applications for the given genre.")
    );
  return apps;
};
