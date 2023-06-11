const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const {mongoose} = require('./database');

//Settings
app.set('port', process.env.PORT || 3000); //Para desplegar la app en un puerto

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
const routes = require('./routes/task.routes');
app.use('/api/tasks', routes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));


//Starting server
app.listen(app.get('port'), () => { console.log('Server Started....')});
