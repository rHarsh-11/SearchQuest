import fs from 'fs';
import mongoose from 'mongoose';
import Question from '../models/Question.js';
import connectDB from '../config/db.js';

const importQuestions = async () => {
  try {
    await connectDB();
    
    await Question.deleteMany({});
    
    const questionsData = JSON.parse(
      fs.readFileSync('./questions.json', 'utf-8')
    );
    const cleanedData = questionsData.map(question => ({
      ...question,
      siblingId: question.siblingId ? new mongoose.Types.ObjectId(question.siblingId.$oid) : null,
      _id: question._id ? new mongoose.Types.ObjectId(question._id.$oid) : undefined,
    }));
    
    await Question.insertMany(cleanedData);
    
    console.log('Questions imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Import error:', error);
    process.exit(1);
  }
};

importQuestions();