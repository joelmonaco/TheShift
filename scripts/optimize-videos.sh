#!/bin/bash

# Script to optimize videos for web delivery
# Converts MOV files to web-optimized MP4 and creates WebM versions

echo "Starting video optimization..."

# Create optimized directory
mkdir -p public/optimized

# Function to optimize a video
optimize_video() {
    local input_file=$1
    local basename=$(basename "$input_file" | sed 's/\.[^.]*$//')
    local extension="${input_file##*.}"
    
    echo "Processing: $input_file"
    
    # Convert to web-optimized MP4 (H.264, good browser compatibility)
    # Using CRF 23 for good quality/size balance (lower = better quality, higher = smaller file)
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset slow \
        -crf 23 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -vf "scale='if(gt(iw,1920),1920,-1)':'if(gt(ih,1080),1080,-1)'" \
        -y \
        "public/optimized/${basename}.mp4" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✓ Created: public/optimized/${basename}.mp4"
    else
        echo "✗ Failed: public/optimized/${basename}.mp4"
    fi
    
    # Create WebM version (VP9, better compression)
    ffmpeg -i "$input_file" \
        -c:v libvpx-vp9 \
        -crf 30 \
        -b:v 0 \
        -c:a libopus \
        -b:a 128k \
        -vf "scale='if(gt(iw,1920),1920,-1)':'if(gt(ih,1080),1080,-1)'" \
        -y \
        "public/optimized/${basename}.webm" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✓ Created: public/optimized/${basename}.webm"
    else
        echo "✗ Failed: public/optimized/${basename}.webm"
    fi
    
    echo ""
}

# Process all video files
for video in public/*.mov public/*.mp4; do
    if [ -f "$video" ]; then
        optimize_video "$video"
    fi
done

echo "Optimization complete!"
echo "Original files are in: public/"
echo "Optimized files are in: public/optimized/"

