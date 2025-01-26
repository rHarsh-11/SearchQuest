import Question from '../models/Question.js';

export const searchQuestions = async (req, res) => {
  try {
    const { 
      query, 
      type, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    // Build search conditions
    const searchConditions = {};
    
    // Text search on title
    if (query) {
      searchConditions.title = { 
        $regex: query, 
        $options: 'i' 
      };
    }
    
    // Filter by question type if provided
    if (type) {
      searchConditions.type = type;
    }
    
    // Perform search
    const questions = await Question.find(searchConditions)
      .limit(Number(limit))
      .skip((page - 1) * limit);
    
    // Count total matching documents
    const total = await Question.countDocuments(searchConditions);
    
    res.json({
      questions,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      totalQuestions: total
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Search failed', 
      error: error.message 
    });
  }
};

// Additional controller for getting question types
export const getQuestionTypes = async (req, res) => {
  try {
    const types = await Question.distinct('type');
    res.json(types);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to retrieve question types', 
      error: error.message 
    });
  }
};