import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>CSCE 411: Final Project &#128242;</h1>
      <p id="intro">
        The mobile app landscape has done nothing but grow over the last 5-10
        years. Currently, the Apple App Store houses 2 million available apps.
        As iPhones have continued to evolve into powerful handheld computers, it
        is no surprise that more and more mobile apps continue to enter the
        market; a market flooded with apps of all categories including
        productivity, games, news, and more. The large number of apps makes app
        discovery extremely difficult, meaning that users are only using a
        select number of the most popular apps on a regular basis. The problem
        that we will be investigating is this: what is the correlation between
        app genre and price when considering app creation or purchase, and how
        does that affect the user ratings and popularity?
      </p>
      <section id="data-modeling">
        <h2>Data Modeling</h2>
        <p>
          The data modeling step was done in three parts: conceptual modeling,
          logical modeling and physical modeling.
        </p>
        <p>
          The database that we selected is MongoDB which is a NoSQL database. We
          selected this type of database because each application has the same
          fields, so a document database storing each application as an
          individual record was the most intuitive.
        </p>
      </section>
      <section id="data-analysis">
        <h2>Data Analysis</h2>
        <p>
          In order to analyze the data, we used clustering to try to determine
          what attributes correlate to a successful application.
        </p>
      </section>
      <section id="data-visualization">
        <h2>Data Visualization</h2>
        <p>
          The dimension of the raw data is 15 as there are that many features.
          The dimensionality reduction technique that we used was simply taking
          two specific features and comparing them directly. This allows us to
          simply compare various fields of the applications and makes our
          findings easily reproducable and understandable. We used{" "}
          <a href="https://d3js.org/" target="_blank">
            D3.js
          </a>{" "}
          to create interactive visualizations for the data.
        </p>
      </section>
    </div>
  );
}

export default App;
