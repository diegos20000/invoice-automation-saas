# Invoice Automation SaaS

A backend automation project that uploads invoice images, extracts text using OCR, parses key invoice fields, and stores the results in MongoDB. This project is being built as a SaaS-style document automation system for small service businesses.

## Current Features

- Upload invoice images through an API endpoint
- Store uploaded files locally
- Extract invoice text using OCR with Tesseract
- Parse invoice data from OCR text
- Save invoice metadata into MongoDB
- Docker-based local MongoDB setup

## Tech Stack

- Node.js
- Express
- Multer
- Tesseract.js
- MongoDB
- Mongoose
- Docker
- dotenv
- CORS

## Current Backend Flow

```text
Client → POST /upload → Save file locally → OCR → Parse invoice data → Save to MongoDB