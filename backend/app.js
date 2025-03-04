const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db')
connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const userRouter = require('./routes/userRoutes');
app.use('/user', userRouter);

const incidentRouter = require('./routes/incidentRoutes');
app.use('/incident', incidentRouter)

const emergencyRouter = require('./routes/emergencyRoutes')
app.use('/emergency', emergencyRouter);

const volunteerRouter = require('./routes/volunteerRoutes');
app.use('/volunteer', volunteerRouter);

const adminRouter = require('./routes/adminRoutes');
app.use('/admin',adminRouter )



app.listen(PORT, () => {
    console.log('Server Running on port 3000');
})