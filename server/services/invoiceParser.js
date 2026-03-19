const parseInvoiceText = (text) => {
    const invoiceNumber = text.match(
        /(?:invoice\s*#?|inv#?|invoice\s*no\.?)[:\s]*([A-Z0-9-]+)/i
    )?.[1] || null;

    // grab first line as company since no "From:" label
    const company = text.split('\n')[0]?.trim() || null;

    const amount = text.match(
        /(?:total|amount\s*due|balance\s*due|grand\s*total)[:\s$£€]*([0-9,]+\.?[0-9]*)/i
    )?.[1] || null;

    // match dates with or without a label
    const date = text.match(
        /(?:(?:date|invoice\s*date|issued)[:\s]+)?(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4}|\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i
    )?.[1]?.trim() || null;

    return {
        invoiceNumber,
        company,
        amount: amount ? parseFloat(amount.replace(/,/g, '')) : null,
        date
    };
};

module.exports = parseInvoiceText;