import requests
import json

def test_skill_extraction():
    """Test skill extraction accuracy"""
    
    test_cases = [
        {
            "name": "Frontend Developer Resume",
            "text": """
            Frontend Developer with 3 years experience.
            Skills: React, JavaScript, HTML5, CSS3, Tailwind CSS
            Experience with responsive design and modern frontend frameworks.
            """,
            "job": """
            Looking for Frontend Developer with React, JavaScript, 
            and modern CSS frameworks experience.
            """
        },
        {
            "name": "Full Stack Resume",
            "text": """
            Full Stack Developer proficient in React, Node.js, and MongoDB.
            Experience with REST APIs and JWT authentication.
            Also know Python for scripting.
            """,
            "job": """
            Need Full Stack Developer with React, Node.js, 
            and database experience. Knowledge of Python is a plus.
            """
        }
    ]
    
    for test in test_cases:
        print(f"\n{'='*60}")
        print(f"Testing: {test['name']}")
        print('='*60)
        
        response = requests.post(
            "http://localhost:8000/analyze",
            json={
                "resume_text": test["text"],
                "job_description": test["job"]
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"\n✅ Found Skills: {data['found_skills']}")
            print(f"❌ Missing Skills: {data['missing_skills']}")
            print(f"📊 Match %: {data['match_percentage']}%")
            print(f"🎯 ATS Score: {data['ats_score']}%")
        else:
            print(f"❌ Error: {response.status_code}")

def test_false_positives():
    """Test for false positive matches"""
    
    # This text should NOT match C++
    text = """
    I have experience with C programming and Python.
    Also worked on various projects.
    """
    
    print(f"\n{'='*60}")
    print("Testing for False Positives (C++ should NOT be detected)")
    print('='*60)
    
    response = requests.get(
        "http://localhost:8000/debug/extract-skills",
        params={"text": text}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"Text: {text}")
        print(f"\nExtracted Skills: {data['extracted_skills']}")
        
        if "C++" in data['extracted_skills']:
            print("❌ ERROR: C++ was incorrectly detected!")
        else:
            print("✅ PASS: C++ was not detected (correct)")
    else:
        print(f"❌ Error: {response.status_code}")

if __name__ == "__main__":
    # First test normal extraction
    test_skill_extraction()
    
    # Then test for false positives
    test_false_positives()