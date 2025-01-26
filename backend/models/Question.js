import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  showInOption: {
    type: Boolean,
    default: true
  },
  isAnswer: {
    type: Boolean,
    default: false
  }
});

const OptionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  isCorrectAnswer: {
    type: Boolean,
    default: false
  }
});

const QuestionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['ANAGRAM', 'MCQ', 'READ_ALONG', 'CONTENT_ONLY', 'CONVERSATION']
  },
  anagramType: {
    type: String,
    enum: ['WORD', 'SENTENCE', null],
    default: null
  },
  title: { 
    type: String, 
    required: true,
    index: true
  },
  blocks: [BlockSchema],
  options: [OptionSchema],
  solution: String,
  siblingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Question', QuestionSchema);