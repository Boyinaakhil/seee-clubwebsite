const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { PORT } = require('./config/env');
const errorHandler = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const announcementRoutes = require('./routes/announcement.routes');
const boardRoutes = require('./routes/board.routes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SERVE UPLOADS FIRST
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/board', boardRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Club Website API is running' });
});

// Production frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '../client/dist', 'index.html')
//     );
//   });
// }

// ❗ Error handler ALWAYS LAST
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
