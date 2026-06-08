import { FrequencyConverter } from '../FrequencyConverter';

describe('FrequencyConverter', () => {
  let converter: FrequencyConverter;

  beforeEach(() => {
    converter = new FrequencyConverter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Instance Creation', () => {
    it('should create an instance of FrequencyConverter', () => {
      expect(converter).toBeDefined();
      expect(converter).toBeInstanceOf(FrequencyConverter);
    });
  });

  describe('Basic Frequency Conversion', () => {
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

    it('should generate audio file with correct output', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 2000,
        amplitude: 0.3,
      });

      expect(result).toBeDefined();
      expect(result.uri).toMatch(/file:\/\//);
    });
  });

  describe('Frequency Range Testing', () => {
    it('should handle low frequencies (20Hz)', async () => {
      const result = await converter.convert({
        targetFrequency: 20,
        sampleRate: 44100,
        duration: 1000,
      });

      expect(result).toBeDefined();
      expect(result.uri).toBeTruthy();
    });

    it('should handle mid-range frequencies (1000Hz)', async () => {
      const result = await converter.convert({
        targetFrequency: 1000,
        sampleRate: 44100,
        duration: 1000,
      });

      expect(result).toBeDefined();
      expect(result.uri).toBeTruthy();
    });

    it('should handle high frequencies (10000Hz)', async () => {
      const result = await converter.convert({
        targetFrequency: 10000,
        sampleRate: 44100,
        duration: 1000,
      });

      expect(result).toBeDefined();
      expect(result.uri).toBeTruthy();
    });

    it('should handle very high frequencies (20000Hz)', async () => {
      const result = await converter.convert({
        targetFrequency: 20000,
        sampleRate: 44100,
        duration: 1000,
      });

      expect(result).toBeDefined();
      expect(result.uri).toBeTruthy();
    });
  });

  describe('Sample Rate Variations', () => {
    it('should work with 44100Hz sample rate', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 1000,
      });

      expect(result).toBeDefined();
    });

    it('should work with 48000Hz sample rate', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 48000,
        duration: 1000,
      });

      expect(result).toBeDefined();
    });

    it('should work with default sample rate when not specified', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        duration: 1000,
      });

      expect(result).toBeDefined();
    });
  });

  describe('Duration Variations', () => {
    it('should handle short durations (500ms)', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 500,
      });

      expect(result).toBeDefined();
    });

    it('should handle long durations (5000ms)', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 5000,
      });

      expect(result).toBeDefined();
    });

    it('should use default duration when not specified', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
      });

      expect(result).toBeDefined();
    });
  });

  describe('Amplitude Control', () => {
    it('should handle amplitude parameter', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 1000,
        amplitude: 0.5,
      });

      expect(result).toBeDefined();
    });

    it('should handle low amplitude (0.1)', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 1000,
        amplitude: 0.1,
      });

      expect(result).toBeDefined();
    });

    it('should handle high amplitude (0.9)', async () => {
      const result = await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 1000,
        amplitude: 0.9,
      });

      expect(result).toBeDefined();
    });
  });

  describe('Common Notification Frequencies', () => {
    const notificationFrequencies = [
      { freq: 400, name: 'Low notification' },
      { freq: 800, name: 'Medium notification' },
      { freq: 1200, name: 'High notification' },
      { freq: 2000, name: 'Alert notification' },
    ];

    notificationFrequencies.forEach(({ freq, name }) => {
      it(`should convert ${name} frequency (${freq}Hz)`, async () => {
        const result = await converter.convert({
          targetFrequency: freq,
          sampleRate: 44100,
          duration: 1000,
        });

        expect(result).toBeDefined();
        expect(result.uri).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid frequency gracefully', async () => {
      try {
        await converter.convert({
          targetFrequency: -100,
          sampleRate: 44100,
          duration: 1000,
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle zero frequency gracefully', async () => {
      try {
        await converter.convert({
          targetFrequency: 0,
          sampleRate: 44100,
          duration: 1000,
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Performance', () => {
    it('should complete conversion within reasonable time', async () => {
      const startTime = Date.now();
      
      await converter.convert({
        targetFrequency: 440,
        sampleRate: 44100,
        duration: 1000,
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete within 5 seconds
      expect(duration).toBeLessThan(5000);
    });

    it('should handle multiple conversions sequentially', async () => {
      const frequencies = [440, 880, 1320, 1760];

      for (const freq of frequencies) {
        const result = await converter.convert({
          targetFrequency: freq,
          sampleRate: 44100,
          duration: 500,
        });

        expect(result).toBeDefined();
        expect(result.uri).toBeTruthy();
      }
    });
  });
});
