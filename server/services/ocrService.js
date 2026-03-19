const Tesseract = require('tesseract.js');

const extractTextFromImage = async (imagePath) => {
    let worker;
    try {
        worker = await Tesseract.createWorker('eng');
        const result = await worker.recognize(imagePath);
        return result.data.text;
    } catch (error) {
        throw error;
    } finally {
        if (worker) await worker.terminate();
    }
};

module.exports = extractTextFromImage;