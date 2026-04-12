**🚀 Resume Analyzer (AI-Based)**
📌 Overview

The Resume Analyzer is a full-stack web application that analyzes resumes using AI/NLP techniques and provides actionable insights to improve job readiness. It helps users understand how well their resume matches industry expectations and ATS (Applicant Tracking Systems).

🎯 Problem Statement

Many candidates get rejected not because of lack of skills, but due to poorly structured or non-optimized resumes. This project aims to solve that by giving instant, data-driven feedback.

**💡 Features**
📄 Resume Upload (PDF/DOCX)
🔍 Resume Parsing using NLP
📊 Resume Scoring System
🧠 Skill Extraction & Analysis
⚠️ Missing Skills Identification
📈 ATS Compatibility Suggestions
📑 Clean Dashboard for Insights


**⚙️ Tech Stack**

Frontend: React.js
Backend: Node.js, Express.js
AI/NLP: Python, Resume Parser APIs
Database: MongoDB

**🛠️ How It Works**
User uploads resume
Backend processes file and extracts text
NLP model analyzes skills, keywords, and structure
System compares with job-related data
Generates score and improvement suggestions

**🚀 Installation & Setup**
# Clone the repository
git clone https://github.com/sravani-1304/Resume-Analyzer.git

# Navigate to project folder
cd resume-analyzer

# Install backend dependencies and run backend
cd ../backend
npm install
npm run dev

# Start Python Service

cd ../python-ai
venv/activate/Scripts
python run.py

# Install frontend dependencies and run frontend
cd frontend
npm install
npm start



