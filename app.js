var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http')
const {connectToDb}=require("./config/db")
var cors = require('cors')
var usersRouter = require('./routes/usersRouter');
var taskRouter = require('./routes/taskRouter');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();

app.use(cors({
  origin: '*',
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true
}));

app.get('/ping', (req, res) => {
  res.status(200).send('OK');
});
app.use('/users', usersRouter);
app.use('/tasks', taskRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const server=http.createServer(app);
const port = 5000
server.listen(port, () => {
  connectToDb();
  console.log(`Serveur démarré sur le port ${port}`);
});
module.exports = app;
