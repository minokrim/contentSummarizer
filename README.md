# Content Summarizer 📝

A web application that allows users to summarize content from various sources, including text, URLs, and PDF files. It leverages powerful AI models to provide concise and informative summaries. The application features a clean and intuitive user interface, making it easy to extract key information from large amounts of text. It solves the problem of information overload by providing a quick and efficient way to understand the main points of any document or web page.

## 🚀 Key Features

- **Text Summarization**: Summarize any text input directly into the application.
- **URL Summarization**: Provide a URL, and the application will fetch the content and summarize it.
- **PDF Summarization**: Upload a PDF file, and the application will extract the text and summarize it.
- **History Tracking**: Keeps track of your summarization history for easy access to previous summaries.
- **Database Integration**: Stores content and summaries in a database for persistence and retrieval.
- **Rate Limiting**: Implements rate limiting to prevent abuse of the summarization API.
- **CORS Support**: Configured to allow requests from specific origins for enhanced security.

## 🛠️ Tech Stack

- **Frontend**:
    - React
    - React DOM
    - CSS
- **Backend**:
    - Node.js
    - Express
    - CORS
    - Dotenv
- **AI Services**:
    - OpenAI API (for text summarization)
    - ILovePDF API (for PDF text extraction)
- **Database**:
    - Supabase
- **Utilities**:
    - Axios (for HTTP requests)
    - Cheerio (for HTML parsing)
    - Multer (for handling file uploads)
    - Adm-zip (for handling ZIP archives)
    - Crypto (for generating UUIDs)
- **Build Tools**:
    - Vite

## 📦 Getting Started

### Prerequisites

- Node.js (>=18)
- npm or yarn
- OpenAI API key
- ILovePDF API keys (public and secret)
- Supabase account and database setup

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  Install dependencies for the frontend:

    ```bash
    cd client
    npm install # or yarn install
    ```

3.  Install dependencies for the backend:

    ```bash
    cd server
    npm install # or yarn install
    ```

4.  Create a `.env` file in the `server` directory and add the following environment variables:

    ```
    SERVER_PORT=7000
    OPENAI_API_KEY=<your_openai_api_key>
    ILOVEPDF_PUBLIC=<your_ilovepdf_public_key>
    ILOVEPDF_SECRET=<your_ilovepdf_secret_key>
    SUPABASE_URL=<your_supabase_url>
    SUPABASE_ANON_KEY=<your_supabase_anon_key>
    ```

### Running Locally

1.  Start the backend server:

    ```bash
    cd server
    npm run dev # or yarn dev
    ```

2.  Start the frontend development server:

    ```bash
    cd client
    npm run dev # or yarn dev
    ```

    The frontend application will be available at `http://localhost:5173`.

## 💻 Project Structure

```
📂 Content Summarizer
├── contentsumm/
│   ├── src/
│   │   ├── main.tsx          # Main entry point for React application
│   │   ├── App.tsx           # Root component
│   │   ├── home.tsx          # Main page component
│   │   ├── body/
│   │   │   └── body.tsx      # Component to display content and summary
│   │   ├── nav/
│   │   │   └── nav.tsx       # Navigation component
│   │   ├── history/
│   │   │   └── history.tsx   # History component
│   │   ├── footer/
│   │   │   └── footer.tsx    # Footer component
│   │   ├── index.css         # Global CSS styles
│   │   └── App.css           # CSS styles for App component
│   ├── public/
│   │   └── vite.svg
│   ├── index.html
│   ├── vite.config.ts
│   └── ...
├── server/
│   ├── index.ts            # Main entry point for the backend server
│   ├── routes/
│   │   ├── textRoute.ts      # Route for text summarization
│   │   ├── urlRoute.ts       # Route for URL summarization
│   │   ├── pdfRoute.ts       # Route for PDF summarization
│   │   └── dbroute.ts        # Route for database operations
│   ├── controllers/
│   │   ├── textController.ts # Controller for text summarization
│   │   ├── urlController.ts  # Controller for URL summarization
│   │   ├── pdfController.ts  # Controller for PDF summarization
│   │   └── dbController.ts   # Controller for database operations
│   ├── services/
│   │   ├── textService.ts    # Service for text summarization
│   │   ├── urlService.ts     # Service for URL summarization
│   │   ├── pdfService.ts     # Service for PDF summarization
│   │   └── dbService.ts      # Service for database operations
│   ├── config/
│   │   ├── rateLimiter.ts  # Rate limiting configuration
│   │   └── db.ts           # Database configuration
│   ├── middleware/
│   │   └── multer.ts       # Multer middleware for file uploads
│   ├── .env                # Environment variables
│   └── ...
├── README.md             # This file
├── package.json          # Project dependencies and scripts
└── ...
```

## 📸 Screenshots

(Add screenshots of the application here)


## 📬 Contact

[Kareem Alameen] - [ayomidekareem563@gmail.com]

## 💖 Thanks

Thank you for checking out the Content Summarizer! We hope it helps you streamline your information consumption.
