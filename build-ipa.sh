#!/bin/bash

# Build script for creating installable IPA for iOS
echo "Building Notification Frequency Changer IPA..."
echo ""
echo "Prerequisites:"
echo "✓ EAS CLI installed: npm install -g eas-cli"
echo "✓ Logged into EAS: eas login"
echo "✓ Apple Developer account"
echo ""
echo "Building for iOS..."
eas build --platform ios --non-interactive

echo ""
echo "Build complete!"
echo "Your IPA will be available at: https://expo.dev/builds"
echo ""
echo "To install on your iPhone:"
echo "1. Download the IPA from the link above"
echo "2. Use Apple Configurator or TestFlight"
echo "3. Or scan the QR code provided"
echo "4. Done! 🎉"
