import React, { useEffect, useState } from "react";
import { IsolationForest } from "isolation-forest";

import "./IsolationForest.css";
import { getApps } from "../../api";
import Loader from "../Loader";

export default function IsolationForestComponent() {
  const [data, setData] = useState(null);
  const [scores, setScores] = useState([]);
  const [scoresComputed, setScoresComputed] = useState(false);
  const [maxFound, setMaxFound] = useState(false);
  // An array of arrays of the results to be output into a table
  // Score    |    App Name    |    Genre    |    Price    |    User Rating    |    Total Rating Count
  const [results, setResults] = useState([]);
  const [resultsComputed, setResultsComputed] = useState(false);

  // A function to get the next maximum outlier from the data (and then removes it so we can find the next one as well)
  function getNextMax() {
    const maxValue = Math.max(...scores);
    const indexOfMaxValue = scores.indexOf(Math.max(...scores));
    const application = data[indexOfMaxValue];
    const result = {
      score: maxValue,
      app_name: application.track_name,
      genre: application.prime_genre,
      price: application.price,
      user_rating: application.user_rating,
      total_rating_count: application.rating_count_tot,
    };
    if (indexOfMaxValue > -1) {
      setScores(scores.splice(indexOfMaxValue, 1));
      setData(data.splice(indexOfMaxValue, 1));
    }
    return result;
  }

  useEffect(() => {
    console.log(results);
  }, [results]);

  useEffect(() => {
    getApps()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (data && !scoresComputed) {
      const isolationForest = new IsolationForest();
      isolationForest.fit(data);
      setScores(isolationForest.scores());
      setScoresComputed(true);
    }
  }, [data, scoresComputed]);

  useEffect(() => {
    if (scoresComputed && !maxFound) {
      let max_results = [];
      for (let index = 0; index < 10; index++) {
        max_results = [...max_results, getNextMax()];
        setMaxFound(true);
      }
      setResults([...max_results]);
      setResultsComputed(true);
    }
  }, [scoresComputed, maxFound, getNextMax]);

  function renderTableHeader() {
    let header = Object.keys(results[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  function renderTableData() {
    console.log(results);
    return results.map((result, index) => {
      const {
        score,
        app_name,
        genre,
        price,
        user_rating,
        total_rating_count,
      } = result; //destructuring
      return (
        <tr key={index}>
          <td>{score}</td>
          <td>{app_name}</td>
          <td>{genre}</td>
          <td>{price}</td>
          <td>{user_rating}</td>
          <td>{total_rating_count}</td>
        </tr>
      );
    });
  }

  return (
    <div id="isolation-forest">
      {resultsComputed ? (
        <div className="table">
          <table id="results">
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
