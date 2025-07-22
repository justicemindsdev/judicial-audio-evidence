#!/usr/bin/env python3
"""
Audio Segmentation Script
Creates individual audio clips for each procedural error
Separates Judge and Ben segments where applicable
"""

from pydub import AudioSegment
import os

def create_audio_segments():
    """Create individual audio segments for each error"""
    print("🎵 Creating Audio Segments for Each Error...")
    print("=" * 60)
    
    # Load the main audio file
    audio_path = "/Volumes/EXCELLENCE DIRECT/EXPERTISE/databasestorage/creds/CLAUD_CODE/CLEAN_AUDIO_LIVERPOOL_COURT.mp3"
    
    try:
        audio = AudioSegment.from_mp3(audio_path)
        print(f"✅ Loaded audio file: {len(audio)/1000:.2f} seconds")
        
        # Create segments directory
        segments_dir = "/Volumes/EXCELLENCE DIRECT/EXPERTISE/databasestorage/creds/CLAUD_CODE/audio_segments"
        os.makedirs(segments_dir, exist_ok=True)
        
        # Define error segments with judge/ben breakdown
        error_segments = [
            {
                "id": 1,
                "title": "Denial_of_Advocacy_Rights",
                "judge_start": 681,  # 11:21
                "judge_end": 687,    # Judge's initial response
                "ben_start": 687,    # Ben's main statement
                "ben_end": 703       # 11:43
            },
            {
                "id": 2,
                "title": "Kinship_Assessment_Failure",
                "judge_start": 998,  # 16:38
                "judge_end": 1010,   # Judge's response
                "ben_start": 1010,   # Ben's explanation
                "ben_end": 1066      # 17:46
            },
            {
                "id": 3,
                "title": "Investigation_Failures",
                "judge_start": 1904, # 31:44
                "judge_end": 1915,   # Judge's dismissal
                "ben_start": 1915,   # Ben's response
                "ben_end": 1945      # 32:25
            },
            {
                "id": 4,
                "title": "Special_Guardianship_Error",
                "judge_start": 908,  # 15:08
                "judge_end": 920,    # Judge's response
                "ben_start": 920,    # Ben's explanation
                "ben_end": 939       # 15:39
            },
            {
                "id": 5,
                "title": "Child_Emotional_Distress",
                "judge_start": 1554, # 25:54
                "judge_end": 1558,   # Judge's brief response
                "ben_start": 1558,   # Ben's emotional account
                "ben_end": 1561      # 26:01
            },
            {
                "id": 6,
                "title": "Confidentiality_Breach",
                "judge_start": 1375, # 22:55
                "judge_end": 1385,   # Judge's deflection
                "ben_start": 1385,   # Ben's explanation
                "ben_end": 1412      # 23:32
            },
            {
                "id": 7,
                "title": "Missing_Educational_Records",
                "judge_start": 1457, # 24:17
                "judge_end": 1465,   # Judge's dismissal
                "ben_start": 1465,   # Ben's detailed explanation
                "ben_end": 1495      # 24:55
            },
            {
                "id": 8,
                "title": "Video_Evidence_Mischaracterized",
                "judge_start": 2013, # 33:33
                "judge_end": 2025,   # Judge's criticism
                "ben_start": 2025,   # Ben's defense
                "ben_end": 2087      # 34:47
            },
            {
                "id": 9,
                "title": "Physical_Harm_Allegations",
                "judge_start": 1862, # 31:02
                "judge_end": 1875,   # Judge's response
                "ben_start": 1875,   # Ben's account
                "ben_end": 1890      # 31:30
            },
            {
                "id": 10,
                "title": "Crisis_Communication_Failures",
                "judge_start": 2088, # 34:48
                "judge_end": 2095,   # Judge's question
                "ben_start": 2095,   # Ben's detailed account
                "ben_end": 2149      # 35:49
            }
        ]
        
        created_segments = []
        
        for segment in error_segments:
            print(f"\n🎯 Processing Error {segment['id']}: {segment['title']}")
            
            # Create Judge segment
            judge_start_ms = segment["judge_start"] * 1000
            judge_end_ms = segment["judge_end"] * 1000
            judge_segment = audio[judge_start_ms:judge_end_ms]
            
            judge_filename = f"error_{segment['id']:02d}_{segment['title']}_JUDGE.mp3"
            judge_path = os.path.join(segments_dir, judge_filename)
            judge_segment.export(judge_path, format="mp3")
            
            # Create Ben segment
            ben_start_ms = segment["ben_start"] * 1000
            ben_end_ms = segment["ben_end"] * 1000
            ben_segment = audio[ben_start_ms:ben_end_ms]
            
            ben_filename = f"error_{segment['id']:02d}_{segment['title']}_BEN.mp3"
            ben_path = os.path.join(segments_dir, ben_filename)
            ben_segment.export(ben_path, format="mp3")
            
            # Create combined segment
            combined_filename = f"error_{segment['id']:02d}_{segment['title']}_FULL.mp3"
            combined_path = os.path.join(segments_dir, combined_filename)
            full_segment = audio[judge_start_ms:ben_end_ms]
            full_segment.export(combined_path, format="mp3")
            
            created_segments.append({
                "id": segment["id"],
                "title": segment["title"],
                "judge_file": judge_filename,
                "ben_file": ben_filename,
                "full_file": combined_filename,
                "judge_duration": len(judge_segment) / 1000,
                "ben_duration": len(ben_segment) / 1000,
                "total_duration": len(full_segment) / 1000
            })
            
            print(f"  ✅ Judge segment: {len(judge_segment)/1000:.2f}s → {judge_filename}")
            print(f"  ✅ Ben segment: {len(ben_segment)/1000:.2f}s → {ben_filename}")
            print(f"  ✅ Full segment: {len(full_segment)/1000:.2f}s → {combined_filename}")
        
        # Create HTML with embedded audio players
        create_audio_html(created_segments)
        
        print("\n" + "=" * 60)
        print("🎉 Audio Segmentation Complete!")
        print(f"📁 Created {len(created_segments) * 3} audio files")
        print(f"📂 Location: {segments_dir}")
        
        return created_segments
        
    except Exception as e:
        print(f"❌ Error during audio segmentation: {e}")
        return []

