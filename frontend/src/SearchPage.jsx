import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import QuestionList from '../components/QuestionList';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState({
    questions: [],
    totalPages: 0,
    currentPage: 1
  });

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handlePageChange = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions/search`, {
        params: { page, limit: 10 }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Page change failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">QuestSearch</h1>
        <SearchBar onSearchResults={handleSearchResults} />
        <QuestionList 
          questions={searchResults.questions}
          totalPages={searchResults.totalPages}
          currentPage={searchResults.currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchPage;