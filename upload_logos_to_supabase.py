#!/usr/bin/env python3
"""
Upload Justice Minds logos to Supabase storage for persistence
"""
import requests
import os
from supabase import create_client, Client

# Supabase configuration
SUPABASE_URL = "https://tvecnfdqakrevzaeifpk.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
SUPABASE_BUCKET = "audio-evidence"

def upload_logo_to_supabase(file_path, storage_path):
    """Upload logo file to Supabase storage"""
    if not SUPABASE_KEY:
        print("❌ SUPABASE_KEY environment variable not set. Cannot upload.")
        return None

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    try:
        with open(file_path, 'rb') as file:
            file_content = file.read()
            
            # Determine content type
            content_type = 'image/svg+xml' if file_path.endswith('.svg') else 'image/png'
            
            supabase.storage.from_(SUPABASE_BUCKET).upload(
                storage_path,
                file_content,
                {"content-type": content_type, "x-upsert": "true"}
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
    """Upload Justice Minds logos"""
    print("🏛️  Justice Minds - Logo Upload to Supabase")
    print("=" * 50)
    
    logos_dir = "logos"
    if not os.path.isdir(logos_dir):
        print(f"❌ Directory '{logos_dir}' not found.")
        return

    for filename in os.listdir(logos_dir):
        file_path = os.path.join(logos_dir, filename)
        if os.path.isfile(file_path):
            storage_path = f"logos/{filename}"
            upload_logo_to_supabase(file_path, storage_path)

if __name__ == "__main__":
    main()
