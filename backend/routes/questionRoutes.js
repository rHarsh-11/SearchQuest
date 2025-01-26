import express from 'express';
import { 
  searchQuestions, 
  getQuestionTypes 
} from '../controllers/questionController.js';

const router = express.Router();

router.get('/search', searchQuestions);
router.get('/types', getQuestionTypes);

export default router;