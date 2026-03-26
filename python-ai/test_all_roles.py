import requests
import json

def test_role(role_name, resume, job_description):
    print(f"\n{'='*60}")
    print(f"📋 TESTING: {role_name}")
    print('='*60)
    
    try:
        response = requests.post(
            "http://localhost:8000/analyze",
            json={
                "resume_text": resume,
                "job_description": job_description
            },
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ ATS Score: {data['ats_score']}%")
            print(f"✅ Match %: {data['match_percentage']}%")
            print(f"✅ Found Skills: {len(data['found_skills'])}")
            print(f"✅ Missing Skills: {len(data['missing_skills'])}")
            print(f"\n📝 Top Found Skills: {data['found_skills'][:5]}")
            print(f"\n💡 Suggestions:")
            for i, s in enumerate(data['suggestions'][:3], 1):
                print(f"   {i}. {s}")
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"❌ Exception: {str(e)}")

# Test different roles
test_cases = [
    {
        "role": "Software Developer",
        "resume": """
        Experienced software developer with 5 years in full-stack development.
        Skills: Python, JavaScript, React, Node.js, MongoDB, Git
        Worked on e-commerce platforms and REST APIs.
        """,
        "job": """
        Looking for a Software Developer with experience in Python, JavaScript,
        and modern frameworks. Must know version control and database management.
        """
    },
    {
        "role": "Marketing Manager",
        "resume": """
        Marketing professional with expertise in digital marketing and SEO.
        Managed social media campaigns and increased engagement by 40%.
        Skills: Google Analytics, Content Marketing, Email Campaigns, SEO
        """,
        "job": """
        Seeking a Marketing Manager to lead digital marketing initiatives.
        Requires experience with SEO, social media, analytics tools,
        and content strategy. Must have proven track record of campaign success.
        """
    },
    {
        "role": "Nurse",
        "resume": """
        Registered Nurse with 3 years experience in patient care.
        Skilled in emergency medicine, vital signs monitoring,
        and electronic health records. BLS and ACLS certified.
        """,
        "job": """
        Hospital seeking Registered Nurse for emergency department.
        Requires RN license, BLS certification, and experience
        in patient care and emergency response.
        """
    },
    {
        "role": "Teacher",
        "resume": """
        Elementary school teacher with 4 years experience.
        Expertise in curriculum development and classroom management.
        Created engaging lesson plans and improved student performance.
        """,
        "job": """
        School seeking dedicated Elementary Teacher.
        Must have teaching certification, experience in lesson planning,
        and strong classroom management skills.
        """
    },
    {
        "role": "Sales Executive",
        "resume": """
        Sales professional with 6 years B2B experience.
        Consistently exceeded quotas by 20% year over year.
        Skills: Lead generation, negotiation, CRM software, client relations
        """,
        "job": """
        Looking for Sales Executive to join growing team.
        Must have B2B sales experience, proven track record,
        and expertise in CRM and negotiation.
        """
    }
]

# Run all tests
for test in test_cases:
    test_role(test["role"], test["resume"], test["job"])
    input("\nPress Enter to continue...")