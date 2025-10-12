// src/testApi.js
// Quick manual test file - Run this to test OMDb API functions

import { getTrending, searchMovies, getMovieDetails, getMovieByTitle } from './api';

const testApi = async () => {
  console.log('🧪 Starting API tests...\n');
  
  // Test 1: Get Trending Movies
  console.log('📊 Test 1: Getting trending movies...');
  try {
    const trending = await getTrending(1, 'day');
    console.log('✅ Trending movies fetched successfully!');
    console.log(`   Found ${trending.results.length} movies`);
    console.log(`   Total pages: ${trending.total_pages}`);
    console.log(`   First movie: ${trending.results[0]?.title}`);
    console.log(`   Poster URL: ${trending.results[0]?.poster_path}`);
  } catch (error) {
    console.error('❌ Trending movies test failed:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 2: Search Movies
  console.log('🔍 Test 2: Searching for "Inception"...');
  try {
    const searchResults = await searchMovies('Inception', 1);
    console.log('✅ Search completed successfully!');
    console.log(`   Found ${searchResults.total_results} total results`);
    console.log(`   Showing ${searchResults.results.length} on this page`);
    if (searchResults.results.length > 0) {
      console.log(`   First result: ${searchResults.results[0].title}`);
      console.log(`   Release date: ${searchResults.results[0].release_date}`);
    }
  } catch (error) {
    console.error('❌ Search test failed:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 3: Empty Search Query
  console.log('🔍 Test 3: Testing empty search query...');
  try {
    const emptySearch = await searchMovies('', 1);
    console.log('✅ Empty search handled correctly!');
    console.log(`   Results: ${emptySearch.results.length} (should be 0)`);
  } catch (error) {
    console.error('❌ Empty search test failed:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 4: Pagination
  console.log('📄 Test 4: Testing pagination (page 2)...');
  try {
    const page2 = await getTrending(2);
    console.log('✅ Pagination works!');
    console.log(`   Page: ${page2.page}`);
    console.log(`   Movies on page: ${page2.results.length}`);
  } catch (error) {
    console.error('❌ Pagination test failed:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 5: Error Handling (invalid page)
  console.log('⚠️ Test 5: Testing error handling with invalid page...');
  try {
    await getTrending(10000); // Page way out of range
    console.log('❌ Should have thrown an error');
  } catch (error) {
    console.log('✅ Error handling works!');
    console.log(`   Error message: ${error.message}`);
  }
  
  console.log('\n---\n');
  
  // Test 6: Get Movie Details using IMDb ID
  console.log('🎬 Test 6: Getting movie details (Guardians of the Galaxy)...');
  try {
    // Using the IMDb ID from your example
    const details = await getMovieDetails('tt3896198');
    console.log('✅ Movie details fetched!');
    console.log(`   Title: ${details.title}`);
    console.log(`   Year: ${details.year}`);
    console.log(`   Director: ${details.director}`);
    console.log(`   IMDb Rating: ${details.vote_average}/10`);
    console.log(`   Plot: ${details.overview?.substring(0, 100)}...`);
  } catch (error) {
    console.error('❌ Movie details test failed:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 7: Get Movie by Title (OMDb special feature)
  console.log('🎬 Test 7: Getting movie by exact title...');
  try {
    const movie = await getMovieByTitle('The Matrix', '1999');
    console.log('✅ Movie found by title!');
    console.log(`   Title: ${movie.title}`);
    console.log(`   Director: ${movie.director}`);
    console.log(`   Actors: ${movie.actors}`);
  } catch (error) {
    console.error('❌ Get by title test failed:', error.message);
  }
  
  console.log('\n🏁 API tests completed!');
};

// Run tests when this file is executed
testApi();

// You can also test in React component:
/*
import { useEffect } from 'react';
import { getTrending, searchMovies } from './api';

function TestComponent() {
  useEffect(() => {
    testApi();
  }, []);
  
  return <div>Check console for API test results</div>;
}
*/