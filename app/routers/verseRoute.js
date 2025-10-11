import express from 'express';
import verseController from '../controllers/verseController.js';

const router = express.Router();

// Health check
router.get('/health', verseController.healthCheck);

// Root
router.get('/', verseController.root);

// Verse routes
router.get('/verse/random', verseController.getRandomVerse);
router.get('/verse/all', verseController.getAllVerses);
router.get('/verse/category/:category', verseController.getVersesByCategory);
router.get('/categories', verseController.getCategories);

export default router;
