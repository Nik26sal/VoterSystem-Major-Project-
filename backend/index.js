const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const cors = require('cors');
const voterRoutes = require('./routes/voterRoutes');
const adminRoutes = require('./routes/adminRoutes');
const database = require('./Database/database')
const app = express();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');

app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database();
app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'Voter backend running',type: "Major Project of final year"})
})
app.get('/api/checkAuth',authMiddleware,(req,res)=>{
	res.status(200).json({message: "Authenticated",user:{id: req.user.id}});
}); 
app.use('/api/admin',adminRoutes)
app.use('/api/voter',voterRoutes)
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})