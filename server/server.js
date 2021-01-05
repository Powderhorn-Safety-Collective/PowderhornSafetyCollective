
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const skillsRouter = require('./routes/skills.router');
const userRouter = require('./routes/user.router');
const patrolRouter = require('./routes/patrol.router');
const onCallRouter = require('./routes/on.call.router');
const internalNoteRouter = require('./routes/internal.note.router');
const incidentRouter = require('./routes/incident.router'); // route to handle incident data table
const incidentSortRouter = require('./routes/incident.sort.router');
const messageRouter = require('./routes/message.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/patrol', patrolRouter);
app.use('/api/oncall', onCallRouter);
app.use('/api/notes', internalNoteRouter);
app.use('/api/incident', incidentRouter); // route to handle incident data table
app.use('/api/skills', skillsRouter);
app.use('/api/incident/sort', incidentSortRouter);
app.use('/api/message', messageRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
