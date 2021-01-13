# Powderhorn Safetey Collective (PSC) - app
This app is a tool to facilitate the PSC's activities in the Powderhorn community. The app allows for unregistered community members to view information about incidents, as well as report incidents to the PSC. Registered users are able do the same, as well as follow and recieve text alerts about incidents. Volunteers (Members) can set their status as on patrol, on call, or off duty, respond to and update information on indidents, receive text alerts when they have been assigned to an incident, set incidents as duplicate, set active-status of incidents, and post public notices about incidents. Administrators have the additional capability of editing and updating users and incidents.



## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
(a full list of dependencies can be found in `package.json`)

## Built With
- Node.js
- React
- React-Redux
- PostgreSQL
- Bootstrap
- Material UI
- Sass
- Sweet Alerts
- Twilio
- MailChimp


## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=longComplexString

  Replace `longComplexString` with some long random string to keep the application secure. 
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App





