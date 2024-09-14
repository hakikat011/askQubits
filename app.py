# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_analysis import analyze_sentiment
from portfolio_generator import generate_portfolio

app = Flask(__name__)
CORS(app)

@app.route('/api/getReport', methods=['POST'])
def get_report():
    data = request.get_json()
    query = data.get('query', '')

    try:
        # Analyze sentiment
        sentiment_result = analyze_sentiment(query)

        # Generate portfolio and quantum report
        portfolio_report = generate_portfolio(query)

        # Combine results into a final report
        report = f"**Query:** {query}\n\n"
        report += f"**Sentiment Analysis:**\nLabel: {sentiment_result['label']}, Score: {sentiment_result['score']:.4f}\n\n"
        report += f"**Portfolio and Quantum Analysis:**\n{portfolio_report}\n\n"
        report += "This report was generated using AI sentiment analysis and simulated quantum computations."

        return jsonify({'report': report})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=3000)
