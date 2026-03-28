import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './route/book.route.js';
import cors from 'cors'
import userRoute from './route/user.route.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json()); // for parsing application/json



const PORT = process.env.PORT || 4000

const URI = process.env.MongoDB_URI ;

// Connect to MongoDB
try {
   await mongoose.connect(URI);
  console.log("Connected to mongodb")
} catch (e) {
  console.error('Error connecting to MongoDB:', e);
}


//defining routes 
app.use('/book', bookRoute);
app.use('/user', userRoute);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
