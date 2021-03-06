// Setting up environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const router = require('./app.router');

const PORT = process.env.PORT || 3000;
const BASE_PATH = path.resolve(__dirname, '..');
const MONGO_DB = process.env.MONGO_DB || 'mongodb://127.0.0.1/your_photos_db';

mongoose.connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Enabling CORS on dev environment
if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

app.use(fileUpload({}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static(`${BASE_PATH}/public/app`));

router(app);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
