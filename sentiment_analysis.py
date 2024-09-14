# /backend/sentiment_analysis.py

from transformers import pipeline

# Initialize the sentiment analysis pipeline once
sentiment_pipeline = pipeline('sentiment-analysis')

def analyze_sentiment(text):
    """
    Analyze the sentiment of the given text.
    Args:
        text (str): The text to analyze.
    Returns:
        dict: The sentiment analysis result.
    """
    result = sentiment_pipeline(text)[0]
    return result
