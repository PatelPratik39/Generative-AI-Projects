# Generative-AI-Projects

# Project 1
# CSV Question Answering Bot

This Node.js application loads a CSV file, processes the data into vector embeddings, and allows users to ask questions based on the CSV data using OpenAI's GPT model.

## 🚀 Features
- Loads CSV data using `@langchain/community/document_loaders/fs/csv`
- Splits the data into chunks for processing
- Converts text into vector embeddings using OpenAI
- Stores the embeddings in an in-memory vector database (`HNSWLib`)
- Uses `RetrievalQAChain` to allow querying based on CSV content
- Runs on **GPT-4o** for accurate responses

---

## 📂 Project Structure
📁 Generative-AI-Projects ┣ 📂 documents/ ┃ ┗ 📜 constituents-financials_csv.csv # CSV file with data ┣ 📜 app.js # Main application file ┣ 📜 .env # Stores OpenAI API Key ┣ 📜 package.json # Dependencies and scripts ┣ 📜 README.md # Project documentation