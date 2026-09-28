# Abhishek Varma - AI Portfolio 🚀

Welcome to my interactive **AI-powered Developer Portfolio**! This is not just a static webpage; it's a full-stack application that features a conversational AI agent designed to act as my digital twin. You can chat with it to learn about my experience, skills, projects, and education—all answered in the first person!

## ✨ Features

- **Conversational AI Agent**: A FastAPI backend that uses an LLM to answer questions about me, strictly bounded by my resume and portfolio data. 
- **Beautiful Interactive UI**: A Vite + React frontend featuring dynamic chat bubbles, animated tech stack meters, and featured project cards.
- **RAG-based Data Loading**: The AI context is built dynamically on backend startup using `resume.txt`, `profile.json`, and `portfolio.json`.
- **First-Person Prompting**: The AI is instructed to speak naturally as *Abhishek Varma*, creating a personalized and immersive experience for visitors.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- CSS (Custom Variables, Flexbox/Grid, Responsive Design)
- React Icons

**Backend:**
- Python & FastAPI
- Uvicorn
- Generative AI Integration (LLM)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (3.10+)
- `uv` (Fast Python package installer)

### 1. Clone the repository
```bash
git clone https://github.com/abhishekvarma149/ai-portfolio.git
cd ai-portfolio
```

### 2. Environment Variables
You'll need to set up your `.env` files for both the frontend and backend. 

**Root `.env` (Backend):**
Create a `.env` file in the root directory and add your API keys.
```env
# Example
GEMINI_API_KEY=your_api_key_here
```

**Frontend `.env`:**
Create a `.env` file in the `frontend/` directory to point to your local backend.
```env
VITE_API_URL=http://localhost:8000
```

### 3. Run the Backend
Open a terminal in the root directory and run:
```bash
cd backend
uv run uvicorn app:app --reload --port 8000
```
*The backend API will start at http://localhost:8000*

### 4. Run the Frontend
Open a new terminal and run:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start at http://localhost:5173*

## 📁 Project Structure
```text
ai-portfolio/
├── backend/
│   ├── app.py             # FastAPI entry point
│   ├── chat.py            # LLM chat logic and API handler
│   ├── prompt.py          # AI identity and system prompts
│   ├── loader.py          # Resume and JSON context loader
│   ├── profile.json       # Structured profile data
│   └── data/
│       ├── portfolio.json # Extended portfolio information
│       └── resume.txt     # Raw resume text for AI context
└── frontend/
    ├── index.html
    ├── src/
    │   ├── App.jsx        # Main chat and layout interface
    │   ├── App.css        # Core styling and theme
    │   └── components/    # Reusable UI elements (ProjectCards, etc.)
    └── public/
```

## 👨‍💻 About Me

I am a Software Developer & AI Engineer passionate about building real-world AI-powered applications. 
- **GitHub**: [@abhishekvarma149](https://github.com/abhishekvarma149)
- **LinkedIn**: [Abhishek Varma](https://www.linkedin.com/in/abhishek-varma261/)
- **LeetCode**: [@Abhishek261](https://leetcode.com/u/Abhishek261/)

---
*Feel free to star ⭐ this repository if you find it helpful!*
