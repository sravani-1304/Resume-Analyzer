from pydantic import BaseModel
from typing import List, Optional, Dict

class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str

class AnalysisResponse(BaseModel):
    ats_score: float
    match_percentage: float
    found_skills: List[str]
    missing_skills: List[str]
    suggestions: List[str]
    category: Optional[str] = None
    category_confidence: Optional[float] = None
    section_completeness: Optional[Dict[str, bool]] = None
    readability_score: Optional[float] = None
    format_score: Optional[float] = None
    analysis_time_ms: Optional[float] = None
    cached: Optional[bool] = False