const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Model
const Order = require('../models/order');

router.get('/', (req, res, next) => {

    Order.find()
    .exec()
    .then(docs => {
        res.status(201).json(docs);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });

});

router.post('/', (req, res, next) => {

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });

    order.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created order successfully',
                createdOrder: {
                    quantity: result.quantity,
                    product: result.product,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/orders/' + result._id
                    }
                }
            });        
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error
            });
        });

});

router.get('/:orderId', (req, res, next) => {

    const id = req.params.orderId;

    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id
        });
    } else {
        res.status(200).json({
            message: 'You passed id'
        });
    }
    
});

router.patch('/:orderId', (req, res, next) => {

    const id = req.params.orderId;

    res.status(200).json({
        message: 'UPDATED order by id',
        id
    });
    
});

router.delete('/:orderId', (req, res, next) => {

    const id = req.params.orderId;

    res.status(200).json({
        message: 'DELETED order by id',
        id
    });
    
});

module.exports = router;