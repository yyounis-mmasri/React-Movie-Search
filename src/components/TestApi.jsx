
// src/components/TestApi.jsx
// A React component to test the API in your browser

import React, { useState } from 'react';
import { getTrending, searchMovies, getMovieDetails, getMovieByTitle } from '../api/api';

const TestApi = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, success, message, data = null) => {
    setTestResults(prev => [...prev, { test, success, message, data, timestamp: new Date().toISOString() }]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const runAllTests = async () => {
    setLoading(true);
    clearResults();
    
    // Test 1: Get Trending (simulated)
    try {
      addResult('Get Trending', '⏳', 'Testing getTrending()...');
      const trending = await getTrending(1);
      addResult(
        'Get Trending', 
        '✅', 
        `Found ${trending.results.length} movies, Total: ${trending.total_results}`,
        trending.results.slice(0, 3)
      );
    } catch (error) {
      addResult('Get Trending', '❌', error.message);
    }

    // Test 2: Search Movies
    try {
      addResult('Search Movies', '⏳', 'Searching for "Batman"...');
      const results = await searchMovies('Batman', 1);
      addResult(
        'Search Movies', 
        '✅', 
        `Found ${results.total_results} total results`,
        results.results.slice(0, 3)
      );
    } catch (error) {
      addResult('Search Movies', '❌', error.message);
    }

    // Test 3: Empty Search
    try {
      addResult('Empty Search', '⏳', 'Testing empty search...');
      const empty = await searchMovies('', 1);
      addResult(
        'Empty Search', 
        '✅', 
        `Returned ${empty.results.length} results (should be 0)`,
        empty
      );
    } catch (error) {
      addResult('Empty Search', '❌', error.message);
    }

    // Test 4: Get Movie Details
    try {
      addResult('Movie Details', '⏳', 'Getting details for tt3896198...');
      const details = await getMovieDetails('tt3896198');
      addResult(
        'Movie Details', 
        '✅', 
        `Found: ${details.title} (${details.year})`,
        details
      );
    } catch (error) {
      addResult('Movie Details', '❌', error.message);
    }

    // Test 5: Get Movie by Title
    try {
      addResult('Get by Title', '⏳', 'Getting "The Matrix"...');
      const movie = await getMovieByTitle('The Matrix', '1999');
      addResult(
        'Get by Title', 
        '✅', 
        `Found: ${movie.title} directed by ${movie.director}`,
        movie
      );
    } catch (error) {
      addResult('Get by Title', '❌', error.message);
    }

    // Test 6: Error Handling
    try {
      addResult('Error Handling', '⏳', 'Testing with invalid ID...');
      await getMovieDetails('invalid_id');
      addResult('Error Handling', '❌', 'Should have thrown an error');
    } catch (error) {
      addResult('Error Handling', '✅', `Error caught: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🎬 OMDb API Test Suite</h1>
        <div>
          <button onClick={runAllTests} disabled={loading} style={styles.button}>
            {loading ? '🔄 Running Tests...' : '▶️ Run All Tests'}
          </button>
          <button onClick={clearResults} style={{ ...styles.button, marginLeft: '10px' }}>
            🗑️ Clear Results
          </button>
        </div>
      </div>

      <div style={styles.results}>
        {testResults.length === 0 ? (
          <div style={styles.empty}>
            Click "Run All Tests" to test your API integration
          </div>
        ) : (
          testResults.map((result, index) => (
            <div key={index} style={styles.resultCard}>
              <div style={styles.resultHeader}>
                <span style={styles.icon}>{result.success}</span>
                <strong>{result.test}</strong>
              </div>
              <div style={styles.message}>{result.message}</div>
              {result.data && (
                <details style={styles.details}>
                  <summary>View Data</summary>
                  <pre style={styles.pre}>
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))
        )}
      </div>

      <div style={styles.footer}>
        <h3>Quick Test Individual Functions:</h3>
        <div style={styles.buttonGroup}>
          <button 
            onClick={async () => {
              const data = await getTrending(1);
              console.log('Trending:', data);
              alert(`Found ${data.results.length} movies. Check console for details.`);
            }}
            style={styles.smallButton}
          >
            Test getTrending()
          </button>
          <button 
            onClick={async () => {
              const data = await searchMovies('Avengers', 1);
              console.log('Search Results:', data);
              alert(`Found ${data.total_results} results. Check console for details.`);
            }}
            style={styles.smallButton}
          >
            Test searchMovies()
          </button>
          <button 
            onClick={async () => {
              const data = await getMovieDetails('tt3896198');
              console.log('Movie Details:', data);
              alert(`Found: ${data.title}. Check console for details.`);
            }}
            style={styles.smallButton}
          >
            Test getMovieDetails()
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #333',
    paddingBottom: '10px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  results: {
    minHeight: '400px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '20px'
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    padding: '50px'
  },
  resultCard: {
    backgroundColor: 'white',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  resultHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '5px'
  },
  icon: {
    fontSize: '20px'
  },
  message: {
    color: '#666',
    marginLeft: '30px'
  },
  details: {
    marginTop: '10px',
    marginLeft: '30px'
  },
  pre: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    overflow: 'auto',
    maxHeight: '200px',
    fontSize: '12px'
  },
  footer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  smallButton: {
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default TestApi;