def create_audio_html(segments):
    """Create HTML with individual audio players for each segment"""
    
    html_content = """
    <div style="background-color: #f0f8ff; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3>🎵 INDIVIDUAL AUDIO SEGMENTS</h3>
        <p>Each error now has separate audio clips for Judge and Ben's responses:</p>
    """
    
    for segment in segments:
        html_content += f"""
        <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 5px; border-left: 4px solid #007bff;">
            <h4>Error {segment['id']}: {segment['title'].replace('_', ' ')}</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 10px 0;">
                <div>
                    <h5>👨‍⚖️ Judge ({segment['judge_duration']:.1f}s)</h5>
                    <audio controls style="width: 100%;">
                        <source src="audio_segments/{segment['judge_file']}" type="audio/mpeg">
                    </audio>
                </div>
                <div>
                    <h5>👤 Ben ({segment['ben_duration']:.1f}s)</h5>
                    <audio controls style="width: 100%;">
                        <source src="audio_segments/{segment['ben_file']}" type="audio/mpeg">
                    </audio>
                </div>
                <div>
                    <h5>🎵 Full Exchange ({segment['total_duration']:.1f}s)</h5>
                    <audio controls style="width: 100%;">
                        <source src="audio_segments/{segment['full_file']}" type="audio/mpeg">
                    </audio>
                </div>
            </div>
        </div>
        """
    
    html_content += "</div>"
    
    # Insert this into the main HTML file
    html_file_path = "/Volumes/EXCELLENCE DIRECT/EXPERTISE/databasestorage/creds/CLAUD_CODE/court_errors_analysis.html"
    
    with open(html_file_path, 'r') as f:
        content = f.read()
    
    # Insert after the master audio player section
    insertion_point = content.find('</div>\n\n    <h2>22+ PROCEDURAL AND LEGAL ERRORS IDENTIFIED</h2>')
    if insertion_point != -1:
        new_content = content[:insertion_point] + html_content + '\n    </div>\n\n    <h2>22+ PROCEDURAL AND LEGAL ERRORS IDENTIFIED</h2>' + content[insertion_point+len('</div>\n\n    <h2>22+ PROCEDURAL AND LEGAL ERRORS IDENTIFIED</h2>'):]
        
        with open(html_file_path, 'w') as f:
            f.write(new_content)
        
        print("✅ HTML updated with individual audio players")

if __name__ == "__main__":
    segments = create_audio_segments()