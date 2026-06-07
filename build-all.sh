#!/bin/bash

# Complete automated build setup for Notification Frequency Changer
# This script will build both Android and iOS versions and provide download links

echo "================================================"
echo "Notification Frequency Changer - Full Build"
echo "================================================"
echo ""
echo "This script will create installable versions for both Android and iOS"
echo ""

# Check prerequisites
echo "Checking prerequisites..."
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js"
    exit 1
fi
echo "✅ npm found: $(npm --version)"

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo ""
    echo "⚠️  EAS CLI not found. Installing..."
    npm install -g eas-cli
fi
echo "✅ EAS CLI ready"

echo ""
echo "================================================"
echo "Step 1: Installing Dependencies"
echo "================================================"
npm install

echo ""
echo "================================================"
echo "Step 2: Building APK (Android)"
echo "================================================"
echo ""
echo "This will create an installable APK for Android devices"
echo "Building..."
echo ""

eas build --platform android --auto-submit

echo ""
echo "================================================"
echo "Step 3: Building IPA (iOS)"
echo "================================================"
echo ""
echo "This will create an installable IPA for iPhone/iPad"
echo "Building..."
echo ""

eas build --platform ios --auto-submit

echo ""
echo "================================================"
echo "✅ BUILD COMPLETE!"
echo "================================================"
echo ""
echo "Your builds are ready at: https://expo.dev/builds"
echo ""
echo "DOWNLOAD YOUR APP:"
echo ""
echo "📱 Android (APK):"
echo "   1. Visit: https://expo.dev/builds"
echo "   2. Find the Android build"
echo "   3. Click 'Download APK'"
echo "   4. Open on your Android phone"
echo "   5. Tap Install"
echo ""
echo "📱 iPhone (IPA):"
echo "   1. Visit: https://expo.dev/builds"
echo "   2. Find the iOS build"
echo "   3. Scan QR code with phone"
echo "   4. Tap to install"
echo ""
echo "================================================"
echo "Ready to use! No coding needed! 🎵"
echo "================================================"
