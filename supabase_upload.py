#!/usr/bin/env python3
"""
Supabase Upload Script for Court Analysis Data
Uploads analysis results to EVIDENTIA project database
"""

import json
import os
from datetime import datetime
import requests

# Supabase Configuration
SUPABASE_URL = "https://tvecnfdqakrevzaeifpk.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZWNuZmRxYWtyZXZ6YWVpZnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzODIwNjQsImV4cCI6MjA2Mzk1ODA2NH0.q-8ukkJZ4FGSbZyEYp0letP-S58hC2PA6lUOWUH9H2Y"
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZWNuZmRxYWtyZXZ6YWVpZnBrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM4MjA2NCwiZXhwIjoyMDYzOTU4MDY0fQ.KqzZr0iiPNYHFzEzT8utRAu3EorO3LFDbh3dd-U_42c"

def create_headers():
    """Create headers for Supabase API requests"""
    return {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }

def create_case_analysis_data():
    """Create the main case analysis record"""
    return {
        "case_title": "Liverpool Family Court - Abel Macklin Daly",
        "case_date": "2025-06-11",
        "audio_duration_minutes": 68.53,
        "total_errors_identified": 22,
        "critical_errors": 8,
        "high_priority_errors": 10,
        "medium_priority_errors": 4,
        "speech_segments_detected": 138,
        "ben_competency_score": 93.9,
        "ben_statistical_rarity": "1 in 20 billion",
        "analysis_status": "Complete",
        "created_at": datetime.now().isoformat()
    }

def create_error_records():
    """Create individual error records"""
    errors = [
        {
            "error_id": 1,
            "title": "Denial of Statutory Advocacy Rights",
            "timestamp_start": "11:21",
            "timestamp_end": "11:43",
            "audio_start_seconds": 681,
            "audio_end_seconds": 703,
            "severity": "Critical",
            "legal_reference": "Care Act 2014 ss.67-68",
            "description": "Local Authority unlawfully denied mandatory advocacy provision",
            "transcript_quote": "Because my sister has asked for me to be her advocate and has not been allowed to have me as an advocate as per Emily Bailey on 14 November saying he can't be under section 67 of 68 of the Care Act Duty to provide advocacy. The local authority don't have that choice."
        },
        {
            "error_id": 2,
            "title": "Failure to Conduct Kinship Assessment",
            "timestamp_start": "16:38",
            "timestamp_end": "17:46",
            "audio_start_seconds": 998,
            "audio_end_seconds": 1066,
            "severity": "Critical",
            "legal_reference": "Children Act 1989 s.23",
            "description": "No kinship assessment despite 3-year caring relationship",
            "transcript_quote": "But I didn't even get the foster and viability assessment done on me despite the three years it spent with the family"
        },
        {
            "error_id": 3,
            "title": "Inadequate Investigation of Allegations",
            "timestamp_start": "31:44",
            "timestamp_end": "32:25",
            "audio_start_seconds": 1904,
            "audio_end_seconds": 1945,
            "severity": "High",
            "legal_reference": "Working Together 2018",
            "description": "Failure to follow allegation investigation protocols",
            "transcript_quote": "local authorities should have chased that up and investigated those allegations, which they did not. So they left them open. Which meant I did not the right to defend or the right to reply."
        },
        {
            "error_id": 4,
            "title": "Special Guardianship Mishandling",
            "timestamp_start": "15:08",
            "timestamp_end": "15:39",
            "audio_start_seconds": 908,
            "audio_end_seconds": 939,
            "severity": "High",
            "legal_reference": "Children Act 1989 s.14A",
            "description": "Social worker misrepresented legal application",
            "transcript_quote": "Maria Moore took our special guardianship papers and told family I was trying to take custody. Which was incorrect"
        },
        {
            "error_id": 5,
            "title": "Child Emotional Distress Ignored",
            "timestamp_start": "25:54",
            "timestamp_end": "26:01",
            "audio_start_seconds": 1554,
            "audio_end_seconds": 1561,
            "severity": "Critical",
            "legal_reference": "Children Act 1989 s.1",
            "description": "Child's welfare not paramount consideration",
            "transcript_quote": "when I did see Abel after the time away, he ran over to me and was like clutched to me neck... he was pulling his hair out, threatened for his Uncle Ben. That's not reported and that wasn't followed up"
        }
    ]
    return errors

def create_ben_competency_data():
    """Create Ben's competency validation record"""
    return {
        "overall_competency_score": 93.9,
        "information_processing": 98.0,
        "cross_domain_integration": 96.0,
        "resilience_score": 98.0,
        "housing_law_expertise": 94.0,
        "disability_rights_expertise": 92.0,
        "forensic_analysis_expertise": 88.0,
        "administrative_law_expertise": 90.0,
        "human_rights_expertise": 86.0,
        "statistical_rarity": "1 in 20 billion",
        "crisis_performance_multiplier": 3.5,
        "phd_level_credentials": True,
        "parliamentary_recognition": True,
        "barrister_validation": True,
        "created_at": datetime.now().isoformat()
    }

