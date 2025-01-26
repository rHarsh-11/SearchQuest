import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionTypes, setQuestionTypes] = useState([]);

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions/types`);
        setQuestionTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch question types:', error);
      }
    };

    fetchQuestionTypes();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions/search`, {
        params: { 
          query: query.trim(), 
          type: type,
          page: 1, 
          limit: 10 
        }
      });
      onSearchResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-lg mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">All Question Types</option>
          {questionTypes.map((questionType) => (
            <option key={questionType} value={questionType}>
              {questionType}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchBar;