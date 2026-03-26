# ============================================
# ADVANCED JOB CATEGORY DETECTION
# ============================================

JOB_CATEGORIES = {
    "technology": {
        "keywords": [
            "software", "developer", "engineer", "programmer", "tech", "it",
            "coding", "javascript", "python", "java", "full stack", "frontend",
            "backend", "devops", "cloud", "aws", "database", "api", "microservices",
            "agile", "scrum", "git", "github", "react", "node", "angular", "vue"
        ],
        "weight": 1.0,
        "suggestions": [
            "Include specific technologies and frameworks you've mastered",
            "Highlight your experience with agile methodologies",
            "Mention any open-source contributions or personal projects",
            "Quantify your impact with metrics (performance improvements, user adoption)",
            "Include relevant certifications (AWS, Azure, Google Cloud)"
        ]
    },
    
    "data_science": {
        "keywords": [
            "data scientist", "machine learning", "ai", "artificial intelligence",
            "deep learning", "neural networks", "tensorflow", "pytorch", "python",
            "r", "statistics", "analytics", "data mining", "big data", "hadoop",
            "spark", "tableau", "power bi", "data visualization", "predictive modeling",
            "nlp", "computer vision", "data engineering", "etl", "data warehouse"
        ],
        "weight": 1.0,
        "suggestions": [
            "Showcase specific ML models you've built and deployed",
            "Include metrics like model accuracy, precision, recall",
            "Highlight experience with big data technologies",
            "Mention any research papers or publications",
            "Demonstrate business impact of your data work"
        ]
    },
    
    "marketing": {
        "keywords": [
            "marketing", "digital marketing", "seo", "sem", "social media",
            "content marketing", "email marketing", "campaign", "brand",
            "advertising", "ppc", "google ads", "facebook ads", "analytics",
            "google analytics", "market research", "crm", "lead generation",
            "conversion", "roi", "kpi", "strategy", "brand awareness"
        ],
        "weight": 1.0,
        "suggestions": [
            "Quantify campaign results (ROI, conversion rates, reach)",
            "Highlight experience with marketing automation tools",
            "Showcase successful brand campaigns with metrics",
            "Include A/B testing results and optimization strategies",
            "Demonstrate understanding of target audience and market trends"
        ]
    },
    
    "sales": {
        "keywords": [
            "sales", "business development", "account executive", "b2b", "b2c",
            "lead generation", "prospecting", "cold calling", "negotiation",
            "closing", "quota", "revenue", "client relations", "account management",
            "crm", "salesforce", "pipeline", "forecasting", "territory management",
            "solution selling", "consultative sales", "upselling", "cross-selling"
        ],
        "weight": 1.0,
        "suggestions": [
            "Include specific sales numbers and quota achievements",
            "Highlight percentage of quota achieved year over year",
            "Mention key accounts won and deal sizes",
            "Showcase sales methodology expertise",
            "Include awards or recognition for top performance"
        ]
    },
    
    "management": {
        "keywords": [
            "manager", "director", "head of", "lead", "supervisor", "team lead",
            "project manager", "product manager", "operations manager",
            "strategic planning", "leadership", "mentoring", "coaching",
            "budget management", "resource allocation", "stakeholder management",
            "risk management", "process improvement", "kpi", "okr",
            "cross-functional", "decision making", "problem solving"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight team size and budget you've managed",
            "Include specific improvements in team productivity",
            "Showcase successful project deliveries and timelines",
            "Mention mentoring and team development initiatives",
            "Quantify operational efficiencies you've implemented"
        ]
    },
    
    "finance": {
        "keywords": [
            "finance", "accounting", "financial analyst", "audit", "tax",
            "controller", "cfo", "financial planning", "budgeting",
            "forecasting", "financial modeling", "valuation", "investment",
            "portfolio management", "risk analysis", "compliance",
            "quickbooks", "sap", "oracle", "erp", "gaap", "ifrs",
            "financial reporting", "p&l", "balance sheet", "cash flow"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight experience with financial software and ERP systems",
            "Include specific financial improvements or cost savings",
            "Mention any professional certifications (CPA, CFA)",
            "Showcase experience with audits and compliance",
            "Quantify budget sizes and reporting accuracy"
        ]
    },
    
    "hr": {
        "keywords": [
            "hr", "human resources", "recruiter", "talent acquisition",
            "employee relations", "performance management", "training",
            "onboarding", "payroll", "benefits", "compensation",
            "hr policies", "labor laws", "compliance", "employee engagement",
            "hr information system", "hris", "workday", "successfactors",
            "diversity", "inclusion", "workplace culture"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight recruitment metrics (time-to-hire, cost-per-hire)",
            "Showcase employee retention and engagement improvements",
            "Include experience with HRIS implementation",
            "Mention successful training programs developed",
            "Demonstrate knowledge of labor laws and compliance"
        ]
    },
    
    "healthcare": {
        "keywords": [
            "nurse", "doctor", "physician", "medical", "healthcare",
            "patient care", "clinical", "hospital", "clinic", "emergency",
            "surgery", "pediatrics", "geriatrics", "oncology", "cardiology",
            "ehr", "electronic health records", "hipaa", "medical records",
            "pharmacy", "pharmacist", "therapist", "rehabilitation"
        ],
        "weight": 1.0,
        "suggestions": [
            "Include specific clinical skills and procedures",
            "Highlight patient outcomes and satisfaction scores",
            "Mention relevant certifications and licenses",
            "Showcase experience with EHR systems",
            "Quantify patient load and care efficiency"
        ]
    },
    
    "education": {
        "keywords": [
            "teacher", "professor", "instructor", "educator", "faculty",
            "curriculum development", "lesson planning", "classroom management",
            "student assessment", "special education", "esl", "elementary",
            "secondary", "higher education", "university", "college",
            "teaching certification", "pedagogy", "educational technology"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight student performance improvements",
            "Include innovative teaching methods used",
            "Showcase curriculum development projects",
            "Mention technology integration in classroom",
            "Quantify class sizes and student engagement"
        ]
    },
    
    "engineering": {
        "keywords": [
            "civil engineer", "mechanical engineer", "electrical engineer",
            "chemical engineer", "structural engineer", "autocad",
            "solidworks", "matlab", "revit", "cad", "3d modeling",
            "blueprint", "technical drawing", "construction", "manufacturing",
            "quality control", "project engineering", "site management"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight specific engineering software proficiency",
            "Include project scale and complexity",
            "Showcase problem-solving examples",
            "Mention any patents or innovations",
            "Quantify efficiency improvements or cost savings"
        ]
    },
    
    "design": {
        "keywords": [
            "graphic designer", "ui designer", "ux designer", "product designer",
            "visual designer", "creative director", "art director",
            "photoshop", "illustrator", "indesign", "figma", "sketch",
            "adobe xd", "after effects", "premiere pro", "motion graphics",
            "branding", "typography", "color theory", "wireframing",
            "prototyping", "user research", "usability testing"
        ],
        "weight": 1.0,
        "suggestions": [
            "Include link to online portfolio",
            "Highlight design thinking process",
            "Showcase successful projects with metrics",
            "Mention experience with user research",
            "Quantify impact on user engagement or conversion"
        ]
    },
    
    "writing": {
        "keywords": [
            "writer", "content writer", "copywriter", "technical writer",
            "editor", "proofreader", "journalist", "reporter",
            "blogging", "seo writing", "creative writing", "scriptwriting",
            "grant writing", "proposal writing", "white papers",
            "case studies", "newsletters", "press releases"
        ],
        "weight": 1.0,
        "suggestions": [
            "Include writing samples or portfolio",
            "Highlight publication history",
            "Showcase SEO results and traffic metrics",
            "Mention editing and proofreading expertise",
            "Quantify content engagement metrics"
        ]
    },
    
    "legal": {
        "keywords": [
            "lawyer", "attorney", "paralegal", "legal assistant",
            "corporate law", "criminal law", "civil law", "family law",
            "contract law", "intellectual property", "litigation",
            "legal research", "legal writing", "compliance",
            "regulatory affairs", "due diligence", "negotiation"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight specific areas of legal expertise",
            "Include case experience and outcomes",
            "Mention bar admissions and certifications",
            "Showcase contract negotiation successes",
            "Quantify deal sizes or case values"
        ]
    },
    
    "logistics": {
        "keywords": [
            "logistics", "supply chain", "operations", "warehouse",
            "inventory management", "procurement", "purchasing",
            "transportation", "fleet management", "distribution",
            "sap", "oracle", "erp", "demand planning", "forecasting",
            "import", "export", "customs", "freight", "shipping"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight efficiency improvements and cost savings",
            "Include experience with logistics software",
            "Showcase inventory accuracy improvements",
            "Mention supply chain optimization projects",
            "Quantify delivery time reductions"
        ]
    },
    
    "hospitality": {
        "keywords": [
            "hotel", "restaurant", "hospitality", "catering", "event",
            "food and beverage", "guest service", "front desk",
            "housekeeping", "banquet", "reservations", "concierge",
            "wedding planning", "conference", "tourism", "travel"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight guest satisfaction scores",
            "Include experience with reservation systems",
            "Showcase event planning successes",
            "Mention upselling and revenue generation",
            "Quantify improvements in service efficiency"
        ]
    },
    
    "construction": {
        "keywords": [
            "construction", "builder", "contractor", "site manager",
            "project manager", "carpenter", "electrician", "plumber",
            "welder", "mason", "hvac", "blueprint", "osha",
            "safety compliance", "building codes", "renovation"
        ],
        "weight": 1.0,
        "suggestions": [
            "Highlight project size and complexity",
            "Include safety record and compliance",
            "Showcase on-time completion rates",
            "Mention budget management experience",
            "Quantify quality improvements"
        ]
    },
    
    "customer_service": {
        "keywords": [
            "customer service", "support", "help desk", "client service",
            "call center", "customer support", "technical support",
            "conflict resolution", "problem resolution", "client relations",
            "customer satisfaction", "csat", "nps", "service excellence",
            "complaint handling", "grievance", "escalation management"
        ],
        "weight": 1.0,
        "suggestions": [
            "Include customer satisfaction scores and metrics",
            "Highlight experience with support ticketing systems",
            "Showcase problem resolution examples",
            "Mention any awards for service excellence",
            "Quantify response times and resolution rates"
        ]
    }
}

def detect_job_category(job_description: str) -> dict:
    """Detect job category with confidence score"""
    text_lower = job_description.lower()
    scores = {}
    
    for category, data in JOB_CATEGORIES.items():
        score = 0
        for keyword in data["keywords"]:
            if keyword in text_lower:
                score += data["weight"]
        if score > 0:
            scores[category] = score
    
    # Normalize scores
    if scores:
        total = sum(scores.values())
        for category in scores:
            scores[category] = round((scores[category] / total) * 100, 2)
        
        # Get top category
        top_category = max(scores, key=scores.get)
        return {
            "primary": top_category,
            "confidence": scores[top_category],
            "all_categories": scores,
            "suggestions": JOB_CATEGORIES[top_category]["suggestions"]
        }
    
    # Default to general if no category detected
    return {
        "primary": "general",
        "confidence": 100,
        "all_categories": {"general": 100},
        "suggestions": [
            "Tailor your resume to the specific job requirements",
            "Use keywords from the job description",
            "Highlight your most relevant achievements"
        ]
    }