def upload_to_supabase():
    """Upload all data to Supabase"""
    print("🚀 Starting Supabase Upload...")
    print("=" * 50)
    
    headers = create_headers()
    
    try:
        # Upload main case analysis
        print("📊 Uploading case analysis...")
        case_data = create_case_analysis_data()
        
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/court_analysis",
            headers=headers,
            json=case_data
        )
        
        if response.status_code in [200, 201]:
            print("✅ Case analysis uploaded successfully")
        else:
            print(f"❌ Case analysis upload failed: {response.status_code} - {response.text}")
        
        # Upload error records
        print("\n🚨 Uploading error records...")
        error_data = create_error_records()
        
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/procedural_errors",
            headers=headers,
            json=error_data
        )
        
        if response.status_code in [200, 201]:
            print(f"✅ {len(error_data)} error records uploaded successfully")
        else:
            print(f"❌ Error records upload failed: {response.status_code} - {response.text}")
        
        # Upload Ben's competency data
        print("\n🎯 Uploading Ben's competency data...")
        competency_data = create_ben_competency_data()
        
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/expert_competency",
            headers=headers,
            json=competency_data
        )
        
        if response.status_code in [200, 201]:
            print("✅ Competency data uploaded successfully")
        else:
            print(f"❌ Competency data upload failed: {response.status_code} - {response.text}")
        
        # Upload audio metadata
        print("\n🎵 Uploading audio analysis metadata...")
        audio_metadata = {
            "filename": "CLEAN_AUDIO_LIVERPOOL_COURT.mp3",
            "duration_seconds": 4111.61,
            "duration_minutes": 68.53,
            "speech_segments": 138,
            "file_size_mb": None,  # Would need to calculate
            "sample_rate": 44100,  # Typical MP3 sample rate
            "analysis_completed": True,
            "created_at": datetime.now().isoformat()
        }
        
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/audio_analysis",
            headers=headers,
            json=audio_metadata
        )
        
        if response.status_code in [200, 201]:
            print("✅ Audio metadata uploaded successfully")
        else:
            print(f"❌ Audio metadata upload failed: {response.status_code} - {response.text}")
        
        print("\n" + "=" * 50)
        print("🎉 Upload process completed!")
        print("📱 Access your data at: https://tvecnfdqakrevzaeifpk.supabase.co")
        
    except Exception as e:
        print(f"❌ Error during upload: {e}")

def create_database_tables():
    """Create necessary database tables (SQL commands)"""
    sql_commands = """
-- Court Analysis Table
CREATE TABLE IF NOT EXISTS court_analysis (
    id SERIAL PRIMARY KEY,
    case_title TEXT NOT NULL,
    case_date DATE,
    audio_duration_minutes DECIMAL(10,2),
    total_errors_identified INTEGER,
    critical_errors INTEGER,
    high_priority_errors INTEGER,
    medium_priority_errors INTEGER,
    speech_segments_detected INTEGER,
    ben_competency_score DECIMAL(5,2),
    ben_statistical_rarity TEXT,
    analysis_status TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Procedural Errors Table
CREATE TABLE IF NOT EXISTS procedural_errors (
    id SERIAL PRIMARY KEY,
    error_id INTEGER,
    title TEXT NOT NULL,
    timestamp_start TEXT,
    timestamp_end TEXT,
    audio_start_seconds INTEGER,
    audio_end_seconds INTEGER,
    severity TEXT,
    legal_reference TEXT,
    description TEXT,
    transcript_quote TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Expert Competency Table
CREATE TABLE IF NOT EXISTS expert_competency (
    id SERIAL PRIMARY KEY,
    overall_competency_score DECIMAL(5,2),
    information_processing DECIMAL(5,2),
    cross_domain_integration DECIMAL(5,2),
    resilience_score DECIMAL(5,2),
    housing_law_expertise DECIMAL(5,2),
    disability_rights_expertise DECIMAL(5,2),
    forensic_analysis_expertise DECIMAL(5,2),
    administrative_law_expertise DECIMAL(5,2),
    human_rights_expertise DECIMAL(5,2),
    statistical_rarity TEXT,
    crisis_performance_multiplier DECIMAL(5,2),
    phd_level_credentials BOOLEAN,
    parliamentary_recognition BOOLEAN,
    barrister_validation BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Audio Analysis Table
CREATE TABLE IF NOT EXISTS audio_analysis (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    duration_seconds DECIMAL(10,2),
    duration_minutes DECIMAL(10,2),
    speech_segments INTEGER,
    file_size_mb DECIMAL(10,2),
    sample_rate INTEGER,
    analysis_completed BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);
    """
    
    print("📋 SQL Table Creation Commands:")
    print(sql_commands)
    
    return sql_commands

if __name__ == "__main__":
    print("🗄️ EVIDENTIA Database Setup")
    print("=" * 50)
    
    # First show table creation SQL
    create_database_tables()
    
    print("\n" + "=" * 50)
    input("Press Enter after creating tables in Supabase to continue with data upload...")
    
    # Then upload data
    upload_to_supabase()