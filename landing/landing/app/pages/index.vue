<template>
  <div class="search-container">
    <div class="google-style-wrapper" :class="{ 'has-results': results.length > 0 }">
      <div class="logo-wrapper">
        <h1 class="logo-text">AiLib</h1>
      </div>
      
      <div class="search-box-wrapper">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            v-model="query" 
            type="text" 
            placeholder="Search books by title, author, or description..." 
            @keyup.enter="handleSearch"
          />
          <button v-if="query" class="clear-btn" @click="query = ''">✕</button>
        </div>
        <div class="button-row">
          <button class="search-btn" @click="handleSearch">Search Library</button>
          <button class="search-btn" @click="luckySearch">I'm Feeling Lucky</button>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        Searching...
      </div>

      <div v-if="results.length > 0" class="results-container">
        <div v-for="book in results" :key="book.name" class="book-card">
          <div class="book-info">
            <h3 class="book-name">{{ book.name }}</h3>
            <p class="book-meta">{{ book.author }} • {{ book.year }} • {{ book.genre }}</p>
            <p class="book-desc">{{ book.description }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="searched && !loading" class="no-results">
        No books found matching your search.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const query = ref('');
const results = ref<any[]>([]);
const loading = ref(false);
const searched = ref(false);

const handleSearch = async () => {
  if (!query.value.trim()) return;
  
  loading.value = true;
  searched.value = true;
  
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query.value)}`);
    results.value = await response.json();
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    loading.value = false;
  }
};

const luckySearch = () => {
  query.value = 'Fantasy';
  handleSearch();
};
</script>

<style scoped>
.search-container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #202124;
  font-family: 'arial', sans-serif;
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  transition: padding-top 0.3s ease;
}

.google-style-wrapper {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.google-style-wrapper.has-results {
  padding-top: 2rem;
}

.logo-text {
  font-size: 5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #4285F4, #34A853, #EA4335);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-box-wrapper {
  width: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 0.5rem 1rem;
  transition: box-shadow 0.2s;
  margin-bottom: 1.5rem;
}

.search-box:hover, .search-box:focus-within {
  box-shadow: 0 1px 6px rgba(32,33,36,.28);
  border-color: rgba(223,225,229,0);
}

.search-icon {
  color: #9aa0a6;
  margin-right: 0.8rem;
}

input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 8px 0;
  color: #202124;
}

.clear-btn {
  background: none;
  border: none;
  color: #70757a;
  cursor: pointer;
  padding: 0 0.5rem;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.search-btn {
  background-color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  font-size: 14px;
  margin: 11px 4px;
  padding: 0 16px;
  line-height: 34px;
  height: 36px;
  min-width: 54px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.search-btn:hover {
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  background-image: -webkit-linear-gradient(top,#f8f9fa,#f8f9fa);
  background-color: #f8f9fa;
  border: 1px solid #dadce0;
  color: #202124;
}

.loading-state {
  margin-top: 2rem;
  color: #70757a;
}

.results-container {
  width: 100%;
  margin-top: 2rem;
  padding-bottom: 4rem;
}

.book-card {
  padding: 1rem 0;
  border-bottom: 1px solid #f1f3f4;
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.book-name {
  color: #1a0dab;
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  cursor: pointer;
}

.book-name:hover {
  text-decoration: underline;
}

.book-meta {
  color: #006621;
  font-size: 0.9rem;
  margin: 0.2rem 0;
}

.book-desc {
  color: #4d5156;
  font-size: 0.9rem;
  line-height: 1.58;
}

.no-results {
  margin-top: 2rem;
  color: #70757a;
}
</style>