const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const cors = require('cors');
const voterRoutes = require('./routes/VoterRoutes');
const adminRoutes = require('./routes/adminRoutes');
const database = require('./Database/database')
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database();
app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'Voter backend running',type: "Major Project of final year"})
})
app.use('/api/admin',adminRoutes)
app.use('/api/voter',voterRoutes)
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})