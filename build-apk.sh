#!/bin/bash

# Build script for creating installable APK
echo "Building Notification Frequency Changer APK..."
echo ""
echo "Prerequisites:"
echo "✓ EAS CLI installed: npm install -g eas-cli"
echo "✓ Logged into EAS: eas login"
echo ""
echo "Building for Android..."
eas build --platform android --non-interactive

echo ""
echo "Build complete!"
echo "Your APK will be available at: https://expo.dev/builds"
echo ""
echo "To install on your Android phone:"
echo "1. Download the APK from the link above"
echo "2. Open the APK file on your phone"
echo "3. Tap 'Install'"
echo "4. Done! 🎉"
