const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
        enum: ['ASUS', 'MSI', 'Dell', 'HP', 'Lenovo', 'Apple', 'Other']
    },
    price: {
        type: Number,
        required: true,
    },
    specs: {
        processor: { type: String, required: true },
        ram: { type: String, required: true },
        storage: { type: String, required: true },
        display: { type: String, required: true },
        graphics: { type: String },
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        default: 10,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
