const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contacts/', contactRouter);
app.use('/api/users/', userRouter);
app.use(errorHandler);


app.listen(port, () => {
    console.log(port);
});