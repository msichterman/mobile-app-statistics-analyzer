import React from "react";
import "./App.css";
import AppRatingCount from "./components/AppRatingCount/AppRatingCount";
import HighCostAppGenre from "./components/HighCostAppGenre/HighCostAppGenre";

function App() {
  return (
    <div className="App">
      <h1>
        <span id="course">CSCE 411:</span> Final Project{" "}
        <span role="img" aria-label="Phone emoji">
          &#128242;
        </span>
      </h1>
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
      <section id="dataset">
        <h2>Dataset</h2>
        <p>
          The dataset of interest is the{" "}
          <strong>"Mobile App Statistics (Apple iOS App Store)"</strong> dataset
          and it can be found{" "}
          <a
            href="https://www.kaggle.com/ramamet4/app-store-apple-data-set-10k-apps/data"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <p>
          <strong>Description (from the dataset source):</strong>
          <br />
          The ever-changing mobile landscape is a challenging space to navigate.
          The percentage of mobile use over desktop is only increasing. Android
          holds about 53.2% of the smartphone market, while iOS is 43%. To get
          more people to download your app, you need to make sure they can
          easily find your app. Mobile app analytics is a great way to
          understand the existing strategy to drive growth and the retention of
          future users.
          <br />
          <br />
          With million of apps around nowadays, the following data set has
          become key to getting top trending apps in iOS app store. This dataset
          contains more than 7000 Apple iOS mobile application details. The data
          was extracted from the iTunes Search API at the Apple Inc website. R
          and linux web scraping tools were used for this study.
          <br />
          <br />
          <strong>Data collection date (from API):</strong> July 2017
          <br />
          <br />
          <strong>Dimension of the data set:</strong> 7197 rows and 16 columns
        </p>
      </section>
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
          The dimension of the raw data is 16 as there are that many features.
          The dimensionality reduction technique that we used was simply taking
          two specific features and comparing them directly. This allows us to
          simply compare various fields of the applications and makes our
          findings easily reproducable and understandable. We used{" "}
          <a href="https://d3js.org/" target="_blank" rel="noopener noreferrer">
            D3.js
          </a>{" "}
          to create interactive visualizations for the data.
        </p>
        <hr />
        <h3>
          Count of Apps for Each Genre Costing Over $20 w/ Tooltips (Bar Chart)
        </h3>
        <HighCostAppGenre />
        <hr />
        <h3>
          User Rating and Rating Count Totals for a Given Genre w/ Tooltips
          (Scatterplot)
        </h3>
        <AppRatingCount />
      </section>
    </div>
  );
}

export default App;
