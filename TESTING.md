# Testing Guide - Notification Frequency Converter

Complete guide for running and understanding tests in the Notification Frequency Converter app.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Suite Overview

### Location
`src/services/__tests__/FrequencyConverter.test.ts`

### Total Test Cases: 25+

## Test Categories

### 1. Instance Creation Tests
Tests that verify the FrequencyConverter class can be instantiated properly.

```bash
npm test -- --testNamePattern="Instance Creation"
```

**What it tests:**
- Class instantiation
- Instance type validation

### 2. Basic Frequency Conversion Tests
Tests fundamental conversion functionality.

```bash
npm test -- --testNamePattern="Basic Frequency Conversion"
```

**What it tests:**
- Standard frequency conversion (440Hz - A4 note)
- Audio file generation
- URI output validation

### 3. Frequency Range Tests
Tests handling of various frequency ranges.

```bash
npm test -- --testNamePattern="Frequency Range Testing"
```

**Frequencies tested:**
- **20Hz** - Very low (bass)
- **1000Hz** - Mid-range
- **10000Hz** - High
- **20000Hz** - Very high (limit of human hearing)

### 4. Sample Rate Variations
Tests different audio sample rates.

```bash
npm test -- --testNamePattern="Sample Rate Variations"
```

**Sample rates tested:**
- **44100Hz** - CD quality
- **48000Hz** - Professional audio
- **Default** - Fallback rate

### 5. Duration Variations
Tests different audio lengths.

```bash
npm test -- --testNamePattern="Duration Variations"
```

**Durations tested:**
- **500ms** - Short tone
- **1000ms** - Standard tone
- **5000ms** - Long tone
- **Default** - Unspecified duration

### 6. Amplitude Control Tests
Tests volume level adjustments.

```bash
npm test -- --testNamePattern="Amplitude Control"
```

**Amplitude levels tested:**
- **0.1** - Very quiet
- **0.5** - Medium
- **0.9** - Loud

### 7. Notification Frequencies Tests
Tests common notification sound frequencies.

```bash
npm test -- --testNamePattern="Common Notification Frequencies"
```

**Notification frequencies tested:**
- **400Hz** - Low notification
- **800Hz** - Medium notification
- **1200Hz** - High notification
- **2000Hz** - Alert notification

### 8. Error Handling Tests
Tests error scenarios and edge cases.

```bash
npm test -- --testNamePattern="Error Handling"
```

**Error scenarios tested:**
- Negative frequency
- Zero frequency

### 9. Performance Tests
Tests execution time and performance metrics.

```bash
npm test -- --testNamePattern="Performance"
```

**Performance checks:**
- Conversion completion time (<5 seconds)
- Sequential conversion handling

## Running Specific Tests

### Run a single test file
```bash
npm test -- FrequencyConverter.test.ts
```

### Run tests matching a pattern
```bash
npm test -- --testNamePattern="440"
```

### Run tests for a specific feature
```bash
npm test -- --testNamePattern="Amplitude"
```

### Run with verbose output
```bash
npm test -- --verbose
```

### Run with detailed error messages
```bash
npm test -- --no-coverage --forceExit
```

## Coverage Reports

### Generate coverage report
```bash
npm run test:coverage
```

### View coverage summary
```bash
npm run test:coverage -- --silent
```

### Generate HTML coverage report
```bash
npm run test:coverage -- --coverage-reporters=html
```

The HTML report will be available at `coverage/index.html`

## Continuous Testing

### Watch mode (recommended for development)
```bash
npm run test:watch
```

Features:
- Automatically re-runs tests when files change
- Interactive test selection
- Faster feedback loop

### Watch mode with coverage
```bash
npm run test:watch -- --coverage
```

## Debugging Tests

### Run single test in debug mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand FrequencyConverter.test.ts
```

### Run with detailed logging
```bash
npm test -- --verbose --no-coverage
```

### Show test stack traces
```bash
npm test -- --detectOpenHandles --forceExit
```

## Test Examples

### Example 1: Basic Conversion Test
```typescript
it('should convert a standard frequency (440Hz - A4 note)', async () => {
  const result = await converter.convert({
    targetFrequency: 440,
    sampleRate: 44100,
    duration: 1000,
  });

  expect(result).toBeDefined();
  expect(result).toHaveProperty('uri');
  expect(typeof result.uri).toBe('string');
});
```

**What it validates:**
- ✅ Result is not null/undefined
- ✅ Result has 'uri' property
- ✅ URI is a string

### Example 2: Frequency Range Test
```typescript
it('should handle low frequencies (20Hz)', async () => {
  const result = await converter.convert({
    targetFrequency: 20,
    sampleRate: 44100,
    duration: 1000,
  });

  expect(result).toBeDefined();
  expect(result.uri).toBeTruthy();
});
```

**What it validates:**
- ✅ Can handle edge case frequencies
- ✅ Returns valid output

## Performance Benchmarks

Expected performance metrics:

| Operation | Expected Time | Max Time |
|-----------|---------------|----------|
| 440Hz conversion | 100-500ms | 5000ms |
| Sequential conversions | Proportional to count | Linear |
| High frequency (20kHz) | 100-500ms | 5000ms |
| Low frequency (20Hz) | 100-500ms | 5000ms |

## Troubleshooting

### Tests timeout
**Problem:** Tests exceed timeout
**Solution:**
```bash
npm test -- --testTimeout=10000
```

### Module not found errors
**Problem:** "Cannot find module"
**Solution:**
```bash
npm install
npm test
```

### TypeScript errors
**Problem:** "Type errors in test file"
**Solution:**
```bash
npm install typescript ts-jest
npm test
```

### Tests pass locally but fail in CI
**Problem:** Environment differences
**Solution:**
- Ensure Node version matches (use `.nvmrc`)
- Clear cache: `npm ci --prefer-offline`
- Run tests sequentially: `npm test -- --runInBand`

## Best Practices

1. **Run tests before committing**
   ```bash
   npm test -- --coverage
   ```

2. **Use watch mode during development**
   ```bash
   npm run test:watch
   ```

3. **Keep test files near source code**
   - ✅ `src/services/__tests__/FrequencyConverter.test.ts`
   - ❌ `tests/FrequencyConverter.test.ts`

4. **Follow naming conventions**
   - ✅ `FrequencyConverter.test.ts`
   - ✅ `FrequencyConverter.spec.ts`
   - ❌ `test-FrequencyConverter.ts`

5. **Write descriptive test names**
   ```typescript
   // ✅ Good
   it('should convert 440Hz frequency to audio file')
   
   // ❌ Poor
   it('test conversion')
   ```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
```

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [React Native Testing Guide](https://reactnative.dev/docs/testing-overview)
- [Expo Testing Guide](https://docs.expo.dev/develop/testing/)

---

**Last Updated:** June 2026
**Test Suite Version:** 1.0.0
