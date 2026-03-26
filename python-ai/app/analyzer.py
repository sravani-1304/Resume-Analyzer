import re
from typing import Set, Dict, List, Tuple
from .skills import UNIVERSAL_SKILLS

class ResumeAnalyzer:
    def __init__(self):
        self.skill_patterns = self._compile_patterns()
    
    def _compile_patterns(self):
        patterns = {}
        for skill, variations in UNIVERSAL_SKILLS.items():
            patterns[skill] = []
            for variation in variations:
                patterns[skill].append(re.compile(r'\b' + re.escape(variation) + r'\b', re.IGNORECASE))
        return patterns
    
    def extract_skills(self, text: str) -> Set[str]:
        text_lower = text.lower()
        found = set()
        for skill, patterns in self.skill_patterns.items():
            for pattern in patterns:
                if pattern.search(text_lower):
                    found.add(skill)
                    break
        return found
    
    def analyze(self, resume_text: str, job_text: str) -> dict:
        resume_skills = self.extract_skills(resume_text)
        job_skills = self.extract_skills(job_text)
        
        found = sorted(list(resume_skills.intersection(job_skills)))
        missing = sorted(list(job_skills - resume_skills))
        
        match_percentage = round((len(found) / len(job_skills)) * 100, 2) if job_skills else 0
        
        # Calculate ATS score
        skill_score = match_percentage * 0.4
        word_count = len(resume_text.split())
        length_score = min(20, (word_count / 50)) if word_count < 800 else 20
        keyword_score = min(40, (len(found) / max(1, len(job_skills))) * 40)
        
        ats_score = round(skill_score + length_score + keyword_score, 2)
        
        suggestions = []
        if missing:
            suggestions.append(f"Add these skills: {', '.join(missing[:5])}")
        if word_count < 300:
            suggestions.append("Add more details to your resume (aim for 400-800 words)")
        if word_count > 1200:
            suggestions.append("Consider making your resume more concise")
        
        return {
            "ats_score": min(100, ats_score),
            "match_percentage": match_percentage,
            "found_skills": found,
            "missing_skills": missing,
            "suggestions": suggestions[:5]
        }