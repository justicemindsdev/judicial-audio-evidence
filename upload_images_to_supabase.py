#!/usr/bin/env python3
"""
Upload Justice Minds images to Supabase storage for persistence
"""
import requests
import os

# Supabase configuration
SUPABASE_URL = "https://tvecnfdqakrevzaeifpk.supabase.co"
SUPABASE_BUCKET = "audio-evidence"

def upload_image_to_supabase(file_path, storage_path):
    """Upload image file to Supabase storage"""
    url = f"{SUPABASE_URL}/storage/v1/object/{SUPABASE_BUCKET}/{storage_path}"
    
    try:
        with open(file_path, 'rb') as file:
            # Try public upload first
            headers = {
                'Content-Type': 'image/png'
            }
            
            response = requests.post(url, data=file, headers=headers)
            
            if response.status_code == 200:
                print(f"✅ Successfully uploaded {file_path} to {storage_path}")
                public_url = f"{SUPABASE_URL}/storage/v1/object/public/{SUPABASE_BUCKET}/{storage_path}"
                print(f"🌐 Public URL: {public_url}")
                return public_url
            else:
                print(f"❌ Failed to upload {file_path}: {response.text}")
                return None
                
    except Exception as e:
        print(f"❌ Error uploading {file_path}: {str(e)}")
        return None

def main():
    """Upload Justice Minds images"""
    print("🏛️  Justice Minds - Image Upload to Supabase")
    print("=" * 50)
    
    # Upload hero header
    hero_url = upload_image_to_supabase("hero_header_final.png", "justice-minds-hero-header.png")
    
    # Upload footer
    footer_url = upload_image_to_supabase("footer1.png", "justice-minds-footer.png")
    
    print("\n📋 Upload Summary:")
    print(f"Hero Header: {'✅' if hero_url else '❌'}")
    print(f"Footer: {'✅' if footer_url else '❌'}")
    
    if hero_url and footer_url:
        print("\n🎉 All images uploaded successfully!")
        print("Images are now persistent in Supabase storage")
    else:
        print("\n⚠️  Some uploads failed - using local files as fallback")

if __name__ == "__main__":
    main()