// /backend/scraping/ai-tradebot.js

const axios = require('axios');
const Sentiment = require('sentiment');

const sentiment = new Sentiment();

/**
 * Fetch stock data from a financial API.
 * @param {string} symbol - The stock symbol to fetch data for.
 * @returns {Promise<object>} - The stock data.
 */
async function fetchStockData(symbol) {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw error;
  }
}

/**
 * Perform sentiment analysis on news articles related to the stock.
 * @param {string} symbol - The stock symbol to fetch news for.
 * @returns {Promise<number>} - The average sentiment score.
 */
async function analyzeStockSentiment(symbol) {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;
    const response = await axios.get(url);
    const articles = response.data.filter(article => article.related.includes(symbol));

    if (articles.length === 0) {
      return 0; // Neutral sentiment if no articles found
    }

    const sentimentScores = articles.map(article => {
      const result = sentiment.analyze(article.headline + ' ' + article.summary);
      return result.comparative;
    });

    const averageSentiment = sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length;
    return averageSentiment;
  } catch (error) {
    console.error(`Error analyzing sentiment for ${symbol}:`, error);
    throw error;
  }
}

module.exports = {
  fetchStockData,
  analyzeStockSentiment,
};
