#!/bin/bash

# Exit on error
set -e

echo "🚀 Building React application..."
npm run build

echo "📂 Preparing Plasmoid package..."
# Ensure the html directory exists
mkdir -p plasmoid/package/contents/html

# Copy the built single-file index.html
cp dist/index.html plasmoid/package/contents/html/

echo "📦 Creating .plasmoid package..."
cd plasmoid/package
zip -r ../../clock-app.plasmoid ./*

echo "✅ Done! Package created at: clock-app.plasmoid"
echo ""
echo "To install locally (Plasma 6):"
echo "  kpackagetool6 -i clock-app.plasmoid"
echo ""
echo "To upgrade if already installed:"
echo "  kpackagetool6 -u clock-app.plasmoid"
echo ""
echo "To preview (Plasma 6):"
echo "  plasmoidviewer -a com.satyamsaxena.clockapp"
