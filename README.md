# Notes
Advanced Web Development, Assignment 2, Group AB

## About Notes
As a team we decided to create a note taking web application, this app would take inspiration from other popular note taking apps such as Evernote, 
Apple Notes and Google Keep. The main purpose of this app would be to write and store notes that can easily be accessed from anywhere. This website 
will target users aged 16+ that can find usefulness in keeping notes for studying or even remembering a shopping list.
The app stores the notes in a database, and the user can create, edit, delete and share notes from any web browser.

# Features
* Create, edit, delete and share notes
* Store notes in a database

# Technologies Used
* React
* Node.js
* Express
* MongoDB
* Mongoose

# Progress

We were able to implement the login, register and notes functionality in the app. There is support for sharing notes in the api, but the sharing feature in the frontend is yet to be implemented. Users are still able to edit notes on any web browser and progress is synchronised between multiple clients.

# Source Code
The frontend application is available i nthe `notes-client` folder and the express api is in the `notes-server` folder.

### API
* The mongoose models are within the `models` folder and any database operations are within the `services` folder.
* The controllers are within the `controllers` folder. These contain the route functions for the api.
* The routes are within the `routes` folder. This use the controllers and bind them to route paths.
* JWT authentication middleware is in the `middleware` folder
* The `utils` folder contains the function to generate JWTs.
* Swagger docs located at https://cryptic-everglades-79395.herokuapp.com/api-docs/
# Next Steps
The next steps for this project are to complete the frontend, and to finish implementing the edit user profile and sharing features.

## Notes Setup
1. Clone this repo locally using https://desktop.github.com/ or typing `git clone https://github.com/MQCOMP3120-2021/group-web-project-group-ab-1.git`
2. Install Node: https://nodejs.org/en/
3. Open a commandline inside notes-client folder and type: `npm install` and then `npm build`
4. Open a commandline inside notes-server folder and type: `npm install` and then `npm start`

# API Testing
* run `npm run test` in the notes-server folder to test the api
## Team Members
- Hayden Chan - Backend
- Cheuk Ying Chui - Frontend
- Zoe Fong - Frontend
- Lindsay Sperring - Backend
