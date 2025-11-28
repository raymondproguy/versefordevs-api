import 'colors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './utils/logger.js';
import verseRoutes from './routers/verseRoute.js';

const app = express();
const PORT = process.env.PORT || 3002;
const HOST = "0.0.0.0";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// 1. FIRST: Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, '../public/versefordevs.com')));

// 2. SECOND: API Routes
app.use('/api', verseRoutes);

// 3. LAST: Catch-all route for SPA (must be last)
app.get('*', (req, res) => {
  // Don't handle API routes here
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      error: 'API route not found'
    });
  }
  
  // Serve the main HTML file for all other routes
  res.sendFile(path.join(__dirname, '../public/versefordevs.com', 'index.html'));
});

// Start server
app.listen(PORT, HOST, () => {
  logger.success(`🚀 VerseForDevs API running on port ${PORT}`);
  logger.info(`📍 Health check: http://localhost:${PORT}/api/health`);
  logger.info(`📍 Website: http://localhost:${PORT}/`);
});

export default app;
