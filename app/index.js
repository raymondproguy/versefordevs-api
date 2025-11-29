import 'colors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './utils/logger.js';
import verseRoutes from './routers/verseRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve website from root
app.use('/', express.static(path.join(__dirname, '../public/web')));

// Serve main app from /app path
app.use('/app', express.static(path.join(__dirname, '../public/app')));

// API Routes
app.use('/api', verseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'VerseForDevs API is running' });
});

// Catch-all - serve website for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 VerseForDevs API running on port ${PORT}`.green);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`.blue);
  console.log(`📍 Website: http://localhost:${PORT}/`.blue);
  console.log(`📍 App: http://localhost:${PORT}/app`.blue);
});

export default app;
