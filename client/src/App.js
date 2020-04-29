import React from "react";
import "./App.css";
import IsolationForestComponent from "./components/IsolationForest/IsolationForest";
import PriceRatingCount from "./components/PriceRatingCount/PriceRatingCount";
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
        <br />
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
        <p>
          The dataset contains details and analytics for over 7000 mobile apps
          from the iOS app store. The data was collected from the iTunes Search
          API at the Apple Inc website. For every app there are 16 describing
          attributes. The attributes are listed as followed:
        </p>
        <div className="list-container">
          <div className="column left">
            <li>
              <strong>id:</strong> App ID
            </li>
            <li>
              <strong>track_name:</strong> App Name
            </li>
            <li>
              <strong>size_bytes:</strong> Size (in Bytes)
            </li>
            <li>
              <strong>currency:</strong> Currency Type
            </li>
            <li>
              <strong>price:</strong> Price amount
            </li>
            <li>
              <strong>rating_count_tot:</strong> User Rating counts (for all
              versions)
            </li>
            <li>
              <strong>rating_count_ver:</strong> User Rating counts (for current
              version)
            </li>
            <li>
              <strong>user_rating:</strong> Average User Rating value (for all
              versions)
            </li>
          </div>
          <div className="column right">
            <li>
              <strong>user_rating_ver:</strong> Average User Rating value (for
              current version)
            </li>
            <li>
              <strong>ver:</strong> Latest version code
            </li>
            <li>
              <strong>cont_rating:</strong> Content Rating
            </li>
            <li>
              <strong>prime_genre:</strong> Prime Genre
            </li>
            <li>
              <strong>sup_devices.num:</strong> Number of supporting devices
            </li>
            <li>
              <strong>ipadSc_urls.num:</strong> Number of screenshots showed for
              display
            </li>
            <li>
              <strong>lang.num:</strong> Number of supported languages
            </li>
            <li>
              <strong>vpp_lic:</strong> Vpp Device Based Licensing Enabled
            </li>
          </div>
        </div>

        <p>
          The original format of the dataset was a CSV file. Each app is
          represented by a row, while each attribute is represented by a column.
          This makes the dataset have 7197 rows and 16 columns. This also means
          that the dataset is in a semi-structure format. All attribute names
          are represented by text descriptors, while attribute values can be
          either text descriptions or numeric values. The numeric values are a
          combination of discrete (size_bytes, rating_count_tot,
          rating_count_ver) and continuous (price, user_rating,
          user_rating_ver).
        </p>
      </section>
      <section id="data-modeling">
        <h2>Data Modeling</h2>
        <p>
          Overall, the data is fairly simple and doesn’t contain any complex set
          of relations. The dataset can be thought of as one object type, with a
          set amount of fields that do not vary in amount. Because of this,
          modeling the data is fairly simple, however it is still important to
          detail the modeling steps throughout.This includes conceptual,
          logical, and physical modeling.
        </p>
        <h3>Conceptual Modeling</h3>
        <p>
          It was immediately clear that in this dataset that there is only one
          important entity, and that is apps. Within this entity, there are a
          number of attributes. For each of these attributes, and the app entity
          itself, we asked ourselves important questions such as: What is the
          most appropriate name for the entity and its attributes? Does the
          scope only include the app entity, or are there other important
          entities to consider? Are any of the attributes entities themselves,
          or are they simple enough to be just fields? Upon answering these
          questions, we were able to begin to define a conceptual model for the
          data. We decided it was best to use the attribute names given to us
          from the original dataset. The names are already transparent and
          easily understandable, and represent some form of standard in the
          field. We also determined that all attributes outside of the app
          entity itself were simple enough to be kept as fields with only one
          value. This was again determined by looking at the original format of
          the dataset provided, which was in a simple CSV format. Because of the
          simplicity of having only one entity, we determined it best to use a
          NoSQL database in the form of MongoDB, rather than an SQL database
          such as MySQL.
        </p>
        <h3>Logical Modeling</h3>
        <p>
          Since we assumed from our conceptual modeling step that a
          non-relational database was most appropriate, the logical modeling
          step was fairly straight forward. We first began by filling in our
          conceptual data model. We asked ourselves questions such as: Are all
          attributes necessary? Are any attributes redundant? How will we
          identify entities? How will we determine any relationship between
          entities if applicable? Is there more than one type of entity? Will
          every attribute always have a value? Asking ourselves these questions
          lead us to a couple important conclusions. First, not all attributes
          were necessary for our purposes. We considered removing the following
          attributes from the original dataset: the number of supported devices,
          the number of preview images provided upon download, the number of
          languages, and whether VPP device based licensing was enabled. We
          ended up using including these futures for future scope purposes, as
          more analysis of these features could offer some insight into what
          makes an app successful. We also looked for relationships between
          these attributes and determined that each entity instance was
          independent of the other entity instances. This further solidified our
          decision to use a NoSQL database. We also found that each entity
          already contained a unique identifier provided by the dataset. Lastly,
          we determined that there was only one primary type of entity, and for
          that type every attribute would always have an existing value.
        </p>
        <h3>Physical Modeling</h3>
        <p>
          The last step of modeling our data was the physical modeling stage.
          Upon completing logical modeling, we had a good idea of the overall
          design of our NoSQL database. Our last task was to ask ourselves
          questions such as: How many apps will we need, and therefore how much
          storage will we need? What are the performance impacts of loading and
          retrieving app data? Do we need any additional indices to further
          improve performance? Should we embed or reference? By double checking
          the database, we saw that there are less than 10,000 apps in our
          dataset. This is well within the means of easy storage, and high
          performance for loading and retrieving app data. Because of this, we
          determined no need for additional indices within our data. Also, since
          our entity attributes are simple enough to be considered fields with a
          single value, rather than instances or multiple value fields, there is
          no need for embedded or referenced relationships. This made the
          physical modeling of our data straightforward, and we were able to
          manually create a simple collection of app documents.
        </p>
        <div id="image-container">
          <img
            src="/PhysicalModelingExample.png"
            alt="Physical model object example"
          />
          <p>
            This image shows an example of the physical modeling in our NoSQL
            database.
          </p>
        </div>
      </section>
      <section id="data-analysis">
        <h2>Data Analysis</h2>
        <p>
          In order to analyze the data, we decided to perform anomaly detection.
          We used the Isolation Forest algorithm that was discussed in class,
          and implemented it using a JavaScript library that can be found{" "}
          <a
            href="https://www.npmjs.com/package/isolation-forest"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <br />
        <p>
          Anomaly detection is able to consider data with many features, without
          having to perform dimensionality reduction. This was ideal for our
          data set since we were it has many features. This technique allowed us
          to attempt to isolate anomalies from features that we did not consider
          in our visualizations below. For this specific instance, we decided to
          consider only features that represent the apps a whole, rather than
          considering version specific ratings. Therefore, we considered only
          the price, rating_count_total, and user_rating features for this
          analysis. For this algorithm, an anomoly score close to 1 means that
          the app is definitely an anomoly. For the purpose of displaying the
          data, only the 10 applications with the highest anomoly score are
          shown below. The anomoly results could potentially expose an app that
          did not fit the typical parameters or relationships we found through
          manual data analysis. Further analysis of any given anomaly for an app
          may reveal what feature or event triggered the anomaly in the first
          place and could allow app creators to encourage or avoid that
          triggering feature.
        </p>
        <IsolationForestComponent />
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
          Price and Rating Count Totals for All Apps w/ Tooltips (Scatterplot):
        </h3>
        <PriceRatingCount />
        <hr />
        <h3>
          Count of Apps for Each Genre Costing Over $20 w/ Tooltips (Bar Chart):
        </h3>
        <HighCostAppGenre />
        <hr />
        <h3>
          User Rating and Rating Count Totals for a Given Genre w/ Tooltips
          (Scatterplot):
        </h3>
        <AppRatingCount />
      </section>
    </div>
  );
}

export default App;
