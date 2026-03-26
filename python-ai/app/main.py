from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time
from .models import AnalysisRequest, AnalysisResponse
from .analyzer import ResumeAnalyzer

app = FastAPI(title="Resume AI Analyzer", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analyzer = ResumeAnalyzer()

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest):
    try:
        start = time.time()
        result = analyzer.analyze(request.resume_text, request.job_description)
        result["analysis_time_ms"] = round((time.time() - start) * 1000, 2)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "Resume AI Analyzer"}