# Mobile App Statistics Analyzer  - Final Project
***Disclaimer: This repository is public to showcase skills developed from this assignment. I am in no way reponsible for any academic integrity issues should any code be re-used or copied from any part of this assignment.**

## Motivation
This application was created to satisfy the requirements the final project in my `CSCE 411: Data Modeling for Systems Development` class at the University of Nebraska-Lincoln. The project required the following three components:
- E-R Database (well-designed following the steps of Data Modeling discussed in class)
- Web Application
- Data Analysis & Visualization

The goal of the project was to facilitate the process of deriving business intelligence from a large dataset. With the dataset, we were to implement and empasize the following techniques that we learned in class:
- Data Analysis using Data Modeling techniques such as clustering, anomaly detection and visualization techniques.
- Emphasize the efficiency improvement of the analysis (both algorithmic and data model based)
- Store data in a database (NoSQL/MySQL/graph stores or some combinations) by following the principles of end-to-end data analysis workflow. You must be able to justify your modeling decisions.
- Enable web-based visualization by creating a JavaScript based web-application. You may use D3 API for visualization.

![](FinalProjectDemo.gif)

## Technologies
### MERN Stack - **MongoDB, ExpressJS, React, NodeJS**
### Back-End
* Node.js
    * [Express.js](https://expressjs.com/)
* MongoDB
    * [Mongoose](https://mongoosejs.com/docs/)
### Front-End
* JavaScript
   * [React](https://reactjs.org/)
   * [D3.js](https://d3js.org/)
   * [isolation-forest](https://www.npmjs.com/package/isolation-forest)
* HTML
* CSS

## Getting Started
In order to use the application locally, you'll need to do a few things first.

1. Clone this repository and `cd` into the repository's directory
```
git clone https://github.com/msichterman/CSCE411-FinalProject.git && cd ./CSCE411-FinalProject
```

2. Install all of the `node_modules` required for the project. Depending on your computer's configuration, you may need to prefix this command with a `sudo`.
```
npm install && npm run client-install
```
or
```
sudo npm install && sudo npm run client-install
```

3. Lastly, run the following command to get the project off the ground. This command will not only build your JS files, but it will also auto-compile your files on every file save. This allows for hot reloading on-save when the backend and/or frontend code is updated.

```
npm run dev
```

4. Head over to [http://localhost:3000](http://localhost:3000) to see the application live!

## Reproducing the Entire Project
**1). Creating the project structure**
The technologies used for the project follow the MERN Stack: MongoDB, ExpressJS, React, NodeJS. This is a full-stack JavaScript approach utilizing a NoSQL database. This stack allows for a lot of developer freedom, so the project structure is very simple and intuitive with limited boilerplate code. The repository is seperated into two main folders; client and server. The following steps will help to reproduce the same results:
* Create the root directory and ```cd``` into the directory
```mkdir CSCE411-FinalProject && cd CSCE411-FinalProject```
* Initialize the root folder with the package manager
```npm init```
* Download the dependencies needed for the project
```npm install --save concurrently config express mongoose nodemon path```
* Create the ```client``` a.k.a. UI of the app using [create-react-app](https://github.com/facebook/create-react-app) and cd into the client folder
```npx create-react-app client && cd client```
* Optional: Delete unneeded files (if desired) including ```App.test.js```, ```logo.svg```, ```serviceWorker.js```, ```setupTests.js``` and any of the dependencies of the deleted code.
* In the ```App.js``` file, clear the demo code in the ```div``` and add a `h1` tag: ```<h1>CSCE 411: Final Project</h1>```
* ```cd ..``` to get back to the root of the repository, then create the folder for the ```server``` code and ```cd``` into the folder:
```mkdir server && cd server```
* Create the following folders for the server code using this command:
```mkdir config models routes/api```
* Create a ```server.js``` file in the root of the ```server``` folder and add all of the MongoDB and configurations to run the server code.
* See the ```models``` folder for the database schemas and the ```routes/api``` folder for the actual API calls
* Copy and paste the following into the scripts section of the ```package.json``` file in the root of the repository (```CSCE411-FinalProject``` folder):
```
  "scripts": {
    "client-install": "npm install --prefix client",
    "start": "cd server && node server.js",
    "server": "cd server && nodemon server.js",
    "client": "npm start --prefix client",
    "dev-install": "concurrently \"npm install\" \"npm run client-install\"",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```
* Finally, run the following commands to install all of the dependencies and run the client and server code with a single command including hot-reload:
   * ```npm run dev-install``` to install all dependencies
   * ```npm run dev``` to run the client and server code with hot-reload, see the local running app [here](http://localhost:3000/)!
   
   
Now the repository should be completely setup and ready to begin development!

**2). Importing the data into the MongoDB database**
* Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in (I use my Google account)
* Create a new project, I named it ```CSCE411FinalProject```
* Under the ```Clusters``` tab in the sidebar, select ```Build a New Cluster```
* Choose a provider (I used AWS), then choose ```N. Virginia``` and ```M0 Sandbox``` as the ```Cluster Tier``` to take advantage of the ```Free Forever``` pricing guarantee, and finally add a ```Cluster Name``` and create the cluster.
* Next, select ```Create Database``` and name it ```project```
* Within the ```project``` database that was just created, create a collection called ```applications``` which will store documents where each document represents an application.
* Click on the ```Network Access``` option on the sidebar and click ```Add IP Address```, then add the address ```0.0.0.0/0``` just for the sake of easy access for this application (not for production apps). 
* Download the ```AppleStore.csv``` file from this [link](https://www.kaggle.com/ramamet4/app-store-apple-data-set-10k-apps/data).
* In order to import this CSV file into the MongoDB database you'll have to download the MongoDB command line tool first by running the following commands (assuming you're using MacOS and homebrew is installed):
   * ```brew tap mongodb/brew```
   * ```brew install mongodb-community```
   * ```mongod``` to make sure that MongoDB was installed in the command line
* To import the CSV file, go back to the ```Clusters``` page on MongoDB Atlas by clicking the link in the sidebar, then click on the ```FinalProject``` cluster.
* Now on the top navbar click ```Command Line Tools``` and scroll down to the ```mongoimport``` section. Copy the given snippet, which will allow you to import a CSV to the database that you created. You may have to create a database account to access the database, but Atlas will walk you through it.
* In the command line, ```cd``` into the folder that you downloaded the ```AppleStore.csv``` file to, paste in the ```mongoimport``` snippet.
* Add the ```--headerline``` to the end of the pasted snippet, then add ```csv``` as the ```<FILETYPE>``` and ```AppleStore.csv``` as the ```<FILENAME>```.
   
This will populate the applications collection by creating documents for each application in the AppleStore.csv file. Check the collection on MongoDB Atlas to ensure that the data was successfully imported.

## Get In Touch
* Follow me on [Twitter](https://twitter.com/mattsichterman)
* Connect with me on [LinkedIn](https://www.linkedin.com/in/msichterman/)

