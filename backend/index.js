const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const cors = require('cors');
const voterRoutes = require('./routes/voterRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventRoutes');
const database = require('./Database/database')
const app = express();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const Voter = require('./models/Voter.js');
const Admin = require('./models/Admin.js');
const updateEventStatuses = require("./utils/updateEventStatus");

app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database();
setInterval(() => {
  updateEventStatuses();
}, 60 * 1000);
app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'Voter backend running',type: "Major Project of final year"})
})
app.get('/api/checkAuth',authMiddleware,async (req,res)=>{
	const existingVoter = await Voter.findById(req.user.id);
	if (existingVoter) {
		return res.status(200).json({message: "Authenticated",user:{id: req.user.id,role:"voter"}});
	}
	const existingAdmin = await Admin.findById(req.user.id);
	if (existingAdmin) {
		return res.status(200).json({message: "Authenticated",user:{id: req.user.id,role:"admin"}});
	}
	return res.status(401).json({message: "Not Authenticated"});
}); 
app.use('/api/admin',adminRoutes)
app.use('/api/voter',voterRoutes)
app.use('/api/event',eventRoutes)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})