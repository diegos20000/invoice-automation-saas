const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    fileName: string,
    driveUrl: string,
    invoiceNumber: string,
    company: string,
    amount: number,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);