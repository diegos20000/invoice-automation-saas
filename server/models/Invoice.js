const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  fileName: String,
  invoiceNumber: String,
  amount: String,
  date: String,
  rawText: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);