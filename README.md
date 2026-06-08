# Notification Frequency Converter

A React Native/Expo application that converts notification frequencies (Hz) to pure audio tones. Perfect for testing audio frequencies, notification sounds, and tone generation.

## Features

- 🔊 Convert any frequency (Hz) to pure audio tone
- 🎵 Adjustable sample rates and duration
- 🔧 Amplitude control for volume adjustment
- 📱 Works on iOS and Android
- 🧪 Comprehensive test suite
- 📦 TypeScript support

## Installation

1. Clone the repository
```bash
git clone https://github.com/5m7md9y5y8-png/App.git
cd App
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
expo start
```

4. Run on your device
```bash
# For iOS
npm run ios

# For Android
npm run android

# For Web
npm run web
```

## Testing

This project includes a comprehensive test suite for the FrequencyConverter service.

### Run Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Files

- `src/services/__tests__/FrequencyConverter.test.ts` - Comprehensive test suite covering:
  - Basic frequency conversion
  - Frequency range testing (20Hz - 20kHz)
  - Sample rate variations
  - Duration variations
  - Amplitude control
  - Common notification frequencies
  - Error handling
  - Performance metrics

## Usage

### Basic Example

```typescript
import { FrequencyConverter } from './src/services/FrequencyConverter';

const converter = new FrequencyConverter();

// Convert 440Hz (A4 note) to audio
const result = await converter.convert({
  targetFrequency: 440,
  sampleRate: 44100,
  duration: 1000, // 1 second
  amplitude: 0.3,
});

console.log('Audio file URI:', result.uri);
```

### Common Notification Frequencies

- **Low Notification**: 400 Hz
- **Medium Notification**: 800 Hz
- **High Notification**: 1200 Hz
- **Alert Notification**: 2000 Hz

## Project Structure

```
App/
├── src/
│   ├── services/
│   │   ├── FrequencyConverter.ts
│   │   └── __tests__/
│   │       └── FrequencyConverter.test.ts
│   └── components/
├── App.tsx
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Configuration

### TypeScript Config (`tsconfig.json`)

Configured for React Native with path aliases:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@services/*` → `src/services/*`
- `@utils/*` → `src/utils/*`

### Jest Config (`jest.config.js`)

- Preset: `jest-expo`
- Transform: `ts-jest`
- Test regex: `(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$`
- Coverage collection from `src/**/*.{ts,tsx}`

## Dependencies

### Core
- `react` 18.2.0
- `react-native` 0.73.0
- `expo` 50.0.0
- `expo-av` 14.0.0 (Audio handling)
- `expo-file-system` 15.0.0 (File management)

### Development
- `jest` 29.5.0 (Testing framework)
- `ts-jest` 29.1.0 (TypeScript support for Jest)
- `jest-expo` 50.0.0 (Expo preset for Jest)
- `typescript` 5.0.0

## API Reference

### FrequencyConverter.convert(options)

Converts a frequency to a pure audio tone.

**Parameters:**
```typescript
interface ConversionOptions {
  targetFrequency: number;    // Frequency in Hz (required)
  sampleRate?: number;        // Sample rate (default: 44100)
  duration?: number;          // Duration in ms (default: 1000)
  amplitude?: number;         // Volume 0-1 (default: 0.3)
}
```

**Returns:**
```typescript
{
  uri: string;  // File URI to the generated audio file
}
```

## Testing Strategy

The test suite covers:
1. **Basic Functionality**: Frequency conversion and file generation
2. **Frequency Ranges**: Low (20Hz), mid (1000Hz), high (10000Hz), very high (20000Hz)
3. **Sample Rates**: 44100Hz, 48000Hz, and defaults
4. **Duration Variations**: Short (500ms), standard (1000ms), long (5000ms)
5. **Amplitude Control**: Various amplitude values (0.1 - 0.9)
6. **Notification Frequencies**: Common notification tone frequencies
7. **Error Handling**: Invalid inputs and edge cases
8. **Performance**: Execution time and sequential conversions

## Troubleshooting

### Tests fail with "Module not found"
```bash
npm install
npm test
```

### Audio not playing
- Ensure audio permissions are granted on your device
- Check that the device isn't in silent mode
- Verify sample rate compatibility with your device

### TypeScript errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache

# Reinstall dependencies
npm install
```

## Development

### Add New Tests

1. Create test file in `src/services/__tests__/`
2. Follow naming convention: `*.test.ts` or `*.spec.ts`
3. Run `npm run test:watch` for live testing

### Code Style

- Use TypeScript for all source files
- Follow ESLint/Prettier conventions
- Write tests for all new features

## License

MIT

## Support

For issues and questions, please create an issue on GitHub:
https://github.com/5m7md9y5y8-png/App/issues

## Contributors

- 5m7md9y5y8-png

---

**Built with** ❤️ **using React Native, Expo, and TypeScript**
