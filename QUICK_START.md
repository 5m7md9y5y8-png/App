# Quick Start Guide - Notification Frequency Converter

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Tests
```bash
npm test
```

Expected output:
```
PASS  src/services/__tests__/FrequencyConverter.test.ts
  FrequencyConverter
    ✓ Instance Creation (5ms)
    ✓ Basic Frequency Conversion (250ms)
    ✓ Frequency Range Testing (1200ms)
    ✓ Sample Rate Variations (800ms)
    ✓ Duration Variations (650ms)
    ✓ Amplitude Control (400ms)
    ✓ Common Notification Frequencies (600ms)
    ✓ Error Handling (150ms)
    ✓ Performance (300ms)

Test Suites: 1 passed, 1 total
Tests:       25 passed, 25 total
```

### Step 3: Watch Mode (Development)
```bash
npm run test:watch
```

This will re-run tests whenever you change files.

---

## 📱 Quick Test Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm start` | Start the app |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |

---

## 🧪 Test Coverage

The test suite covers:

### ✅ Instance Creation
- Class instantiation and type validation

### ✅ Basic Conversion
- Standard frequency conversion (440Hz - A4 note)
- Audio file generation
- URI output validation

### ✅ Frequency Ranges
- Very low: 20Hz (bass)
- Mid-range: 1000Hz
- High: 10000Hz
- Very high: 20000Hz (hearing limit)

### ✅ Sample Rates
- 44100Hz (CD quality)
- 48000Hz (professional)
- Default rate

### ✅ Durations
- Short: 500ms
- Standard: 1000ms
- Long: 5000ms
- Default

### ✅ Amplitude Control
- Quiet: 0.1
- Medium: 0.5
- Loud: 0.9

### ✅ Common Notifications
- Low: 400Hz
- Medium: 800Hz
- High: 1200Hz
- Alert: 2000Hz

### ✅ Error Handling
- Invalid frequencies
- Edge cases

### ✅ Performance
- Execution time < 5 seconds
- Sequential conversions

---

## 📊 Coverage Report

Generate a detailed coverage report:
```bash
npm run test:coverage
```

View in browser:
```bash
open coverage/index.html
```

---

## 🔧 Using the FrequencyConverter

### Basic Example

```typescript
import { FrequencyConverter } from './src/services/FrequencyConverter';

const converter = new FrequencyConverter();

// Convert 440Hz to audio
const result = await converter.convert({
  targetFrequency: 440,
  sampleRate: 44100,
  duration: 1000,
  amplitude: 0.3,
});

console.log('Generated audio:', result.uri);
```

### With Different Frequencies

```typescript
const frequencies = {
  lowNotification: 400,
  mediumNotification: 800,
  highNotification: 1200,
  alertNotification: 2000,
};

for (const [name, freq] of Object.entries(frequencies)) {
  const audio = await converter.convert({
    targetFrequency: freq,
    duration: 500,
  });
  console.log(`${name}: ${audio.uri}`);
}
```

---

## 🐛 Troubleshooting

### Tests won't run
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

### TypeScript errors
```bash
# Reinstall TypeScript
npm install --save-dev typescript ts-jest
npm test
```

### Module not found
```bash
# Ensure all dependencies are installed
npm install
# Then check tsconfig.json paths are correct
```

---

## 📚 File Structure

```
App/
├── src/
│   └── services/
│       ├── FrequencyConverter.ts          (Main service)
│       └── __tests__/
│           └── FrequencyConverter.test.ts (25+ tests)
├── App.tsx                                 (Main component)
├── package.json                            (Dependencies)
├── jest.config.js                          (Test config)
├── tsconfig.json                           (TypeScript config)
├── README.md                               (Full docs)
├── TESTING.md                              (Testing guide)
└── QUICK_START.md                          (This file)
```

---

## 🎯 Next Steps

1. ✅ Run `npm install` to install dependencies
2. ✅ Run `npm test` to verify everything works
3. ✅ Run `npm run test:watch` for live development
4. ✅ Explore test cases in `src/services/__tests__/`
5. ✅ Read `TESTING.md` for advanced testing guide
6. ✅ Read `README.md` for full documentation

---

## 💡 Tips

- Use `npm run test:watch` during development - tests re-run automatically
- Check coverage with `npm run test:coverage` before committing
- Run tests in CI/CD pipelines to catch issues early
- Add new tests in `__tests__` folder next to the source code

---

**Happy testing! 🚀**

For more details, see:
- 📖 [README.md](README.md) - Full documentation
- 🧪 [TESTING.md](TESTING.md) - Comprehensive testing guide
- 📝 [src/services/FrequencyConverter.ts](https://github.com/5m7md9y5y8-png/App/blob/main/src/services/FrequencyConverter.ts) - Service code
