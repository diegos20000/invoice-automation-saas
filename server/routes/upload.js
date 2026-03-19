const express = require('express');
const multer = require('multer');
const extractTextFromImage = require('../services/ocrService');
const parseInvoiceText = require('../services/invoiceParser');

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('invoice'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Field name must be "invoice"' });
        }

        const extractedText = await extractTextFromImage(req.file.path);
        const parsedData = parseInvoiceText(extractedText);

        res.json({
            message: 'File uploaded successfully',
            file: req.file,
            text: extractedText,
            parsed: parsedData
        });
    } catch (error) {
        res.status(500).json({ error: 'Error processing the image', details: error.message });
    }
});

module.exports = router;