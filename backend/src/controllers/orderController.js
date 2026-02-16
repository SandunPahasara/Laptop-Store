const Order = require('../models/orderModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = async (req, res) => {
    const {
        customerName, phone, address, city, district, province,
        orderItems, paymentMethod, totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            customerName, phone, address, city, district, province,
            orderItems, paymentMethod, totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

module.exports = { addOrderItems };
