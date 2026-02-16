const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Upload product image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        // Return the file path
        const filePath = `/uploads/products/${req.file.filename}`;
        res.status(200).json({
            message: 'Image uploaded successfully',
            filePath: filePath
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
