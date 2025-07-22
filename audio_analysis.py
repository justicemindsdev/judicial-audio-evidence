#!/usr/bin/env python3
"""
Audio Analysis and Segmentation Tool
Correlates audio segments with procedural errors from court transcript
"""

import librosa
import numpy as np
import matplotlib.pyplot as plt
from pydub import AudioSegment
import json
import os
from datetime import timedelta

def analyze_audio(audio_path):
    """Analyze audio file and extract key segments"""
    print(f"Analyzing audio file: {audio_path}")
    
    # Load audio using pydub for better MP3 support
    audio = AudioSegment.from_mp3(audio_path)
    duration_seconds = len(audio) / 1000  # Convert to seconds
    
    print(f"Audio Duration: {duration_seconds:.2f} seconds ({duration_seconds/60:.2f} minutes)")
    
    # Convert to numpy array for analysis
    audio_data = np.array(audio.get_array_of_samples(), dtype=np.float32)
    if audio.channels == 2:
        audio_data = audio_data.reshape((-1, 2))
        audio_data = audio_data.mean(axis=1)  # Convert stereo to mono
    
    # Normalize
    audio_data = audio_data / np.max(np.abs(audio_data))
    
    return audio_data, audio.frame_rate, duration_seconds

def detect_speech_segments(audio_data, sr, min_silence_duration=2.0):
    """Detect speech segments by identifying silence gaps"""
    # Calculate RMS energy
    hop_length = 512
    frame_length = 2048
    
    rms = librosa.feature.rms(y=audio_data, frame_length=frame_length, hop_length=hop_length)[0]
    
    # Threshold for silence detection
    silence_threshold = np.percentile(rms, 20)  # Bottom 20% considered silence
    
    # Find non-silent frames
    non_silent_frames = rms > silence_threshold
    
    # Convert frame indices to time
    times = librosa.frames_to_time(range(len(non_silent_frames)), sr=sr, hop_length=hop_length)
    
    # Group consecutive non-silent frames into segments
    segments = []
    start_time = None
    
    for i, (time, is_speech) in enumerate(zip(times, non_silent_frames)):
        if is_speech and start_time is None:
            start_time = time
        elif not is_speech and start_time is not None:
            if time - start_time > 1.0:  # Minimum segment length
                segments.append((start_time, time))
            start_time = None
    
    # Don't forget the last segment
    if start_time is not None:
        segments.append((start_time, times[-1]))
    
    return segments

def create_error_timeline():
    """Create timeline of identified errors from transcript"""
    errors = [
        {"time": "11:21", "duration": 22, "error": "Denial of Advocacy Rights", "severity": "Critical"},
        {"time": "15:08", "duration": 31, "error": "Special Guardianship Mishandling", "severity": "High"},
        {"time": "16:38", "duration": 68, "error": "No Kinship Assessment", "severity": "Critical"},
        {"time": "19:22", "duration": 32, "error": "Due Process Violations", "severity": "High"},
        {"time": "20:49", "duration": 42, "error": "Missed Medical Appointments", "severity": "High"},
        {"time": "22:55", "duration": 37, "error": "Confidentiality Breach", "severity": "Medium"},
        {"time": "24:17", "duration": 38, "error": "Missing Educational Records", "severity": "Critical"},
        {"time": "25:54", "duration": 7, "error": "Child Emotional Distress Ignored", "severity": "Critical"},
        {"time": "31:02", "duration": 28, "error": "Physical Harm Allegations", "severity": "Critical"},
        {"time": "31:44", "duration": 41, "error": "Investigation Failures", "severity": "High"},
        {"time": "32:34", "duration": 59, "error": "Cultural Development Ignored", "severity": "High"},
        {"time": "33:33", "duration": 74, "error": "Video Evidence Mischaracterized", "severity": "High"},
        {"time": "34:48", "duration": 61, "error": "Crisis Communication Failures", "severity": "Medium"}
    ]
    
    # Convert time strings to seconds
    for error in errors:
        time_parts = error["time"].split(":")
        error["start_seconds"] = int(time_parts[0]) * 60 + int(time_parts[1])
        error["end_seconds"] = error["start_seconds"] + error["duration"]
    
    return errors

def main():
    audio_path = "/Volumes/EXCELLENCE DIRECT/EXPERTISE/databasestorage/creds/CLAUD_CODE/CLEAN_AUDIO_LIVERPOOL_COURT.mp3"
    
    print("🎵 Starting Audio Analysis and Error Correlation...")
    print("=" * 60)
    
    try:
        # Analyze audio
        audio_data, sr, duration_seconds = analyze_audio(audio_path)
        
        # Detect speech segments
        print("\n🔍 Detecting speech segments...")
        segments = detect_speech_segments(audio_data, sr)
        print(f"Found {len(segments)} speech segments")
        
        # Create error timeline
        print("\n📋 Creating error timeline from transcript...")
        errors = create_error_timeline()
        print(f"Identified {len(errors)} procedural errors")
        
        # Save basic report
        report = {
            "audio_duration": duration_seconds,
            "speech_segments": len(segments),
            "errors_identified": len(errors),
            "status": "Analysis Complete"
        }
        
        print("\n✅ Basic Analysis Complete!")
        print(f"Audio Duration: {duration_seconds/60:.2f} minutes")
        print(f"Speech Segments: {len(segments)}")
        print(f"Errors Identified: {len(errors)}")
        
        return report
        
    except Exception as e:
        print(f"❌ Error during analysis: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    main()