#!/usr/bin/env python3
"""
Upload Ben Mak's qualification evidence to Supabase storage
"""
import os
from supabase import create_client, Client

# Supabase configuration
SUPABASE_URL = "https://tvecnfdqakrevzaeifpk.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZWNuZmRxYWtyZXZ6YWVpZnBrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM4MjA2NCwiZXhwIjoyMDYzOTU4MDY0fQ.KqzZr0iiPNYHFzEzT8utRAu3EorO3LFDbh3dd-U_42c")
SUPABASE_BUCKET = "audio-evidence"

# Evidence file paths
EVIDENCE_FILES = [
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-139.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-140.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-141.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-142.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-143.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-144.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-145.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-146.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-147.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-148.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-149.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-150.png',
    '/Volumes/EXCELLENCE/2EXCELLENCE DIRECT/8739A744-6F78-467E-8AC4-95727E659D33/page-151.png'
]

def upload_evidence_to_supabase(file_path, storage_path):
    """Upload evidence file to Supabase storage"""
    if not SUPABASE_KEY:
        print("❌ SUPABASE_KEY environment variable not set. Cannot upload.")
        return None

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    try:
        with open(file_path, 'rb') as file:
            file_content = file.read()
            
            supabase.storage.from_(SUPABASE_BUCKET).upload(
                storage_path,
                file_content,
                {"content-type": "image/png", "x-upsert": "true"}
            )
            
            public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(storage_path)
            
            if public_url:
                print(f"✅ Successfully uploaded {file_path} to {storage_path}")
                print(f"🌐 Public URL: {public_url}")
                return public_url
            else:
                print(f"❌ Failed to upload {file_path}")
                return None
                
    except Exception as e:
        print(f"❌ Error uploading {file_path}: {str(e)}")
        return None

def main():
    """Upload Ben Mak's qualification evidence"""
    print("🎓 Ben Mak - Qualification Evidence Upload to Supabase")
    print("=" * 60)
    
    uploaded_urls = []
    
    for file_path in EVIDENCE_FILES:
        if os.path.exists(file_path):
            filename = os.path.basename(file_path)
            storage_path = f"qualifications/{filename}"
            url = upload_evidence_to_supabase(file_path, storage_path)
            if url:
                uploaded_urls.append(url)
        else:
            print(f"❌ File not found: {file_path}")
    
    print(f"\n📊 Upload Summary: {len(uploaded_urls)}/{len(EVIDENCE_FILES)} files uploaded successfully")
    
    # Generate qualification data for website
    print("\n📝 Generating qualification data structure:")
    for i, url in enumerate(uploaded_urls, 139):
        print(f"page-{i}: {url}")

if __name__ == "__main__":
    main()