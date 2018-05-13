const express = require('express');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRouters = require('./api/routes/products');
const orderRouters = require('./api/routes/orders');

mongoose.connect(
    'mongodb+srv://admin:'
     + process.env.MONGO_ATLAS_PW + 
     '@cluster0-vzcg9.mongodb.net/test?retryWrites=true'
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
         'PUT, POST, DELETE, PATCH, GET');
         return res.status(200).json({});
    }
    next();
});


app.use('/products', productRouters);
app.use('/orders', orderRouters);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;