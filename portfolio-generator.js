// /backend/portfolio_generator.js

const { fetchStockData, analyzeStockSentiment } = require('./scraping/ai-tradebot.js');
const { spawn } = require('child_process');

/**
 * Generate a portfolio recommendation based on the query.
 * @param {string} query - The user's query.
 * @returns {Promise<string>} - The generated report.
 */
async function generatePortfolio(query) {
  try {
    const symbol = extractSymbolFromQuery(query); // Function to extract stock symbol from query
    const stockData = await fetchStockData(symbol);
    const sentimentScore = await analyzeStockSentiment(symbol);

    // Run the quantum pipeline using Python
    const quantumReport = await runQuantumPipeline(query);

    // Combine results into a final report
    const report = `
      Stock Symbol: ${symbol}
      Current Price: ${stockData.c}
      Sentiment Score: ${sentimentScore.toFixed(4)}
      Quantum Analysis:
      ${quantumReport}
    `;
    return report;
  } catch (error) {
    console.error('Error generating portfolio:', error);
    throw error;
  }
}

/**
 * Function to run the quantum pipeline Python script.
 * @param {string} query - The user's query.
 * @returns {Promise<string>} - The quantum report.
 */
function runQuantumPipeline(query) {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['./quantum/quantum_pipeline.py', query]);

    let result = '';
    process.stdout.on('data', data => {
      result += data.toString();
    });

    process.stderr.on('data', data => {
      console.error('Error:', data.toString());
    });

    process.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Quantum pipeline process exited with code ${code}`));
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Extracts the stock symbol from the user's query.
 * @param {string} query - The user's query.
 * @returns {string} - The stock symbol.
 */
function extractSymbolFromQuery(query) {
  // Simple extraction logic (you can improve this)
  const words = query.toUpperCase().split(' ');
  const symbol = words.find(word => /^[A-Z]{1,5}$/.test(word));
  return symbol || 'AAPL'; // Default to 'AAPL' if no symbol found
}

module.exports = {
  generatePortfolio,
};
