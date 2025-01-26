import React from 'react';

const QuestionList = ({ questions, totalPages, currentPage, totalQuestions, onPageChange }) => {
  // Helper function to render question details based on type
  const renderQuestionDetails = (question) => {
    switch (question.type) {
      case 'ANAGRAM':
        return (
          <div>
            <p className="text-sm text-gray-600">
              {question.anagramType === 'WORD' ? 'Word Anagram' : 'Sentence Anagram'}
            </p>
            {question.solution && (
              <p className="text-sm mt-1">Solution: {question.solution}</p>
            )}
          </div>
        );
      case 'MCQ':
        return (
          <div>
            <p className="text-sm text-gray-600">Multiple Choice Question</p>
            <ul className="text-sm mt-1">
              {question.options?.map((option, index) => (
                <li 
                  key={index} 
                  className={
                    option.isCorrectAnswer 
                      ? 'text-green-600 font-semibold' 
                      : 'text-gray-500'
                  }
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'READ_ALONG':
        return (
          <p className="text-sm text-gray-600">Read Along Question</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Found {totalQuestions} questions
        </p>
      </div>

      {questions.length === 0 ? (
        <p className="text-center text-gray-500">No questions found</p>
      ) : (
        <>
          <div className="grid gap-4">
            {questions.map((question) => (
              <div 
                key={question._id} 
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {question.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                {renderQuestionDetails(question)}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === page 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionList;