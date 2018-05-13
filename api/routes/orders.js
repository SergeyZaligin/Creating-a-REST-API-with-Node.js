const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });

});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'Handling POST requests to /orders',
        order
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