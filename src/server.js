import 'colors';
import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import verseRoutes from './routers/verseRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', verseRoutes);

// 404 handler
app.use('*', (req, res) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  logger.success(`🚀 VerseForDevs API running on port ${PORT}`);
  logger.info(`📍 Health check: http://localhost:${PORT}/api/health`);
  logger.info(`📍 API Root: http://localhost:${PORT}/api`);
});

export default app;
