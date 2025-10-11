import { createRequire } from 'module';
import logger from '../utils/logger.js';

const require = createRequire(import.meta.url);
const versesData = require('../../verses.json');

class VerseService {
  getAllVerses() {
    logger.info('Fetching all verses');
    return versesData.verses;
  }

  getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * versesData.verses.length);
    const verse = versesData.verses[randomIndex];
    logger.verse(verse.category, verse.reference);
    return verse;
  }

  getVersesByCategory(category) {
    logger.info(`Fetching verses for category: ${category}`);
    return versesData.verses.filter(verse => 
      verse.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  getCategories() {
    const categories = [...new Set(versesData.verses.map(verse => verse.category))];
    logger.info('Fetching all categories');
    return categories;
  }
}

export default new VerseService();
