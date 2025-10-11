import verseService from '../services/verseService.js';
import logger from '../utils/logger.js';

const verseController = {
  getRandomVerse: (req, res) => {
    try {
      logger.request(req.method, req.url);
      const verse = verseService.getRandomVerse();
      res.json({
        success: true,
        data: verse
      });
    } catch (error) {
      logger.error(`Error getting random verse: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  getAllVerses: (req, res) => {
    try {
      logger.request(req.method, req.url);
      const verses = verseService.getAllVerses();
      res.json({
        success: true,
        count: verses.length,
        data: verses
      });
    } catch (error) {
      logger.error(`Error getting all verses: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  getVersesByCategory: (req, res) => {
    try {
      logger.request(req.method, req.url);
      const { category } = req.params;
      const verses = verseService.getVersesByCategory(category);
      
      if (verses.length === 0) {
        logger.warn(`No verses found for category: ${category}`);
        return res.status(404).json({
          success: false,
          error: 'Category not found'
        });
      }

      res.json({
        success: true,
        count: verses.length,
        data: verses
      });
    } catch (error) {
      logger.error(`Error getting verses by category: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  getCategories: (req, res) => {
    try {
      logger.request(req.method, req.url);
      const categories = verseService.getCategories();
      res.json({
        success: true,
        count: categories.length,
        data: categories
      });
    } catch (error) {
      logger.error(`Error getting categories: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  healthCheck: (req, res) => {
    logger.request(req.method, req.url);
    res.json({
      success: true,
      message: 'VerseForDevs API is running smoothly! 🚀',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  },

  root: (req, res) => {
    logger.request(req.method, req.url);
    res.json({
      success: true,
      message: 'Welcome to VerseForDevs API! 📖💻',
      endpoints: {
        '/api/health': 'Health check',
        '/api/verse/random': 'Get random verse',
        '/api/verse/all': 'Get all verses', 
        '/api/verse/category/:category': 'Get verses by category',
        '/api/categories': 'Get all categories'
      },
      version: '1.0.0'
    });
  }
};

export default verseController;
