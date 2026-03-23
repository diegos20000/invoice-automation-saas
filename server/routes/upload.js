const express = require("express");
const multer = require("multer");

const extractTextFromImage = require("../services/ocrService");
const parseInvoiceData = require("../services/invoiceParser");
const Invoice = require("../models/Invoice");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("invoice"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const extractedText = await extractTextFromImage(filePath);
    const parsedData = parseInvoiceData(extractedText);

    const newInvoice = new Invoice({
      fileName: req.file.filename,
      invoiceNumber: parsedData.invoiceNumber,
      amount: parsedData.amount,
      date: parsedData.date,
      rawText: extractedText,
    });

    const savedInvoice = await newInvoice.save();

    console.log("Saved invoice:", savedInvoice);

    res.json({
      message: "File uploaded, processed, and saved",
      parsedData,
      rawText: extractedText,
      savedInvoice,
    });
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({
      message: "Processing failed",
      error: error.message,
    });
  }
});

module.exports = router;