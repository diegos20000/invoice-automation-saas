const express = require('express');
const cors = require('cors');

const uploadRoute = require("./routes/upload"); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/upload', uploadRoute);

app.get('/', (req, res) => {
    res.send('Invoice Automation API Running');
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
});