const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const db = require('./db');
const history = require('connect-history-api-fallback');
const cookieParser = require('cookie-parser');

// const Units_details = require('./models/Units_details');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(morgan('combined'));
// app.use(cors());
// app.use(history());

// cookieParser middleware
app.use(cookieParser()); 

// Test DB Connection
db.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Error: ' + err))


// Offices.sync({force: true});
// Units_details.sync({force: true});

// require('./routes')(app);
// app.use("/", require("./routes/web"));
// require('./routes')(app);
require('./web')(app);
// require('./routes/routes')(app);

// if(process.env.NODE_ENV === 'production'){
// app.use(express.static(__dirname + '/dist/'));
// Template engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static('public'));


const port = process.env.PORT || 7001;

// console.log(__dirname);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});