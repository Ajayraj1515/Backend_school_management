const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use('/api/schools', schoolRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the School Management API');
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
