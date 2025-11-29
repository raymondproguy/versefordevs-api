import 'colors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import logger from './utils/logger.js';
import verseRoutes from './routers/verseRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from both possible paths (development and production)
//app.use(express.static(path.join(__dirname, '../public/versefordevs.app/web/web.html')));
//app.use(express.static(path.join(__dirname, '../../public/versefordevs.app/web/web.html')));

// Serve website from root
app.use('/', express.static('public/web'));

// Serve main app from /app path  
app.use('/app', express.static('public/app'));

// API Routes
app.use('/api', verseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'VerseForDevs API is running' });
});

// Serve the main HTML file for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  // Try multiple possible paths
  const pathsToTry = [
    path.join(__dirname, '../public/versefordevs.com/index.html'),
    path.join(__dirname, '../../public/versefordevs.com/index.html'),
    path.join(__dirname, '../public/versefordevs.com/index.html')
  ];
  
  for (const filePath of pathsToTry) {
    if (existsSync(filePath)) {
      return res.sendFile(filePath);
    }
  }
  
  res.status(500).json({ error: 'Frontend files not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 VerseForDevs API running on port ${PORT}`.green);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`.blue);
  console.log(`📍 Website: http://localhost:${PORT}/`.blue);
});

export default app;
