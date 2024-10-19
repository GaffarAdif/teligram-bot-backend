const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const userRoute = require('./Routes/UserRoute'); // Adjust the path as necessary
const taslRoute = require('./Routes/TaskRoute'); // Adjust the path as necessary
const adminRoute = require('./Routes/AdminRoute'); // Adjust the path as necessary
const noticeRoute = require('./Routes/NoticeRoute'); // Adjust the path as necessary
const ReferrelRoute = require('./Routes/ReferralRoute'); // Adjust the path as necessary
const LotteryRoute = require('./Routes/TicketRoute'); // Adjust the path as necessary





const errorHandler = require('./MIddleware/errorMiddleware');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON requests

// Routes
app.use('/user', userRoute); // User routes
app.use('/task', taslRoute); // User routes
app.use('/admin', adminRoute); // User routes
app.use('/notice', noticeRoute); // User routes
app.use('/referrel', ReferrelRoute); // User routes
app.use('/lottery', LotteryRoute); // User routes








// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
