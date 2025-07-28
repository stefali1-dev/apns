#!/bin/bash

# Image Optimization Script for APNS Project
# This script optimizes images in the public/images directory

echo "🖼️  Starting image optimization for APNS project..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Please install it first:"
    echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "   macOS: brew install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Create optimized directory if it doesn't exist
mkdir -p public/images/volunteers/optimized

# Optimize volunteer images
echo "📷 Optimizing volunteer images..."

for i in {1..7}; do
    input_file="public/images/volunteers/${i}.jpeg"
    output_file="public/images/volunteers/optimized/${i}.webp"
    
    if [ -f "$input_file" ]; then
        echo "   Processing ${input_file}..."
        
        # Convert to WebP with optimized settings
        convert "$input_file" \
            -resize 800x800^ \
            -gravity center \
            -extent 800x800 \
            -quality 80 \
            -define webp:lossless=false \
            -define webp:method=6 \
            "$output_file"
        
        # Also create a smaller thumbnail version
        thumb_file="public/images/volunteers/optimized/${i}-thumb.webp"
        convert "$input_file" \
            -resize 400x400^ \
            -gravity center \
            -extent 400x400 \
            -quality 75 \
            -define webp:lossless=false \
            -define webp:method=6 \
            "$thumb_file"
        
        echo "   ✅ Created: $output_file and $thumb_file"
    else
        echo "   ⚠️  File not found: $input_file"
    fi
done

echo ""
echo "🎉 Image optimization complete!"
echo "📊 File size comparison:"

for i in {1..7}; do
    original="public/images/volunteers/${i}.jpeg"
    optimized="public/images/volunteers/optimized/${i}.webp"
    
    if [ -f "$original" ] && [ -f "$optimized" ]; then
        original_size=$(du -h "$original" | cut -f1)
        optimized_size=$(du -h "$optimized" | cut -f1)
        echo "   ${i}.jpeg: $original_size → ${i}.webp: $optimized_size"
    fi
done

echo ""
echo "💡 To use optimized images, update your membersService.tsx to use:"
echo "   imageUrl: '/images/volunteers/optimized/1.webp'"
echo ""
echo "📝 Note: Remember to add fallbacks for browsers that don't support WebP"
