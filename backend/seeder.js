const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/productModel');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const products = [
    {
        name: 'ASUS TUF Gaming F15',
        brand: 'ASUS',
        price: 265000,
        specs: {
            processor: 'Intel Core i5-11400H',
            ram: '8GB',
            storage: '512GB NVMe SSD',
            display: '15.6" 144Hz',
            graphics: 'RTX 3050'
        },
        image: 'https://dlcdnwebimgs.asus.com/gain/3b993307-55db-449e-b838-51846b4142f1/',
        description: 'Geared for serious gaming and real-world durability, the TUF Gaming F15 is a fully-loaded Windows 10 gaming laptop.',
        stock: 5
    },
    {
        name: 'Dell Inspiron 15 3000',
        brand: 'Dell',
        price: 185000,
        specs: {
            processor: 'Intel Core i5-1135G7',
            ram: '8GB',
            storage: '256GB SSD',
            display: '15.6" FHD',
            graphics: 'Integrated'
        },
        image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3520/media-gallery/black/notebook-inspiron-15-3520-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573&qlt=100,1&resMode=sharp2&size=573,402&chrss=full',
        description: 'Daily to-do’s, done. The speed you need. A more responsive yet quieter performance.',
        stock: 10
    },
    {
        name: 'Apple MacBook Air M1',
        brand: 'Apple',
        price: 310000,
        specs: {
            processor: 'Apple M1 Chip',
            ram: '8GB Unified',
            storage: '256GB SSD',
            display: '13.3" Retina',
            graphics: 'M1 GPU'
        },
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000',
        description: 'Our thinnest, lightest notebook, completely transformed by the Apple M1 chip.',
        stock: 8
    },
    {
        name: 'MSI Katana GF66',
        brand: 'MSI',
        price: 345000,
        specs: {
            processor: 'Intel Core i7-11800H',
            ram: '16GB',
            storage: '512GB SSD',
            display: '15.6" 144Hz',
            graphics: 'RTX 3060'
        },
        image: 'https://asset.msi.com/resize/image/global/product/product_16214959405d4f20819777174db26325.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
        description: 'Sharpen your game. Katana GF66 is optimized to unleash true performance during gameplay.',
        stock: 3
    }
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
