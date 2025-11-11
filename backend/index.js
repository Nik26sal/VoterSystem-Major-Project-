const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'Voter backend running',type: "Major Project of final year"})
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})